import { Router } from "express";
import UserRouter from "./user.router";
import ConversationRouter from "./conversation.router";
import MessageRouter from "./message.router";
import AppMiddleware from "../middlewares/appmiddlewares";
import CsrfController from "../controllers/csrf.controller";
import AuthController from "../controllers/auth.controller";
import AppMiddleWare from "../middlewares/appmiddlewares";

class AppRouter {
	private appRouter: Router;
	public pathPrefix: string;
	constructor() {
		this.appRouter = Router();
		this.pathPrefix = "/api/v1"
	}

	initRoutes() {
		this.appRouter.post(this.pathPrefix + CsrfController.path, CsrfController.post); // don't allow csrf
		this.appRouter.post(this.pathPrefix + AuthController.path + "/login", AppMiddleWare.csrfMiddleware, AppMiddleWare.bodyMiddlewareHandler, AuthController.post); // don't allow csrf 
		this.appRouter.post(this.pathPrefix + AuthController.path + "/logout", AppMiddleWare.csrfMiddleware, AppMiddleWare.authenticationMiddleware, AuthController.logout); // don't allow csrf for auth methods
		this.appRouter.use(this.pathPrefix, AppMiddleware.csrfMiddleware, UserRouter.initUserRouter() );
		this.appRouter.use(this.pathPrefix, AppMiddleware.csrfMiddleware, ConversationRouter.initRouter() );
		this.appRouter.use(this.pathPrefix, AppMiddleware.csrfMiddleware, MessageRouter.initRouter() );
		return this.appRouter;
	}
}

export default new AppRouter();