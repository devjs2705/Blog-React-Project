import { Client, Account, ID } from "appwrite";
import config from "../config/config.js";

class AuthService {
    client = new Client();
    account;

    AuthService()
    {
        this.client
        .setProject(config.appWriteProjectId)
        .setEndpoint(config.appWriteEndPoint);

        this.account = new Account(client);
    }

    async signUp({email, password, userName}){
        try {
            const userAccount = await account.create({
                userId: ID.unique(),
                email,
                password,
                userName
            });

            if(userAccount)
            {
                return this.login({email, password});
            }
            else
                return userAccount;
        } catch (error) {
            throw(error);
        }
    }

    async login({email, password}){
        try {
            const user = await account.createEmailPasswordSession({
            email,
            password
            });

            return user;
        } catch (error) {
            throw(error);
        }
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            throw(error);
        }
    }

    async getUser(){
        try {
            return await this.account.getUser();
        } catch (error) {
            throw(error);
        }
    }
}

const authService = new AuthService();
export default authService;