import ApplicationException from "./application.exception";
import { Response } from "express";

class UnAuthorizeException extends ApplicationException{
	constructor(response: Response, errorMessage?: string, statusCode?: number, code?: number) {
		super(response, errorMessage = "UnAuthorizeException" || errorMessage, statusCode = 403 || statusCode, code);
	}
}

export default UnAuthorizeException;