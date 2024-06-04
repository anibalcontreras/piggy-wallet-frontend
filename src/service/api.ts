import axios, { type AxiosRequestConfig, type AxiosInstance, type AxiosResponse } from 'axios';
import { BASE_URL } from './constant';

class HttpService {
  private readonly instance: AxiosInstance;
  private readonly defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  constructor() {
    this.instance = axios.create({ baseURL: BASE_URL });
  }

  setAuthorizationHeader(token: string | null): void {
    if (token != null) {
      this.defaultHeaders.Authorization = `Bearer ${token}`;
    } else {
      delete this.defaultHeaders.Authorization;
    }
  }

  async request(
    method: AxiosRequestConfig['method'],
    url: string,
    data: any = null,
    customHeaders: Record<string, string> = {}
  ): Promise<AxiosResponse> {
    const headers = { ...this.defaultHeaders, ...customHeaders };
    const config: AxiosRequestConfig = { method, url, headers };

    if (data != null) {
      config.data = data;
    }

    return await this.instance(config);
  }

  async get(url: string, customHeaders: Record<string, string> = {}): Promise<AxiosResponse> {
    return await this.request('get', url, null, customHeaders);
  }

  async post(
    url: string,
    data: any,
    customHeaders: Record<string, string> = {}
  ): Promise<AxiosResponse> {
    return await this.request('post', url, data, customHeaders);
  }

  async put(
    url: string,
    data: any,
    customHeaders: Record<string, string> = {}
  ): Promise<AxiosResponse> {
    return await this.request('put', url, data, customHeaders);
  }

  async delete(url: string, customHeaders: Record<string, string> = {}): Promise<AxiosResponse> {
    return await this.request('delete', url, null, customHeaders);
  }
}

const httpService = new HttpService();

export default httpService;
