export default {
    // wxAuthUri:`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${'wxb3c62b26f2d93948'}&redirect_uri=${window.location.href.split("#")[0]}&response_type=code&scope=snsapi_base&state=STATE&connect_redirect=1#wechat_redirect`,
    wxNonSilentUri: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${'wxb3c62b26f2d93948'}&redirect_uri=${window.location.href.split("#")[0]}&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect`,
    webTokenUrl: "/jeecg/rest/tokens",
    getOauthCodeUrl: `/jeecg/rest/wxApiBaseController/getOauthCode`,
    getOauthJssdkUrl: `/jeecg/rest/wxSignController/wxSign?url_=`,
    getWxUserByCodeUri: '/jeecg/rest/wxApiBaseController/getOauthUserInfoByCode/',
    getUserInfoByCodeUri: '/jeecg/rest/wxApiBaseController/getUserInfoByOpenId/',

    getProductsInfoByUser: '/jeecg/rest/infaceBaseProductsController/',
    remainReserveAmountUri: '/jeecg/rest/orderController/getRemainReserveAmount/',
    postUserUri: '/jeecg/rest/registerController/postRegister/',
    getRegisterCodeUri: '/jeecg/rest/registerController/postRegisterSMS/',

    //订单相关
    postOrder: "/jeecg/rest/orderController/reserve",
    getProductsByUserUri: `/jeecg/rest/oocheProductController/getUserProductByUserId/`,
    getOrderByIdUri: `/jeecg/rest/orderController/getReservationOrderByOrderId/`,
    getOrdersByUserIdUri: `/jeecg/rest/orderController/getReservationOrderList/`,
    getTodayOrderByUserIdUri: '/jeecg/rest/orderController/getTodayReservationOrderList/',
    getAwaitOrdersUri: `/jeecg/rest/orderController/getAwaitQueueOrdersByStatus`,
    orderTakingUri: `/jeecg/rest/orderController/acceptReservationOrder/`,
    getHandlesByOrderIdUri: "/jeecg/rest/orderController/getAutoOrdersHandleByOrderId/",
    getProductsByParentIdUri: '/jeecg/rest/oocheProductController/getUserProducts/',
    deleteOrderUri: '/jeecg/rest/orderController/cancelReservationOrder/',
    finishOrderUri: '/jeecg/rest/orderController/finishOrder',

    //文件相关
    postFileUri: `/jeecg/rest/fileDealController/doMediaDown/`,

    //用户相关
    getCars:"/jeecg/rest/userVehicle/getCarList/",
    upsertCar:'/jeecg/rest/userVehicle/addOrModify',
    getUserInfo:'/jeecg/rest/user/get/',
    updateUserInfo:'/jeecg/rest/user/updateOrSave',
    rebindMobileUri: '/jeecg/rest/user/rebindMobile/'
}