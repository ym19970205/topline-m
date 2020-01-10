<template>
  <div class="login">
     <van-nav-bar
        title="登录"
    />
<!--
  使用表单验证
  1、使用 ValidationObserver 把需要校验的整个表单包起来

2、使用 ValidationProvider 把需要校验的具体表单元素包起来，例如 input

3、通过 ValidationProvider 配置具体的校验规则

name 配置验证字段的名称

rules 验证规则

rules="requried" 单个验证规则
rules="required|length:4" 多个验证规则使用 | 分隔
v-slot="{ errors }" 获取错误消息，使用 errors[0] 绑定展示错误消息
-->
<ValidationObserver ref="form">
  <ValidationProvider name="手机号" rules="required|mobile">
  <van-field
    v-model="user.mobile"
    label="手机号"
    placeholder="请输入手机号"
  >
  </van-field>
  <!-- <span>{{errors[0]}}</span> -->
  </ValidationProvider>

  <ValidationProvider name="验证码" rules="required|code">
  <van-field
    v-model="user.code"
    label="验证码"
    placeholder="请输入验证码"
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
  </ValidationProvider>
</ValidationObserver>
<div class="login-btn-box">
    <van-button type="info" @click="onLogin">登录</van-button>
</div>
  </div>

</template>

<script>
import { login, getSmsCode } from '../../api/user'
import { validate } from 'vee-validate'
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
    // 验证规则
    async onLogin () {
      const user = this.user
      // 验证规则
      const success = await this.$refs.form.validate()
      // 如果验证失败 提示错误消息
      if (!success) {
        setTimeout(() => {
          // console.log(this.$refs.form.errors)

          // 得到错误消息
          const errors = this.$refs.form.errors
          // 显示有错误的第一个数组中的提示信息，遍历数据
          const item = Object.values(errors).find(item => {
            // item：['错误消息']
            return item[0]
          })
          this.$toast(item[0])
        }, 200)
        return
      }

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
      // 如果验证失败，提示错误消息，停止发送验证码
      // 参数1：要验证的数据
      // 参数2：验证规则
      // 参数3：一个可选的配置对象，例如配置错误消息字段名称 name
      // 返回值：{ valid, errors, ... }
      //          valid: 验证是否成功，成功 true，失败 false
      //          errors：一个数组，错误提示消息
      const validateResult = await validate(mobile, 'required|mobile', {
        name: '手机号'
      })

      if (!validateResult.valid) {
        this.$toast(validateResult.errors[0])
        return
      }
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
