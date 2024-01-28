import { Router } from "express";
import ConversationController from "../controllers/conversation.controller";
import AppMiddleWare from "../middlewares/appmiddlewares";

class ConversationRouter {
	private conversationRouter: Router;
	private path: string;
	constructor() {
		this.conversationRouter = Router();
		this.path = ConversationController.path;
	}

	initRouter() {
		this.conversationRouter.get(this.path, AppMiddleWare.authenticationMiddleware, ConversationController.findAll );
		this.conversationRouter.get(this.path + "/:id", AppMiddleWare.authenticationMiddleware, ConversationController.findAllConversationByUserId );
		this.conversationRouter.post(this.path, AppMiddleWare.authenticationMiddleware, ConversationController.createConversation );
		return this.conversationRouter;
	}
}

export default new ConversationRouter();