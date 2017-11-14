<template>
  <div style="">
    <blur :blur-amount=40 :url="url">
      <p class="center"><img :src="url"></p>
    </blur>
    <group title="登录信息">
      <cell title="账号" value="123@123.com"></cell>
      <cell title="密码" value="123@123.com"></cell>
    </group>
    <group title="订阅">
      <x-switch title="待处理提醒" ></x-switch>
      <x-switch title="短信提醒" ></x-switch>
    </group>
  </div>
</template>

<script>
  import { Flexbox, FlexboxItem, Blur, XHeader, Group, Cell, XSwitch } from 'vux'

  export default {
    components: {
      Blur, Flexbox, FlexboxItem, XHeader, Group, Cell, XSwitch
    },
    data () {
      return {
        url: 'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg'
      }
    }
  }
</script>

<style scoped>
  .center {
    text-align: center;
    padding-top: 20px;
    color: #fff;
    font-size: 18px;
  }

  .center img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 4px solid #ececec;
  }
</style>
