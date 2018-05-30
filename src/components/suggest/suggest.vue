<template>
  <scroll class="suggest"
          :data="result"
          :pullup="pullup"
          @scrollToEnd="searchMore"
          ref="suggest"
          :beforeScroll="beforeScroll"
          @beforeScroll="listScroll"
  >
    <ul class="suggest-list">
      <li @click="selectItem(item)" class="suggest-item" v-for="item in result">
        <div class="icon">
          <i :class="geticonCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>
    <div v-show='!hasMore&&!result.length' class="no-result-wrapper">
      <no-result title="抱歉,暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>
<script type='text/ecmascript-6'>
  import {search} from 'api/search'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'

  import Scroll from "base/scroll/scroll"
  import Loading from 'base/loading/loading'
  import noResult from 'base/no-result/no-result'

  import Singer from 'common/js/singer'

  import {mapMutations,mapActions} from 'vuex'

  const TYPE_SINGER='singer'
  const perpage = 20 //每一页返回的个数

export default {
  props:{
    query:{
      type:String,
      default:''
    },
    showSinger:{ //检索到歌手
      type:Boolean,
      default:true
    }
  },
  data() {
    return {
      page:1,
      result:[],
      pullup:true,
      hasMore:true,
      beforeScroll:true //开始滑动 隐藏手机键盘
    }
  },
  methods: {
    refresh(){
      this.$refs.suggest.refresh()
    },
    listScroll(){
      this.$emit('listScroll')
    },
    searchMore(){ //下拉刷新更多
      if(!this.hasMore){
        return
      }
      this.page++
      search(this.query, this.page, this.showSinger, perpage).then((res) => {
        if (res.code === ERR_OK) {
          this.result = this.result.concat(this._getResult(res.data))
          this._checkMore(res.data)
        }
      })
    },
    search(){ //请求服务端搜索检索数据 //检索关键词
      this.page=1
      this.hasMore=true
      this.$refs.suggest.scrollTo(0,0)// 重置滚动
      search(this.query,this.page,this.showSinger,perpage).then(res=>{
        if(res.code===ERR_OK){
          this.result=this._getResult(res.data)
          this._checkMore(res.data)
        }
      })
    },
    _getResult(data){
      let ret=[]
      if(data.zhida&&data.zhida.singerid){
        //console.log(data.zhida)
        ret.push({...data.zhida,...{type:TYPE_SINGER}}) //添加到一个对象上
      }
      if(data.song){
        ret=ret.concat(this._normalizeSongs(data.song.list))
      }
      return ret
    },
    geticonCls(item){ //样式
      if(item.type===TYPE_SINGER){
        return "icon-mine"
      }else {
        return 'icon-music'
      }
    },
    getDisplayName(item){
      if(item.type===TYPE_SINGER){
        return item.singername
      }else{
        return `${item.name}-${item.singer}`
      }
    },
    _normalizeSongs(list){
      let ret=[]
      list.forEach(musicData=>{
        if(musicData.songid&&musicData.albumid){
          ret.push(createSong(musicData))
        }
      })
      return ret
    },
    _checkMore(data){
      const song = data.song
      if (!song.list.length || (song.curnum + song.curpage * perpage) > song.totalnum) {
        this.hasMore = false
      }
    },
    selectItem(item){
      if(item.type===TYPE_SINGER){
        const singer=new Singer({
          id:item.singermid,
          name:item.singername
        })
        this.$router.push({
          path:`/search/${singer.id}`
        })
        this.setSinger(singer)
      }else{
        this.insertSong(item)
      }
      this.$emit('select')  //外组件操作历史记录
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions([
      'insertSong'
    ])
  },
  watch:{
    query(){
      this.search()
    }
  },
  computed: {},
  components: {
    Scroll,
    Loading,
    noResult  //搜索不到的结果
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
