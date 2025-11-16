export function isBase64(str: string): boolean {
    if (str.length % 4 !== 0) return false;
    return (/^[A-Za-z0-9+/]+={0,2}$/.test(str));
}

export function decodeBase64(base64String: string): string {
    return Buffer.from(base64String, 'base64').toString('utf-8');
}

export function encodeBase64(plainString: string): string {
    return Buffer.from(plainString, 'utf-8').toString('base64');
}
