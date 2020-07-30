<template>
  <div>
    <div class="top">
      <img :src='brand.list_pic_url' width="100%" height="150px" alt />
      <div>{{brand.name}}</div>
    </div>
    <p class="centertext">{{brand.simple_desc}}</p>
  </div>
</template>
 
<script>
import { GetLBranDtailsAPI,GetBranDetailsGoodlistAPI } from "@/request/api";
export default {
  data() {
    return {
      brand: {},
    };
  },
  created() {
    this.GetBrandDetail();
    this.GetBrandDEtailGoodlist();
  },
  methods: {
    //  获取品牌详情
    GetBrandDetail() {
      GetLBranDtailsAPI({
        id: this.$route.params.id,
      }).then((res) => {
        let { brand } = res.data;
        this.brand = brand;
      });
    },
    // 获取品牌详情列表
    GetBrandDEtailGoodlist(){
        GetBranDetailsGoodlistAPI({
            brandId:this.$route.params.id,
            page:1,
            size:1000
        }).then(res=>{
            console.log(res);
        })
    }
  },
};
</script>
 
<style lang = "less" scoped>
.top{
    position: relative;
    img{
        display: block;
    }
    div{
        color: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        font-size: 20px;
        text-decoration: underline;
    }
}
.centertext{
    font-size: 18px;
    background: #fff;
    color: #666;
    padding: 20px 8px;
    text-align: center;
}
</style>