<template>
  <div>
    <div class="flex-box width100 bgcolor_white color_black_1 flex-justify-center">
      <div class="flex-1">
        <!-- 订单头部 -->
        <div class="height_75 bgcolor_blue_1 width100">
          <div class="flex-box width100">
            <div class="flex-1">
              <div class="flex-box flex-justify-start flex-align-center width100 height_75">
                <div class="box-border padding_l44 color_white_1 font_size15">{{order.statusName}}</div>
              </div>
            </div>
            <div class="flex-1">
              <div class="flex-box flex-justify-end flex-align-center width100 height_75">
                <img class="box-border height_25 width_80 padding_r25" src="../statics/img/order/orderlogo.png" />
              </div>
            </div>
          </div>
        </div>

        <!-- 订单基本信息 -->
        <div class="margin_t10 width100 margin_b10">
          <div class="width100 padding_lr20">
            <div class="width100 flex-box">
              <div class="flex-1">
                <span class="color_red_1 font_size12">{{order.plateNumber}}</span>
              </div>
              <div class="flex-4">
                <img src="../statics/img/order/dingdan.png" class="width_10 height_12 margin_l12" />
                <span class="margin_l5 font_size12">订单号：{{order.orderCode}}</span>
              </div>
            </div>
            <div class="width100 margin_t10">
              <div class="width100 flex-box">
                <div class="flex-1">
                  <img src="../statics/img/order/clock.png" class="width_12 height_12">
                  <span class="font_size12 margin_l5">下单时间：{{order.orderTime}}</span>
                </div>
              </div>
            </div>
            <div class="width100 margin_t10">
              <div class="width100 flex-box">
                <div class="flex-1">
                  <img src="../statics/img/order/dingwei.png" class="width_12 height_12">
                  <span class="font_size12 margin_l5">车位号：{{order.parkNo}}</span>
                </div>
              </div>
            </div>
            <div class="width100 margin_t10">
              <div class="width100 flex-box">
                <div class="flex-1">
                  <img src="../statics/img/order/cheliangleixing.png" class="width_12 height_12 margin_t3">
                  <span class="font_size9 color_white_1 margin_l5 bgcolor_blue_2 radius10 padding3 padding_lr10">{{order.productName}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 分界线 -->
        <div class="width100 bgcolor_gray_1 height_5"></div>

        <!-- 订单状态列表明细 -->
        <div class="margin_b100 font_size12" v-if="orderDetail != null">
          <div class="width100 padding_lr20">
            <template v-for="detail in orderDetail.handles">
              <div class="width100 margin_t15">
                <div class="width100 flex-box">
                  <div class="flex-1">
                    <img src="" class="width_15 height_15">
                    <span class="font_size14">{{orderStatusList[detail.orderStatus] || '未配置'}}</span>
                  </div>
                  <div class="flex-1">
                    <div class="width100 flex-box flex-justify-end">
                      <div class="font_size10">{{detail.dealTime}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="width100 margin_t10">
                <div class="width100 flex-box">
                  <div class="width_15 height_15">

                  </div>
                  <div class="flex-1">
                    <span>{{detail.personTypeName}}&nbsp;&nbsp;</span>
                    <a :href="'tel:'+detail.userTel">{{detail.userName+'['+detail.userTel+']'}}&nbsp;&nbsp;</a>
                    <span v-if="detail.dealDesc != null">{{detail.dealDesc}}</span>
                  </div>
                </div>
              </div>
              <div class="width100 margin_t10" v-if="detail.photoAddress != null && detail.photoAddress.length > 0">
                <div class="width100 flex-box">
                  <div class="width_15 height_15">

                  </div>
                  <div class="flex-1">
                    <template v-for="photo in detail.photoAddress">
                      <img :src="'oochePictures/'+formatDate(detail.dealTime)+'/'+photo.fileName" alt="" class="width_50 height_50">
                    </template>
                  </div>
                </div>
              </div>
              <div class="width100 margin_t10" v-if="detail.leaveMessage != null">
                <div class="width100">
                  <div class="width100 flex-box">
                    <div class="width_15 height_15">

                    </div>
                    <div class="flex-1">
                      <div class="width100 border_gray_1"></div>
                    </div>
                  </div>
                  <div class="width100 flex-box">
                    <div class="width_15 height_15">

                    </div>
                    <div class="flex-1">
                      <span class="color_red_1">留言:{{detail.leaveMessage}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>
<script>
import OrderDetail from "../model/OrderDetail";

export default {
  data() {
    return {
      order: {},
      orderDetail: {},
      orderStatusList:{
        "-1":"已取消",
        "1":"已预约",
        "2":"待接单",
        "3":"待洗车",
        "4":"洗车中",
        "5":"待取车",
        "6":"已完成"
      },
      orderStatusCurImgUrl:[
        "",
        "",
        "",
        "",
        "",
        ""
      ],
      orderStatusNonCurImgUrl:[
        "",
        "",
        "",
        "",
        "",
        ""
      ]
    };
  },
  async mounted() {
    this.order = this.$route.params;
    try {
      this.orderDetail = await OrderDetail.getByOrderId(this.order.orderId);
    } catch (error) {
      this.$q.notify({
        type: "negative",
        message: error.message,
        position: "top",
        timeout: 1000
      });
    }
  },
  methods:{
    formatDate(date){
      var newDate = new Date(date);
      var dateResult = this.dateFormat("yyyyMMdd",newDate);
      return dateResult;
    },
    dateFormat(fmt,date){ //author: meizz
      var o = {
        "M+" : date.getMonth()+1,     //月份
        "d+" : date.getDate(),     //日
        "h+" : date.getHours(),     //小时
        "m+" : date.getMinutes(),     //分
        "s+" : date.getSeconds(),     //秒
        "q+" : Math.floor((date.getMonth()+3)/3), //季度
        "S" : date.getMilliseconds()    //毫秒
      };
      if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
      for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
      return fmt;
    }
  }
};
</script>
