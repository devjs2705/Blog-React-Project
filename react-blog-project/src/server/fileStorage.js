import { Client, ID, Storage } from "appwrite";
import config from "../config/config.js";

export class FileStorage {
    client = newClient();
    bucket;

    constructor(){
        this.client
            .setEndpoint(config.appWriteEndPoint)
            .setProject(config.appWriteProjectId);

        this.bucket = new Storage(this.client);
    }

    async uploadFile(file) {
        try {
            const result = await this.bucket.createFile({
                bucketId: config.appWriteBucketId,
                fileId: ID.unique(),
                file: file,
            });

            return result;
        } catch (error) {
            throw error;
        }
    }

    async deleteFile(fileId) {
        try {
            const result = await this.bucket.deleteFile({
                bucketId: config.appWriteBucketId,
                fileId: fileId
            });

            return true;
        } catch (error) {
            console.log("delete file error", error);
            return false;
        }
    }

    async getFilePreview(fileId) {
        try {
            const result = storage.getFilePreview({
                bucketId: config.appWriteBucketId,
                fileId: fileId,
            });

            return result;
        } catch (error) {
            throw error;
        }
    }
}