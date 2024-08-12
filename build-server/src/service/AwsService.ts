import { PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import ms from "mime-types";
import { s3Client } from "../client/S3Client";

export class AwsService{
    private static _instance: AwsService;

    private constructor(){

    }

    public static getInstance(): AwsService{
        if(this._instance == null){
            return new AwsService();
        }
        return this._instance
    }

    public async upload(file: string | Buffer){
        const putObjectCommand = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME as string,
            Key: `__output/${process.env.SLUG}/${file}`,
            Body: fs.createReadStream(file),
            ContentType: ms.lookup(file as string) as unknown as string
        });
        s3Client.send(putObjectCommand);
    }
}
