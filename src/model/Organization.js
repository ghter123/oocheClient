import Config from '../config';
import axios from 'axios';

export default class Organization {
    static async get(userId) {
        return await axios.get(`${Config.getCars}${userId}`);
    }
}