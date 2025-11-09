import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const api = {
	get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
		const response: AxiosResponse<T> = await axios.get(url, config);
		return response.data;
	},
	post: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
		const response: AxiosResponse<T> = await axios.post(url, data, config);
		return response.data;
	},
	put: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
		const response: AxiosResponse<T> = await axios.put(url, data, config);
		return response.data;
	},
	patch: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
		const response: AxiosResponse<T> = await axios.patch(url, data, config);
		return response.data;
	},
	delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
		const response: AxiosResponse<T> = await axios.delete(url, config);
		return response.data;
	},
};
