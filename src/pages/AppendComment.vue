<template>
  <div
    class="commentDetail commentAddForm"
    method="post"
    action="../php/commentAdd.php"
    data-to="commentSucc.html"
  >
    <div class="content">
      <div class="box">
        <div class="boxContent">
          <h2>
            <strong>粤 AE57585</strong>
            <i>订单号：NO.5431143</i>
          </h2>
          <time>服务时间：2018-11-14
            <i>14:7:23</i>
          </time>
          <cite>车位号：一层 503</cite>
        </div>

        <div class="commentContent">
          <h3>我的评价：</h3>
          <p>宝贝满足你的期待吗?说说你的使用心得，分享给他们呢吧！宝贝满足你的期待吗?说说你的使用心得，分享给他们呢吧！宝贝满足你的期待吗?说说你的使用心得，分享给他们呢吧！</p>

          <div class="clearfix">
            <div class="img" style="background-image: url(../image/test1.jpg)"></div>
            <div class="img" style="background-image: url(../image/test2.jpg)"></div>
            <div class="img" style="background-image: url(../image/test3.jpg)"></div>
          </div>

          <textarea name="content" placeholder="宝贝满足你的期待吗?说说你的使用心得，分享给他们呢吧！"></textarea>
        </div>
      </div>
    </div>

    <div class="btnWrap commentAddBtnWrap">
      <div>
        <input class="btn commentAddBtn" type="submit" data-text="提交" value="提交">
      </div>
    </div>
  </div>
</template>

<script>

</script>