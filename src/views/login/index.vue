<template>
  <div class="login">
     <van-nav-bar
        title="登录"
    />

<van-cell-group>
  <van-field
    v-model="user.mobile"
    label="用户名"
    placeholder="请输入用户名"
  />

  <van-field
    v-model="user.code"
    label="密码"
    placeholder="请输入密码"
  >
  <van-button
   v-if="buttonStates"
   slot="button"
   size="small"
   type="primary"
   @click="getSendSCode">获取验证码</van-button>
  <van-count-down slot="button" v-else
  millisecond
  :time="1000*60"
  format="ss s"
  @finish="buttonStates= true"
/>
  </van-field>
</van-cell-group>
<div class="login-btn-box">
    <van-button type="info" @click="onLogin">登录</van-button>
</div>
  </div>

</template>

<script>
import { login, getSmsCode } from '../../api/user'
export default {
  name: 'LoginPage',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      buttonStates: true // 是否显示倒计时
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLogin () {
      const user = this.user
      // 1.获取表单数据
      // 2.注册点击登录事件
      // 3.表单验证
      // 4.发请求提交
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0 // 持续展示 toast
      })
      try {
        const res = await login(user)
        console.log(res)

        this.$toast.success('登录成功')
      } catch (err) {
        console.log('登录失败', err)
        this.$toast.fail('登录失败')
      }
    },
    // 发送验证码点击事件
    async getSendSCode () {
    // 1. 获取手机号
      const { mobile } = this.user
      // 2.校验手机号

      // 3.发送验证码
      try {
      // 显示倒计时
        this.buttonStates = false
        // 发送
        await getSmsCode(mobile)
      } catch (error) {
        console.log(error)

        // 发送失败，显示按钮
        this.buttonStates = true

        // 判断操作过于频繁，给一个提示
        if (error.response.status === 429) {
          this.$toast('操作过于频繁')
          return
        }
        this.$toast.fail('发送失败')
      }
    }
  }

}
</script>

<style lang="less" scoped>
.login-btn-box{
     padding: 20px;
     .van-button{
         width: 100%;
         background-color: #6db4fb;
     }
}
</style>
