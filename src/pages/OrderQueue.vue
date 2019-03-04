<template>
  <q-page>
    <div class="weui-panel weui-panel_access">
      <div class="weui-panel__hd">
        待服务的订单
        <button class="weui-form-preview__btn weui-form-preview__btn_primary float-right" @click="orderTaking">接单</button>
      </div>
      <div class="weui-panel__bd" v-for="order in orders" :key="order.id">
          <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">
              <div class="weui-media-box__hd">
                  <img class="weui-media-box__thumb" :src="order.user.headimgurl" alt="">
              </div>
              <div class="weui-media-box__bd">
                  <h4 class="weui-media-box__title">{{order.product.productDesc}}</h4>
                  <p class="weui-media-box__desc">{{`${order.vehicle.model}${order.vehicle.carNum}停在${order.order.parkNo} 车主:${order.user.nickname} ${order.user.mobilePhone}`}}</p>
              </div>
          </a>
      </div>
    </div>

  </q-page>
</template>

<script>
import Order from "../model/Order";
import _ from "lodash";

export default {
  data() {
    return {
      orders: []
    };
  },
  methods: {
    async orderTaking() {
      this.$q.loading.show();
      try {
        await Order.orderTaking(this.$store.state.user.id);
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
      this.$q.loading.hide();
      await this.reloadOrders();
    },
    async reloadOrders() {
      this.$q.loading.show();
      try {
        this.orders = await Order.getAwaitOrders();
      } catch (error) {
        this.$q.notify({
          type: "negative",
          message: error.message,
          position: "top",
          timeout: 1000
        });
      }
      this.$q.loading.hide();
    }
  },
  async mounted() {
    await this.reloadOrders();
  }
};
</script>

<style>
</style>