import { Router } from "express";
import UserController from "../controllers/user.controller";
import AppMiddleWare from "../middlewares/appmiddlewares";

class UserRouter {
	private userRouter: Router;
	private pathDetails: string;
	private path: string;
	constructor() {
		this.userRouter = Router();
		this.path = UserController.path;
		this.pathDetails = UserController.path + "/:id";
	}

	initUserRouter() {
		this.userRouter.get(this.path, AppMiddleWare.authenticationMiddleware, UserController.get );
		this.userRouter.post(this.path, AppMiddleWare.bodyMiddlewareHandler, UserController.post );
		this.userRouter.get(this.pathDetails,UserController.getDetails );
		this.userRouter.put(this.pathDetails, AppMiddleWare.bodyMiddlewareHandler, UserController.put );
		this.userRouter.delete(this.pathDetails, UserController.delete );
		return this.userRouter;
	}
}

export default new UserRouter();