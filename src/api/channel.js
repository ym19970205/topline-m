/**
 * 获取频道接口模块
 */
import request from '@/utils/request'

/**
 * 获取所有的频道列表
 */
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'

  })
}
