/* eslint-disable @typescript-eslint/ban-ts-comment */
// import Conversation from "../entities/conversation";
import Messages from "../entities/messages";
import { Request, Response } from "express";
import ApplicationException from "../exceptions/application.exception";
import ObjectMapper, { IObjectKeyMap } from "../middlewares/mapper";

const MAPPER: Array<IObjectKeyMap> = [{ from: "_id", to: "id" }];

class MessagesController {
	public path: string;

	constructor() {
		this.path = "/messages";
	}

	async findAllMessagesByUser(request: Request, response: Response) {
		try {
			const userId = request.headers["userid"] as string;
			const data = await Messages.findAll(userId);
			return response.status(200).json({ content: data.map((dt) => {
				return new ObjectMapper(dt, MAPPER).toJson();
			}) })
		} catch (error) {
			// @ts-ignore
			return new ApplicationException(response, error["message"]).handler();
		}
	}
}

export default new MessagesController();