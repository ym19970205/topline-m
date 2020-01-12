<template>
  <div class="channel-edit">
      <!--我的频道-->
      <van-cell title="我的频道">
          <van-button size="mini" round type="danger" plain>编辑</van-button>
      </van-cell>
          <van-grid :gutter="10">
            <van-grid-item
              v-for="channel in userChannels"
              :key="channel.id"
              :text="channel.name"
            />
          </van-grid>
      <!--推荐频道-->
      <van-cell title="推荐频道">
      </van-cell>
          <van-grid :gutter="10">
            <van-grid-item
              v-for="channel in remainingChannels"
              :key="channel.id"
              :text="channel.name"
              @click="onChannelAdd(channel)"
            />
          </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    userChannels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      allChannels: [] // 接收所有的频道
    }
  },
  computed: {
    remainingChannels () {
      // 剩余频道=所有频道-我的频道
      const { userChannels, allChannels } = this
      const channels = []
      // 遍历所有频道
      allChannels.forEach(item => {
        if (!userChannels.find(c => c.id === item.id)) {
          channels.push(item)
        }
      })
      return channels
    }
  },
  watch: {},
  created () {
    this.loadAllChannels()
  },
  mounted () {},
  methods: {
    // 点击推荐频道按钮添加到我的频道
    onChannelAdd (channel) {
      this.userChannels.push(channel)
    },
    // 获取所有频道列表
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    }
  }
}
</script>

<style scoped lang='less'>
.channel-edit {
  padding: 40px 0;
  ::v-deep .van-grid-item__content {
    position: relative;
    .van-grid-item__icon-wrapper {
      position: absolute;
      top: -10px;
      right: -5px;
      .close-icon {
        font-size: 16px;
      }
    }
  }
  .text {
    font-size: 14px;
  }
  .active {
    color: red;
  }
}
</style>
