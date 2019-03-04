<template>
  <q-layout view="lHh Lpr lFf" loading="true">
    <q-page-container>
      <router-view/>
    </q-page-container>

      <footer>
        <nav class="nav">
          <ul>
            <li :class="{current: router[0].isActive}">
              <a @click="route(0)">
                <span></span>
                <strong>{{router[0].text}}</strong>
              </a>
            </li>
            <li :class="{current: router[1].isActive}">
              <a @click="route(1)">
                <span></span>
                <strong>{{router[1].text}}</strong>
              </a>
            </li>
            <li :class="{current: router[2].isActive}">
              <a @click="route(2)">
                <span></span>
                <strong>{{router[2].text}}</strong>
              </a>
            </li>
          </ul>
        </nav>
      </footer>
  </q-layout>
</template>

<script>
import Config from "../config";
import WebToken from "../model/WebToken";

export default {
  name: "LayoutDefault",
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      router: [
        { path: "/default/home", text: "主页", isActive: true },
        { path: "/default/CustomerOrders", text: "服务", isActive: false },
        { path: "/default/My", text: "我的", isActive: false }
      ]
    };
  },
  methods: {
    route(index) {
      this.$router.push(this.router[index].path);
      this.router.forEach(o => {
        o.isActive = false;
      });
      this.router[index].isActive = true;
      this.$store.commit("updateRouter", this.router);
    }
  },
  mounted() {
    if (this.$store.state.user.personType === "1") {
      this.router = [
        { path: "/default/supplierHome", text: "首页", isActive: true },
        { path: "/default/supplierOrderList", text: "订单", isActive: false },
        { path: "/default/my", text: "我的", isActive: false }
      ];
    }
    this.$store.commit("updateRouter", this.router);
    this.$router.push(this.router[0].path);
  }
};
</script>

<style>
</style>
