export const setItem = (name, value) => {
  // 对value做一下处理，本地储存的数据类型只能是字符串
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}
export const getItem = (name) => {
  // 判断：如果是JSON字符串，需要把它转换为对象
  const data = window.localStorage.getItem(name)
  try {
    // 我们不需要判断它是不是JSON字符串，逆向：
    // 我们可以先把它转为 JSON转对象试一下 如果成功就执行try,如果失败了就鸳鸯返回数据
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}
export const removeItem = (name) => {
  window.localStorage.removeItem(name)
}
