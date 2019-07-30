<template>
  <div class="commentDetail commentAddForm">
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

        <div class="commentContent">
          <h3>我的评价：</h3>
          <p>{{comment.comments}}</p>

          <div class="clearfix">
            <div
              class="img"
              v-for="photo in comment.commentPhotos"
              :key="photo"
              :style="{backgroundImage:'url(' + photo + ')'}"
            ></div>
          </div>
          <textarea name="content" v-model="commentMsg" placeholder="如果您有反馈意见，请告知我们哦！"></textarea>
        </div>
      </div>
    </div>

    <div class="btnWrap commentAddBtnWrap">
      <div>
        <input class="btn commentAddBtn" style="text-align:center" @click="submit" value="提交">
      </div>
    </div>
  </div>
</template>

<script>
import { date } from "quasar";
import File from "../model/File";
import InitJssdk from "../model/InitJssdk";
import SignatureInfo from "../model/SignatureInfo";
import Comment from "../model/Comment";

export default {
  data() {
    return {
      order: {},
      comment: {},
      commentMsg:''
    };
  },
  methods: {
    async submit() {
      this.$q.loading.show();
      try {

        const comment = new Comment({
          orderId: this.order.orderId,
          commentUserId: this.$store.state.user.id,
          comments: this.commentMsg,
          parentCommentId: this.comment.id
        });

        await Comment.addOrderComment(comment);
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
    }
  },
  async mounted() {
    this.order = this.$route.params;
    try {
      this.comment = Object.assign(
        this.comment,
        await Comment.getFirstByOrderId(this.order.orderId)
      );
    } catch (error) {
      this.$q.notify({
        type: "negative",
        message: error.message,
        position: "top",
        timeout: 1000
      });
    }
  },
  filters: {
    yearFormat: o => o && date.formatDate(o, "YYYY年MM月DD日"),
    timeFormat: o => o && date.formatDate(o, "HH:mm:ss")
  }
};
</script>
