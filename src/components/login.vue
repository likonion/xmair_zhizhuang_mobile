<template>
  <div>
    <x-header :left-options="{showBack: false}">登录</x-header>

      <group>
        <x-input title="用户名" placeholder="请输入用户名" v-model="username" is-type="email"></x-input>
        <x-input title="密码" placeholder="请输入密码" v-model="password" type="password" ></x-input>
      </group>
    <box gap="10px 10px">
      <flexbox>
        <flexbox-item>
          <x-button type="primary" @click.native="login('')">登录</x-button>
          <toast v-model="showPositionValue" type="warn" :time="800" is-show-mask :text="toastTxt" :position="position"></toast>
          <div v-transfer-dom>
            <loading v-model="show1" :text="text1"></loading>
          </div>
        </flexbox-item>
      </flexbox>
    </box>
  </div>
</template>

<script>
  import { XHeader, Group, Box, XButton, Flexbox, FlexboxItem, XInput, Toast, Loading, TransferDomDirective as TransferDom } from 'vux'
  export default {
    data () {
      return {
        username: '',
        password: '',
        position: 'default',
        showPositionValue: false,
        toastTxt: '',
        show1: false,
        text1: 'Processing'
      }
    },
    directives: {
      TransferDom
    },
    created () {
    },
    components: {
      XHeader, Box, Group, XButton, Flexbox, FlexboxItem, XInput, Toast, Loading
    },
    methods: {
      login (position) {
//        if (!this.username || !this.password) {
//          this.position = position
//          this.showPositionValue = true
//          this.toastTxt = '用户名或密码不能为空'
//          return false
//        }
//
//        if (this.username == '123@123.com' && this.password == '123') {
//          this.$vux.loading.show({
//            text: 'Loading'
//          })
//          setTimeout(() => {
//            this.$router.push({path: '/home'})
//            this.$vux.loading.hide()
//          }, 1000)
//        } else {
//          this.showPositionValue = true
//          this.toastTxt = '用户名或密码不正确'
//        }
        this.$vux.loading.show({
            text: 'Loading'
          })
          setTimeout(() => {
            this.$router.push({path: '/home'})
            this.$vux.loading.hide()
          }, 1000)
      },

      reset () {
        this.username = ''
        this.password = ''
      }
    }
  }
</script>

<style></style>
