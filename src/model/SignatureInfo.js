import axios from "axios";
import Config from '../config';
import Store from '../store/index';

export default async function SignatureInfo() {
    let url ;
    const u = navigator.userAgent;
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
        url = window.encodeURIComponent(window.location.href.split("#")[0]);
    }
    if (isiOS) {
        url = window.encodeURIComponent(Store.state.entryUrl);
    }
    return await axios.post(Config.getOauthJssdkUrl + url);
}