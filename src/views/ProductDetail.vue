<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="skyblue">
      <van-swipe-item v-for="item in gallery" :key="item.id">
        <img :src="item.img_url" width="100%" style="display:block" alt />
      </van-swipe-item>
    </van-swipe>
    <Safeguard></Safeguard>
    <div class="product_info">
      <h2>{{info.name}}</h2>
      <div>{{info.goods_brief}}</div>
      <p>{{Number(info.retail_price)|filterMoney}}</p>
    </div>
    <van-cell title="展示弹出层" is-link />
    <div class="canshu">
      <h3>商品参数</h3>
      <ul v-for="item in attribute" :key="item.id">
        <li>
          <small>{{item.name}}</small>
          <big class="van-ellipsis">{{item.value}}</big>
        </li>
      </ul>
    </div>
    <div class="box" ref="box"></div>
    <van-goods-action>
      <van-goods-action-icon icon="star-o" text="已收藏" />
      <van-goods-action-icon icon="cart-o" text="购物车" badge="5" />
      <van-goods-action-button type="danger" text="立即购买" />
      <van-goods-action-button type="warning" text="加入购物车" />
    </van-goods-action>
    <div class="modal">
        <div class="modal_bg"></div>
        <div class="modal_content">
            <van-icon class="close" name="cross" size="20px" />
            <div class="top">
                <img src="../assets/avatar.png" width="100" height="100" alt="">
                <div class="right">
                    <section>价格</section>
                    <section>库存</section>
                </div>
            </div>
            <div class="down">
                <h3>数量</h3>
                <van-stepper v-model="stepValue" />
            </div>
        </div>
    </div>
  </div>
</template>
 
<script>
import Safeguard from "@/components/Safeguard";
import { GetdetailAPI } from "@/request/api";
export default {
  components: {
    Safeguard,
  },
  data() {
    return {
      //轮播图
      gallery: [],
      //商品信息
      info: [],
      //商品参数
      attribute: [],
      stepValue:1
    };
  },
  created() {
    GetdetailAPI({
      id: this.$route.params.id,
    }).then((res) => {
      if (res.errno == 0) {
        let { gallery, info, attribute } = res.data;
        this.gallery = gallery;
        this.info = info;
        this.attribute = attribute;
        this.$refs.box.innerHTML = info.goods_desc;
      }
    });
  },
};
</script>
 
<style lang = "less" scoped>
.product_info {
  text-align: center;
  background: #fff;
  line-height: 40px;
  padding: 20px 0;
  border-bottom: 1px solid #ccc;
  h2 {
    font-size: 21px;
    color: #000;
  }
  div {
    font-size: 14px;
    color: #666;
  }
  p {
    font-size: 14px;
    color: #4fc08d;
  }
}
.canshu {
  padding: 10px 4%;
  background: #fff;
  margin-top: 20px;
  h3 {
    height: 50px;
    line-height: 50px;
  }
  ul {
    li {
      background: #efefef;
      width: 100%;
      border-radius: 5px;
      height: 40px;
      line-height: 40px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      small {
        width: 22%;
        color: #666;
        padding-left: 5px;
      }
      big {
        width: 72%;
      }
    }
  }
}
/* 插入dom节点的元素无法修改样式 */
.box {
  /deep/img {
    width: 100%;
    display: block;
  }
}
.modal{
    position: fixed;
    z-index: 999;
    left: 0;
    top: 0;
    width: 100vw;
    /* calc是css中用来计算不同单位的方法，减号前后要空格 */
    height: calc(100vh - 50px);
    .modal_bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
    }
    .modal_content{
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        background: #fff;
        padding: 20px 4%;
        box-sizing: border-box;
        .top{
            display: flex;
            height: 50px;
            line-height: 50px;
            .right{
                margin-left: 10px;
                flex: 1;
            }
        }
        .close{
            position: absolute;
            right: 10px;
            top: 10px;
        }
        .down{
            margin-top: 50px;
            h3{
                height: 50px;
                line-height: 50px;
            }
        }
    }
}
</style>