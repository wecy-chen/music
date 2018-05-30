<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  export default {
    props: {
      probeType: { //滑动速度的监听
        type: Number,
        default: 1
      },
      click: { // 点击
        type: Boolean,
        default: true
      },
      listenScroll: { //监听滚动事件
        type: Boolean,
        default: false
      },
      data: { // 动态变化
        type: Array,
        default: null
      },
      pullup: {
        type: Boolean,
        default: false
      },
      beforeScroll: { //
        type: Boolean,
        default: false
      },
      refreshDelay: { //刷新的时间
        type: Number,
        default: 20
      },
      pullup:{  //下拉刷新
        type:Boolean,
        default:false
      }
    },
    mounted() {
      setTimeout(() => { //确保DOM的渲染
        this._initScroll() //初始化方法
      }, 20)
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) { //没有值
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,//滑动速度监听 1
          click: this.click //true
        })

        if (this.listenScroll) {//监听滚动事件
          let me = this
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos) //派发scroll事件 拿到位置
          })
        }

        if (this.pullup) {
          this.scroll.on('scrollEnd', () => { //
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd')  //下拉
            }
          })
        }

        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      disable() { //关
        this.scroll && this.scroll.disable()
      },
      enable() { //开
        this.scroll && this.scroll.enable()
      },
      refresh() { //刷新
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {//滚动到
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {// 滚动到DOM元素
        this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments)
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)//默认刷新的20ms
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
