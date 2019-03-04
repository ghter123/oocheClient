<template>
  <q-page padding>
    <div class="bespeakSucc">
      <img class="oneBanner" src="../statics/image/banner_bespeakSucc.jpg" alt>

      <article class="content">
        <h1>哦哦洗车服务</h1>

        <div @click="scan" class="sweepIcon">
          <img class="left" src="../statics/bespeakSucc_left.png" alt>
          <img class="left animal" src="../statics/bespeakSucc_left.png" alt>
          <img class="right" src="../statics/bespeakSucc_right.png" alt>
          <img class="right animal" src="../statics/bespeakSucc_right.png" alt>
        </div>
        <h2>已预约成功
          <br>并为您开启智能锁!
        </h2>
        <p>即刻起请在
          <i>60</i>分钟以内
          <br>存入钥匙
        </p>
        <a class="address" href="javascript:void(0)">
          <img src="../statics/address_icon.png" alt>深圳市福田区深南大道中国移动深圳信息大厦
        </a>
      </article>

      <footer>
        <div class="btnWrap sweepBtnWrap">
          <div>
            <a @click="scan" class="btn sweepBtn scanQRCode" data-text="扫一扫">扫一扫</a>
          </div>
        </div>
      </footer>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import config from "../config";
import InitJssdk from "../model/InitJssdk";
import SignatureInfo from "../model/SignatureInfo";

export default {
  name: "AppointSucc",
  data() {
    return {};
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
        await this.$axios.post(
          `${scanResult}/${this.$store.state.user.id}`
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
    }
  },
  async created() {}
};
</script>