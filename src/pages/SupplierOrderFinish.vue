<template>
  <q-page padding>

    <main class="orderDetail">
      <div class="oneBannerWrap">
        <img class="oneBanner" src="../statics/image//banner_orderDetail.jpg" alt="">
        <a class="toComment" href="comment.html">评论</a>
      </div>

      <table>
        <tbody>
        <tr>
          <td>取钥匙</td>
          <td>2018-11-14<span>14:17:23</span></td>
        </tr>
        <tr>
          <td>服务商存钥匙</td>
          <td>2018-11-14<span>14:17:23</span></td>
        </tr>
        <tr>
          <td>停车位</td>
          <td>326</td>
        </tr>
        <tr>
          <td>完成服务</td>
          <td>2018-11-14<span>14:17:23</span></td>
        </tr>
        <tr>
          <td>服务商取钥匙</td>
          <td>2018-11-14<span>14:17:23</span></td>
        </tr>
        <tr>
          <td>存钥匙</td>
          <td>2018-11-14<span>14:17:23</span></td>
        </tr>
        <tr>
          <td>预约</td>
          <td>2018-11-14<span>14:17:23</span><br>XXXXXXXX</td>
        </tr>
        <tr>
          <td>客户的评价</td>
          <td><textarea placeholder="宝贝满足你的期待吗?说说你的使用心得，分享给他们呢吧！"></textarea></td>
        </tr>
        </tbody>
      </table>
    </main>

    <nav class="nav nav2">
      <ul>
        <li><a href="facilitatorHome.html"><span></span><strong>首页</strong></a></li>
        <li class="current"><a href="facilitatorOrderList.html"><span></span><strong>订单</strong></a></li>
        <li><a href="my.html"><span></span><strong>我的</strong></a></li>
      </ul>
    </nav>

    <div class="_tip noneEvent"></div>

  </q-page>
</template>

<style>
</style>

<script>

export default {
  name: "VueTemplate",
  data() {
    return {};
  },
  methods: {
  },
  async created() {
  }
};
</script>
