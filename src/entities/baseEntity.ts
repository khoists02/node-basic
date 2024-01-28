/* eslint-disable @typescript-eslint/ban-types */
import { Model, Schema, model } from "mongoose";
import uuid from "node-uuid";

class BaseEntity<T> {
	public schema: Schema;
	public entity: Model<T>;
	public tableName: string;

	constructor(tableName: string) {
		this.tableName = tableName;
		this.schema = new Schema({
			_id: {
				type: String, default: function genUUID() {
					return uuid.v4();
				} 
			},
		});
		this.entity = model<T>(this.tableName, this.schema);
	}

}

export default BaseEntity