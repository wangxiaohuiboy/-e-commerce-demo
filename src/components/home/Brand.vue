<template>
 <div class="brand">
     <div class="home_title">品牌制造商直供</div>
     <ul>
         <li v-for="item in brandList" :key="item.id">
             <img :src="item.pic_url" alt="">
             <h4>{{item.name}}</h4>
             <p>{{item.floor_price | filterMoney}}</p>
         </li>
     </ul>
 </div>
</template>
 
<script>
export default {
    props:["brandList"],
 data () {
 return {

 }
 }
}
</script>
 
<style lang = "less" scoped>
 .brand{
     width: 100%;
     text-align: center;
     background: #fff;
     margin-top: 20px;
     .home_title{
         font-size: 16px;
         color: #000;
         height: 50px;
         line-height: 50px;
     }
     ul{
          display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        li{
            width: 49%;
            position: relative;
            img{
                width: 100%;
            }
            h4{
                position: absolute;
                left: 10px;
                top: 10px;
                font-size: 16px;
                color: #000;
            }
            p{
                position: absolute;
                left: 10px;
                top: 30px;
                font-size: 14px;
                color: #6666;
            }
        }
     }
 }
</style>
