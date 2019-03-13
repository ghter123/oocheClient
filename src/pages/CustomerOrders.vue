<template>
  <q-page padding>
    <div class="boxHtml">
      <h1>未完成订单</h1>
      <div class="content" v-if="runningOrder">
        <div class="box">
          <a @click="router">
            <div class="boxContent">
              <h2>
                <strong>{{runningOrder.plateNumber}}</strong>
                <i>订单号：{{runningOrder.orderCode}}</i>
              </h2>
              <time>
                服务时间：{{runningOrder.orderTime}}
                <!-- 服务时间：{{runningOrder.orderTime | yearFormat}}
                <i>{{runningOrder.orderTime | timeFormat}}</i>-->
              </time>
              <cite>
                车位号：{{runningOrder.parkNo}}
                <span>{{runningOrder.statusName}}</span>
              </cite>
            </div>
            <div class="course">
              <ul>
                <li class="waitLine"></li>
                <li
                  v-for="item in runningOrderStatusItem"
                  :key="item.statusName"
                  :class="item.class"
                >
                  <span></span>
                  <i></i>
                  <strong>{{item.statusName}}</strong>
                </li>
              </ul>
            </div>
          </a>
        </div>
      </div>
      <div class="line"></div>

      <h1>已完成订单</h1>
      <div class="content">
        <div class="box" v-for="item in finishedOrders" :key="item.orderId">
          <div class="boxContent">
            <h2>
              <strong>{{item.plateNumber}}</strong>
              <i>{{item.orderCode}}</i>
            </h2>
            <time>
              服务时间：{{item.orderTime}}
              <!-- 服务时间：{{runningOrder.orderTime | yearFormat}}
              <i>{{runningOrder.orderTime | timeFormat}}</i>-->
              <router-link :to="{ name: 'comment', params:item}">评价</router-link>
            </time>
            <cite>
              车位号：{{item.parkNo}}
              <span>{{item.statusName}}</span>
            </cite>
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
import { date } from "quasar";
import InitJssdk from "../model/InitJssdk";
import _ from "lodash";
import Config from "../config";
import SignatureInfo from "../model/SignatureInfo";

const statusDic = ["已预约", "待接单", "待洗车", "洗车中", "待取车", "已完成"];

export default {
  name: "PageIndex",
  data() {
    return {
      orders: []
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    runningOrder() {
      return _.find(
        this.orders,
        o => o.statusName !== "已取消" && o.statusName !== "已完成"
      );
    },
    runningOrderStatusItem() {
      var items = [];
      if (this.runningOrder) {
        items = _.map(statusDic, o => {
          return {
            statusName: o,
            class: ""
          };
        });
        const currentIndex = _.indexOf(statusDic, this.runningOrder.statusName);
        for (let i = 0; i <= currentIndex; i++) {
          items[i].class = i !== currentIndex ? "finish" : "current";
        }
      }
      return items;
    },
    finishedOrders() {
      return _.filter(
        this.orders,
        o => o.statusName === "已取消" || o.statusName === "已完成"
      );
    }
  },
  methods: {
    router() {},
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
            this.$q.dialog({
              title: "提示！",
              message: error.message
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
    }
  },
  filters: {
    yearFormat: o => o && date.formatDate(o, "YYYY年MM月DD日"),
    timeFormat: o => o && date.formatDate(o, "HH:mm:ss")
  },
  async created() {
    await this.reviewOrders();
  }
};
</script>