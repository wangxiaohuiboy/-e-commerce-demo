<template>
  <div class="topic">
    <div class="home_title">专题精选</div>
    <van-swipe :loop="false" :width="300">
      <van-swipe-item v-for="item in topicList" :key="item.id">
          <img :src="item.scene_pic_url" width="100%" height="200px" alt="">
        <div>
            <h4>{{item.title}}</h4>
            <span>{{item.price_info | filterMoney}}起</span>
        </div>
        <p class="van-ellipsis">{{item.subtitle}}</p>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
 
<script>
export default {
    props:["topicList"],
  data() {
    return {};
  },
};
</script>
 
<style lang = "less" scoped>
.topic {
    width: 100%;
  margin-top: 20px;
  background: #fff;
  overflow: hidden;
  margin-right: 10px;
  .home_title {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    color: #000;
    text-align: center;
  }
  /deep/.van-swipe__indicators{
      display: none;
  }
  .van-swipe-item{
      padding:0 5px;
      div{
          width: 100%;
          overflow: hidden;
          font-size: 16px;
          height: 40px;
          line-height: 40px;
          h4{
              float: left;
          }
          span{
              float: left;
              padding-left: 10px;
              color: #4fc08d;
          }
      }
      p{
          color: #666;
          width: 100%;
          font-size: 12px;
          color: #666;
          width: 80%;
          padding-bottom: 10px;
      }
  }
}
.van-swipe-item{
  margin-right: -15px;
}
</style>