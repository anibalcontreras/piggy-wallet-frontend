import axios from 'axios';
import { BASE_URL } from './constant';

export const axiosInstance = axios.create({ baseURL: BASE_URL });
