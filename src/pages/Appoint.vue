<template>
  <q-page padding>
    <article class="bespeakHead">
      <header class="banner">
        <ul>
          <li>
            <img src="../statics/image/bannerBespeak1.jpg" style="width:100%">
          </li>
          <li>
            <img src="../statics/image/banner_home.png" style="width:100%">
          </li>
          <li>
            <img src="../statics/image/banner_bespeakSucc.jpg" style="width:100%">
          </li>
          <li>
            <img src="../statics/image/test1.jpg" style="width:100%">
          </li>
          <li>
            <img src="../statics/image/test2.jpg" style="width:100%">
          </li>
          <li>
            <img src="../statics/image/test3.jpg" style="width:100%">
          </li>
        </ul>
      </header>
    </article>

    <div class="bespeakForm">
      <ul>
        <li>
          <h1>车辆信息</h1>
        </li>
        <li>
          <div class="revise">
            <label>车牌号码：</label>
            <!-- <q-select v-model="order.plateNumber" :options="vehicles"/> -->
            <input readonly="readonly" type="text" name="plateNum" v-model="order.plateNumber">
          </div>
        </li>

        <li>
          <div class="revise">
            <label>车位号：</label>
            <!-- <q-input v-model="order.parkNo" type="text" placeholder="请输入停车位置"/> -->
            <input type="text" name="placeNum" value="一层609" v-model="order.parkNo">
          </div>
        </li>
        <li class="uploadImgWrap" @click="takePhoto">
          <i data-text="缩略图">拍照</i>
          <!--<div class="uploadTo startImg">
                    <div class="showImg"></div>
                    <input type="file" name="picture[]" class="fileImg" accept="image/*" capture="camera" autocomplete="off">
          </div>-->
          <div class="chooseImage"></div>

          <div class="showImgWrapWrap">
            <div class="show showImgWrap clearfix">
              <img v-if="parkingPhotoUri" :src="parkingPhotoUri" style="width:100%">
            </div>
          </div>
        </li>
        <li>
          <h2>服务详情</h2>
          <p>
            服务:普洗 {{product.productAmount}}次/月
            <span>剩余 {{product.productLeftNum}}次</span>
          </p>
          <p>
            时间:
            <input
              class="time_date"
              type="datetime-local"
              :value="dateLocalFormart(order.orderTime)"
              @input="dateInput"
              placeholder="请输入预约时间"
              step="01"
            >
          </p>
        </li>
        <li>
          <div class="orderForm">
            <textarea placeholder="还有话要说" v-model="order.orderDesc"></textarea>
          </div>
        </li>
      </ul>

      <div class="btnWrap saveBespeakBtnWrap">
        <div>
          <input class="btn saveBespeakBtn" type="submit" data-text="预约" value="预约" @click="submit">
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import { date } from "quasar";
import config from "../config";
import Order from "../model/Order";
import Product from "../model/Product";
import _ from "lodash";
import File from "../model/File";
import InitJssdk from "../model/InitJssdk";
import SignatureInfo from "../model/SignatureInfo";

export default {
  name: "PageIndex",
  data() {
    return {
      selectedProduction: "",
      parkingPlace: "",
      remark: "",
      parkingPhotoUri: "",
      serviceOptions: [],
      product: {},
      showConfirm: false,
      order: {
        userId: "",
        productId: "",
        parkNo: "",
        parkPhoto: "",
        orderDesc: "",
        plateNumber: "",
        orderTime: new Date()
      },
      wxHeadImg: "",
      wx: null
    };
  },
  computed: {
    userBrief() {
      return this.$store.state.user.nickname;
    },
    vehicles() {
      return this.$store.state.user.vehicles.CarNum;
    },
    firstService() {
      return _.isEmpty(this.serviceOptions)
        ? {
            productAmount: 0,
            productLeftNum: 0
          }
        : this.serviceOptions[0];
    },
    background() {
      return {};
    },
    defaultCarPack() {
      let parkNum = "";
      if (this.$store.state.user.carparks) {
        try {
          const carparks = JSON.parse(this.$store.state.user.carparks);
          if (carparks) {
            parkNum = carparks.park_num;
          }
        } catch (error) {
          this.$q.notify({
            type: "negative",
            message: "读取车位信息出错。",
            position: "top",
            timeout: 1000
          });
        }
      }
      return parkNum;
    }
  },
  methods: {
    async submit() {
      this.$q.loading.show();
      try {
        if (this.parkingPhotoUri) {
          const vm = this;
          this.order.parkPhoto = await new Promise((resolve, reject) =>
            vm.wx.uploadImage({
              localId: vm.parkingPhotoUri.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
              isShowProgressTips: 1, // 默认为1，显示进度提示
              success: function(res) {
                resolve(res.serverId);
              },
              fail: error => reject(error)
            })
          );
          const photoRes = await File.uploadByWx(this.order.parkPhoto);
          this.order.parkPhoto = photoRes.id;
        }
        const res = await Order.postOrder(this.order);
        this.$router.push(`/default/AppointSucc`);
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
    async takePhoto() {
      let vm = this;

      this.wx.checkJsApi({
        jsApiList: ["chooseImage"], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: function(res) {
          // 以键值对的形式返回，可用的api值true，不可用为false
          // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
        }
      });

      this.wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          vm.parkingPhotoUri = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        }
      });
      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    },
    async getProductByuser(userId) {
      try {
        this.product = await Product.getByUser(userId);
        if (this.product) {
          this.order.productId = this.product.productId;
        } else {
          throw new Error("获取洗车服务失败！");
        }
      } catch (error) {
        this.$q.notify({
          type: "negative",
          message: error.message,
          position: "top",
          timeout: 1000
        });
      }
    },
    async getProductServiceByUser(userId) {
      this.serviceOptions = _.map(await Product.getByUser(userId), o => {
        return {
          label: `${o.productName}(${o.productLeftNum}) ${
            o.productAmount
          }次/每月`,
          productAmount: o.productAmount,
          productLeftNum: o.productLeftNum,
          value: o.productId,
          disable: o.productLeftNum <= "0"
        };
      });

      if (_.isEmpty(this.serviceOptions)) return;
      const first = _.first(_.filter(this.serviceOptions, { disable: false }));
      if (!first) return;
      this.order.productId = first.value;
    },
    dateLocalFormart(o) {
      return o && date.formatDate(o, "YYYY-MM-DDTHH:mm");
    },
    dateInput(o) {
      this.order.orderTime = new Date(
        o.target.value.replace(/-/g, "/").replace("T", " ")
      );
    }
  },
  filters: {
    dateFormat: o => o && date.formatDate(o, "YYYY年MM月DD日 HH:mm")
  },
  async mounted() {
    this.order.userId = this.$store.state.user.id;
    this.order.plateNumber = this.$store.state.user.vehicles.carNum;
    this.order.parkNo = this.defaultCarPack;
    await this.getProductByuser(this.order.userId);
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

    this.wx = await InitJssdk({
      debug: false,
      appId: signatureInfo.appId_,
      timestamp: signatureInfo.timestamp_,
      nonceStr: signatureInfo.noncestr_,
      signature: signatureInfo.signature_,
      jsApiList: [
        "chooseImage", //拍照或从手机相册中选图接口
        "previewImage", //预览图片接口
        "uploadImage" //上传图片接口
      ]
    });
  }
};
</script>