/* eslint-disable @typescript-eslint/no-unused-vars */
export const createCsrfToken = (): Promise<string> => {
	return new Promise((rs, _rj) => {
		setTimeout(() => {
			rs(random(30))
		}, 1);
	})
}

const random = (length: number): string => {
	let result = "";
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const charactersLength = characters.length;
	let counter = 0;
	while (counter < length) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
		counter += 1;
	}
	return result;
}