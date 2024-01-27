/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Logger } from "sitka";
import UsersService from "../services/users.service";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import NotFoundException from "../exceptions/notfound.exception";
import ApplicationException from "../exceptions/application.exception";
import ObjectMapper, { IObjectKeyMap } from "../middlewares/mapper";

const MAPPER: Array<IObjectKeyMap> = [{ from: "_id", to: "id" }, { from: "username", to: "username" }];

class UserController {
	// @ts-ignore
	private _logger: Logger;
	public path: string;

	constructor() {
		this._logger = Logger.getLogger({ name: UserController.name });
		this.path = "/users";
	}

	async get(request: Request, response: Response) {
		try {
			// this._logger?.log({ name: UserController.name, headers: request.headers });
			const data = await UsersService.findAll();
			return response.status(200).json({
				content: data?.map((dt) => {
					return new ObjectMapper(dt, MAPPER).toJson()
				}),
			});
		} catch (error) {
			// this._logger?.log({ name: UserController.name, error });
			// @ts-ignore
			return new ApplicationException(response, error["message"]).handler();
		}
		
	}

	async getDetails(request: Request, response: Response) {
		const id = request.params.id as unknown as string;
		try {
			// this._logger?.log({ name: UserController.name, headers: request.headers });
			if (!id) return new NotFoundException(response).handler();
			const data = await UsersService.findOne(id);
			if (!data) return new NotFoundException(response).handler();
			return response.status(200).json(new ObjectMapper(data, MAPPER).toJson());
		} catch (error) {
			// this._logger?.log({ name: UserController.name, error });
			// @ts-ignore
			return new ApplicationException(response, error["message"]).handler();
		}
	}

	async put(request: Request, response: Response) {
		const id = request.params.id as unknown as string;
		try {
			// this._logger?.log({ name: UserController.name, headers: request.headers });
			if (!id) return response.status(400).json({ message: "Resource not found." })
			await UsersService.update(id, request.body.username);
			return response.status(200).json({
				message: "Update success" ,
			});
		} catch (error) {
			// this._logger?.log({ name: UserController.name, error });
			// @ts-ignore
			return new ApplicationException(response, error["message"]).handler();
		}
	}

	async post(request: Request, response: Response) {
		try {
			const { username, password } = request.body;
			const passwordSalt = await bcrypt.genSalt(10);
			const passwordEncrypt = await bcrypt.hash(password, passwordSalt);

			await UsersService.createOne(username, passwordEncrypt);
			return response.status(201).json({
				message: "success"
			});
		} catch (error) {
			// this._logger?.log({ name: UserController.name, error });
			// @ts-ignore
			return new ApplicationException(response, error["message"]).handler();
		}
		
	}

	async delete(request: Request, response: Response) {
		const id = request.params.id as unknown as string;
		try {
			// this._logger?.log({ name: UserController.name, headers: request.headers });
			if (!id) response.status(400).json({ message: "Resource not found." })
			await UsersService.delete(id);
			return response.status(200).json({
				message: "Delete success" ,
			});
		} catch (error) {
			// this._logger?.log({ name: UserController.name, error });
			// @ts-ignore
			return new ApplicationException(response, error["message"]).handler();
		}
	}
}

export default new UserController();
