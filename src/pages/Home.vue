<template>
  <q-page padding>
    <article class="homeHead">
      <img class="oneBanner" src="../statics/image/banner_home.png" alt>

      <section class="notice">
        <ul class="animal">
          <li>
            <a>
              <strong>通知</strong>
              <b>预约</b> 今天剩余预约位：
              <span style="color:green">{{reduceAppoint}}</span>
            </a>
          </li>
          <li>
            <a target="new">
              <strong>公告2</strong>
              <b>最新</b> 随车甘雨
            </a>
          </li>
          <li>
            <a target="new">
              <strong>最新消息3</strong> 深圳市乐乐网络科技旗下，哦哦洗车正式上线运营！欢迎大家登陆使用！
            </a>
          </li>
          <li>
            <a target="new">
              <strong>行业动态4</strong>
              <b>最全</b> | 洗车行业前景广阔
            </a>
          </li>
        </ul>
      </section>
      <nav class="secondNav">
        <ul>
          <li>
            <a @click="routeAppoint">
              <span></span>
              <strong>预约</strong>
            </a>
          </li>
          <li>
            <a @click="route(1)">
              <span></span>
              <strong>服务</strong>
            </a>
          </li>
          <li>
            <div href="javascript:void(0);" @click="scan" class="scanQRCode">
              <span></span>
              <strong>扫一扫</strong>
            </div>
          </li>
        </ul>
      </nav>
    </article>

    <article class="homeContent">
      <div class="content">
        <h1>随车甘雨</h1>
        <p>据深圳信息大厦建设初期规划，在地下停车场设有清洗区，考虑到大厦停车场配套设施的完善以及避免外来车辆携带的尘土、砂砾对停车场环境进行二次污染，拟开启规划的配套清洁服务。</p>
      </div>
      <div class="content">
        <h1>清洁服务时间</h1>
        <p>工作日 7:30-17:30</p>
      </div>
      <div class="content">
        <h1>清洁服务频次</h1>
        <p>月均清洗量：清洗频次设定为1次/月。</p>
      </div>
      <div class="content">
        <h1>服务须知</h1>
        <li>2019年1月21日开始内部员工可通过微信公众号“深圳移动服务e家”预约洗车；</li>
        <li>预约车辆需具备大厦停车场进出权限，且必须将车停在负4F车位；</li>
        <li>系统每天7:30开放预约名额（仅限预约当天）；</li>
        <li>预约成功后60分钟需存入钥匙；</li>
        <li>车辆未停在负4F车位，或与预约填写的信息相违背，将视为无效单，并取消下月清洗资格；</li>
        <li>请勿将车辆停在清洁标示或雪糕筒的车位上，如擅自挪动，取消下季度清洗资格，并参照停车场管理办法予以处罚；</li>
        <li>清洗后，钥匙请在当天取出，否则仅能通过应急钥匙开启柜门，为不影响当天工单流转，应急钥匙开启柜门时间定在每天（18：00-18：30）。违例者取消次月清洗资格；</li>
        <li>因车主个人原因无法准时完成提车清洗工作的，不做延期服务。</li>
        <br>
        <br>
      </div>
    </article>
  </q-page>
</template>

<style>
</style>

<script>
import config from "../config";
import InitJssdk from "../model/InitJssdk";
import SignatureInfo from "../model/SignatureInfo";
import Product from "../model/Product";

export default {
  name: "PageIndex",
  data() {
    return {
      reduceAppoint: 0
    };
  },
  methods: {
    async scan() {
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
        await this.$axios.post(`${scanResult}/${this.$store.state.user.id}`);
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
    route(index) {
      this.$store.state.router.forEach(o => {
        o.isActive = false;
      });
      this.$store.state.router[index].isActive = true;
      this.$store.commit("updateRouter", this.$store.state.router);
      this.$router.push(this.$store.state.router[index].path);
    },
    routeAppoint() {
      this.$router.push("/default/appoint");
    }
  },
  async created() {
    const amountInfo = await Product.getAwaitAmount(this.$store.state.user.id);
    this.reduceAppoint = amountInfo.remainAmount;
  }
};
</script>