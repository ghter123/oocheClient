<template>
  <q-page padding>
    <div class="myHtml">
      <div>
        <div class="oneBannerWrap">
          <img class="oneBanner" src="../statics/image/banner_mybg.jpg" alt>
          <div class="information">
            <span>1</span>
            <!-- <article class="msgTipContent">
              <cite></cite>
              <h2>
                消息提醒
                <i>x</i>
              </h2>
              <ul>
                <li>
                  <a>您的阿斯利康发货您的阿斯利康发货fsdaf</a>
                </li>
                <li>
                  <a>
                    <strong>您的阿斯利康发货dasf您的阿斯利康发货fsdaf</strong>
                  </a>
                </li>
                <li>
                  <a>您的阿斯利康发货fsdaf您的阿斯利康发货fsdaf</a>
                </li>
              </ul>
            </article>-->
          </div>
          <router-link to="/default/userEdit" class="setUp"></router-link>

          <div class="portraitWrap">
            <cite class="portrait" :style="{backgroundImage: 'url(' + user.headimgurl + ')'}"></cite>
            <p>
              {{user.nickname}}
              <span>
                {{user.sex | sexFormat}}
                <br>
                {{user.mobilePhone}}
              </span>
            </p>
          </div>
        </div>

        <ul class="linkTo">
          <li>
            <a @click="route(1)">我的订单</a>
          </li>
          <li>
            <a class="attestation">申请认证
              <q-popup-edit
                v-model="organizationCode"
                title="请输入机构代码"
                buttons
                label-set="确定"
                label-cancel="取消"
                @save="saveOrganizationCode"
                @cancel="cancelOrganizationCode"
              >
                <q-input v-model="organizationCode" style="width:200px"/>
              </q-popup-edit>
            </a>
          </li>
        </ul>

        <article class="carManage" :class="{ hiddenDiv: isShowCars }">
          <h1 @click="isShowCars = !isShowCars">
            <strong>车辆管理</strong>
            <i></i>
          </h1>
          <div class="slideShowAndHidden">
            <div class="item" v-for="car in cars" :key="car.id">
              <ul>
                <li>
                  <label>车牌号：</label>
                  <input class="lmx_number" type="text" v-model="car.carNum">
                </li>
                <li>
                  <label>品牌：</label>
                  <input class="lmx_brand" type="text" v-model="car.carModel">
                </li>
                <li>
                  <label>车系：</label>
                  <input class="lmx_system" type="text" v-model="car.carDesc">
                </li>
              </ul>
              <a class="editCarBtn" @click="upsertCar(car)">更新</a>
            </div>
            <a class="addCarBtn" @click="addCar">添加</a>
          </div>
        </article>

        <article class="feedback" :class="{hiddenDiv: isShowFeedback}">
          <div @click="feedBackMsg=''">
            <h1 @click="isShowFeedback = !isShowFeedback">
              <strong>意见反馈</strong>
              <i></i>
            </h1>
          </div>
          <div class="slideShowAndHidden">
            <textarea
              v-model="feedBackMsg"
              class="lmx_feedbackContent"
              placeholder="如果您有反馈意见，请告知我们哦！"
            ></textarea>
            <a class="feedbackBtn" @click="submitFeedBack">确认</a>
          </div>
        </article>

        <article class="history hiddenDiv">
          <h1>
            <strong>浏览历史</strong>
            <i></i>
          </h1>
          <div class="slideShowAndHidden">
            <div class="none">敬请期待!</div>
          </div>
        </article>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import Car from "../model/Car";
import User from "../model/User";

export default {
  name: "My",
  data() {
    return {
      cars: [],
      organizationCode: "",
      feedBackMsg: "",
      isShowCars: true,
      isShowFeedback: true
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  filters: {
    sexFormat(sexCode) {
      return sexCode === "1" ? "男" : "女";
    }
  },
  methods: {
    route(index) {
      this.$store.state.router.forEach(o => {
        o.isActive = false;
      });
      this.$store.state.router[index].isActive = true;
      this.$store.commit("updateRouter", this.$store.state.router);
      this.$router.push(this.$store.state.router[index].path);
    },
    addCar() {
      this.cars.push({
        userId: this.$store.state.user.id,
        id: "",
        carNum: "",
        carModel: "",
        carDesc: ""
      });
    },
    async upsertCar(car) {
      try {
        await Car.upsert(car);
        this.$q.notify({
          type: "positive",
          message: "更新成功！",
          position: "top",
          icon: "tag_faces",
          timeout: 1000
        });
        await this.review();
      } catch (error) {
        this.$q.notify({
          type: "negative",
          message: error.message,
          position: "top",
          timeout: 1000
        });
      }
    },
    async review() {
      let cars = [];
      try {
        cars = await Car.getByUser(this.$store.state.user.id);
      } catch (error) {
        this.$q.notify({
          type: "negative",
          message: error.message,
          position: "top",
          timeout: 1000
        });
      }
      this.cars = cars;
    },
    async saveOrganizationCode(val, initialValue) {
      try {
        await User.updateOrganizationCode(this.$store.state.user.id, val);
        this.$q.notify({
          type: "positive",
          message: "认证成功！",
          position: "top",
          icon: "tag_faces",
          timeout: 1000
        });
        this.organizationCode = "";
      } catch (error) {
        this.$q.notify({
          type: "negative",
          message: error.message,
          position: "top",
          timeout: 1000
        });
      }
    },
    async submitFeedBack() {
      try {
        await User.feedBack(this.$store.state.user.id, this.feedBackMsg);
        this.$q.notify({
          type: "positive",
          message: "反馈成功！",
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
    },
    cancelOrganizationCode() {
      this.organizationCode = "";
    }
  },
  async mounted() {
    await this.review();
  }
};
</script>