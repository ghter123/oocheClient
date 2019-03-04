<template>
  <q-page padding>
    <div>
      <div class="faciltaSlideWrap">
        <ul class="faciltaSlide">
          <li :class="{'current':awaitOrderTab}" @click="changeTab(true)">待服务</li>
          <li :class="{'current':!awaitOrderTab}" @click="changeTab(false)">我的订单</li>
        </ul>
      </div>
      <div class="faciltaSlideIn">
        <div class="content" v-show="awaitOrderTab">
          <div class="box" v-for="awaitOrder in awaitOrders" :key="awaitOrder.orderId">
            <div class="boxContent">
              <h2>
                <strong>{{awaitOrder.plateNumber}}</strong>
                <i>订单号：{{awaitOrder.orderCode}}</i>
              </h2>
              <time>
                服务时间：{{awaitOrder.orderTime}}
                <!-- 服务时间：{{awaitOrder.orderTime | yearFormat}}
                <i>{{awaitOrder.orderTime | timeFormat}}</i>-->
              </time>
              <cite>
                车位号：{{awaitOrder.parkNo}}
                <a class="inHand" @click="postOrder(awaitOrder.orderId)">接单</a>
              </cite>
            </div>
          </div>
        </div>

        <div class="content" v-show="!awaitOrderTab">
          <div class="box" v-for="myOrder in myOrders" :key="myOrder.orderId">
            <div class="boxContent">
              <h2>
                <strong>{{myOrder.plateNumber}}</strong>
                <i>订单号：{{myOrder.orderCode}}</i>
                <a
                  class="scanHand scanQRCode"
                  v-if="myOrder.scanAble"
                  @click="scan(myOrder.orderId)"
                ></a>
              </h2>
              <time>
                服务时间：{{myOrder.orderTime}}
                <!-- 服务时间：{{awaitOrder.orderTime | yearFormat}}
                <i>{{awaitOrder.orderTime | timeFormat}}</i>-->
              </time>
              <cite>
                车位号：{{myOrder.parkNo}}
                <a
                  v-if="myOrder.statusName!=='已完成'"
                  class="on-left"
                  style="position: relative;right:-80px;top:2px;color: #6ea3fb; border:1px solid #6ea3fb; border-radius: 100px; padding: 5px 12px; font-size: 12px; line-height: 14px;"
                  @click="finishService(myOrder.orderId)"
                >结束服务</a>
                <a :class="myOrder.class">{{myOrder.statusName}}</a>
              </cite>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import Order from "../model/Order";
import config from "../config";
import InitJssdk from "../model/InitJssdk";
import SignatureInfo from "../model/SignatureInfo";
import { date } from "quasar";
import axios from "axios";

export default {
  name: "SupplierOrderList",
  data() {
    return {
      awaitOrders: [],
      myOrders: [],
      awaitOrderTab: true
    };
  },
  methods: {
    async reloadAwaitOrders() {
      this.awaitOrders = await Order.getAwaitOrders();
    },
    async reloadMyOrders() {
      const orders = await Order.getOrdersByUserId(this.$store.state.user.id);
      this.myOrders = _.map(orders, o => {
        o.scanAble = false;
        switch (o.statusName) {
          case "已取消":
          case "已完成":
          case "待取车":
            o.class = "finishHand";
            break;
          case "已预约":
          case "待接单":
            o.class = "noInHand";
            break;
          default:
            o.scanAble = true;
            o.class = "inHand";
        }
        return o;
      });
    },
    async review() {
      try {
        await this.reloadAwaitOrders();
        await this.reloadMyOrders();
      } catch (error) {
        this.$q.notify({
          type: "negative",
          message: error.message,
          position: "top",
          timeout: 1000
        });
      }
    },
    async postOrder(orderId) {
      this.$q.loading.show();
      try {
        await Order.orderTaking(this.$store.state.user.id, orderId);
        this.$q.notify({
          type: "secondary",
          message: "接单成功",
          position: "top"
        });
      } catch (error) {
        this.$q.notify({
          type: "negative",
          message: error.message,
          position: "top",
          timeout: 1000
        });
      }
      await this.review();
      this.$q.loading.hide();
    },
    async scan(orderId) {
      let signatureInfo;
      try {
        signatureInfo = await SignatureInfo();
      } catch (error) {
        this.$q.notify({
          type: "negative",
          message: error.message,
          position: "top",
          timeout: 1000
        });
      }

      let wx = await InitJssdk({
        debug: false,
        appId: signatureInfo.appId_,
        timestamp: signatureInfo.timestamp_,
        nonceStr: signatureInfo.noncestr_,
        signature: signatureInfo.signature_,
        jsApiList: ["scanQRCode"]
      });

      const scanResult = await new Promise((resolve, reject) => {
        wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
          success: o => resolve(o.resultStr),
          fail: o => reject(o)
        });
      });

      this.$q.loading.show();
      try {
        await this.$axios.post(
          `${scanResult}?userId=${this.$store.state.user.id}&orderId=${orderId}`
        );
      } catch (error) {
        this.$q.notify({
          type: "negative",
          message: error.message,
          position: "top",
          timeout: 1000
        });
      }
      await this.review();
      this.$q.loading.hide();
    },
    async finishService(orderId) {
      this.$q.loading.show();
      try {
        await Order.finishService(orderId, this.$store.state.user.id);
      } catch (error) {
        this.$q.notify({
          type: "negative",
          message: error.message,
          position: "top",
          timeout: 1000
        });
      }
      await this.review();
      this.$q.loading.hide();
    },
    changeTab(awaitOrder) {
      this.awaitOrderTab = awaitOrder;
    }
  },
  filters: {
    yearFormat: o => o && date.formatDate(o, "YYYY年MM月DD日"),
    timeFormat: o => o && date.formatDate(o, "HH:mm:ss")
  },
  async mounted() {
    await this.review();
  }
};
</script>