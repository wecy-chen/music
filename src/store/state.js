import {playMode} from 'common/js/config'
import {loadSearch,loadPlay,loadFavorite} from 'common/js/cache'
const state={
  singer:{},
  playing:false,//播放状态
  fullScreen:false,//全屏模式
  playlist:[],//播放列表
  sequenceList:[],//顺序列表
  mode:playMode.sequence,//顺序播放
  currentIndex:-1, //前进后退
  disc:{}, // 详情列表
  topList:{}, // 排行榜
  searchHistory:loadSearch(), //获取本地搜索历史
  playHistory:loadPlay(), //读取播放历史
  favoriteList: loadFavorite()  //加载喜欢的歌曲
}
export default state
