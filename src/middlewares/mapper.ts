/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

export interface IObjectKeyMap {
  from: string;
  to: string;
}

class ObjectMapper {
	private keys: Array<IObjectKeyMap>; // Keys mapping
	private data: any;

	constructor(data: any, keys: Array<IObjectKeyMap>) {
		this.keys = keys;
		this.data = data;
	}

	public toJson() {
		if (this.keys.length > 0) {
			let obj = {};
			this.keys.forEach((k) => {
				// @ts-ignore
				obj = {...obj, [k.to]: this.data[k.from]}
			});
			return obj;
		}
		return this.data;
	}
}

export default ObjectMapper;