<template>
  <div class="home-container">
      <!--导航栏-->
     <van-nav-bar title="首页" />

      <!--频道列表-->
      <van-tabs v-model="active">
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
      userChannels: []
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

<style scoped>

</style>
