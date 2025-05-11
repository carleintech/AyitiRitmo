import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { uploadFile } from '@/lib/storage';
import { z } from 'zod';

const photoUploadSchema = z.object({
  caption: z.string().optional(),
  location: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  albumId: z.string().optional(),
  takenAt: z.string().optional(),
});

// Upload photo
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || session.user.role !== 'ARTIST') {
      return NextResponse.json(
        { error: 'Unauthorized' },
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
    const file = formData.get('file') as File;
    const data = formData.get('data') as string;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const photoData = data ? JSON.parse(data) : {};
    const validatedData = photoUploadSchema.parse(photoData);

    // Upload to S3 or similar
    const { url, thumbnailUrl } = await uploadFile(file, 'photos');

    // Create photo record
    const photo = await prisma.photo.create({
      data: {
        artistId: artist.id,
        url,
        thumbnailUrl,
        caption: validatedData.caption,
        location: validatedData.location,
        latitude: validatedData.latitude,
        longitude: validatedData.longitude,
        albumId: validatedData.albumId,
        takenAt: validatedData.takenAt ? new Date(validatedData.takenAt) : null,
      },
      include: {
        artist: true,
        album: true,
        _count: {
          select: {
            likes: true,
            comments: true,
          }
        }
      }
    });

    return NextResponse.json(photo, { status: 201 });
  } catch (error) {
    console.error('Photo upload error:', error);
    
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

// Get photos
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const artistId = searchParams.get('artistId');
    const albumId = searchParams.get('albumId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const where: any = {};
    
    if (artistId) {
      where.artistId = artistId;
    }
    
    if (albumId) {
      where.albumId = albumId;
    }

    const photos = await prisma.photo.findMany({
      where,
      include: {
        artist: true,
        album: true,
        _count: {
          select: {
            likes: true,
            comments: true,
          }
        }
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ],
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.photo.count({ where });

    return NextResponse.json({
      photos,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      }
    });
  } catch (error) {
    console.error('Fetch photos error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}