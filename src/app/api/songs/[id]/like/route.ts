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

// src/app/api/songs/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const song = await prisma.song.findUnique({
      where: { id: params.id },
      include: {
        artist: {
          select: {
            id: true,
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
    });

    if (!song) {
      return NextResponse.json(
        { error: 'Song not found' },
        { status: 404 }
      );
    }

    // Increment stream count
    await prisma.stream.create({
      data: {
        songId: song.id,
        userId: null, // Will be updated with user ID when session is available
      },
    });

    return NextResponse.json({
      id: song.id,
      title: song.title,
      artist: song.artist.name,
      album: song.album,
      duration: song.duration,
      audioUrl: song.audioUrl,
      coverUrl: song.coverUrl,
      genre: song.genre,
      likes: song._count.likes,
      streams: song._count.streams + 1,
    });
  } catch (error) {
    console.error('Error fetching song:', error);
    return NextResponse.json(
      { error: 'Failed to fetch song' },
      { status: 500 }
    );
  }
}

// src/app/api/songs/[id]/like/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if already liked
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_songId: {
          userId: user.id,
          songId: params.id,
        },
      },
    });

    if (existingLike) {
      // Unlike
      await prisma.like.delete({
        where: {
          userId_songId: {
            userId: user.id,
            songId: params.id,
          },
        },
      });
      return NextResponse.json({ liked: false });
    } else {
      // Like
      await prisma.like.create({
        data: {
          userId: user.id,
          songId: params.id,
        },
      });
      return NextResponse.json({ liked: true });
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    return NextResponse.json(
      { error: 'Failed to toggle like' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ liked: false });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ liked: false });
    }

    const like = await prisma.like.findUnique({
      where: {
        userId_songId: {
          userId: user.id,
          songId: params.id,
        },
      },
    });

    return NextResponse.json({ liked: !!like });
  } catch (error) {
    console.error('Error checking like status:', error);
    return NextResponse.json({ liked: false });
  }
}