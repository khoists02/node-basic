import { Db } from "mongodb"
import { MigrationInterface } from "mongo-migrate-ts";

export class Migration1706329667694 implements MigrationInterface {
	public async up(db: Db): Promise<void> {
		await db.createCollection("users");
	}

	public async down(db: Db): Promise<void> {
		await db.dropCollection("users");
	}
}
