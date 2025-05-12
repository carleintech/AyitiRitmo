import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { uploadMusicFile, uploadFile } from '@/lib/storage';
import { z } from 'zod';

const songUploadSchema = z.object({
  title: z.string().min(1),
  albumId: z.string().optional(),
  genre: z.string().optional(),
  lyrics: z.string().optional(),
  isExplicit: z.boolean().default(false),
  releaseDate: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || session.user.role !== 'ARTIST') {
      return NextResponse.json(
        { error: 'Unauthorized. Artists only.' },
        { status: 401 }
      );
    }

    const artist = await prisma.artist.findUnique({
      where: { userId: session.user.id }
    });

    if (!artist) {
      return NextResponse.json(
        { error: 'Artist profile not found' },
        { status: 404 }
      );
    }

    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;
    const coverFile = formData.get('cover') as File;
    const data = formData.get('data') as string;
    
    if (!audioFile) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      );
    }

    const songData = data ? JSON.parse(data) : {};
    const validatedData = songUploadSchema.parse(songData);

    // Upload audio file and extract metadata
    const { audioUrl, metadata } = await uploadMusicFile(audioFile, artist.id);

    // Upload cover art if provided
    let coverArt = null;
    if (coverFile) {
      const { url } = await uploadFile(coverFile, 'covers');
      coverArt = url;
    }

    // Create song in database
    const song = await prisma.song.create({
      data: {
        title: validatedData.title || metadata.title,
        artistId: artist.id,
        albumId: validatedData.albumId,
        duration: metadata.duration,
        audioUrl,
        coverArt,
        lyrics: validatedData.lyrics,
        genre: validatedData.genre || metadata.genre || 'Uncategorized',
        isExplicit: validatedData.isExplicit,
        releaseDate: validatedData.releaseDate ? new Date(validatedData.releaseDate) : new Date(),
      },
      include: {
        artist: true,
        album: true,
      }
    });

    // Update artist's total songs count
    await prisma.artist.update({
      where: { id: artist.id },
      data: {
        // Will need to add totalSongs field to Artist model
      }
    });

    return NextResponse.json(song, { status: 201 });
  } catch (error) {
    console.error('Music upload error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}