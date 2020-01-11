<template>
  <div class="home-container">
      <!--导航栏-->
     <van-nav-bar title="首页" />

      <!--频道列表-->
      <van-tabs v-model="active">
        <van-tab
        v-for="item in userChannels"
        :title="item.name"
        :key="item.id"
        ></van-tab>
      <!--文章列表-->
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="item in list"
          :key="item"
          :title="item"
        />
      </van-list>
      </van-pull-refresh>
      <!--文章列表-->

      </van-tabs>
      <!--频道列表-->

  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
export default {
  name: 'HomePage',
  components: {},
  props: {},
  data () {
    return {
      active: 0,
      // 获取频道列表
      userChannels: [],
      list: [],
      loading: false,
      finished: false,
      count: 0,
      isLoading: false
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
    },
    // 文章列表自动加载数据
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    },
    // 文章列表下拉刷新
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
        this.count++
      }, 1000)
    }

  }

}
</script>

<style scoped>

</style>
