import Config from '../config';
import axios from 'axios';

export default class Car {
    static async getByUser(userId) {
        return await axios.get(`${Config.getCars}${userId}`);
    }
    static async upsert(car){
        return await axios.post(`${Config.upsertCar}`,car);
    }
}