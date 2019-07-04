<template>
  <div>
    <div class="boxHtml">
      <h1>订单详情</h1>
      <div class="content">
        <div class="box">
          <div class="boxContent">
            <h2>
              <strong>{{order.plateNumber}}</strong>
              <i>订单号：{{order.orderCode}}</i>
            </h2>
            <time>
              服务时间：{{order.orderTime}}
              <!-- <i>14:7:23</i> -->
            </time>
            <cite>车位号：{{order.parkNo}}</cite>
          </div>
        </div>
      </div>
    </div>

    <div class="orderDetail">
      <table>
        <tbody>
          <tr v-for="handle in orderDetail.handles" :key="handle.statusName">
            <td>{{handle.dealAct}}</td>
            <td style="text-align:left">
              留言：{{handle.dealDesc}}
              <br>
              联系电话：{{handle.userTel}}
              <br>
              {{handle.dealTime}}
            </td>
            <td>
              <div
                class="img"
                v-for="photo in handle.photosAddress"
                :key="photo"
                :style="{backgroundImage:'url(' + photo + ')'}"
              ></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import OrderDetail from "../model/OrderDetail";

export default {
  data() {
    return {
      order: {},
      orderDetail: {}
    };
  },
  async mounted() {
    this.order = this.$route.params;
    try {
      this.orderDetail = await OrderDetail.getByOrderId(this.order.orderId);
    } catch (error) {
      this.$q.notify({
        type: "negative",
        message: error.message,
        position: "top",
        timeout: 1000
      });
    }
  }
};
</script>