export interface RequestOptions {
	method?: "GET" | "POST" | "PUT" | "DELETE";
	path?: string;
	body?: string;
	headers?: Record<string, string>;
}