<template></template>

<script>
import Config from "../config";
import WebToken from "../model/WebToken";
import User from "../model/User";
import _ from "lodash";

export default {
  name: "LayoutDefault",
  data() {
    return {
      phoneNum: "",
      creating: false,
      wxUserInfo: null,
      loading: false
    };
  },
  methods: {
    setStore(userInfo) {
      this.$store.commit("updateUser", userInfo);
    }
  },
  async created() {
    this.$q.loading.show();
    if (this.$route.query.code) {
      if (_.isEmpty(this.$store.state.entryUrl)) {
        this.$store.commit(
          "updateEntryUrl",
          window.location.href.split("#")[0]
        );
      }
      try {
        this.$axios.defaults.headers.common[
          "X-AUTH-TOKEN"
        ] = await WebToken.getFromServer();

        this.wxUserInfo = await this.$axios.get(
          Config.getWxUserByCodeUri + this.$route.query.code
        );
        // if(!this.wxUserInfo) {
        //   window.location.href = Config.wxNonSilentUri;
        // }
      } catch (error) {
        this.$q.notify({
          type: "negative",
          message: error.message,
          position: "top",
          timeout: 1000
        });
      }

      let userInfo;
      try {
        userInfo = await User.getUserByOpenId(this.wxUserInfo.openid);
        if (userInfo) {
          this.setStore(userInfo);
          if (userInfo.personType === "3") {
            this.$router.push("/anonymous");
          } else {
            this.$router.push("/default");
          }
        } else {
          throw new Error("登录失败！");
        }
      } catch (error) {
        this.$store.commit("updatewxUserInfo", this.wxUserInfo);
        this.$router.push("/register");
      }
    } else {
      window.location.href = Config.wxNonSilentUri;
    }

    this.$q.loading.hide();
  }
};
</script>

<style>
</style>