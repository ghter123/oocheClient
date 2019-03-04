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
          <input class="phoneNumber readonly" readonly type="text" v-model="userInfo.mobilePhone">
        </td>
        <td>
          <span class="phoneBtn">重新绑定</span>
          <input class="identifyingCode" type="text" value placeholder="验证码">
        </td>
      </tr>
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
  </div>
</template>

<script>
import User from "../model/User";
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

