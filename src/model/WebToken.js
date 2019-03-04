import axios from "axios"
import Config from '../config'

export default class WebToken {
    static async getFromServer() {
        var params = new URLSearchParams();
        params.append('username', 'interfaceuser');
        params.append('password', 'interfaceuser123');
        return await axios.post(Config.webTokenUrl, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }
}