/* eslint-disable @typescript-eslint/ban-types */
import { Schema, model, Model } from "mongoose";
import { Logger } from "sitka";
import uuid from "node-uuid";

class ConversationUsers {
	private _logger: Logger;
	private schema: Schema;
	private entity: Model<ConversationUsers> | undefined;
	// Interface
	public id!: string;
	public conversationId!: string;
	public userId!: string;
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
			conversationId: {
				type: String,
			},
			userId: {
				type: String,
			},
			createdAt: {
				type: Date,
				default: Date.now,
			},
		})
	}

	findAll() {
		return this.entity?.find().skip(0).limit(10);
	}

	async createConversationUsers(conversationId: string, userId: string) {
		return this.entity?.create({ conversationId: conversationId, userId: userId });
	}

	async initModel() {
		this._logger.log("Init ConversationUsers model");
		this.entity = model<ConversationUsers>("ConversationUsers", this.schema);
	}

	async getAllConversationIds (userId: string) {
		return await this.entity?.find({ userId: userId })
	}
}

export default new ConversationUsers();