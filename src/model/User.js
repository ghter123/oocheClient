import axios from 'axios'
import Config from '../config'
import _ from 'lodash'

export default class User {
    static async getByWXCode(code) {
        return await axios.get(Config.getUserInfoByCodeUri + code);
    }

    static async updateOrInsert(user) {
        return this.standard(await axios.post(Config.postUserUri, user));
    }

    static async getRegisterCode(tel) {
        await axios.post(Config.getRegisterCodeUri + tel);
    }

    static async getUserByOpenId(openid) {
        return this.standard(await axios.get(Config.getUserInfoByCodeUri + openid));
    }

    static async getUserInfo(id) {
        const userInfo = await axios.get(Config.getUserInfo + id);
        userInfo.sex = userInfo.sex === '2' ? '2' : '1';
        return userInfo;
    }

    static async updateUserInfo(user) {
        return await axios.put(Config.updateUserInfo, user);
    }

    static standard(user) {
        user.vehicles = _.isEmpty(user.vehicles) ? null : JSON.parse(user.vehicles);
        return user;
    }

}