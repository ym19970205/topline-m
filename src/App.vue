<template>
  <div class="app">
    <router-view></router-view>
      <van-button type="default">默认按钮</van-button>
      <van-button type="primary">主要按钮</van-button>
      <van-button type="info">信息按钮</van-button>
      <van-button type="warning">警告按钮</van-button>
      <van-button type="danger">危险按钮</van-button>
      <p class="lizi">你好</p>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang='less' scoped>
.lizi{
  font-size: 15px;
  height: 200px;
  width: 200px;
  background-color: pink;
}
</style>
