<template>
  <div class="userEdit">
    <table>
      <tr>
        <td>头像</td>
        <td>
          <div class="portrait" :style="{backgroundImage: 'url(' + headimgurl + ')'}">
            <!-- <input type="file" name="picture[]" class="fileImg" accept="image/*" autocomplete="off"> -->
          </div>
          <i></i>
        </td>
      </tr>
      <tr>
        <td>名字</td>
        <td>
          <input name="username" type="text" v-model="userInfo.realName">
          <i></i>
        </td>
      </tr>
      <tr class="bottomMax">
        <td>性别</td>
        <td>
          <select name="sex" v-model="userInfo.sex">
            <option value="1">男</option>
            <option value="2">女</option>
          </select>
          <i></i>
        </td>
      </tr>
      <tr>
        <td>部门</td>
        <td>
          <select v-model="departId">
            <option
              v-for="depart in departOptions"
              :value="depart.value"
              :key="depart.id"
            >{{ depart.text }}</option>
          </select>
        </td>
      </tr>
      <tr class="bottomMax">
        <td>公司</td>
        <td>
          <input style="width:100%" type="text" readonly v-model="userInfo.parentDepartName">
          <i></i>
        </td>
      </tr>
      <tr class="bottomMax">
        <td>身份证</td>
        <td>
          <input type="text" v-model="userInfo.citizenNo">
          <i></i>
        </td>
      </tr>
      <tr>
        <td>
          <input class="phoneNumber readonly" type="text" v-model="userInfo.mobilePhone">
        </td>
        <td>
          <span class="phoneBtn" @click="isMobileCode=true">重新绑定</span>
        </td>
      </tr>
      <!-- <tr v-if="isMobileCode">
        <td>
          <input class="phoneNumber" type="text" placeholder="请输入手机号码" v-model="userInfo.mobilePhone">
        </td>
        <td>
          <input style="display:block" type="text" placeholder="验证码" v-model="mobileCode">
          <a style="display:block" class="phoneBtn" @click="getRegisterCode" :disabled="!show">
            <span v-show="show">获取验证码</span>
            <span v-show="!show" class="count">{{count}} 秒</span>
          </a>
        </td>
      </tr>-->
      <tr class="bottomMax">
        <td>Email</td>
        <td>
          <input type="text" v-model="userInfo.email">
          <i></i>
        </td>
      </tr>
      <tr>
        <td>员工编号</td>
        <td>
          <input type="text" v-model="userInfo.empNo">
          <i></i>
        </td>
      </tr>
    </table>

    <div class="btnWrap saveUserBtnWrap">
      <div>
        <input class="btn saveUserBtn" @click="submit" value="提交">
      </div>
    </div>

    <q-modal position="right" v-model="isMobileCode" color="secondary">
      <div class="login">
        <div>
          <label></label>
          <input class="phone" type="tel" placeholder="请输入手机号码" v-model="userInfo.mobilePhone">
        </div>
        <div>
          <label></label>
          <input class="ident" type="text" placeholder="验证码" v-model="mobileCode">
          <a class="codeBtn">
            <span @click="getRegisterCode" v-show="show">获取验证码</span>
            <span v-show="!show" class="count">{{count}} 秒</span>
          </a>
        </div>
      </div>
      <footer>
        <table style="margin:10px auto 2px;width:80%;text-align: center;">
          <tr>
            <td>
              <q-btn class="button" @click="isMobileCode=false" label="取消"/>
            </td>
            <td>
              <q-btn class="button" @click="isMobileCode=false" label="确认"/>
            </td>
          </tr>
        </table>
      </footer>
    </q-modal>
  </div>
</template>

<script>
import User from "../model/User";

const TIME_COUNT = 120;
export default {
  data() {
    return {
      userInfo: {
        id: "",
        realName: "",
        sex: "1",
        parentDepartId: "",
        parentDepartName: "",
        departId: "",
        departName: "",
        citizenNo: "",
        mobilePhone: "",
        email: "",
        empNo: ""
      },
      show: true,
      count: "",
      timer: null,
      isMobileCode: false,
      mobileCode: "",
      departOptions: []
    };
  },
  computed: {
    headimgurl() {
      return this.$store.state.user.headimgurl;
    }
  },
  methods: {
    async submit() {
      try {
        await User.updateUserInfo(this.userInfo);
      } catch (error) {
        this.$q.notify({
          type: "negative",
          message: error.message,
          position: "top",
          timeout: 1000
        });
      }
    },
    async getRegisterCode() {
      try {
        await User.getRegisterCode(this.userInfo.mobilePhone);
        this.$q.notify({
          type: "positive",
          message: "验证码发送成功",
          position: "top",
          icon: "tag_faces",
          timeout: 1000
        });
        this.initTimer();
      } catch (error) {
        this.$q.notify({
          type: "negative",
          message: error.message,
          position: "top",
          timeout: 1000
        });
      }
    },
    initTimer() {
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    }
  },
  async mounted() {
    try {
      this.userInfo = await User.getUserInfo(this.$store.state.user.id);
    } catch (error) {
      this.$q.notify({
        type: "negative",
        message: error.message,
        position: "top",
        timeout: 1000
      });
    }
  }
};
</script>
<style>
.button {
  font-size: 16px;
  width:100px;
  border: none;
  border-radius: 12px;
  background: #04a6ef;
  color: #fff;
  cursor: pointer;
}
</style>

