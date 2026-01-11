
import axios from 'axios';
import type { Story } from '../types/story';

const baseUrl = 'http://localhost:3001/api/stories';

const getAll = (): Promise<Story[]> => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

export default { getAll }