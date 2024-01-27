import mongoose, { ConnectOptions } from "mongoose";
import Users from "../entities/users";

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
	}
}

export default new Connection();