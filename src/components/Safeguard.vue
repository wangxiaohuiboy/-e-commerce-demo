<template>
  <van-row>
    <van-col span="8">
        <van-icon name="checked" color="#4FC08D" /> 30天无忧退货
        </van-col>
    <van-col span="8">
        <van-icon name="checked" color="#4FC08D" /> 48小时快速退费
        </van-col>
    <van-col span="8">
        <van-icon name="checked" color="#4FC08D" /> 满88元免邮费
        </van-col>
  </van-row>
</template>
 
<script>
export default {
  data() {
    return {};
  },
};
</script>
 
<style lang = "less" scoped>
.van-row{
    height: 2rem;
    line-height: 2rem;
    .van-col{
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        .van-icon{
            margin-right: 4px;
        }
    }
}
</style>