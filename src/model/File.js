import axios from "axios";
import Config from '../config';

export default class File {

    static async uploadByWx(serverId) {
        return await axios.post(Config.postFileUri+serverId);
    }
}