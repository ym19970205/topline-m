import axios from 'axios'
import jsonBig from 'json-bigint'
// 这里的store和组件中的this.$store是一样的
import store from '../store'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})

// transformResponse是axios专门提供的一个API
// 它支持由用户来决定如何转换后端返回的数据
request.defaults.transformResponse = [function (data) {
  try {
    return jsonBig.parse(data)
  } catch (err) {
    return {}
  }
}]

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 统一设置Token,不是组件不能直接获取vuex容器
  const { user } = store.state
  // 判断一下有没有token，后端要求我们放到请求头中，使用名字Authorization
  if (user) {
    // config.headers用来获取本次的请求头，这是axios的固定API
    // 注意后端要求的token数据格式为 Bearer token
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

export default request
