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
    <van-cell title="展示弹出层" is-link @click="ifShowSku=!ifShowSku" />
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
      <van-goods-action-icon
        :icon="cartLanObj.ifCollect?'star':'star-o'"
        :text="cartLanObj.ifCollect?'已收藏':'收藏'"
        :color="cartLanObj.ifCollect?'#4FC08D':'#666'"
        @click="cartLanObj.ifCollect=!cartLanObj.ifCollect"
      />
      <van-goods-action-icon icon="cart-o" text="购物车" :badge="cartLanObj.badge" @click="GoToCart" />
      <van-goods-action-button type="danger" text="立即购买" @click="buyNo" />
      <van-goods-action-button type="warning" text="加入购物车" @click="addToCartFn" />
    </van-goods-action>
    <div class="modal" v-if="ifShowSku">
      <div class="modal_bg" @click="ifShowSku=!ifShowSku"></div>
      <div class="modal_content">
        <van-icon class="close" name="cross" size="20px" @click="ifShowSku=!ifShowSku" />
        <div class="top">
          <img :src="info.list_pic_url" width="100" height="100" alt />
          <div class="right">
            <section>价格 : {{info.retail_price |filterMoney}}</section>
            <section>库存 : {{info.goods_number}}</section>
          </div>
        </div>
        <div class="down">
          <h3>数量</h3>
          <van-stepper min="1" :max="info.goods_number" v-model="stepValue" />
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import Safeguard from "@/components/Safeguard";
import {
  GetdetailAPI,
  GetCartGoodsCountAPI,
  AddToCartAPI,
} from "@/request/api";
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
      // 步进器
      stepValue: 1,
      //sku的显示隐藏
      ifShowSku: false,
      // 购物车和收藏
      cartLanObj: {
        ifCollect: false,
        badge: 0,
      },
      // productList
      productList: [],
    };
  },
  created() {
    GetdetailAPI({
      id: this.$route.params.id,
    }).then((res) => {
      if (res.errno == 0) {
        let { gallery, info, attribute, productList } = res.data;
        this.gallery = gallery;
        this.info = info;
        this.attribute = attribute;
        this.$refs.box.innerHTML = info.goods_desc;
        this.productList = productList;
      }
    });
    // 获取购物车总数量
    GetCartGoodsCountAPI().then((res) => {
      if (res.errno == 0) {
        this.cartLanObj.badge = res.data.cartTotal.goodsCount;
      }
    });
  },
  methods: {
    // 跳转到购物车
    GoToCart(){
      this.$router.push("/cart")
    },
    // 点击加入购物车
    addToCartFn() {
      if (this.ifShowSku) {
        AddToCartAPI({
          goodsId: this.$route.params.id,
          productId: this.productList[0].id,
          number: this.stepValue,
        }).then((res) => {
          if (res.errno == 0) {
            console.log(res);
            this.cartLanObj.badge = res.data.cartTotal.goodsCount;
          }
        });
        this.ifShowSku = !this.ifShowSku;
      } else {
        this.ifShowSku = !this.ifShowSku;
      }
    },
    buyNo() {
      this.$toast("该功能暂未开放");
    },
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
.modal {
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100vw;
  /* calc是css中用来计算不同单位的方法，减号前后要空格 */
  height: calc(100vh - 50px);
  .modal_bg {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  .modal_content {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #fff;
    padding: 20px 4%;
    box-sizing: border-box;
    .top {
      display: flex;
      height: 50px;
      line-height: 50px;
      .right {
        margin-left: 10px;
        flex: 1;
      }
    }
    .close {
      position: absolute;
      right: 10px;
      top: 10px;
    }
    .down {
      margin-top: 50px;
      h3 {
        height: 50px;
        line-height: 50px;
      }
    }
  }
}
</style>