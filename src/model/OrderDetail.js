class OrderHandle {
	constructor(orderHandle) {
		this.orderStatus = orderDetail.orderStatus || '';//状态编码
		this.statusName = orderDetail.statusName || '';//状态名字
		this.userId = orderHandle.userId || '';//处理人ID
		this.userName = orderHandle.userName || '';//处理人名字
		this.userTel = orderHandle.userTel || '';//处理人电话
		this.dealAct = orderHandle.dealAct || '';//处理动作
		this.dealDesc = orderHandle.dealDesc || '';//处理描述
		this.photosAddress = orderDetail.photosAddress || [];//照片
		this.dealTime = orderHandle.dealTime || new Date(); //处理时间
	}
}

export default class OrderDetail {
	constructor(orderDetail) {
		this.orderId = orderDetail.orderId || '';//订单ID
		this.plateNumber = orderDetail.plateNumber || '';//车牌号
		this.parkNo = orderDetail.parkNo || '';//停车位
		this.parkPhoto = orderDetail.parkPhoto || '';  //停车照片
		this.handles = orderDetail.handles || []; //OrderHandle[]  处理动作
	}
	static getByOrderId(orderId) {
		return axios.get(`/jeecg/rest/order/${orderId}/detail`);
	}
}
