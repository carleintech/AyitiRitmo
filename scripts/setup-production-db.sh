# scripts/setup-production-db.sh

#!/bin/bash

# Set production database URL
export DATABASE_URL="your_production_database_url"

# Generate Prisma client for production
pnpm prisma generate

# Run database migrations
pnmp prisma migrate deploy

# Seed production database with initial data
pnpm run db:seed:production

# Backup production database (recommended)
scripts/backup-database.sh

# Enable connection pooling
pnpm add @prisma/adapter-pg pg

# scripts/backup-database.sh
#!/bin/bash

# Create backup directory if it doesn't exist
mkdir -p backups

# Get current date for filename
DATE=$(date +%Y%m%d_%H%M%S)

# Backup database
pg_dump $DATABASE_URL > backups/ayitiritmo_backup_$DATE.sql

# Keep only last 7 days of backups
find backups/ -name "*.sql" -type f -mtime +7 -delete

echo "Database backup completed: ayitiritmo_backup_$DATE.sql"

# scripts/seed-production.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create initial admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@ayitiritmo.com' },
    update: {},
    create: {
      email: 'admin@ayitiritmo.com',
      name: 'AyitiRitmo Admin',
      role: 'ADMIN',
      password: await hash('secure_admin_password'),
    },
  });

  // Create sample artists and songs for launch
  const artists = await Promise.all([
    prisma.artist.create({
      data: {
        name: 'Konpa Kings',
        bio: 'Leading konpa band from Port-au-Prince',
        profileImage: '/images/artists/konpa-kings.jpg',
        verified: true,
      },
    }),
    // Add more launch artists...
  ]);

  // Create sample music content
  await Promise.all([
    prisma.song.create({
      data: {
        title: 'Haiti Mon Amour',
        artistId: artists[0].id,
        genre: 'KONPA',
        duration: 245,
        audioUrl: '/music/samples/haiti-mon-amour.mp3',
        coverUrl: '/images/covers/haiti-mon-amour.jpg',
      },
    }),
    // Add more launch songs...
  ]);

  console.log('Production database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });