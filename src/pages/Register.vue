<template>
  <div class="page">
    <h1 class="logo">哦哦洗车</h1>

    <div class="login">
      <div>
        <label></label>
        <input class="phone" type="tel" placeholder="请输入手机号码" v-model="phoneNum">
      </div>
      <div>
        <label></label>
        <input class="ident" type="text" placeholder="验证码" v-model="checkCode">
        <a class="codeBtn" @click="getRegisterCode">获取验证码</a>
      </div>
      <div class="btnWrap loginBtnWrap">
        <div>
          <a @click="register" class="btn loginBtn">登陆</a>
        </div>
      </div>
      <div>
        <label>
          <input class="readed" type="checkbox" checked>我已阅读并同意使用条款和隐私政策
        </label>
      </div>
    </div>

    <div class="copyright">中国移动（深圳）</div>

    <div class="_tip noneEvent"></div>
  </div>
</template>

<script>
import Config from "../config";
import WebToken from "../model/WebToken";
import User from "../model/User";

export default {
  name: "LayoutDefault",
  data() {
    return {
      phoneNum: "",
      wxUserInfo: null,
      checkCode: "",
      loading: false
    };
  },
  methods: {
    async register() {
      this.$q.loading.show();
      try {
        if (!this.$store.state.wxUserInfo) throw new Error("微信授权失败！");
        const userInfo = await User.updateOrInsert({
          telnum: this.phoneNum,
          checkCode: this.checkCode,
          wxuser: this.$store.state.wxUserInfo
        });
        if (userInfo) {
          this.$store.commit("updateUser", userInfo);
          if (userInfo.personType === "3") {
            this.$router.push("/anonymous");
          } else {
            this.$router.push("/default");
          }
        } else {
          throw new Error("登录失败！");
        }
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
    async getRegisterCode() {
      this.$q.loading.show();
      try {
        await User.getRegisterCode(this.phoneNum);
        this.$q.notify({
          type: "positive",
          message: "验证码发送成功",
          position: "top",
          icon: "tag_faces",
          timeout: 1000
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
    }
  }
};
</script>

<style>
</style>
