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
  <van-button slot="button" size="small" type="primary">获取验证码</van-button>
  </van-field>
</van-cell-group>
<div class="login-btn-box">
    <van-button type="info">登录</van-button>
</div>
  </div>

</template>

<script>
export default {
  name: 'LoginPage',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
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
