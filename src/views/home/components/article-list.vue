<template>
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
</template>

<script>
export default {
  name: 'ArticleList',
  components: {},
  //   props: {
  //     // 频道对象，父组件提供
  //     channel: {
  //       type: Object,
  //       required: true
  //     }
  //   },
  props: {
    // 频道对象，父组件提供
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      isLoading: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 文章列表自动加载数据
    onLoad () {
      // 1.请求获取数据
      setTimeout(() => {
        // 2.把请求获取到的数据添加到数组列表中
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 3.加载状态结束
        this.loading = false

        // 4.数据全部加载完成
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

<style>

</style>
