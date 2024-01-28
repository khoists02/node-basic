/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UnAuthenticateException from "../exceptions/unauthenticate.exception";
import ApplicationException from "../exceptions/application.exception";
import NotFoundException from "../exceptions/notfound.exception";
import UnAuthorizeException from "../exceptions/unauthorize.exception";

const CSRF_URLS_IGNORE: string[] = [];

class AppMiddleWare {
	async bodyMiddlewareHandler(request: Request, response: Response, next: NextFunction) {
		const allowMethods = ["PUT", "POST"];
		const body = request.body;
		const keys = Object.keys(body);
		if (keys.length === 0 && allowMethods.includes(request.method)) {
			return new ApplicationException(response, "Body should not be empty for post or put request.", 422).handler()
		}
		return next()
	}

	async csrfMiddleware(request: Request, response: Response, next: NextFunction) {
		const allowCsrfMethods = ["POST", "PUT"];
		console.log("CSRF HIT....");
		const cookies = request.headers.cookie ? request.headers.cookie.split(",").map((x) => {
			return x.split("=")
		}) : [];
		const hasIgnoreUrl = request.headers.origin  ? !CSRF_URLS_IGNORE.includes(request.headers.origin) : CSRF_URLS_IGNORE.length > 0;
		const hasCsrfToken = cookies.find((x) => x.includes("csrfToken"));
		const isHasCookieValue = cookies?.length > 0 && hasCsrfToken ? cookies[0][1]?.length > 0 : false; // should compare between csrf from client header and cookie.
		if (allowCsrfMethods.includes(request.method) && !hasIgnoreUrl) {
			console.log(isHasCookieValue);
			if (!isHasCookieValue) {
				return new UnAuthorizeException(response, "Method not allow.").handler()
			} else {
				return next();
			}
		}
		return next()
	}

	async detailsPathMiddlewareHandler(request: Request, response: Response, next: NextFunction, data: any) {
		const allowMethods = ["PUT", "DELETE", "GET"];
		const params = request.params;
		const keys = Object.keys(params);
		if (keys.includes("id") && allowMethods.includes(request.method)) {
			if (!data) {
				return new NotFoundException(response).handler();
			} else {
				return next()
			}
		}
		return next()
	}

	async authenticationMiddleware(request: Request, response: Response, next: NextFunction) {
		const cookies = request.headers.cookie?.split(";").map((x) => {
			return x.trim();
		});
		if (cookies && cookies?.length > 0) {
			try {
				const tokenCookie = cookies.find((x) => x.includes("localhost.token"));
				if (!tokenCookie)
					return new UnAuthenticateException(response, undefined, undefined, 1005).handler();
				const tokenValue = tokenCookie.split("=")[1];
				if (!tokenValue )
					return new UnAuthenticateException(response, undefined, undefined, 1005).handler();
				const decode = await jwt.verify(tokenValue.trim(), process.env.JWT_KEY_ACCESS || "");
				if (!decode)
					return new UnAuthenticateException(response, undefined, undefined, 1004).handler();
				const currentDate = new Date();
				const timeToSeconds = Math.round(currentDate.getTime() / 1000);
				// @ts-ignore
				if (timeToSeconds > decode["exp"])
					return new UnAuthenticateException(response, "Token is expired.", undefined, 1007).handler();
				
				return next();
			} catch (error) {
				// @ts-ignore
				return new ApplicationException(response, error["message"]).handler();
			}
		}
		return new UnAuthenticateException(response, undefined, undefined, 1007).handler();
	}
}

export default new AppMiddleWare();