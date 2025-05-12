// src/app/api/songs/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const genre = searchParams.get('genre');
  const limit = searchParams.get('limit');
  const page = searchParams.get('page');

  try {
    const where = genre ? { genre } : {};
    const take = limit ? parseInt(limit) : 50;
    const skip = page ? (parseInt(page) - 1) * take : 0;

    const [songs, total] = await Promise.all([
      prisma.song.findMany({
        where,
        take,
        skip,
        include: {
          artist: {
            select: {
              name: true,
              profileImage: true,
            },
          },
          _count: {
            select: {
              likes: true,
              streams: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.song.count({ where }),
    ]);

    const formattedSongs = songs.map(song => ({
      id: song.id,
      title: song.title,
      artist: song.artist.name,
      album: song.album,
      duration: song.duration,
      audioUrl: song.audioUrl,
      coverUrl: song.coverUrl,
      genre: song.genre,
      likes: song._count.likes,
      streams: song._count.streams,
    }));

    return NextResponse.json({
      songs: formattedSongs,
      total,
      page: parseInt(page || '1'),
      limit: take,
    });
  } catch (error) {
    console.error('Error fetching songs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch songs' },
      { status: 500 }
    );
  }
}