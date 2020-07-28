<template>
  <div>
    <div class="top" @click="loginFn">
      <van-image round width="80px" height="80px" :src="avatar" />
      <div class="right">
        <h4>点击登陆</h4>
        <span>&gt;</span>
      </div>
    </div>
    <van-grid :column-num="3" square>
      <van-grid-item v-for="(item,index) in arr" :key="index" :icon="item.icon" :text="item.text" />
    </van-grid>
    <div class="login_box" v-if="modal_show">
      <div class="login_bg" @click="close_modal"></div>
      <div class="login_content">
        <van-form @submit="onSubmit">
          <van-field
            v-model="username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">提交</van-button>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>
 
<script>
// import {LoginRegisterApI} from "@/request/api"
var avatar = require("@/assets/avatar.png");
export default {
  data() {
    return {
      avatar: avatar,
      modal_show: false,
       username: '',
      password: '',
      arr: [
        {
          icon: "label-o",
          text: "我的订单",
        },
        {
          icon: "bill-o",
          text: "优惠券",
        },
        {
          icon: "goods-collect-o",
          text: "礼品卡",
        },
        {
          icon: "location-o",
          text: "我的收藏",
        },
        {
          icon: "flag-o",
          text: "我的足迹",
        },
        {
          icon: "contact",
          text: "会员福利",
        },
        {
          icon: "aim",
          text: "地址管理",
        },
        {
          icon: "warn-o",
          text: "账号安全",
        },
        {
          icon: "service-o",
          text: "联系客服",
        },
        {
          icon: "question-o",
          text: "帮助中心",
        },
        {
          icon: "smile-comment-o",
          text: "意见反馈",
        },
      ],
    };
  },
  created() {
    //   LoginRegisterApI({
    //       username:,
    //       pwd:,
    //   }).then(res=>{
    //   })
  },
  methods: {
    close_modal() {
        this.modal_show = false
    },
    onSubmit(values) {
      console.log('submit', values);
    },
    loginFn(){
        this.modal_show = true
    }
  },
};
</script>
 
<style lang = "less" scoped>
.top {
  background: #333;
  color: #fff;
  padding: 30px 4%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .right {
    flex: 1;
    margin-left: 10px;
    display: flex;
    justify-content: space-between;
    font-size: 18px;
  }
}
.login_box {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 997;
  .login_bg {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  .login_content {
    width: 90%;
    background: #fff;
    position: absolute;
    left: 50%;
    margin-left:-45%;
    top: 40%;
    padding-top: 10px;
  }
}
</style>