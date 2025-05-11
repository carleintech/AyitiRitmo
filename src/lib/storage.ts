import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import sharp from 'sharp';

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadFile(file: File, folder: string) {
  const buffer = await file.arrayBuffer();
  const filename = `${Date.now()}-${file.name}`;
  const key = `${folder}/${filename}`;

  // Create thumbnail for images
  let thumbnailUrl = null;
  if (file.type.startsWith('image/')) {
    const thumbnailBuffer = await sharp(buffer)
      .resize(300, 300, { 
        fit: 'cover', 
        position: 'centre' 
      })
      .toBuffer();

    const thumbnailKey = `${folder}/thumbs/${filename}`;
    
    await s3Client.send(new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: thumbnailKey,
      Body: thumbnailBuffer,
      ContentType: file.type,
    }));

    thumbnailUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${thumbnailKey}`;
  }

  // Upload original file
  await s3Client.send(new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: key,
    Body: Buffer.from(buffer),
    ContentType: file.type,
  }));

  const url = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

  return { url, thumbnailUrl };
}

export async function getSignedUploadUrl(filename: string, contentType: string, folder: string) {
  const key = `${folder}/${Date.now()}-${filename}`;
  
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: key,
    ContentType: contentType,
  });

  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  
  return {
    signedUrl,
    key,
    url: `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
  };
}