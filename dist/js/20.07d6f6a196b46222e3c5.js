webpackJsonp([20],{1293:function(t,o,e){var n=e(626)(e(1369),e(1384),null,null);t.exports=n.exports},1353:function(t,o,e){"use strict";var n=e(169),i=e.n(n),a=e(168),s=e.n(a);o.a={methods:{confirmDeleteLocation:function(t){this.journey.hasLocation(t._id)&&this.$root.$deleteDialog(t.name,{location:t},this.deleteItemLocation)},deleteItemLocation:function(t){var o=this;return s()(i.a.mark(function e(){var n;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=t.location._id,t.location.remove().then(function(){o.journey.deleteLocation(n).save(),"function"==typeof o.loadLocations&&o.loadLocations()}).then(function(){o.$root.$toastSuccess(o.$t("delete_item_successfully")),"function"==typeof o.deleteItemLocationSuccess&&o.deleteItemLocationSuccess()}).catch(function(t){o.$root.$toastError(t.message)});case 2:case"end":return e.stop()}},e,o)}))()}}}},1369:function(t,o,e){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var n=e(169),i=e.n(n),a=e(168),s=e.n(a),c=e(1353);o.default={name:"admin-journeys-locations-detail-title",mixins:[c.a],props:{journey:{type:Object,required:!0},locationRxdb:{type:Object,required:!0}},data:function(){return{locations:[]}},computed:{title:function(){return this.$route.params.location?this.$t("location_edit"):this.$t("location_add")},description:function(){return this.journey.title+" ("+this.journey.lang+")"},showLocations:function(){return this.journey.hasLocations()}},methods:{linkToLocation:function(t){this.$router.push({name:"admin_journeys_location",params:{journey:this.$route.params.journey,location:t._id}})},deleteItemLocationSuccess:function(){this.$router.push({name:"admin_journeys_location",params:{journey:this.$route.params.journey}})},loadLocations:function(){var t=this;return s()(i.a.mark(function o(){return i.a.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,t.journey.locations_;case 2:t.locations=o.sent;case 3:case"end":return o.stop()}},o,t)}))()}},mounted:function(){this.loadLocations()}}},1384:function(t,o){t.exports={render:function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"card-title bg-primary text-white"},[e("div",{staticClass:"row"},[e("div",{staticClass:"auto"},[t._v(t._s(t.title)),e("br"),e("small",[t._v(t._s(t.description))])]),t._v(" "),t.showLocations?e("button",{staticClass:"primary small"},[e("i",[t._v("location_on")]),t._v(" "+t._s(t.$t("location_switch"))+"\n            "),e("q-popover",{ref:"locationSelection"},[e("div",{staticClass:"list item-delimiter highlight"},[t._l(t.locations,function(o){return e("div",{key:o._id,staticClass:"item item-link",on:{click:function(e){t.linkToLocation(o),t.$refs.locationSelection.close()}}},[e("i",{staticClass:"item-primary"},[t._v(t._s(t.locationRxdb._id===o._id?"check_circle":""))]),t._v(" "),e("div",{staticClass:"item-content"},[t._v(t._s(o.name))])])}),t._v(" "),e("router-link",{staticClass:"item item-link",attrs:{tag:"div","active-class":"",to:{name:"admin_journeys_location",params:{journey:t.$route.params.journey}}},on:{click:function(o){t.$refs.locationSelection.close()}}},[e("i",{staticClass:"item-primary"},[t._v("add")]),t._v(" "),e("div",{staticClass:"item-content"},[t._v(t._s(t.$t("location_add")))])])],2)])],1):t._e(),t._v(" "),t.$route.params.location&&t.journey.hasLocation(t.$route.params.location)?e("button",{staticClass:"negative",on:{click:function(o){o.preventDefault(),t.confirmDeleteLocation(t.locationRxdb)}}},[e("i",[t._v("delete")]),t._v(" "+t._s(t.$t("location_delete"))+"\n        ")]):t._e()])])},staticRenderFns:[]}}});