/* eslint-disable @typescript-eslint/ban-ts-comment */
import Conversation from "../entities/conversation";
import ConversationUsers from "../entities/conversation_user";
import { Request, Response } from "express";
import ApplicationException from "../exceptions/application.exception";
import ObjectMapper, { IObjectKeyMap } from "../middlewares/mapper";

const MAPPER: Array<IObjectKeyMap> = [{ from: "_id", to: "id" }, { from: "name", to: "name" }];

class ConversationController {
	public path: string;

	constructor() {
		this.path = "/conversations";
	}

	async findAll(request: Request, response: Response) {
		try {
			const data = await Conversation.findAll();
			return response.status(200).json({
				data,
			});
		} catch (error) {
			// @ts-ignore
			return new ApplicationException(response, error["message"]).handler();
		}
	}

	async createConversation(request: Request, response: Response) {
		try {
			const { name } = request.body;
			const conversation: typeof Conversation = await Conversation.createConversation(name);
			console.log({ conversation });
			if (conversation && request.headers["userid"]) {
				// @ts-ignore
				await ConversationUsers.createConversationUsers(conversation["_id"] as string, request.headers["userid"] as string)
			}
			return response.status(201)
			// @ts-ignore
				.json({ message: "Create conversation success", conversationId: conversation["_id"], userId: request.headers["userid"] as string })
		} catch (error) {
			return new ApplicationException(response).handler();
		}
	}

	async findAllConversationByUserId(request: Request, response: Response) {
		const { id } = request.params;
		try {
			let conversationIds: string[] = [];
			const conversations = await ConversationUsers.getAllConversationIds(id);
			if (conversations) {
				conversationIds = conversations.map((x) => x["conversationId"]);
			}
			const dataRes = await Conversation.getConversationByIds(conversationIds);
			return response.status(200).json({ data: dataRes.map((t) => {
				return new ObjectMapper(t, MAPPER).toJson();
			}) });
		} catch (error) {
			return new ApplicationException(response).handler();
		}
	}
}

export default new ConversationController();