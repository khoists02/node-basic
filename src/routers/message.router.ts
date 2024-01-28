import { Router } from "express";
import MessageController from "../controllers/message.controller";
import AppMiddleWare from "../middlewares/appmiddlewares";

class MessageRouter {
	private messageRouter: Router;
	private path: string;
	constructor() {
		this.messageRouter = Router();
		this.path = MessageController.path;
	}

	initRouter() {
		this.messageRouter.get(this.path, AppMiddleWare.authenticationMiddleware, MessageController.findAllMessagesByUser );
		return this.messageRouter;
	}
}

export default new MessageRouter();