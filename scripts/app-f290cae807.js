/******/!function(t){function e(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return t[o].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}// webpackBootstrap
/******/
var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}var r=n(1),a=n(2),i=o(a),u=n(3),c=o(u),l=n(4),s=o(l);angular.module("codeChallenge",["uiGmapgoogle-maps","xml","ngAnimate","ngCookies","ngTouch","ngSanitize","ngMessages","ngAria","ngResource","ui.router","ui.bootstrap","toastr"]).config(r.routerConfig).controller("MainController",i["default"]).service("BusService",s["default"]).service("MapService",c["default"])},function(t,e){"use strict";function n(t,e){"ngInject";t.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main"}),e.otherwise("/")}n.$inject=["$stateProvider","$urlRouterProvider"],Object.defineProperty(e,"__esModule",{value:!0}),e.routerConfig=n},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=Array.prototype.slice,r=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),a=void 0,i=void 0,u=void 0,c=function(){function t(e,r,c){"ngInject";var l=this;n(this,t);var s=o.call(arguments);a=s[0],i=s[1],u=s[2],this.muni={},this.colors={},this.chosenRoute="",a.createMap(),this.getMyLocation(),i.getRoutes().then(function(){return c(function(){return l.getBuses()})})}return t.$inject=["MapService","BusService","$timeout"],r(t,[{key:"getMyLocation",value:function(){navigator.geolocation.getCurrentPosition(function(t){a.createDot({_lon:t.coords.longitude,_lat:t.coords.latitude,_routeTag:"your location"},"green","7px")})}},{key:"getBuses",value:function(){var t=this;_.each(i.getLocations(),function(e){e.then(function(e){return t.addBusDot(_.flatten(e))})}),u(function(){return t.getBuses()},13e3)}},{key:"addBusDot",value:function(t){var e=this;_.each(t,function(t){e.muni[t._id]=t,t._routeTag="Route "+t._routeTag,e.colors[t._routeTag]=e.colors[t._routeTag]||randomColor(),t._secsSinceReport<600&&a.createDot(t,e.colors[t._routeTag])}),this.routes=_(this.muni).map(function(t){return t._routeTag}).uniq().value()}},{key:"filterRoutes",value:function(t){a.filterDots(t,this.muni)}}]),t}();e["default"]=c,t.exports=e["default"]},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=Array.prototype.slice,r=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),a=void 0,i=function(){function t(e){"ngInject";n(this,t);var r=o.call(arguments);a=r[0]}return t.$inject=["$log"],r(t,[{key:"createMap",value:function(){var t=this,e=960,n=900,o=1;this.muni={},this.path=d3.geo.path(),this.projection=d3.geo.mercator(),this.zoom=d3.behavior.zoom().translate([0,150]).scale(o).scaleExtent([.95*o,8*o]).on("zoom",function(){return t.zoomed()});var r=d3.select("#map").append("svg").attr("width",e).attr("height",n).append("g");this.g=r.append("g"),r.call(this.zoom).call(this.zoom.event),d3.json("app/main/sf.json",function(e,n){if(e)return a.error(e);var o=topojson.feature(n,n.objects.neighborhoods),r=d3.geo.bounds(o),i=d3.sum(r,function(t){return t[0]})/2,u=d3.sum(r,function(t){return t[1]})/2;t.projection.scale(27e4).center([i,u]),t.path.projection(t.projection),t.g.selectAll("g").data(topojson.feature(n,n.objects.arteries).features).enter().append("path").attr("class","artery").attr("d",t.path),t.g.selectAll("g").data(topojson.feature(n,n.objects.neighborhoods).features).enter().append("path").attr("class","neighborhood").attr("d",t.path),t.g.selectAll("g").data(topojson.feature(n,n.objects.freeways).features).enter().append("path").attr("class","neighborhood").attr("d",t.path),t.g.selectAll("g").data(topojson.feature(n,n.objects.streets).features).enter().append("path").attr("class","neighborhood").attr("d",t.path)})}},{key:"createDot",value:function(t){var e=this,n=arguments.length<=1||void 0===arguments[1]?"red":arguments[1],o=arguments.length<=2||void 0===arguments[2]?"3px":arguments[2],r="b"+t._id,a=[t._lon,t._lat];this.g.selectAll("circle#"+r)[0].length>0?this.g.selectAll("circle#"+r).transition().duration(13e3).attr("cx",function(){return e.projection(a)[0]}).attr("cy",function(){return e.projection(a)[1]}):this.g.selectAll("g").data([a]).enter().append("circle").attr("cx",function(t){return e.projection(t)[0]}).attr("cy",function(t){return e.projection(t)[1]}).attr("r",o).attr("id",r).attr("fill",n).attr("title",t._routeTag),$("circle#"+r+"[title]").tipsy({arrowWidth:10,attr:"data-tipsy",cls:null,duration:300,offset:3,position:"top-center",trigger:"hover",onShow:null,onHide:null})}},{key:"zoomed",value:function(){this.g.attr("transform","translate("+d3.event.translate.join(",")+")scale("+d3.event.scale+")"),this.g.selectAll("circle").attr("d",this.path.projection(this.projection)),this.g.selectAll("path").attr("d",this.path.projection(this.projection))}},{key:"filterDots",value:function(t,e){var n=this;_(e).map(function(t){return"#b"+t._id}).each(function(t){return n.g.selectAll(t).attr("opacity",1).attr("data-tipsy-disabled",null)}),_(e).filter(function(e){return t&&e._routeTag!==t}).map(function(t){return"#b"+t._id}).each(function(t){return n.g.selectAll(t).attr("opacity",0).attr("data-tipsy-disabled",!0)})}}]),t}();e["default"]=i,t.exports=e["default"]},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=Array.prototype.slice,r=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),a=void 0,i=void 0,u=void 0,c="http://webservices.nextbus.com/service/publicXMLFeed",l=function(){function t(e,r,c){"ngInject";n(this,t);var l=o.call(arguments);a=l[0],i=l[1],u=l[2]}return t.$inject=["$http","x2js","$log"],r(t,[{key:"getRoutes",value:function(){var t=this;return a.get(c,{params:{command:"routeList",a:"sf-muni"}}).then(function(e){t.xmlRoutes=i.xml_str2json(e.data).body.route})}},{key:"getLocations",value:function(){return u.log("call started"),_.map(this.xmlRoutes,function(t){return t._tag?a.get(c,{params:{command:"vehicleLocations",a:"sf-muni",r:t._tag}}).then(function(t){var e=_(i.xml_str2json(t.data).body).map(function(t){var e=t;return _.isArray(t)||t._id?_.isArray(t)?_.map(e,function(t){return t._lon,t._lat?t:null}):e:null}).compact().value();return e}):void 0})}}]),t}();e["default"]=l,t.exports=e["default"]}]),angular.module("codeChallenge").run(["$templateCache",function(t){t.put("app/main/main.html",'<div class="routes"><button title="Simple Tooltip" ng-click="main.filterRoutes(main.chosenRoute=\'\')" class="btn btn-default">Clear Filter</button><div><select ng-model="main.chosenRoute" ng-change="main.filterRoutes(main.chosenRoute)" class="form-control"><option value="">No Filter</option><option value="{{route}}" ng-repeat="route in main.routes">{{route}}</option></select></div></div><div id="map"></div>')}]);
//# sourceMappingURL=../maps/scripts/app-f290cae807.js.map