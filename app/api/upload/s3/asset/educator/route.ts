import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { File } from "buffer";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { delSchema } from "../../schema";
import { getAssetFinalFilepath } from "../../helper";

const client = new S3Client({
  forcePathStyle: false,
  endpoint: process.env.S3_EDUCATOR_ENDPOINT!,
  region: process.env.S3_EDUCATOR_REGION!,
  credentials: {
    accessKeyId: process.env.S3_EDUCATOR_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_EDUCATOR_SECRET_ACCESS_KEY!,
  },
});

async function getPresignedUrl(req: Request) {
  try {
    const form = await req.formData();

    const file = form.get("input-file-upload");
    const file_dir = form.get("file-dir");

    if (!file)
      return NextResponse.json(
        { message: "No file detected" },
        { status: 400 },
      );

    const isFile = file instanceof File;

    if (!isFile)
      return NextResponse.json({ message: "Is not a file" }, { status: 400 });

    const buffer = await file.arrayBuffer();

    const body = Buffer.from(buffer);

    const filename = getAssetFinalFilepath(file.name, file_dir);

    await client.send(
      new PutObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_S3_EDUCATOR_BUCKET as string,
        Key: filename,
        Body: body,
      }),
    );

    return NextResponse.json({
      message: "success",
      link: process.env.NEXT_PUBLIC_S3_EDUCATOR_URL + "/" + filename,
    });
  } catch (reason) {
    console.log(reason);
    return NextResponse.json({ message: "failure" }, { status: 500 });
  }
}

async function deleteFileOnBucket(req: Request) {
  try {
    const data = delSchema.parse(await req.json());

    const command = new DeleteObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_S3_EDUCATOR_BUCKET!,
      Key: data.bucketPath,
    });

    await client.send(command);

    return NextResponse.json({ message: "Delete success" }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(error, { status: 400 });
    }

    console.error(error);

    return NextResponse.json({ status: 500 });
  }
}
export { deleteFileOnBucket as DELETE, getPresignedUrl as POST };
