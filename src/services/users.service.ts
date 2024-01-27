import Users from "../entities/users";

class UsersService {
	async findAll() {
		return Users.findAll();
	}

	async findOne(id: string) {
		const data = await Users.findOne(id);
		return data;
	}


	async createOne(username: string, password: string) {
		return Users.createOne(username, password);
	}

	async update(id: string, username: string) {
		return Users.updateOne(id, username);
	}

	async delete(id: string) {
		return Users.deleteOne(id);
	}

	async findOneByUsername(username: string) {
		return Users.findOneByUsername(username);
	} 
}

export default new UsersService();
