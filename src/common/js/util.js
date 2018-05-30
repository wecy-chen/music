function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
  let _arr=arr.slice() //不会修改原数组
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]   //当前的与以前随机的交换位置
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}
export function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}
//节流
export function debounce(func, delay) {
  let timer

  return function (...args) {  //返回函数
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => { //延时执行
      func.apply(this, args)
    }, delay)
  }
}


