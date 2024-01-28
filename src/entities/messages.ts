/* eslint-disable @typescript-eslint/ban-types */
import { Schema, model, Model } from "mongoose";
import { Logger } from "sitka";
import uuid from "node-uuid";

class Messages {
	private _logger: Logger;
	private schema: Schema;
	private entity: Model<Messages> | undefined;
	// Interface
	public id!: string;
	public conversationId!: string;
	public userId!: string;
	public mediaUrl!: string;
	public text!: string;
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
			user_id: {
				type: String,
			},
			conversation_id: String,
			text: String,
			media_url: String,
			createdAt: {
				type: Date,
				default: Date.now,
			},
		})
	}

	findAll(userId: string) {
		return this.entity?.find({ userId: userId });
	}

	async initModel() {
		this._logger.log("Init Messages model");
		this.entity = model<Messages>("Messages", this.schema);
	}
}

export default new Messages();