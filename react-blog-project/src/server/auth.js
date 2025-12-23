import { Client, Account, ID } from "appwrite";
import config from "../../config/config.js";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appWriteEndPoint)
      .setProject(config.appWriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, userName }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        userName
      );

      if (userAccount) {
        return this.login({ email, password });
      }

      return userAccount;
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(
        email,
        password
      );
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      // IMPORTANT: 401 is normal if not logged in
      return null;
    }
  }
}

const authService = new AuthService();
export default authService;
