import Config from '../config';
import axios from 'axios';

export default class Product {
    static async getByUser(userId) {
        return await axios.get(`${Config.getProductsByUserUri}${userId}`);
    }

    static async getAwaitAmount(userId) {
        return await axios.get(`${Config.remainReserveAmountUri}${userId}`);
    }
}