<template>
  <q-page>
      <q-list highlight>
        <q-list-header>订单详情</q-list-header>

        <q-item>
          <q-item-side>
            <q-item-tile avatar>
              <img src="orderBrief.park_photo">
            </q-item-tile>
          </q-item-side>
          <q-item-main label="预约详情">
            <div class="row">
              <div>
                {{orderBrief.order_time}}
              </div>
            </div>
            <div class="row">
              <div>
                停车位:{{orderBrief.park_no}}
              </div>
            </div>
            <div class="row">
              <div>
                服务产品:{{orderBrief.product_name}}
              </div>
            </div>
            <div class="row">
              <div>
                备注:{{orderBrief.order_desc}}
              </div>
            </div>
          </q-item-main>
        </q-item>
        <q-item-separator />

        <q-item v-for="handle in orderHandles" :key="handle.id">
          <q-item-side>
          </q-item-side>
          <q-item-main :label="handle.deal_time">
            {{handle.deal_desc}}
          </q-item-main>
        </q-item>
      </q-list>
  </q-page>
</template>

<script>
import order from "../model/Order";
import _ from "lodash";

export default {
  data() {
    return {
      orderBrief: {},
      orderHandles: []
    };
  },
  methods: {},
  async mounted() {
    const orderId = this.$route.query.id;
    if (_.isNull(orderId)) return;
    this.orderBrief = await order.getById(orderId);
    this.orderHandles = await order.getHandlesByOrderId(orderId);
  }
};
</script>