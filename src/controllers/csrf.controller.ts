import { createCsrfToken } from "../helpers";
import { Request, Response } from "express";

class CsrfController {
	public path: string;
	constructor() {
		this.path = "/csrf";
	}

	async post(request: Request, response: Response) {
		const cookieCsrf = await createCsrfToken();
		response.cookie("csrfToken",cookieCsrf, { maxAge: 900000, httpOnly: true });
		return response.status(201).json({ csrfToken: cookieCsrf });
	}
}

export default new CsrfController();