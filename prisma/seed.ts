import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Create test user
  const testUser = await prisma.user.create({
    data: {
      email: 'fan@ayitiritmo.com',
      name: 'Test Fan',
      password: await bcrypt.hash('password123', 12),
      role: 'FAN',
    },
  });

  // Create test artist
  const testArtistUser = await prisma.user.create({
    data: {
      email: 'artist@ayitiritmo.com',
      name: 'Haiti Groove',
      password: await bcrypt.hash('password123', 12),
      role: 'ARTIST',
    },
  });

  const testArtist = await prisma.artist.create({
    data: {
      userId: testArtistUser.id,
      artistName: 'Haiti Groove',
      bio: 'Leading Konpa artist bringing the vibrant sounds of Haiti to the world.',
      genres: ['Konpa', 'Zouk', 'Afro-Caribbean'],
      verified: true,
    },
  });

  // Create test songs
  for (let i = 1; i <= 5; i++) {
    await prisma.song.create({
      data: {
        title: `Test Song ${i}`,
        artistId: testArtist.id,
        duration: Math.floor(Math.random() * 180) + 120, // 2-5 minutes
        audioUrl: `/api/placeholder/audio/song${i}.mp3`,
        coverArt: `/api/placeholder/300/300`,
        genre: ['Konpa', 'Zouk', 'Rasin'][i % 3],
        releaseDate: new Date(),
      },
    });
  }

  // Create test photos
  for (let i = 1; i <= 3; i++) {
    await prisma.photo.create({
      data: {
        artistId: testArtist.id,
        url: `/api/placeholder/800/600`,
        thumbnailUrl: `/api/placeholder/300/300`,
        caption: `Test photo ${i} from our latest tour!`,
        location: 'Port-au-Prince, Haiti',
      },
    });
  }

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });