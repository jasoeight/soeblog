webpackJsonp([18],{1297:function(e,t,n){var a=n(626)(n(1373),n(1377),null,null);e.exports=a.exports},1373:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(169),r=n.n(a),i=n(168),s=n.n(i),o=n(320),u=n(1376);n.n(u);t.default={name:"frontend-journey-other-journeys",components:{Carousel:u.Carousel,Slide:u.Slide},data:function(){return{journeys:[],init:!1}},methods:{triggerPageAdvance:function(e){this.$refs.carousel.advancePage(e)}},mounted:function(){var e=this;return s()(r.a.mark(function t(){var n;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.a();case 2:n=t.sent,n.journey.find({lang:{$eq:e.$store.getters["user/language"]},published:!0,_id:{$ne:e.$route.params.journey}}).$.subscribe(function(t){e.journeys=t,e.init=!0});case 4:case"end":return t.stop()}},t,e)}))()}}},1376:function(e,t,n){/*!
 * vue-carousel v0.6.4
 * (c) 2017 todd.beauchamp@ssense.com
 * https://github.com/ssense/vue-carousel#readme
 */
!function(t,n){e.exports=n()}(0,function(){return function(e){function t(a){if(n[a])return n[a].exports;var r=n[a]={exports:{},id:a,loaded:!1};return e[a].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.Slide=t.Carousel=void 0;var r=n(1),i=a(r),s=n(21),o=a(s),u=function(e){e.component("carousel",i.default),e.component("slide",o.default)};t.default={install:u},t.Carousel=i.default,t.Slide=o.default},function(e,t,n){n(2);var a=n(7)(n(8),n(26),null,null);e.exports=a.exports},function(e,t,n){var a=n(3);"string"==typeof a&&(a=[[e.id,a,""]]),a.locals&&(e.exports=a.locals),n(5)("482b1162",a,!0)},function(e,t,n){t=e.exports=n(4)(),t.push([e.id,".VueCarousel{position:relative}.VueCarousel-wrapper{width:100%;position:relative;overflow:hidden}.VueCarousel-inner{display:flex;flex-direction:row;backface-visibility:hidden}",""])},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var a={},r=0;r<this.length;r++){var i=this[r][0];"number"==typeof i&&(a[i]=!0)}for(r=0;r<t.length;r++){var s=t[r];"number"==typeof s[0]&&a[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),e.push(s))}},e}},function(e,t,n){function a(e){for(var t=0;t<e.length;t++){var n=e[t],a=d[n.id];if(a){a.refs++;for(var r=0;r<a.parts.length;r++)a.parts[r](n.parts[r]);for(;r<n.parts.length;r++)a.parts.push(s(n.parts[r]));a.parts.length>n.parts.length&&(a.parts.length=n.parts.length)}else{for(var i=[],r=0;r<n.parts.length;r++)i.push(s(n.parts[r]));d[n.id]={id:n.id,refs:1,parts:i}}}}function r(e,t){for(var n=[],a={},r=0;r<t.length;r++){var i=t[r],s=i[0],o=i[1],u=i[2],l=i[3],d={css:o,media:u,sourceMap:l};a[s]?(d.id=e+":"+a[s].parts.length,a[s].parts.push(d)):(d.id=e+":0",n.push(a[s]={id:s,parts:[d]}))}return n}function i(){var e=document.createElement("style");return e.type="text/css",c.appendChild(e),e}function s(e){var t,n,a=document.querySelector('style[data-vue-ssr-id~="'+e.id+'"]'),r=null!=a;if(r&&h)return v;if(g){var s=p++;a=f||(f=i()),t=o.bind(null,a,s,!1),n=o.bind(null,a,s,!0)}else a=a||i(),t=u.bind(null,a),n=function(){a.parentNode.removeChild(a)};return r||t(e),function(a){if(a){if(a.css===e.css&&a.media===e.media&&a.sourceMap===e.sourceMap)return;t(e=a)}else n()}}function o(e,t,n,a){var r=n?"":a.css;if(e.styleSheet)e.styleSheet.cssText=m(t,r);else{var i=document.createTextNode(r),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(i,s[t]):e.appendChild(i)}}function u(e,t){var n=t.css,a=t.media,r=t.sourceMap;if(a&&e.setAttribute("media",a),r&&(n+="\n/*# sourceURL="+r.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}var l="undefined"!=typeof document,r=n(6),d={},c=l&&(document.head||document.getElementsByTagName("head")[0]),f=null,p=0,h=!1,v=function(){},g="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());e.exports=function(e,t,n){h=n;var i=r(e,t);return a(i),function(t){for(var n=[],s=0;s<i.length;s++){var o=i[s],u=d[o.id];u.refs--,n.push(u)}t?(i=r(e,t),a(i)):i=[];for(var s=0;s<n.length;s++){var u=n[s];if(0===u.refs){for(var l=0;l<u.parts.length;l++)u.parts[l]();delete d[u.id]}}}};var m=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},function(e,t){e.exports=function(e,t){for(var n=[],a={},r=0;r<t.length;r++){var i=t[r],s=i[0],o=i[1],u=i[2],l=i[3],d={id:e+":"+r,css:o,media:u,sourceMap:l};a[s]?a[s].parts.push(d):n.push(a[s]={id:s,parts:[d]})}return n}},function(e,t){e.exports=function(e,t,n,a){var r,i=e=e||{},s=typeof e.default;"object"!==s&&"function"!==s||(r=e,i=e.default);var o="function"==typeof i?i.options:i;if(t&&(o.render=t.render,o.staticRenderFns=t.staticRenderFns),n&&(o._scopeId=n),a){var u=o.computed||(o.computed={});Object.keys(a).forEach(function(e){var t=a[e];u[e]=function(){return t}})}return{esModule:r,exports:i,options:o}}},function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(9),i=a(r),s=n(10),o=a(s),u=n(11),l=a(u),d=n(16),c=a(d),f=n(21),p=a(f);t.default={name:"carousel",beforeUpdate:function(){this.computeCarouselWidth()},components:{Navigation:l.default,Pagination:c.default,Slide:p.default},data:function(){return{browserWidth:null,carouselWidth:null,currentPage:0,dragOffset:0,dragStartX:0,mousedown:!1,slideCount:0}},mixins:[i.default],props:{easing:{type:String,default:"ease"},minSwipeDistance:{type:Number,default:8},navigationClickTargetSize:{type:Number,default:8},navigationEnabled:{type:Boolean,default:!1},navigationNextLabel:{type:String,default:"▶"},navigationPrevLabel:{type:String,default:"◀"},paginationActiveColor:{type:String,default:"#000000"},paginationColor:{type:String,default:"#efefef"},paginationEnabled:{type:Boolean,default:!0},paginationPadding:{type:Number,default:10},paginationSize:{type:Number,default:10},perPage:{type:Number,default:2},perPageCustom:{type:Array},scrollPerPage:{type:Boolean,default:!1},speed:{type:Number,default:500}},computed:{breakpointSlidesPerPage:function(){if(!this.perPageCustom)return this.perPage;var e=this.perPageCustom,t=this.browserWidth,n=e.sort(function(e,t){return e[0]>t[0]?-1:1}),a=n.filter(function(e){return t>=e[0]});return a[0]&&a[0][1]||this.perPage},canAdvanceForward:function(){return this.currentPage<this.pageCount-1},canAdvanceBackward:function(){return this.currentPage>0},currentPerPage:function(){return!this.perPageCustom||this.$isServer?this.perPage:this.breakpointSlidesPerPage},currentOffset:function(){var e=this.currentPage,t=this.slideWidth,n=this.dragOffset;return-1*((this.scrollPerPage?e*t*this.currentPerPage:e*t)+n)},isHidden:function(){return this.carouselWidth<=0},pageCount:function(){var e=this.slideCount,t=this.currentPerPage;if(this.scrollPerPage){var n=Math.ceil(e/t);return n<1?1:n}return e-(this.currentPerPage-1)},slideWidth:function(){return this.carouselWidth/this.currentPerPage},transitionStyle:function(){return this.speed/1e3+"s "+this.easing+" transform"}},methods:{advancePage:function(e){e&&"backward"===e&&this.canAdvanceBackward?this.goToPage(this.currentPage-1):(!e||e&&"backward"!==e)&&this.canAdvanceForward&&this.goToPage(this.currentPage+1)},attachMutationObserver:function(){var e=this,t=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver;if(t){var n={attributes:!0,data:!0};this.mutationObserver=new t(function(){e.$nextTick(function(){e.computeCarouselWidth()})}),this.$parent.$el&&this.mutationObserver.observe(this.$parent.$el,n)}},detachMutationObserver:function(){this.mutationObserver&&this.mutationObserver.disconnect()},getBrowserWidth:function(){return this.browserWidth=window.innerWidth,this.browserWidth},getCarouselWidth:function(){return this.carouselWidth=this.$el&&this.$el.clientWidth||0,this.carouselWidth},getSlideCount:function(){this.slideCount=this.$slots&&this.$slots.default&&this.$slots.default.filter(function(e){return e.tag&&e.tag.indexOf("slide")>-1}).length||0},goToPage:function(e){e>=0&&e<=this.pageCount&&(this.currentPage=e,this.$emit("pageChange",this.currentPage))},handleMousedown:function(e){e.touches||e.preventDefault(),this.mousedown=!0,this.dragStartX="ontouchstart"in window?e.touches[0].clientX:e.clientX},handleMouseup:function(){this.mousedown=!1,this.dragOffset=0},handleMousemove:function(e){if(this.mousedown){var t="ontouchstart"in window?e.touches[0].clientX:e.clientX,n=this.dragStartX-t;this.dragOffset=n,this.dragOffset>this.minSwipeDistance?(this.handleMouseup(),this.advancePage()):this.dragOffset<-this.minSwipeDistance&&(this.handleMouseup(),this.advancePage("backward"))}},computeCarouselWidth:function(){this.getSlideCount(),this.getBrowserWidth(),this.getCarouselWidth(),this.setCurrentPageInBounds()},setCurrentPageInBounds:function(){if(!this.canAdvanceForward){var e=this.pageCount-1;this.currentPage=e>=0?e:0}}},mounted:function(){this.$isServer||(window.addEventListener("resize",(0,o.default)(this.computeCarouselWidth,16)),"ontouchstart"in window?(this.$el.addEventListener("touchstart",this.handleMousedown),this.$el.addEventListener("touchend",this.handleMouseup),this.$el.addEventListener("touchmove",this.handleMousemove)):(this.$el.addEventListener("mousedown",this.handleMousedown),this.$el.addEventListener("mouseup",this.handleMouseup),this.$el.addEventListener("mousemove",this.handleMousemove))),this.attachMutationObserver(),this.computeCarouselWidth()},destroyed:function(){this.$isServer||(this.detachMutationObserver(),window.removeEventListener("resize",this.getBrowserWidth),"ontouchstart"in window?this.$el.removeEventListener("touchmove",this.handleMousemove):this.$el.removeEventListener("mousemove",this.handleMousemove))}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={props:{autoplay:{type:Boolean,default:!1},autoplayTimeout:{type:Number,default:2e3},autoplayHoverPause:{type:Boolean,default:!0}},data:function(){return{autoplayInterval:null}},destroyed:function(){this.$isServer||(this.$el.removeEventListener("mouseenter",this.pauseAutoplay),this.$el.removeEventListener("mouseleave",this.startAutoplay))},methods:{pauseAutoplay:function(){this.autoplayInterval&&(this.autoplayInterval=clearInterval(this.autoplayInterval))},startAutoplay:function(){this.autoplay&&(this.autoplayInterval=setInterval(this.advancePage,this.autoplayTimeout))}},mounted:function(){!this.$isServer&&this.autoplayHoverPause&&(this.$el.addEventListener("mouseenter",this.pauseAutoplay),this.$el.addEventListener("mouseleave",this.startAutoplay)),this.startAutoplay()}};t.default=n},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e,t,n){var a=void 0;return function(){var r=void 0,i=function(){a=null,n||e.apply(r)},s=n&&!a;clearTimeout(a),a=setTimeout(i,t),s&&e.apply(r)}};t.default=n},function(e,t,n){n(12);var a=n(7)(n(14),n(15),"data-v-7fed18e9",null);e.exports=a.exports},function(e,t,n){var a=n(13);"string"==typeof a&&(a=[[e.id,a,""]]),a.locals&&(e.exports=a.locals),n(5)("4e7e1c3a",a,!0)},function(e,t,n){t=e.exports=n(4)(),t.push([e.id,".VueCarousel-navigation-button[data-v-7fed18e9]{position:absolute;top:50%;box-sizing:border-box;color:#000;text-decoration:none}.VueCarousel-navigation-next[data-v-7fed18e9]{right:0;transform:translateY(-50%) translateX(100%)}.VueCarousel-navigation-prev[data-v-7fed18e9]{left:0;transform:translateY(-50%) translateX(-100%)}.VueCarousel-navigation--disabled[data-v-7fed18e9]{opacity:.5;cursor:default}",""])},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"navigation",data:function(){return{parentContainer:this.$parent}},props:{clickTargetSize:{type:Number,default:8},nextLabel:{type:String,default:"▶"},prevLabel:{type:String,default:"◀"}},computed:{canAdvanceForward:function(){return this.parentContainer.canAdvanceForward||!1},canAdvanceBackward:function(){return this.parentContainer.canAdvanceBackward||!1}},methods:{triggerPageAdvance:function(e){e?this.$parent.advancePage(e):this.$parent.advancePage()}}}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"VueCarousel-navigation"},[n("a",{staticClass:"VueCarousel-navigation-button VueCarousel-navigation-prev",class:{"VueCarousel-navigation--disabled":!e.canAdvanceBackward},style:"padding: "+e.clickTargetSize+"px; margin-right: -"+e.clickTargetSize+"px;",attrs:{href:"#"},domProps:{innerHTML:e._s(e.prevLabel)},on:{click:function(t){t.preventDefault(),e.triggerPageAdvance("backward")}}}),e._v(" "),n("a",{staticClass:"VueCarousel-navigation-button VueCarousel-navigation-next",class:{"VueCarousel-navigation--disabled":!e.canAdvanceForward},style:"padding: "+e.clickTargetSize+"px; margin-left: -"+e.clickTargetSize+"px;",attrs:{href:"#"},domProps:{innerHTML:e._s(e.nextLabel)},on:{click:function(t){t.preventDefault(),e.triggerPageAdvance()}}})])},staticRenderFns:[]}},function(e,t,n){n(17);var a=n(7)(n(19),n(20),"data-v-7e42136f",null);e.exports=a.exports},function(e,t,n){var a=n(18);"string"==typeof a&&(a=[[e.id,a,""]]),a.locals&&(e.exports=a.locals),n(5)("0c0460ff",a,!0)},function(e,t,n){t=e.exports=n(4)(),t.push([e.id,".VueCarousel-pagination[data-v-7e42136f]{width:100%;float:left;text-align:center}.VueCarousel-dot-container[data-v-7e42136f]{display:inline-block;margin:0 auto}.VueCarousel-dot[data-v-7e42136f]{float:left;cursor:pointer}.VueCarousel-dot-inner[data-v-7e42136f]{border-radius:100%}",""])},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"pagination",data:function(){return{parentContainer:this.$parent}}}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"show",rawName:"v-show",value:e.parentContainer.pageCount>1,expression:"parentContainer.pageCount > 1"}],staticClass:"VueCarousel-pagination"},[n("div",{staticClass:"VueCarousel-dot-container"},e._l(e.parentContainer.pageCount,function(t,a){return n("div",{staticClass:"VueCarousel-dot",style:"\n        margin-top: "+2*e.parentContainer.paginationPadding+"px;\n        padding: "+e.parentContainer.paginationPadding+"px;\n      ",on:{click:function(t){e.parentContainer.goToPage(a)}}},[n("div",{staticClass:"VueCarousel-dot-inner",style:"\n          width: "+e.parentContainer.paginationSize+"px;\n          height: "+e.parentContainer.paginationSize+"px;\n          background: "+(a===e.parentContainer.currentPage?e.parentContainer.paginationActiveColor:e.parentContainer.paginationColor)+";\n        "})])}))])},staticRenderFns:[]}},function(e,t,n){n(22);var a=n(7)(n(24),n(25),null,null);e.exports=a.exports},function(e,t,n){var a=n(23);"string"==typeof a&&(a=[[e.id,a,""]]),a.locals&&(e.exports=a.locals),n(5)("5b198235",a,!0)},function(e,t,n){t=e.exports=n(4)(),t.push([e.id,".VueCarousel-slide{flex-basis:inherit;flex-grow:0;flex-shrink:0;user-select:none}",""])},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"slide",data:function(){return{width:null}}}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{staticClass:"VueCarousel-slide"},[e._t("default")],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"VueCarousel"},[n("div",{staticClass:"VueCarousel-wrapper"},[n("div",{staticClass:"VueCarousel-inner",style:"\n        transform: translateX("+e.currentOffset+"px);\n        transition: "+e.transitionStyle+";\n        flex-basis: "+e.slideWidth+"px;\n        visibility: "+(e.slideWidth?"visible":"hidden")+"\n      "},[e._t("default")],2)]),e._v(" "),e.paginationEnabled&&e.pageCount>0?n("pagination"):e._e(),e._v(" "),e.navigationEnabled?n("navigation",{attrs:{clickTargetSize:e.navigationClickTargetSize,nextLabel:e.navigationNextLabel,prevLabel:e.navigationPrevLabel}}):e._e()],1)},staticRenderFns:[]}}])})},1377:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.journeys.length>0?n("div",{staticClass:"layout-padding small-content"},[n("h2",{staticClass:"text-primary"},[e._v(e._s(e.$t("other_journeys")))]),e._v(" "),n("div",{staticClass:"row items-center medium-gutter"},[n("div",{staticClass:"width-4of5"},[e.init?n("carousel",{ref:"carousel",attrs:{perPage:3,paginationEnabled:!1}},e._l(e.journeys,function(t){return n("slide",{key:t._id},[n("div",{staticClass:"generic-margin"},[n("div",{staticClass:"card"},[n("img",{staticClass:"resonsive cursor-pointer",attrs:{src:t.image,height:"150px"}}),e._v(" "),n("div",{staticClass:"card-content"},[n("strong",{staticClass:"block"},[e._v(e._s(t.title))]),e._v(" "),n("div",[n("router-link",{attrs:{to:{name:"journey",params:{journey:t._id}}}},[e._v(e._s(e.$t("gotojourney")))])],1)])])])])})):e._e()],1),e._v(" "),n("div",{staticClass:"width-1of5 text-center"},[n("button",{staticClass:"primary circular",on:{click:function(t){e.triggerPageAdvance("backward")}}},[n("i",[e._v("keyboard_arrow_left")])]),n("br"),n("br"),e._v(" "),n("button",{staticClass:"primary circular",on:{click:function(t){e.triggerPageAdvance()}}},[n("i",[e._v("keyboard_arrow_right")])])])])]):e._e()},staticRenderFns:[]}}});