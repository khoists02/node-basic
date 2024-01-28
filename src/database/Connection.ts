import mongoose, { ConnectOptions } from "mongoose";
import Users from "../entities/users";
import Messages from "../entities/messages";
import Conversation from "../entities/conversation";
import ConversationUsers from "../entities/conversation_user";

class Connection {
	private connectionUrl: string;

	private options: ConnectOptions;

	constructor() {
		this.connectionUrl = process.env.MONGODB_URL || "mongodb://localhost:27017";
		this.options = {
			dbName: "wealth"
		}
	}

	async connect() {
		console.log("Database connecting...", this.options);
		return mongoose.connect(this.connectionUrl, this.options);
	}

	async initTable() {
		await Users.initModel();
		await Messages.initModel();
		await Conversation.initModel();
		await ConversationUsers.initModel();
	}
}

export default new Connection();