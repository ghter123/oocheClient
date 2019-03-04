<template>
  <q-page padding>
    <div>
      <article class="homeHead">
        <img class="oneBanner" src="../statics/image/banner_home.png" alt>

        <section class="notice">
          <ul class="animal">
            <li>
              <a>
                <strong>通知1</strong>
                <b>锦囊</b> | 一文读懂！ 小孩儿买保险有哪些要诀？
              </a>
            </li>
            <li>
              <a>
                <strong>公告2</strong>
                <b>最新</b> 随车甘雨，包括服务内容和服务次数。
              </a>
            </li>
            <li>
              <a>
                <strong>最新消息3</strong> 深圳市乐乐网络科技旗下，哦哦洗车正式上线运营！欢迎大家登陆使用！
              </a>
            </li>
            <li>
              <a>
                <strong>行业动态4</strong>
                <b>最全</b> | 洗车行业前景广阔
              </a>
            </li>
          </ul>
        </section>
      </article>

      <h1>今日订单列表</h1>
      <div class="content">
        <div class="box" v-for="order in orders" :key="order.orderId">
          <div class="boxContent">
            <h2>
              <strong>{{order.plateNumber}}</strong>
              <i>{{order.orderCode}}</i>
            </h2>
            <time>
              服务时间：{{order.orderTime}}
              <!-- 服务时间：{{order.orderTime | yearFormat}}
              <i>{{order.orderTime | timeFormat}}</i> -->
            </time>
            <cite>
              车位号：{{order.parkNo}}
              <a :class="order.class">{{order.statusName}}</a>
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

export default {
  name: "SupplierHome",
  data() {
    return {
      orders: []
    };
  },
  methods: {
    async reloadOrders() {
      try {
        const orders = await Order.getTodayOrdersByUserId(
          this.$store.state.user.id
        );
        this.orders = _.map(orders, o => {
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
              o.class = "inHand";
          }
          return o;
        });
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
    await this.reloadOrders();
  }
};
</script>
