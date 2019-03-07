import Config from '../config';
import axios from 'axios';

export default class Organization {
    static async getDepartInfos(userId) {
        const res = await axios.get(`/geecg/rest/user/getAllDept/${userId}`);
        return res && res.departInfo;
    }
}