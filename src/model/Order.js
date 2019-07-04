import axios from "axios"
import Config from '../config'

export default class Order {

    static async postOrder(order) {
        return await axios.post(Config.postOrder, order);
    }

    static async getProductsInfoByUser(userId) {
        return await axios.get(Config.getProductsInfoByUser + userId);
    }

    static async getById(id) {
        return await axios.get(Config.getOrderByIdUri + id);
    }

    static async getTodayOrdersByUserId(userId) {
        return await axios.get(Config.getTodayOrderByUserIdUri + userId);

    }

    static async getOrdersByUserId(userId,orderStatusStr,currentPage) {
        return await axios.get(Config.getOrdersByUserIdUri+userId+"/"+orderStatusStr+"/"+currentPage);
    }

    static async getAwaitOrders() {
        return await axios.get(Config.getAwaitOrdersUri);
    }

    static async orderTaking(userId, orderId) {
        return await axios.post(Config.orderTakingUri + userId + "/" + orderId);
    }

    static async getHandlesByOrderId(orderId) {
        return await axios.get(`${Config.getHandlesByOrderIdUri}${orderId}`);
    }

    static async cancelOrder(orderId) {
        await axios.post(`${Config.deleteOrderUri}${orderId}`);
    }

    static async finishService(orderId, userId) {
        await axios.post(`${Config.finishOrderUri}?orderId=${orderId}&userId=${userId}`);
    }
}
