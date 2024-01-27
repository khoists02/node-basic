/* eslint-disable no-mixed-spaces-and-tabs */
import express, { Express } from "express";
import appCors from "cors";
import DBConnect from "./database/Connection";
import AppRouter from "./routers/app.router";
import bodyParser from "body-parser";

class Main {
	private app: Express;
	constructor() {
		const jsonParser = bodyParser.json();
		this.app = express();
		// init middleware
		this.app.use(appCors());
		this.app.use(jsonParser);
		this.app.use(bodyParser.urlencoded({ extended: true }));
		// init routes
		this.app.use(AppRouter.initRoutes())
	}

	listen() {
		this.app.listen(3000);
	}
}

const mainThread = new Main();

DBConnect.connect().then(async () => {
	console.log("Connecting Success");
	await DBConnect.initTable();
	mainThread.listen();
}).catch((err) => {
	console.log("Connecting error", err);
	process.exit();
});

