/* eslint-disable @typescript-eslint/ban-types */
import { Schema, model, Model } from "mongoose";
import { Logger } from "sitka";
import uuid from "node-uuid";

class Conversation {
	private _logger: Logger;
	private schema: Schema;
	private entity: Model<Conversation> | undefined;
	// Interface
	public id!: string;
	public name!: string;
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
			name: {
				type: String,
			},
			createdAt: {
				type: Date,
				default: Date.now,
			},
		})
	}

	async findAll() {
		return this.entity?.find().skip(0).limit(10);
	}

	async getConversationByIds(ids: string[]) {
		return await this.entity?.find({ _id: { $in: ids } });
	}

	async createConversation(name: string) {
		const data = await this.entity?.create({
			name: name,
		});
		return data;
	}

	async initModel() {
		this._logger.log("Init Conversation model");
		this.entity = model<Conversation>("Conversation", this.schema);
	}
}

export default new Conversation();