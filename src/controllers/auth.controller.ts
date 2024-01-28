/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from "express";
import UserService from "../services/users.service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApplicationException from "../exceptions/application.exception";

const comparePassword = (password: string, hashPassword: string) => {
	return bcrypt.compare(password, hashPassword);
};

class AuthController {
	public path: string;
	constructor() {
		this.path = "/auth";
	}


	async post(request: Request, response: Response) {
		try {
			const { username, password } = request.body;
			const user = await UserService.findOneByUsername(username);
			// @ts-ignore
			if (!user || !user?.password) return response.status(401).json({ message: "Invalid credentials." });
			// @ts-ignore
			const isMatchPassword = await comparePassword(password, user.password);
			if (!isMatchPassword) return response.status(401).json({ message: "Password invalid." });
			const token = jwt.sign({user}, process.env.JWT_KEY_ACCESS || "", { expiresIn: "1d" } );
			const tokenRefresh = jwt.sign({user}, process.env.JWT_KEY_REFRESH || "", { expiresIn: "12h" } );
			response.cookie("localhost.token", token , { maxAge: 900000, httpOnly: true });
			response.cookie("localhost.refresh", tokenRefresh , { maxAge: 900000, httpOnly: true });
			response.setHeader("userId", user["_id"]);
			await UserService.updateActivity(user["_id"] as string, false);
			return response.status(201).json({ username });
		} catch (error) {
			// @ts-ignore
			return new ApplicationException(response, error["message"]).handler();
		}
	}

	async logout(request: Request, response: Response) {
		response.cookie("localhost.token", "" , { maxAge: -1, httpOnly: true });
		response.cookie("localhost.refresh", "" , { maxAge: -1, httpOnly: true });
		if (request.headers["userid"])
			await UserService.updateActivity(request.headers["userid"] as string, true);
		return response.status(201).json({ "message": "Logout" });
	}


}

export default new AuthController();