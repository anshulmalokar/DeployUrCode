import { S3Client } from "@aws-sdk/client-s3";
import { AWS_ACCESS_KEY_ID,AWS_SECRET_ACCESS_KEY } from "../config/config";
export const s3Client = new S3Client({
    region: 'ap-south-1',
    credentials:{
        accessKeyId: AWS_ACCESS_KEY_ID as string,
        secretAccessKey: AWS_SECRET_ACCESS_KEY as string
    }
});
