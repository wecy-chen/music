<template>
  <scroll class="listview"
          :data="data"
          ref="listview"
          :listenScroll="listenScroll"
          :probeType="probeType"
          @scroll="scroll"
  >
  <ul>
    <li v-for="group in data" class="list-group" ref="listGroup">
      <h2 class="list-group-title">{{group.title}}</h2>
      <ul>
        <li @click="selectItem(item)" v-for="item in group.items" class="list-group-item">
          <img v-lazy="item.avatar" class="avatar">
          <span class="name">{{item.name}}</span>
        </li>
      </ul>
    </li>
  </ul>
    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li v-for="(item,index) in shortcutList" class="item" :data-index="index" :class="{'current':currentIndex===index}">
          {{item}}
        </li>
      </ul>
    </div>
    <div class="list-fixed" ref="fixed" v-show="fixedTitle">
      <div class="fixed-title">{{fixedTitle}} </div>
    </div>
  </scroll>
</template>
<script>
  import Scroll from 'base/scroll/scroll'
  import {getData} from "common/js/dom"

  const TITLE_HEIGHT = 30 //标题的高度
  const ANCHOR_HEIGHT = 18 //导航A-Z的高度

 export default {
    created(){ //没有放在data属性里不需要观察数据变化
      this.touch={}
      this.listenScroll=true
      this.probeType=3//默认是1 设置3防止节流
      this.listHeight = []
    },
   data() {
     return {
       scrollY: -1,
       currentIndex: 0,
       diff: -1 //表示上限 A-z标题滚动差
     }
   },
   props: {
     data: {
       type: Array,
       default: []
     }
   },
   methods:{
     selectItem(item){
       this.$emit('select',item)
     },
     onShortcutTouchStart(e) {
       let anchorIndex = getData(e.target, 'index') //获取点击的index
       let firstTouch = e.touches[0] //一个触摸点
       this.touch.y1 = firstTouch.pageY //y
       this.touch.anchorIndex=anchorIndex
       this._scrollTo(this.touch.anchorIndex)
     },
     onShortcutTouchMove(e){
       let moveTouch=e.touches[0];
       this.touch.y2=moveTouch.pageY
       let dis=(this.touch.y2-this.touch.y1)/ANCHOR_HEIGHT|0 //触摸偏移 向下取整
       let newIndex=parseInt(this.touch.anchorIndex)+dis;
       this._scrollTo(newIndex)
     },
     scroll(pos){
        this.scrollY=pos.y
     },
     _scrollTo(index){
       if (!index && index !== 0) { //处理ui布局多余的空白undefined
         return
       }
       if (index < 0) { //index 边界的情况
         index = 0
       } else if (index > this.listHeight.length - 2) {
         index = this.listHeight.length - 2
       }
       this.scrollY = -this.listHeight[index]//A-z对应

       this.$refs.listview.scrollToElement(this.$refs.listGroup[index],0)//滚动到目标元素 0动画时间
     },
    _calculatedHeight(){
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight//单元高
        this.listHeight.push(height)
      }
    },
    refresh(){
      this.$refs.listview.refresh()
    }
   },
   watch:{
     data(){
       setTimeout(()=>{
         this._calculatedHeight()
       },20)
     },
     scrollY(newY){
       const listHeight = this.listHeight
       // 当滚动到顶部，newY>0
       if (newY > 0) {
         this.currentIndex = 0
         return
       }
       // 在中间部分滚动
       for (let i = 0; i < listHeight.length - 1; i++) {
         let height1 = listHeight[i]
         let height2 = listHeight[i + 1]
         if (-newY >= height1 && -newY < height2) {
           this.currentIndex = i
           this.diff = height2 + newY//表示固定滚动的两个标题之间的距离
           return
         }
       }
       // 当滚动到底部，且-newY大于最后一个元素的上限
       this.currentIndex = listHeight.length - 2
     },
     diff(newVal) {
       let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
       if (this.fixedTop === fixedTop) {
         return
       }
       this.fixedTop = fixedTop
       this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
     }
   },
   computed:{
     shortcutList() {
       return this.data.map((group) => {
         return group.title.substr(0, 1) //热
       })
     },
     fixedTitle() {
       if (this.scrollY > 0) {
         return ''
       }
       return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
     }
   },
   components:{
     Scroll
   }
 }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
