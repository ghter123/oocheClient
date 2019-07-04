<template>
  <q-page>
    <div class="weui-form-preview q-mt-md" v-for="order in orders" :key="order.id">
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">车主信息：</label>
          <span class="weui-form-preview__value">{{order.user.nickname + userBrief}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">服务时间：</label>
          <span class="weui-form-preview__value">{{order.order.orderTime | dateFormat}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">车牌信息：</label>
          <span class="weui-form-preview__value">{{order.order.plateNumber}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">车辆位置：</label>
          <span class="weui-form-preview__value">{{order.order.parkNo}}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">备注信息：</label>
          <span class="weui-form-preview__value">微信下单</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">服务状态：</label>
          <span class="weui-form-preview__value">{{order.order.orderStatus | statusFormat}}</span>
        </div>
      </div>
      <div class="weui-form-preview__ft" v-if="showOperate(order.order.orderStatus)">
        <a
          v-if="showCancel(order.order.orderStatus)"
          class="weui-form-preview__btn weui-form-preview__btn_default"
          @click="cancel(order.order.id)"
        >取消订单</a>
        <button
          v-if="showScan(order.order.orderStatus)"
          class="weui-form-preview__btn weui-form-preview__btn_primary"
          @click="scan(order.order.id)"
        >{{order.order.orderStatus|scanButtonText}}</button>
      </div>
    </div>
  </q-page>
</template>

<script>
import Order from "../model/Order";
import { date } from "quasar";
import InitJssdk from "../model/InitJssdk";
import _ from "lodash";
import Config from "../config";
import SignatureInfo from "../model/SignatureInfo";

const status = {
  "-1": "已取消",
  "1": "已预约",
  "2": "待接单",
  "3": "待洗车",
  "4": "洗车中",
  "5": "待取车",
  "6": "已完成"
};

export default {
  data() {
    return {
      orders: []
    };
  },
  methods: {
    showDetail(id) {
      this.$router.push(`orderDetail/${id}`);
    },
    async cancel(id) {
      this.$q
        .dialog({
          title: "确认取消订单？",
          message: "订单将取消！",
          ok: "确认"
        })
        .then(async () => {
          this.$q.loading.show();
          try {
            await Order.cancelOrder(id);
            await this.reviewOrders();
          } catch (error) {
            this.$q.notify({
              type: "negative",
              message: error.message,
              position: "top",
              timeout: 1000
            });
          }
          this.$q.loading.hide();
        })
        .catch(error => {});
    },
    async reviewOrders() {
      try {
        this.orders = await Order.getOrdersByUserId(this.$store.state.user.id);
      } catch (error) {
        this.$q.notify({
          type: "negative",
          message: error.message,
          position: "top",
          timeout: 1000
        });
      }
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
          `${scanResult}/${this.$store.state.user.id}?orderId=${orderId}`
        );
      } catch (error) {
        this.$q.notify({
          type: "negative",
          message: error.message,
          position: "top",
          timeout: 1000
        });
      }
      this.$q.loading.hide();
    },
    showOperate(o) {
      return !!(o !== "-1" && o !== "6");
    },
    showCancel(o) {
      return !!(o === "1" && this.$store.state.user.personType === "2");
    },
    showScan(o) {
      const personType = this.$store.state.user.personType;
      return !!(
        (o === "1" && personType === "2") ||
        (o === "5" && personType === "2") ||
        (o === "3" && personType === "1") ||
        (o === "4" && personType === "1")
      );
    }
  },
  computed: {
    userBrief() {
      const user = this.$store.state.user;
      return ` ${user.mobilePhone}`;
    }
  },
  filters: {
    dateFormat: o => {
      return o;
      // return o && date.formatDate(o, "YYYY-MM-DD HH:mm");
    },
    statusFormat: o => {
      return status[o];
    },
    scanButtonText(o) {
      if (o === "1" || o === "4") return "扫一扫存钥匙";
      if (o === "3" || o === "5") return "扫一扫取钥匙";
      return "扫一扫";
    }
  },
  async mounted() {
    this.$q.loading.show();
    await this.reviewOrders();
    this.$q.loading.hide();
  }
};
</script>

<style>
</style>