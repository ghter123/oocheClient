<template>
  <q-page padding>

    <main>

      <!-- 有照片上传 -->
      <form class="facilitatorForm" action="facilitatorOrderFinish.html" method="post" enctype="multipart/form-data">
        <div class="portrait" style="background-image: url(../statics/img/facilitator_upload.png);">
          <input type="file" name="picture[]" class="fileImg" accept="image/*" capture="camera" autocomplete="off">
        </div>
        <div class="content">
          <div class="box">
            <div class="boxContent">
              <h2><strong>粤 AE57585</strong><i>订单号：NO.5431143</i><a class="scanHand scanQRCode" href="javascript:void(0);"></a></h2>
              <time>服务时间：2018-11-14<i>14:7:23</i></time>
              <cite>车位号：一层 503 <a class="finishHand" href="facilitatorOrderDetail.html">已接单</a></cite>
            </div>
          </div>
        </div>
        <div class="btnWrap saveFacilitatorBtnWrap">
          <div><input class="btn saveFacilitatorBtn" type="submit" data-text="提交" value="提交" /></div>
        </div>
      </form>

    </main>

    <nav class="nav nav2">
      <ul>
        <li><a href="facilitatorHome.html"><span></span><strong>首页</strong></a></li>
        <li class="current"><a href="facilitatorOrderList.html"><span></span><strong>订单</strong></a></li>
        <li><a href="my.html"><span></span><strong>我的</strong></a></li>
      </ul>
    </nav>

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
