<template>
  <div style="padding-bottom:150px">
    <Safeguard></Safeguard>
    <van-checkbox-group v-model="result" ref="checkboxGroup">
      <van-checkbox
        :name="item.id"
        @click="checkboxClick(item)"
        v-for="item in cartList"
        :key="item.id"
        :disabled="editStatus"
      >
        <van-swipe-cell>
          <van-card
            :num="item.number"
            :price="item.retail_price.toFixed(2)"
            :title="item.goods_name"
            :thumb="item.list_pic_url"
          >
            <template #footer>
              <van-stepper
                v-model="item.number"
                v-if="editStatus"
                @change="stepChange(item)"
                min="1"
              />
            </template>
          </van-card>
          <template #right>
            <van-button square text="删除" type="danger" class="delete-button" @click="delProduct(item.product_id)" />
          </template>
        </van-swipe-cell>
      </van-checkbox>
    </van-checkbox-group>
    <van-submit-bar :price="cartTotal.checkedGoodsAmount*100" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checkAll" @click="checkAllFn">全选</van-checkbox>
      <template #tip>
        累计共{{cartList.length}}件商品，可点击
        <van-button
          :type="editStatus?'danger':'primary'"
          size="small"
          @click="editStatus=!editStatus"
        >{{editStatus?'完成编辑':'编辑'}}</van-button>按钮进行商品数量修改
      </template>
    </van-submit-bar>
  </div>
</template>
 
<script>
import Safeguard from "@/components/Safeguard";
import { GetCartDataAPI, SelectedGoodsAPI, StepAPI,DeleteCart } from "@/request/api";
export default {
  components: {
    Safeguard,
  },
  created() {
    GetCartDataAPI().then((res) => {
      this.totalFn(res.data);
      console.log(res);
    });
  },
  data() {
    return {
      value: 1,
      //购物车数组列表
      cartList: [],
      //购物车总数据
      cartTotal: {},
      //result数组中的值要跟name的值对应上，此时表示选中
      result: ["a"],
      //全选
      checkAll: false,
      // 编辑按钮切换
      editStatus: false,
    };
  },
  methods: {
    onSubmit() {},
    // 复选框点击事件
    checkboxClick(item) {
      let arr = [];
      arr.push(item.product_id);
      //editStatus为真，表示显示步进器，此时阻止当前复选框点击事件
      if (this.editStatus) {
        return;
      } else {
        SelectedGoodsAPI({
          isChecked: item.checked ? 0 : 1,
          productIds: arr.join(),
        }).then((res) => {
          this.totalFn(res.data);
        });
      }
    },
    // 步进器点击事件
    stepChange(item) {
      console.log(item);
      StepAPI({
        goodsId: item.goods_id,
        id: item.id,
        number: item.number,
        productId: item.product_id,
      }).then((res) => {
        this.totalFn(res.data);
      });
    },
    // 封装一个公用的函数
    totalFn(obj) {
      let { cartList, cartTotal } = obj;
      this.cartList = cartList;
      this.cartTotal = cartTotal;
      this.result = [];
      cartList.forEach((el) => {
        if (el.checked == 1) {
          this.result.push(el.id);
        } else {
          this.result.push("");
        }
      });
      // 全选和反选
      this.checkAll = this.cartTotal.checkedGoodsCount = this.cartTotal.goodsCount;
    },
    // 点击了全选和取消
    checkAllFn() {
      console.log("123");
      let arr = [];
      this.cartList.map((val) => {
        arr.push(val.product_id);
      });
      SelectedGoodsAPI({
        isChecked: this.checkAll ? 1 : 0,
        productIds: arr.join(),
      }).then((res) => {
        if (res.errno == 0) {
          this.totalFn(res.data);
        }
      });
    },
    // 删除商品
    delProduct(id){
      DeleteCart({
        productIds:id.toString()
      }).then(res=>{
        this.totalFn(res.data);
      })
    }
  },
};
</script>
 
<style lang = "less" scoped>
.van-checkbox-group {
  background: #fff;
  .van-checkbox {
    border-bottom: 1px solid #ccc;
    padding: 10px 4%;
  }
  /deep/.van-checkbox__label {
    flex: 1;
  }
}
.van-submit-bar {
  bottom: 49px;
  border-bottom: 1px solid #ccc;
}
.van-swipe-cell__right{
  .van-button{
    height: 100%;
    margin-left: 1px;
  }
}
</style>