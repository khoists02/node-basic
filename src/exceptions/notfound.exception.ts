import ApplicationException from "./application.exception";
import { Response } from "express";

class NotFoundException extends ApplicationException{
	constructor(response: Response, errorMessage?: string, statusCode?: number, code?: number) {
		super(response, errorMessage = "Not Found." || errorMessage, statusCode = 400 || statusCode, code);
	}
}

export default NotFoundException;