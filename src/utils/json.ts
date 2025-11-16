import {decodeBase64, isBase64} from "./base64";

export function cleanJSON(obj: any): any {
	const keys = Object.keys(obj);
	for (const key of keys) {
		if (obj[key] && typeof obj[key] === 'object') {
			cleanJSON(obj[key]);
		} else if (obj[key] === undefined) {
			delete obj[key];
		}
	}
	return obj;
}

export function decodeBase64JSON(obj: any): any {
    const keys = Object.keys(obj);
    for (const key of keys) {
        if (obj[key] && typeof obj[key] === 'object') {
            decodeBase64JSON(obj[key]);
        } else if (typeof obj[key] === 'string') {
            if (isBase64(obj[key]))
                obj[key] = decodeBase64(obj[key]);
        }
    }
    return obj;
}