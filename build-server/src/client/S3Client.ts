import { S3Client } from "@aws-sdk/client-s3";
import { AWS_BUCKET_NAME,AWS_ACCESS_KEY_ID,AWS_SECRET_ACCESS_KEY } from "../config/config";
export const s3Client = new S3Client({
    region: AWS_BUCKET_NAME,
    credentials:{
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY as string
    }
});
