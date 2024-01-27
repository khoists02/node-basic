/* eslint-disable @typescript-eslint/ban-types */
import { Schema, model, Model } from "mongoose";
import { Logger } from "sitka";
import uuid from "node-uuid";

class Users {
	private _logger: Logger;
	private schema: Schema;
	private entity: Model<Users> | undefined;
	public username!: string;
	public password!: string;
	public save!: Function;
	public delete!: Function;

	constructor() {
		this._logger = Logger.getLogger({ name: this.constructor.name });
		this.schema = new Schema({
			_id: {
				type: String, default: function genUUID() {
					return uuid.v4();
				} 
			},
			username: String,
			password: String,
			birthday: String,
			createdAt: {
				type: Date,
				default: Date.now,
			},
		})
	}

	findAll() {
		return this.entity?.find();
	}

	findOne(id: string) {
		return this.entity?.findById(id);
	}

	findOneByUsername(username: string) {
		return this.entity?.findOne({ username: username });
	}

	createOne(username: string, pass: string) {
		console.log({ pass })
		this.entity?.create({
			username: username,
			password: pass,
		})
	}

	async updateOne(id: string, username: string) {
		const data: Users | null | undefined = await this.entity?.findById(id);
		if (data) {
			data.username = username;
			data.save();
		}
	}

	async deleteOne(id: string) {
		return this.entity?.deleteOne({ _id: id });
	}

	async initModel() {
		this._logger.log("init users model");
		this.entity = model<Users>("User", this.schema);
	}
}

export default new Users();