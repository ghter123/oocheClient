<template>
  <div class="comment">
    <div class="commentForm">
      <div class="content">
        <div class="box">
          <div class="boxContent">
            <h2>
              <strong>{{order.plateNumber}}</strong>
              <i>订单号：{{order.orderCode}}</i>
            </h2>
            <time>
              服务时间：{{order.orderTime}}
              <!-- <i>14:7:23</i> -->
            </time>
            <cite>车位号：{{order.parkNo}}</cite>
          </div>
        </div>
        <textarea name="content" placeholder="如果您有反馈意见，请告知我们哦！" v-model="commentMsg"></textarea>

        <div class="chooseImageWrap">
          <div class="chooseImage" @click="takePhoto"></div>
          <div class="show showImgWrap clearfix">
            <div class="showImg">
              <img v-if="img" :src="img" style="width:100%">
            </div>
          </div>
        </div>
      </div>

      <div class="btnWrap commentBtnWrap">
        <div>
          <input class="btn commentBtn" style="text-align:center" @click="submit" value="提交">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { date } from "quasar";
import File from "../model/File";
import InitJssdk from "../model/InitJssdk";
import SignatureInfo from "../model/SignatureInfo";
import User from "../model/User";

export default {
  data() {
    return {
      order: {},
      img: "",
      commentMsg: ""
    };
  },
  methods: {
    async submit() {
      this.$q.loading.show();
      try {
        if (this.img) {
          const vm = this;
          this.img = await new Promise((resolve, reject) =>
            vm.wx.uploadImage({
              localId: vm.img.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
              isShowProgressTips: 1, // 默认为1，显示进度提示
              success: function(res) {
                resolve(res.serverId);
              },
              fail: error => reject(error)
            })
          );
          const photoRes = await File.uploadByWx(this.img);
          this.img = photoRes.id;
        }
        await User.addOrderComment({
          parentCommentId: "",
          orderId: this.order.id,
          commentUserId: this.$store.state.user.id,
          comments: this.commentMsg,
          commentPhotos: this.img ? [this.img] : [],
          commentStarLevel: "",
          commentTime: new Date()
        });
        this.$router.go(-1);
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
          vm.img = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        }
      });
      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    }
  },
  async mounted() {
    this.order = this.$route.params;
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
  },
  filters: {
    yearFormat: o => o && date.formatDate(o, "YYYY年MM月DD日"),
    timeFormat: o => o && date.formatDate(o, "HH:mm:ss")
  }
};
</script>
