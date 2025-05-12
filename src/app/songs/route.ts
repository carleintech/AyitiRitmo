import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');
    const genre = searchParams.get('genre');
    const artistId = searchParams.get('artistId');

    const where: any = {};
    
    if (genre) {
      where.genre = genre;
    }
    
    if (artistId) {
      where.artistId = artistId;
    }

    const songs = await prisma.song.findMany({
      where,
      include: {
        artist: true,
        album: true,
        _count: {
          select: {
            likes: true,
          }
        }
      },
      orderBy: [
        { streamCount: 'desc' },
        { createdAt: 'desc' }
      ],
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.song.count({ where });

    // Format songs for frontend
    const formattedSongs = songs.map(song => ({
      id: song.id,
      title: song.title,
      artist: song.artist,
      album: song.album,
      duration: song.duration,
      coverArt: song.coverArt,
      audioUrl: song.audioUrl,
      genre: song.genre,
      likes: song._count.likes,
      gradient: `from-haiti-${['red', 'blue', 'gold'][Math.floor(Math.random() * 3)]} to-${['orange', 'blue', 'yellow'][Math.floor(Math.random() * 3)]}-500`,
    }));

    return NextResponse.json({
      songs: formattedSongs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      }
    });
  } catch (error) {
    console.error('Fetch songs error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}