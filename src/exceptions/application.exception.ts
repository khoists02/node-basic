import { Response } from "express";

class ApplicationException {
	public statusCode = 500;
	public code: number | undefined;
	public errorMessage = "Internal Server Error.";
	public response: Response;

	constructor(response: Response, errorMessage?: string, statusCode?: number, code?: number) {
		this.code = code;
		this.statusCode = statusCode || 500;
		this.errorMessage = errorMessage || "Internal Server Error.";
		this.response = response;
	}

	public handler() {
		return this.response.status(this.statusCode).json({
			message: this.errorMessage,
			code: this.code ? this.code : this.code,
			statusCode: this.statusCode,
		})
	}

}

export default ApplicationException;