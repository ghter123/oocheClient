import wx from 'weixin-js-sdk';

export default async function InitJssdk(config) {
    return new Promise((resolve, reject) => {
        wx.config(config);
        wx.ready(() => resolve(wx));
        wx.error(o => reject(o));
    });
}