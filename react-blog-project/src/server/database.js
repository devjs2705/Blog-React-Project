import { Client, ID, Databases, Query } from "appwrite";
import config from "../config/config.js";

export class Service {
    client = new Client();
    databases;

    constructor() {
        this.client
        .setEndpoint(config.appWriteEndPoint)
        .setProject(config.appWriteProjectId);

        this.databases = new Databases(this.client);
    }

    async createPost({title, slug, content, status, thumbnail, userId}) {
        try{
            const result = await this.databases.createDocument({
                databaseId: config.appWriteDatabaseId,
                collectionId: config.appWriteCollectionId,
                documentId: slug,
                data: {
                    id: userId,
                    title: title,
                    content: content,
                    status: status,
                    thumbnail: thumbnail
                }
            });

            return result;
        }
        catch (error)
        {
            throw error;
        }
    }

    async updatePost(slug, {title, content, thumbnail, status}){
        try {
            const result = await this.databases.updateDocument({
                databaseId: config.appWriteDatabaseId,
                collectionId: config.appWriteCollectionId,
                documentId: slug,
                data: {
                    title: title,
                    content: content,
                    thumbnail: thumbnail,
                    status: status
                },
            });

            return result;
        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument({
                databaseId: config.appWriteDatabaseId,
                collectionId: config.appWriteCollectionId,
                documentId: slug
            })

            return true;
        } catch (error) {
            console.log("delete document error", error);
            return false;
        }
    }

    async getPost(slug){
        try {
            const result = await this.databases.getDocument({
                databaseId: config.appWriteDatabaseId,
                collectionId: config.appWriteCollectionId,
                documentId: slug
            })

            return result;
        } catch (error) {
            throw error;
        }
    }

    async getPosts(queries = [Query.equal('status', true),]) {
        try {
            const result = await databases.listDocuments({
                databaseId: config.appWriteDatabaseId,
                collectionId: config.appWriteCollectionId,
                queries: queries,
            });

            return result;
        } catch (error) {
            throw error;
        }
    }
}

const databaseService = new Service();
export default databaseService;