<template>
  <q-page>
    <div>
        <div>
        服务已经完成！
        </div>
        <div>
            您预约的精洗服务已于{{completionTime}}完成
        </div>
    </div>
        <div>
            <div style="display: inline-block">
                开箱二维码
            </div>
            <div style="display: inline-block">
                <img src='../statics/u205.jpg' style="width:30px;height:30px"/>
            </div>
            <div>
                <img src='../statics/u201.png' />
            </div>
            <div>
                开箱密码:123456
            </div>
            <div>
                请于19:00前取回钥匙
            </div>
        </div>
    <div>

    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      orderQueue:2,
      orderQueueTime:3
    };
  },
  methods: {},
  async mounted() {
  }
};
</script>

<style>
</style>