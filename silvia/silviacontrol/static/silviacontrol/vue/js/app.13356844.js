(function(e){function t(t){for(var a,s,o=t[0],c=t[1],l=t[2],u=0,d=[];u<o.length;u++)s=o[u],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&d.push(i[s][0]),i[s]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);f&&f(t);while(d.length)d.shift()();return r.push.apply(r,l||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],a=!0,s=1;s<n.length;s++){var o=n[s];0!==i[o]&&(a=!1)}a&&(r.splice(t--,1),e=c(c.s=n[0]))}return e}var a={},s={app:0},i={app:0},r=[];function o(e){return c.p+"js/"+({about:"about"}[e]||e)+"."+{about:"e6774c66","chunk-2d230643":"e505eb98","chunk-3cbc6859":"9bcc8c56","chunk-2d0b3289":"a0702a0e","chunk-9075fa3e":"45d476cb","chunk-2d0b257b":"3e9f5632","chunk-747c0b3c":"ad06e63a","chunk-f484e916":"ae69d29e","chunk-580d4eac":"a59f4a95"}[e]+".js"}function c(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={about:1,"chunk-3cbc6859":1,"chunk-9075fa3e":1,"chunk-f484e916":1,"chunk-580d4eac":1};s[e]?t.push(s[e]):0!==s[e]&&n[e]&&t.push(s[e]=new Promise((function(t,n){for(var a="css/"+({about:"about"}[e]||e)+"."+{about:"168e52b6","chunk-2d230643":"31d6cfe0","chunk-3cbc6859":"eabe5113","chunk-2d0b3289":"31d6cfe0","chunk-9075fa3e":"4b07f85b","chunk-2d0b257b":"31d6cfe0","chunk-747c0b3c":"31d6cfe0","chunk-f484e916":"076c758d","chunk-580d4eac":"da70acb7"}[e]+".css",i=c.p+a,r=document.getElementsByTagName("link"),o=0;o<r.length;o++){var l=r[o],u=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(u===a||u===i))return t()}var d=document.getElementsByTagName("style");for(o=0;o<d.length;o++){l=d[o],u=l.getAttribute("data-href");if(u===a||u===i)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var a=t&&t.target&&t.target.src||i,r=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");r.code="CSS_CHUNK_LOAD_FAILED",r.request=a,delete s[e],f.parentNode.removeChild(f),n(r)},f.href=i;var m=document.getElementsByTagName("head")[0];m.appendChild(f)})).then((function(){s[e]=0})));var a=i[e];if(0!==a)if(a)t.push(a[2]);else{var r=new Promise((function(t,n){a=i[e]=[t,n]}));t.push(a[2]=r);var l,u=document.createElement("script");u.charset="utf-8",u.timeout=120,c.nc&&u.setAttribute("nonce",c.nc),u.src=o(e);var d=new Error;l=function(t){u.onerror=u.onload=null,clearTimeout(f);var n=i[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),s=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+a+": "+s+")",d.name="ChunkLoadError",d.type=a,d.request=s,n[1](d)}i[e]=void 0}};var f=setTimeout((function(){l({type:"timeout",target:u})}),12e4);u.onerror=u.onload=l,document.head.appendChild(u)}return Promise.all(t)},c.m=e,c.c=a,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)c.d(n,a,function(t){return e[t]}.bind(null,a));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=t,l=l.slice();for(var d=0;d<l.length;d++)t(l[d]);var f=u;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"12cd":function(e,t,n){},"16aa":function(e,t,n){"use strict";var a,s,i=n("1fca"),r=i["b"].reactiveProp,o={name:"ResponseChart",extends:i["a"],mixins:[r],data:function(){return{chartDataLocal:{datasets:[]},maxLines:5}},props:{chartOptions:{type:Object,default:null}},mounted:function(){this.renderChart(this.chartData,this.chartOptions)}},c=o,l=n("2877"),u=Object(l["a"])(c,a,s,!1,null,null,null);t["a"]=u.exports},"179d":function(e,t,n){"use strict";var a=n("f72c"),s=n.n(a);s.a},"44ea":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("v-card",{staticClass:"pa-6 mb-4",attrs:{"max-height":"450","min-width":"750","max-width":"1600"}},[n("response-chart",{attrs:{chartData:e.graphData,chartOptions:e.graphOptions}})],1)],1)},s=[],i=(n("4160"),n("b64b"),n("159b"),n("16aa")),r={name:"Sessions",components:{ResponseChart:i["a"]},data:function(){return{graphOptions:{scales:{xAxes:[{id:"time-axis",position:"bottom",display:!0,scaleLabel:{display:!0,labelString:"Time [s]"},ticks:{beginAtZero:!0}}],yAxes:[{id:"temperature-axis",position:"left",display:!0,scaleLabel:{display:!0,labelString:["Temperature [C]","Duty [%]"]},ticks:{beginAtZero:!0,suggestedMin:0,suggestedMax:110}},{id:"mass-axis",position:"right",display:!0,scaleLabel:{display:!0,labelString:"Mass (g)"},ticks:{suggestedMin:0,suggestedMax:30}}]},showLines:!0,maintainAspectRatio:!1,responsive:!0}}},props:{data:{},brewing:Boolean},computed:{graphData:function(){var e={datasets:[]},t=Object.keys(this.data)[0],n={label:"Temperature",xAxisID:"time-axis",yAxisID:"temperature-axis",showLine:!0,data:[],fill:!1,borderColor:"#ff5a5f"},a={label:"Duty",xAxisID:"time-axis",yAxisID:"temperature-axis",showLine:!0,data:[],fill:!1,borderColor:"#eabe7c"},s={label:"Setpoint",xAxisID:"time-axis",yAxisID:"temperature-axis",showLine:!0,data:[],fill:!1,borderColor:"#769fb6"},i={label:"Extraction",xAxisID:"time-axis",yAxisID:"mass-axis",showLine:!0,data:[],fill:!1,borderColor:"#7fd1b9"},r=new Date(this.data[t][0].t);return this.data[t].forEach((function(e,t){var o=(new Date(e.t)-r)/1e3;n.data.push({x:o,y:e.T_boiler}),a.data.push({x:o,y:e.duty}),s.data.push({x:o,y:e.T_setpoint}),i.data.push({x:o,y:e.m})})),e.datasets.push(n),e.datasets.push(a),e.datasets.push(s),e.datasets.push(i),e}}},o=r,c=n("2877"),l=n("6544"),u=n.n(l),d=n("b0af"),f=Object(c["a"])(o,a,s,!1,null,"563d99ed",null);t["a"]=f.exports;u()(f,{VCard:d["a"]})},4678:function(e,t,n){var a={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-in":"ec2e","./en-in.js":"ec2e","./en-nz":"6f50","./en-nz.js":"6f50","./en-sg":"b7e9","./en-sg.js":"b7e9","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fil":"d69a","./fil.js":"d69a","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-deva":"aaf2","./gom-deva.js":"aaf2","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./oc-lnc":"167b","./oc-lnc.js":"167b","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-mo":"3a6c","./zh-mo.js":"3a6c","./zh-tw":"90ea","./zh-tw.js":"90ea"};function s(e){var t=i(e);return n(t)}function i(e){if(!n.o(a,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return a[e]}s.keys=function(){return Object.keys(a)},s.resolve=i,e.exports=s,s.id="4678"},5345:function(e,t,n){e.exports=n.p+"img/Silvia_Illustration_on.75f5c1e9.png"},"56d7":function(e,t,n){"use strict";n.r(t),n.d(t,"eventBus",(function(){return Se}));n("4de4"),n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("AppNaviagtion",{attrs:{machineOn:e.machineOn}}),n("v-content",[n("v-container",{staticClass:"mt-5",attrs:{fluid:""}},[n("v-row",{attrs:{align:"center",justify:"center"}},[n("router-view",{attrs:{machineOn:e.machineOn,machineBrewing:e.machineBrewing}})],1)],1)],1),n("v-footer",{attrs:{app:""}})],1)},i=[],r=n("bc3a"),o=n.n(r),c=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("span",[a("v-navigation-drawer",{attrs:{app:"",clipped:!0},model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[a("v-list",[e._l(e.items,(function(t){return[a("router-link",{key:t.title,attrs:{to:t.path}},[a("v-list-item",{attrs:{link:""}},[a("v-list-item-action",[a("v-icon",[e._v(e._s(t.icon))])],1),a("v-list-item-content",[a("v-list-item-title",[e._v(e._s(t.title))])],1)],1)],1)]}))],2),a("a",{attrs:{href:"admin"}},[a("v-list-item",{staticClass:"primary darken-2",staticStyle:{position:"absolute",bottom:"0",width:"100%"},attrs:{link:""}},[a("v-list-item-action",[a("v-icon",[e._v("mdi-lock")])],1),a("v-list-item-content",[a("v-list-item-title",[e._v("Admin")])],1)],1)],1)],1),a("v-app-bar",{attrs:{app:"",color:"primary","clipped-left":!0}},[a("v-app-bar-nav-icon",{on:{click:function(t){t.stopPropagation(),e.drawer=!e.drawer}}}),a("v-spacer",{staticClass:"hidden-md-and-up"}),a("v-img",{staticClass:"mx-2",attrs:{src:n("cf05"),"max-height":"40","max-width":"40",contain:""}}),a("v-toolbar-title",{staticClass:"hidden-sm-and-down"},[e._v(e._s(e.appTitle))]),a("v-spacer",{staticClass:"hidden-sm-and-down"}),a("v-btn",{staticClass:"hidden-sm-and-down",attrs:{color:"secondary",to:"/"},on:{click:e.toggleOnOff}},[e.machineOn?a("div",[a("v-icon",{attrs:{color:"success"}},[e._v("mdi-power")])],1):a("div",[a("v-icon",[e._v("mdi-power")])],1)])],1)],1)},l=[],u={name:"AppNavigation",data:function(){return{appTitle:"Silvia Control",drawer:!1,items:[{title:"Operate",icon:"mdi-coffee",path:"/"},{title:"Sessions",icon:"mdi-database",path:"/sessions"},{title:"Schedule",icon:"mdi-calendar",path:"/schedule"},{title:"Information",icon:"mdi-information",path:"/info"},{title:"Settings",icon:"mdi-cog",path:"/settings"},{title:"Docs",icon:"mdi-bookshelf",path:"/docs"},{title:"About",icon:"mdi-help-circle",path:"/about"}]}},props:{machineOn:Boolean},methods:{toggleOnOff:function(){Se.$emit("toggleOnOff")}}},d=u,f=(n("179d"),n("2877")),m=n("6544"),p=n.n(m),h=n("40dc"),b=n("5bc1"),v=n("8336"),g=n("132d"),j=n("adda"),w=n("8860"),y=n("da13"),O=n("1800"),k=n("5d23"),A=n("f774"),x=n("2fa4"),B=n("2a7f"),S=Object(f["a"])(d,c,l,!1,null,"40480864",null),z=S.exports;p()(S,{VAppBar:h["a"],VAppBarNavIcon:b["a"],VBtn:v["a"],VIcon:g["a"],VImg:j["a"],VList:w["a"],VListItem:y["a"],VListItemAction:O["a"],VListItemContent:k["a"],VListItemTitle:k["b"],VNavigationDrawer:A["a"],VSpacer:x["a"],VToolbarTitle:B["a"]}),o.a.defaults.xsrfCookieName="csrftoken",o.a.defaults.xsrfHeaderName="X-CSRFToken",o.a.defaults.headers["Content-Type"]="application/json",o.a.defaults.withCredentials=!0,o.a.defaults.trailingSlash=!0,o.a.interceptors.request.use((function(e){return e.addTrailingSlash&&"/"!==e.url[e.url.length-1]&&(e.url+="/"),e}));var C={name:"App",components:{AppNaviagtion:z},data:function(){return{machineOn:!1,machineBrewing:!1}},watch:{$route:function(e,t){document.title=e.meta.title||"Silvia"}},created:function(){var e=this;Se.$on("toggleOnOff",(function(){e.machineOn=!e.machineOn,e.machineBrewing=!1;var t={id:1,on:e.machineOn,brew:e.machineBrewing};o.a.put("/api/v1/status/1/",t).then((function(e){console.log(e)})).catch((function(e){return console.log(e)}))})),Se.$on("toggleBrew",(function(){e.machineBrewing=!e.machineBrewing,e.machineBrewing&&(e.machineOn=!0);var t={id:1,brew:e.machineBrewing,on:e.machineOn};o.a.put("/api/v1/status/1/",t).then((function(e){console.log(e)})).catch((function(e){return console.log(e)}))})),Se.$on("updateOnOff",(function(){o.a.get("/api/v1/status/1/").then((function(t){e.machineOn=Boolean(t.data.on),e.machineBrewing=Boolean(t.data.brew)})).catch((function(e){return console.log(e)}))}))}},_=C,I=n("7496"),D=n("a523"),V=n("a75b"),N=n("553a"),M=n("0fd9"),T=Object(f["a"])(_,s,i,!1,null,null,null),Z=T.exports;p()(T,{VApp:I["a"],VContainer:D["a"],VContent:V["a"],VFooter:N["a"],VRow:M["a"]});var L=n("9483");Object(L["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});n("d3b7");var R=n("8c4f"),K=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[n("MachineInterface",{attrs:{machineOn:e.machineOn,machineBrewing:e.machineBrewing}})],1)},E=[],H=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"machine-interface"},[n("div",{staticClass:"machine-container"},["machine"==e.displayOption?n("div",[n("MachineDisplay",{attrs:{machineOn:e.machineOn,temperature:e.temperature}})],1):e._e(),"graph"==e.displayOption?n("div",[null==e.sessionData?n("div",{staticStyle:{display:"flex","justify-content":"center","align-items":"center","min-width":"350px"}},[n("v-btn",{attrs:{color:"secondary"},on:{click:e.viewLastSession}},[e._v("Last Session")])],1):n("div",[n("single-response-chart",{attrs:{data:e.sessionData}})],1)]):e._e(),"machine"==e.displayOption?n("v-btn",{attrs:{id:"temp-btn",outlined:"",color:e.tempBtnColor},on:{click:e.changeDisplay}},[null==e.temperature?n("div",[e._v("-")]):n("div",[e._v(e._s(e._f("temperatureDisplayFilter")(e.temperature))+"℃")])]):e._e(),e.machineOn?n("v-btn",{attrs:{id:"water-btn",fab:"",small:"",outlined:"",color:e.waterLevelColor}},[n("v-icon",[e._v("mdi-water")])],1):e._e(),e.machineBrewing?n("v-btn",{attrs:{id:"brew-btn",outlined:"",text:"",color:"secondary"}},[n("v-col",[n("v-row",{staticClass:"pb-1",attrs:{justify:"center"}},[e._v(e._s(e._f("temperatureDisplayFilter")(e.m_current))+"g")]),n("v-row",{attrs:{justify:"center"}},[e._v(e._s(e.t_elapsed)+"s")])],1)],1):e._e()],1),n("br"),n("v-row",{attrs:{align:"center"}},[n("v-col",{attrs:{cols:"auto"}},[n("v-switch",{attrs:{color:"secondary",value:e.machineOn,label:e.machineOn?"On":"Off"},on:{change:e.toggleOnOff}})],1),n("v-spacer"),e.machineOn?n("v-col",{staticClass:"px-1",attrs:{cols:"auto"}},[e.machineBrewing?n("div",[n("v-btn",{attrs:{color:"error"},on:{click:e.toggleBrew}},[e._v("Cancel")])],1):n("div",[n("v-btn",{attrs:{color:"secondary"},on:{click:e.toggleBrew}},[e._v("Brew")])],1)]):e._e(),n("v-col",{staticClass:"px-1",attrs:{cols:"auto"}},[n("v-btn",{attrs:{outlined:"",color:e.tempBtnColor,fab:"",small:""},on:{click:e.changeDisplay}},["machine"==e.displayOption?n("div",[n("v-icon",[e._v("mdi-chart-line")])],1):n("div",[n("v-icon",[e._v("mdi-file-presentation-box")])],1)])],1),n("v-col",{staticClass:"px-1",attrs:{cols:"auto"}},[n("v-btn",{attrs:{outlined:"",color:"secondary",fab:"",small:""},on:{click:function(t){e.tuneMode=!e.tuneMode}}},[n("v-icon",[e._v("mdi-wrench")])],1)],1)],1),e.machineOn?n("div",[n("v-row",{attrs:{align:"center"}},[n("v-progress-linear",{attrs:{value:e.brewProgress,color:"blue-grey",height:"25",rounded:""}},[null==e.m_current?n("div",[e._v(" No scale detected ")]):n("div",[e._v(" "+e._s(e._f("temperatureDisplayFilter")(e.m_current))+"g / "+e._s(e.m_setpoint)+"g ")])])],1)],1):e._e(),e.tuneMode?n("div",[n("v-row",{attrs:{align:"center"}},[n("v-col",{staticClass:"px-1",attrs:{cols:"auto"}},[n("v-btn",{attrs:{color:"secondary"},on:{click:e.toggleHeater}},[e.heaterOn?n("div",[e._v(" Heater Off ")]):n("div",[e._v(" Heater On ")])])],1),n("v-col",{staticClass:"px-1",attrs:{cols:"auto"}},[n("v-btn",{attrs:{color:"secondary",disabled:""},on:{click:e.autoTune}},[e._v(" Autotune ")])],1)],1)],1):e._e()],1)},P=[],q=(n("b64b"),n("25f0"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"machine"},[e.machineOn?a("div",[a("v-img",{staticClass:"machine-image img-center",attrs:{"min-width":"150","max-width":"350",src:n("5345"),contain:""}})],1):a("div",[a("v-img",{staticClass:"machine-image img-center",attrs:{"min-width":"150","max-width":"350",src:n("fd6e"),contain:""}})],1)])}),X=[],U=(n("a9e3"),{name:"MachineDisplay",props:{machineOn:Boolean,temperature:Number}}),W=U,Y=(n("ccce"),Object(f["a"])(W,q,X,!1,null,"231a1fba",null)),F=Y.exports;p()(Y,{VImg:j["a"]});var Q=n("44ea"),J={methods:{getSessions:function(){o.a.get("/api/v1/session/").then((function(e){return e.data})).catch((function(e){return console.log(e)}))}}},G={name:"MachineInterface",mixins:[J],components:{MachineDisplay:F,SingleResponseChart:Q["a"]},data:function(){return{temperature:0,displayOption:"machine",T_setpoint:60,intervalReference:null,t_update:10,m_current:null,m_setpoint:20,n_datapoints:10,low_water:!1,sessionData:null,tuneMode:!1,heaterOn:!1}},props:{machineOn:Boolean,machineBrewing:Boolean},computed:{tempBtnColor:function(){return Math.abs(this.T_setpoint-this.temperature)<2?"success":"secondary"},brewProgress:function(){return 100*this.m_current/this.m_setpoint},waterLevelColor:function(){return this.low_water?"error":"success"},t_elapsed:function(){return 0}},methods:{changeDisplay:function(){"machine"===this.displayOption?this.displayOption="graph":this.displayOption="machine"},toggleOnOff:function(){Se.$emit("toggleOnOff")},toggleBrew:function(){Se.$emit("toggleBrew")},updateResponse:function(){var e=this;if(Se.$emit("updateOnOff"),this.machineOn){var t={params:{session:"active"}};o.a.get("/api/v1/response/sessions/",t).then((function(t){console.log(t.data),e.sessionData=Object.assign({},e.sessionData,t.data);var n=t.data[Object.keys(t.data)[0]],a=n[n.length-1];e.temperature=a.T_boiler,e.m_current=a.m,e.low_water=a.low_water})).catch((function(e){return console.log(e)}))}else o.a.get("/api/v1/response/latest/").then((function(t){console.log(t.data);var n=(new Date-new Date(t.data.t))/1e3;e.temperature=n>15?null:t.data.T_boiler,e.m_current=t.data.m,e.low_water=t.data.low_water})).catch((function(e){return console.log(e)})),this.sessionData=null},updateInterval:function(){var e=this;o.a.get("/api/v1/settings/1/").then((function(t){e.t_update=t.data.t_update,e.m_setpoint=t.data.m,e.T_setpoint=t.data.T_set,e.intervalReference=setInterval((function(){e.updateResponse()}),1e3*e.t_update)})).catch((function(e){return console.log(e)}))},viewLastSession:function(){var e=this;o.a.get("/api/v1/session/").then((function(t){var n=t.data[t.data.length-1];e.$router.push({name:"Session",params:{sessionIds:n.id.toString()}})})).catch((function(e){return console.log(e)}))},toggleHeater:function(){var e=this,t={params:{heaterOn:!this.heaterOn}};o.a.get("/api/v1/override/",t).then((function(t){e.heaterOn=!e.heaterOn})).catch((function(e){return console.log(e)}))},autoTune:function(){console.log("Autotune not yet implemented")}},created:function(){this.updateInterval(),this.updateResponse(),Se.$emit("updateOnOff")},destroyed:function(){console.log("Cancel temperature update"),clearInterval(this.intervalReference)}},$=G,ee=(n("d226"),n("62ad")),te=n("8e36"),ne=n("b73d"),ae=Object(f["a"])($,H,P,!1,null,"3f953e0e",null),se=ae.exports;p()(ae,{VBtn:v["a"],VCol:ee["a"],VIcon:g["a"],VProgressLinear:te["a"],VRow:M["a"],VSpacer:x["a"],VSwitch:ne["a"]});var ie={name:"Home",components:{MachineInterface:se},props:{machineOn:Boolean,machineBrewing:Boolean}},re=ie,oe=Object(f["a"])(re,K,E,!1,null,"69e2ecac",null),ce=oe.exports,le=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mx-auto text-center"},[n("h1",[e._v("(404)")]),n("h2",[e._v("Page not found")]),n("v-icon",[e._v("mdi-emoticon-sad")])],1)},ue=[],de={},fe=de,me=Object(f["a"])(fe,le,ue,!1,null,null,null),pe=me.exports;p()(me,{VIcon:g["a"]});var he=function(){return n.e("chunk-580d4eac").then(n.bind(null,"78b4"))},be=function(){return Promise.all([n.e("chunk-3cbc6859"),n.e("chunk-9075fa3e"),n.e("chunk-747c0b3c")]).then(n.bind(null,"3a39f"))},ve=function(){return Promise.all([n.e("chunk-3cbc6859"),n.e("chunk-9075fa3e"),n.e("chunk-2d0b257b")]).then(n.bind(null,"2469"))},ge=function(){return Promise.all([n.e("chunk-3cbc6859"),n.e("chunk-2d0b3289")]).then(n.bind(null,"26d3"))},je=function(){return Promise.all([n.e("chunk-3cbc6859"),n.e("chunk-f484e916")]).then(n.bind(null,"6b7b"))},we=function(){return n.e("chunk-2d230643").then(n.bind(null,"eba1"))};a["a"].use(R["a"]);var ye=[{path:"/",name:"Home",component:ce,meta:{title:"Silvia"}},{path:"/session/:sessionIds",name:"Session",component:he,meta:{title:"Session"},props:!0},{path:"/sessions",name:"Sessions",component:be,meta:{title:"Sessions"}},{path:"/info",name:"Info",component:ve,meta:{title:"Info"}},{path:"/settings",name:"Settings",component:ge,meta:{title:"Settings"}},{path:"/schedule",name:"Schedule",component:je,meta:{title:"Schedule"}},{path:"/about",name:"About",component:function(){return n.e("about").then(n.bind(null,"f820"))},meta:{title:"About Silvia"}},{path:"/docs",name:"Docs",component:we,meta:{title:"Documentation"}},{path:"*",component:pe}],Oe=new R["a"]({routes:ye}),ke=Oe,Ae=n("f309");a["a"].use(Ae["a"]);var xe=new Ae["a"]({theme:{themes:{light:{primary:"#eeeeee",secondary:"#90a4ae",accent:"#ff5722",error:"#f44336",warning:"#e91e63",info:"#9c27b0",success:"#4caf50"}}}}),Be=n("6612");a["a"].config.productionTip=!1;var Se=new a["a"];a["a"].filter("temperatureDisplayFilter",(function(e){return Be(e).format("0.0")})),new a["a"]({router:ke,vuetify:xe,render:function(e){return e(Z)}}).$mount("#app")},ccce:function(e,t,n){"use strict";var a=n("fc94"),s=n.n(a);s.a},cf05:function(e,t){e.exports="data:image/png;base64,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"},d226:function(e,t,n){"use strict";var a=n("12cd"),s=n.n(a);s.a},f72c:function(e,t,n){},fc94:function(e,t,n){},fd6e:function(e,t,n){e.exports=n.p+"img/Silvia_Illustration_off.1783be3b.png"}});
//# sourceMappingURL=app.13356844.js.map