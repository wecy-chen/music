<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div ref='shortcutWrapper' class="shortcut-wrapper" v-show="!query">
    <scroll :refreshDelay='refreshDelay' class="shortcut" ref='shortcut' :data="shortcut">
      <div>
      <div class="hot-key">
      <h1 class="title">热门搜索</h1>
      <ul>
        <li @click='addQuery(item.k)' class="item" v-for="item in hotkey">
          <span>{{item.k}}</span>
        </li>
      </ul>
      </div>
      <div class="search-history" v-show="searchHistory.length">
        <h1 class="title">
          <span class="text">搜索历史</span>
          <span class="clear" @click="showConfirm">
                <i class="icon-clear"></i>
              </span>
        </h1>
        <search-list
          @select="addQuery"
          @delete="deleteSearchHistory"
          :searches="searchHistory"
        ></search-list>
      </div>
      </div>
    </scroll>
    </div>
    <div ref='searchResult' class="search-result" v-show="query">
      <suggest ref='suggest' @select='saveSearch' :query="query" @listScroll="blurInput"></suggest>
    </div>
    <confirm ref="confirm"
             text="是否删除所有历史"
             confirmBtnText="清空"
             @confirm="clearSearchHistory"
    >
    </confirm>
    <router-view></router-view>
  </div>
</template>
<script>
  import SearchBox from 'base/search-box/search-box'
  import {getHotKey} from 'api/search'
  import {ERR_OK} from 'api/config'
  import {mapActions,mapGetters} from 'vuex'

  import  Suggest from 'components/suggest/suggest'
  import  searchList from 'base/search-list/search-list'
  import  Confirm from 'base/confirm/confirm'
  import Scroll from 'base/scroll/scroll'

  import {playlistMixin,searchMixin} from 'common/js/mixin'

  export default {
    mixins:[playlistMixin,searchMixin],
    data() {
      return {
        hotkey:[],
        //query:''// mixins
      }
    },
    created(){
      this._getHotKey()
    },
    methods: {
      handlePlaylist(playlist) { //底部播放器加bottom值
        const bottom = playlist.length > 0 ? '60px' : ''

        this.$refs.searchResult.style.bottom = bottom
        this.$refs.suggest.refresh() //suggest组件下的refresh方法

        this.$refs.shortcutWrapper.style.bottom = bottom
        this.$refs.shortcut.refresh()
      },

      showConfirm(){ //删除全部提醒
        this.$refs.confirm.show()
      },
//      deleteAll(){
//        this.clearSearchHistory()
//      },
//      deleteOne(item){ //删除一个
//        this.deleteSearchHistory(item)
//      },


//      saveSearch(){//保存搜索结果  //mixins
//        this.saveSearchHistory(this.query)
//      },
//      blurInput(){ //失去焦点输入键盘隐藏
//        this.$refs.searchBox.blur() //手机上可以演示
//      },
//      addQuery(query){
//        this.$refs.searchBox.setQuery(query) //填入关键词
//      },
//      onQueryChange(query){
//        this.query=query
//      },
      _getHotKey(){
        getHotKey().then(res=>{
          if(res.code===ERR_OK){
            //console.log(res.data.hotkey)
            this.hotkey=res.data.hotkey.slice(0,10)
          }
        })
    },
      ...mapActions([   //mixin
        //'saveSearchHistory',
        //'deleteSearchHistory',
        'clearSearchHistory'
      ])
    },
    computed: {
      shortcut(){ //滚动的两个值改变
        return this.hotkey.concat(this.searchHistory)
      },
//      ...mapGetters([  //mixins
//        'searchHistory',
//      ])
    },
    watch:{
      query(newQuery){
        if(!newQuery){ //搜索到再时候刷新
          setTimeout(()=>{
            this.$refs.shortcut.refresh()
          },20)
        }
      }
    },
    components: {
      SearchBox,
      Suggest,
      searchList,
      Confirm,
      Scroll
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>
