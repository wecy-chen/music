webpackJsonp([2],{D0YI:function(e,t){},"W1+L":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=i("Dd8w"),n=i.n(s),r=i("qwAB"),a=i("3Q4o"),o=i("GQaK"),c={name:"slider",props:{loop:{type:Boolean,default:!0},autoPlay:{type:Boolean,default:!0},interval:{type:Number,default:4e3}},data:function(){return{dots:[],currentPageIndex:0}},mounted:function(){var e=this;setTimeout(function(){e._setSliderWidth(),e._initDots(),e._initSlider(),e.autoPlay&&e._play()},20),window.addEventListener("resize",function(){e.slider&&(e._setSliderWidth(!0),e.slider.refresh())})},methods:{_setSliderWidth:function(e){this.children=this.$refs.sliderGroup.children;for(var t=0,i=this.$refs.slider.clientWidth,s=0;s<this.children.length;s++){var n=this.children[s];Object(a.a)(n,"slider-item"),n.style.width=i+"px",t+=i}this.loop&&!e&&(t+=2*i),this.$refs.sliderGroup.style.width=t+"px"},_initDots:function(){this.dots=new Array(this.children.length)},_initSlider:function(){var e=this;this.slider=new o.a(this.$refs.slider,{scrollX:!0,scrollY:!1,momentum:!1,snap:{loop:this.loop,threshold:.4},snapSpeed:400,click:!0}),this.slider.on("scrollEnd",function(){var t=e.slider.getCurrentPage().pageX;e.currentPageIndex=t,e.autoPlay&&(clearTimeout(e.timer),e._play())})},_play:function(){var e=this;this.timer=setTimeout(function(){e.slider.next()},this.interval)}},destroyed:function(){clearTimeout(this.timer)}},d={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{ref:"slider",staticClass:"slider"},[i("div",{ref:"sliderGroup",staticClass:"slider-group"},[e._t("default")],2),e._v(" "),i("div",{staticClass:"dots"},e._l(e.dots,function(t,s){return i("span",{staticClass:"dot",class:{active:e.currentPageIndex===s}})}))])},staticRenderFns:[]};var l=i("VU/8")(c,d,!1,function(e){i("D0YI")},"data-v-5840bbde",null).exports,u=i("y/jF"),h=i("m40h"),m=i("T452"),f=i("F4+m"),p=i("NYxO"),v={mixins:[f.b],data:function(){return{recommends:[],discList:[]}},created:function(){this._getRecommend(),this._getDiscList()},methods:n()({_getRecommend:function(){var e=this;Object(h.b)().then(function(t){t.code===m.a&&(e.recommends=t.data.slider)})},_getDiscList:function(){var e=this;Object(h.a)().then(function(t){t.code===m.a&&(e.discList=t.data.list)})},loadImage:function(){this.checkLoaded||(this.$refs.scroll.refresh(),this.checkLoaded=!0)},handlePlaylist:function(e){var t=e.length>0?"60px":"";this.$refs.recommend.style.bottom=t,this.$refs.scroll.refresh()},selectItem:function(e){this.$router.push({path:"/recommend/"+e.dissid}),this.setDisc(e)}},Object(p.d)({setDisc:"SET_DISC"})),components:{Slider:l,Scroll:r.a,Loading:u.a}},g={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{ref:"recommend",staticClass:"recommend"},[i("scroll",{ref:"scroll",staticClass:"recommend-content",attrs:{data:e.discList}},[i("div",[e.recommends.length?i("div",{ref:"sliderWrapper",staticClass:"slider-wrapper"},[i("slider",e._l(e.recommends,function(t){return i("div",[i("a",{attrs:{href:t.linkUrl}},[i("img",{staticClass:"needsclick",attrs:{src:t.picUrl},on:{load:e.loadImage}})])])}))],1):e._e(),e._v(" "),i("div",{staticClass:"recommend-list"},[i("h1",{staticClass:"list-title"},[e._v("热门歌单推荐")]),e._v(" "),i("ul",e._l(e.discList,function(t){return i("li",{staticClass:"item",on:{click:function(i){e.selectItem(t)}}},[i("div",{staticClass:"icon"},[i("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.imgurl,expression:"item.imgurl"}],attrs:{width:"60",height:"60"}})]),e._v(" "),i("div",{staticClass:"text"},[i("h2",{staticClass:"name",domProps:{innerHTML:e._s(t.creator.name)}}),e._v(" "),i("p",{staticClass:"desc",domProps:{innerHTML:e._s(t.dissname)}})])])}))])]),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:!e.discList.length,expression:"!discList.length"}],staticClass:"loading-container"},[i("loading")],1)]),e._v(" "),i("router-view")],1)},staticRenderFns:[]};var _=i("VU/8")(v,g,!1,function(e){i("ed/g")},"data-v-73a11f30",null);t.default=_.exports},"ed/g":function(e,t){},m40h:function(e,t,i){"use strict";t.b=function(){var e=a()({},c.b,{platform:"h5",uin:0,needNewCode:1});return Object(o.a)("https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg",e,c.c)},t.a=function(){var e=a()({},c.b,{platform:"yqq",hostUin:0,sin:0,ein:29,sortId:5,needNewCode:0,categoryId:1e7,rnd:Math.random(),format:"json"});return l.a.get("/api/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg",{params:e}).then(function(e){return n.a.resolve(e.data)})},t.c=function(e){var t=a()({},c.b,{disstid:e,type:1,json:1,utf8:1,onlysong:0,platform:"yqq",hostUin:0,needNewCode:0,format:"json"});return l.a.get("/api/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg",{params:t}).then(function(e){return n.a.resolve(e.data)})};var s=i("//Fk"),n=i.n(s),r=i("woOf"),a=i.n(r),o=i("Gak4"),c=i("T452"),d=i("mtWM"),l=i.n(d)}});
//# sourceMappingURL=2.42182b3be6a0836ed4be.js.map