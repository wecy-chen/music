import storage from 'good-storage'
//本地存储数据的操作
const SEARCH_KEY = '__search__' //内存储的数据名
const SEARCH_MAX_LEN = 15 //最大的数据

const PLAY_KEY = '__play__'
const PLAY_MAX_LEN = 200 //播放最近的200首

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LEN = 200

function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare) //找数组的index
  if (index === 0) {
    return
  }
  if (index > 0) { //把当前的数组删掉
    arr.splice(index, 1)
  }
  arr.unshift(val) //加入数组的前面

  if (maxLen && arr.length > maxLen) {
    arr.pop() //达到最大的数据 把最后一个删掉
  }
}

//2.删除1个
function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}
//1.保存
export function saveSearch(query) {
  //最新的插在最前面
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LEN)
  storage.set(SEARCH_KEY, searches) //存储
  return searches
}

//2.删除1个搜索
export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}
//3.删除全部
export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}
//读取
export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

//保存播放的列表
export function savePlay(song) {
  let songs = storage.get(PLAY_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, PLAY_MAX_LEN)
  storage.set(PLAY_KEY, songs)
  return songs
}
//读
export function loadPlay() {
  return storage.get(PLAY_KEY, [])
}

export function saveFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, FAVORITE_MAX_LEN)
  storage.set(FAVORITE_KEY, songs)
  return songs
}

export function deleteFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  deleteFromArray(songs, (item) => {
    return item.id === song.id
  })
  storage.set(FAVORITE_KEY, songs)
  return songs
}

export function loadFavorite() {
  return storage.get(FAVORITE_KEY, [])
}

