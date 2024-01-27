import ApplicationException from "./application.exception";
import { Response } from "express";

class UnAuthenticateException extends ApplicationException{
	constructor(response: Response, errorMessage?: string, statusCode?: number, code?: number) {
		super(response, errorMessage = errorMessage || "UnAuthenticateException", statusCode = 401 || statusCode, code);
	}
}

export default UnAuthenticateException;