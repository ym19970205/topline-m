<template>
  <div class="home-container">
      <!--导航栏-->
     <van-nav-bar title="首页" fixed/>

      <!--频道列表-->
      <van-tabs v-model="active">
        <van-icon
        name="wap-nav"
        slot="nav-right"
        @click="show=true"
        />
        <van-tab
        v-for="channel in userChannels"
        :title="channel.name"
        :key="channel.id"
        >
      <!--文章列表-->
      <article-list :channel="channel"></article-list>
      </van-tab>
    </van-tabs>
      <!--频道列表-->

      <!--Popup 弹出层-->
      <van-popup
        v-model="show"
        position="bottom"
        closeable
        close-icon-position="top-left"
        :style="{ height: '100%' }"
      />

  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
export default {
  name: 'HomePage',
  components: {
    ArticleList

  },
  props: {},
  data () {
    return {
      active: 0,
      // 获取频道列表
      userChannels: [],
      show: false // 是否显示我的频道
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserChannels()
  },
  mounted () {

  },
  methods: {
    // 获取频道列表
    async loadUserChannels () {
      const { data } = await getUserChannels()
      this.userChannels = data.data.channels
    }

  }

}
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 90px;
  padding-bottom: 50px;
  .wap-nav {
    position: fixed;
    right: 0;
    line-height: 44px;
    background: #fff;
  }
}

/* 在有作用域样式的组件中：默认只能对子组件的根节点样式生效 */

// .vue 文件中有一个专有的特殊语法：让样式作用的更深（主要针对的子组件）
// 使用 >>>、/deep/、::v-deep
::v-deep .van-tabs__wrap {
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  z-index: 2;
}
.van-icon {
    position: fixed;
    right: 0px;
    line-height: 44px;
    background-color: #fff;
}

</style>
