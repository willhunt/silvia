(function(e){function t(t){for(var n,s,r=t[0],c=t[1],l=t[2],d=0,u=[];d<r.length;d++)s=r[d],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&u.push(i[s][0]),i[s]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);f&&f(t);while(u.length)u.shift()();return o.push.apply(o,l||[]),a()}function a(){for(var e,t=0;t<o.length;t++){for(var a=o[t],n=!0,s=1;s<a.length;s++){var r=a[s];0!==i[r]&&(n=!1)}n&&(o.splice(t--,1),e=c(c.s=a[0]))}return e}var n={},s={app:0},i={app:0},o=[];function r(e){return c.p+"js/"+({about:"about"}[e]||e)+"."+{about:"e6774c66","chunk-2d0b257b":"3e9f5632","chunk-2d0b3289":"a0702a0e","chunk-2d230643":"e505eb98","chunk-580d4eac":"a59f4a95","chunk-747c0b3c":"ad06e63a","chunk-c99190f0":"76778e85"}[e]+".js"}function c(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,c),a.l=!0,a.exports}c.e=function(e){var t=[],a={about:1,"chunk-580d4eac":1,"chunk-c99190f0":1};s[e]?t.push(s[e]):0!==s[e]&&a[e]&&t.push(s[e]=new Promise((function(t,a){for(var n="css/"+({about:"about"}[e]||e)+"."+{about:"168e52b6","chunk-2d0b257b":"31d6cfe0","chunk-2d0b3289":"31d6cfe0","chunk-2d230643":"31d6cfe0","chunk-580d4eac":"da70acb7","chunk-747c0b3c":"31d6cfe0","chunk-c99190f0":"076c758d"}[e]+".css",i=c.p+n,o=document.getElementsByTagName("link"),r=0;r<o.length;r++){var l=o[r],d=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(d===n||d===i))return t()}var u=document.getElementsByTagName("style");for(r=0;r<u.length;r++){l=u[r],d=l.getAttribute("data-href");if(d===n||d===i)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var n=t&&t.target&&t.target.src||i,o=new Error("Loading CSS chunk "+e+" failed.\n("+n+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=n,delete s[e],f.parentNode.removeChild(f),a(o)},f.href=i;var p=document.getElementsByTagName("head")[0];p.appendChild(f)})).then((function(){s[e]=0})));var n=i[e];if(0!==n)if(n)t.push(n[2]);else{var o=new Promise((function(t,a){n=i[e]=[t,a]}));t.push(n[2]=o);var l,d=document.createElement("script");d.charset="utf-8",d.timeout=120,c.nc&&d.setAttribute("nonce",c.nc),d.src=r(e);var u=new Error;l=function(t){d.onerror=d.onload=null,clearTimeout(f);var a=i[e];if(0!==a){if(a){var n=t&&("load"===t.type?"missing":t.type),s=t&&t.target&&t.target.src;u.message="Loading chunk "+e+" failed.\n("+n+": "+s+")",u.name="ChunkLoadError",u.type=n,u.request=s,a[1](u)}i[e]=void 0}};var f=setTimeout((function(){l({type:"timeout",target:d})}),12e4);d.onerror=d.onload=l,document.head.appendChild(d)}return Promise.all(t)},c.m=e,c.c=n,c.d=function(e,t,a){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(c.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)c.d(a,n,function(t){return e[t]}.bind(null,n));return a},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],d=l.push.bind(l);l.push=t,l=l.slice();for(var u=0;u<l.length;u++)t(l[u]);var f=d;o.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"16aa":function(e,t,a){"use strict";var n,s,i=a("1fca"),o=i["b"].reactiveProp,r={name:"ResponseChart",extends:i["a"],mixins:[o],data:function(){return{chartDataLocal:{datasets:[]},maxLines:5}},props:{chartOptions:{type:Object,default:null}},mounted:function(){this.renderChart(this.chartData,this.chartOptions)}},c=r,l=a("2877"),d=Object(l["a"])(c,n,s,!1,null,null,null);t["a"]=d.exports},"179d":function(e,t,a){"use strict";var n=a("f72c"),s=a.n(n);s.a},"44ea":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("v-card",{staticClass:"mb-4",attrs:{"min-width":"750","max-width":"1600"}},[a("response-chart",{staticClass:"px-6 pt-6 pb-1",attrs:{chartData:e.graphData,chartOptions:e.graphOptions}}),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"info"},on:{click:function(t){e.dataHidden=!e.dataHidden}}},[e._v("data")])],1)],1),e.dataHidden?e._e():a("v-card",{staticClass:"mx-auto mb-4",attrs:{"min-width":"750","max-width":"1600"}},[a("v-data-table",{staticClass:"mx-4",attrs:{headers:e.headers,items:e.tableData,dense:""}}),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"secondary"},on:{click:e.exportData}},[e._v("export")])],1)],1)],1)},s=[],i=(a("4160"),a("a15b"),a("b64b"),a("d3b7"),a("3ca3"),a("159b"),a("ddb0"),a("2b3d"),a("16aa")),o={name:"Sessions",components:{ResponseChart:i["a"]},data:function(){return{graphOptions:{scales:{xAxes:[{id:"time-axis",position:"bottom",display:!0,scaleLabel:{display:!0,labelString:"Time [s]"},ticks:{beginAtZero:!0}}],yAxes:[{id:"temperature-axis",position:"left",display:!0,scaleLabel:{display:!0,labelString:["Temperature [C]","Duty [%]"]},ticks:{beginAtZero:!0,suggestedMin:0,suggestedMax:110}},{id:"mass-axis",position:"right",display:!0,scaleLabel:{display:!0,labelString:"Mass (g)"},ticks:{suggestedMin:0,suggestedMax:30}}]},showLines:!0,maintainAspectRatio:!1,responsive:!0},dataHidden:!0,headers:[{text:"Time Stamp",value:"ts"},{text:"Time",value:"t"},{text:"Duty",value:"duty"},{text:"Temperature",value:"T_boiler"}]}},props:{data:{},brewing:Boolean},computed:{graphData:function(){var e={};if(null!=this.data){e.datasets=[];var t=Object.keys(this.data)[0],a={label:"Temperature",xAxisID:"time-axis",yAxisID:"temperature-axis",showLine:!0,data:[],fill:!1,borderColor:"#ff5a5f"},n={label:"Duty",xAxisID:"time-axis",yAxisID:"temperature-axis",showLine:!0,data:[],fill:!1,borderColor:"#eabe7c"},s={label:"Setpoint",xAxisID:"time-axis",yAxisID:"temperature-axis",showLine:!0,data:[],fill:!1,borderColor:"#769fb6"},i={label:"Extraction",xAxisID:"time-axis",yAxisID:"mass-axis",showLine:!0,data:[],fill:!1,borderColor:"#7fd1b9"},o=new Date(this.data[t][0].t);this.data[t].forEach((function(e,t){var r=(new Date(e.t)-o)/1e3;a.data.push({x:r,y:e.T_boiler}),n.data.push({x:r,y:e.duty}),s.data.push({x:r,y:e.T_setpoint}),i.data.push({x:r,y:e.m})})),e.datasets.push(a),e.datasets.push(n),e.datasets.push(s),e.datasets.push(i)}return e},tableData:function(){var e=Object.keys(this.data)[0],t=[],a=new Date(this.data[e][0].t);return this.data[e].forEach((function(e,n){t.push({ts:e.t,t:(new Date(e.t)-a)/1e3,duty:e.duty,T_boiler:e.T_boiler})})),t}},methods:{showData:function(){this.hideData=!1},exportData:function(){var e=JSON.stringify(this.tableData),t=new Blob([e],{type:"text/plain"}),a=document.createEvent("MouseEvents"),n=document.createElement("a");n.download="data.json",n.href=window.URL.createObjectURL(t),n.dataset.downloadurl=["text/json",n.download,n.href].join(":"),a.initEvent("click",!0,!1,window,0,0,0,0,0,!1,!1,!1,!1,0,null),n.dispatchEvent(a)}}},r=o,c=a("2877"),l=a("6544"),d=a.n(l),u=a("8336"),f=a("b0af"),p=a("99d9"),h=a("8fea"),m=a("2fa4"),v=Object(c["a"])(r,n,s,!1,null,"3442c2db",null);t["a"]=v.exports;d()(v,{VBtn:u["a"],VCard:f["a"],VCardActions:p["a"],VDataTable:h["a"],VSpacer:m["a"]})},4678:function(e,t,a){var n={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-in":"ec2e","./en-in.js":"ec2e","./en-nz":"6f50","./en-nz.js":"6f50","./en-sg":"b7e9","./en-sg.js":"b7e9","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fil":"d69a","./fil.js":"d69a","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-deva":"aaf2","./gom-deva.js":"aaf2","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./oc-lnc":"167b","./oc-lnc.js":"167b","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-mo":"3a6c","./zh-mo.js":"3a6c","./zh-tw":"90ea","./zh-tw.js":"90ea"};function s(e){var t=i(e);return a(t)}function i(e){if(!a.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}s.keys=function(){return Object.keys(n)},s.resolve=i,e.exports=s,s.id="4678"},5345:function(e,t,a){e.exports=a.p+"img/Silvia_Illustration_on.75f5c1e9.png"},"56d7":function(e,t,a){"use strict";a.r(t),a.d(t,"eventBus",(function(){return Be}));a("4de4"),a("e260"),a("e6cf"),a("cca6"),a("a79d");var n=a("2b0e"),s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app",[a("AppNaviagtion",{attrs:{machineOn:e.machineOn}}),a("v-content",[a("v-container",{staticClass:"mt-5",attrs:{fluid:""}},[a("v-row",{attrs:{align:"center",justify:"center"}},[a("router-view",{attrs:{machineOn:e.machineOn,machineBrewing:e.machineBrewing,machineMode:e.machineMode}})],1)],1)],1),a("v-footer",{attrs:{app:""}})],1)},i=[],o=(a("a9e3"),a("bc3a")),r=a.n(o),c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("span",[n("v-navigation-drawer",{attrs:{app:"",clipped:!0},model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[n("v-list",[e._l(e.items,(function(t){return[n("router-link",{key:t.title,attrs:{to:t.path}},[n("v-list-item",{attrs:{link:""}},[n("v-list-item-action",[n("v-icon",[e._v(e._s(t.icon))])],1),n("v-list-item-content",[n("v-list-item-title",[e._v(e._s(t.title))])],1)],1)],1)]}))],2),n("a",{attrs:{href:"admin"}},[n("v-list-item",{staticClass:"primary darken-2",staticStyle:{position:"absolute",bottom:"0",width:"100%"},attrs:{link:""}},[n("v-list-item-action",[n("v-icon",[e._v("mdi-lock")])],1),n("v-list-item-content",[n("v-list-item-title",[e._v("Admin")])],1)],1)],1)],1),n("v-app-bar",{attrs:{app:"",color:"primary","clipped-left":!0}},[n("v-app-bar-nav-icon",{on:{click:function(t){t.stopPropagation(),e.drawer=!e.drawer}}}),n("v-spacer",{staticClass:"hidden-md-and-up"}),n("v-img",{staticClass:"mx-2",attrs:{src:a("cf05"),"max-height":"40","max-width":"40",contain:""}}),n("v-toolbar-title",{staticClass:"hidden-sm-and-down"},[e._v(e._s(e.appTitle))]),n("v-spacer",{staticClass:"hidden-sm-and-down"}),n("v-btn",{staticClass:"hidden-sm-and-down",attrs:{color:"secondary",to:"/"},on:{click:e.toggleOnOff}},[e.machineOn?n("div",[n("v-icon",{attrs:{color:"success"}},[e._v("mdi-power")])],1):n("div",[n("v-icon",[e._v("mdi-power")])],1)])],1)],1)},l=[],d={name:"AppNavigation",data:function(){return{appTitle:"Silvia Control",drawer:!1,items:[{title:"Operate",icon:"mdi-coffee",path:"/"},{title:"Sessions",icon:"mdi-database",path:"/sessions"},{title:"Schedule",icon:"mdi-calendar",path:"/schedule"},{title:"Information",icon:"mdi-information",path:"/info"},{title:"Settings",icon:"mdi-cog",path:"/settings"},{title:"Docs",icon:"mdi-bookshelf",path:"/docs"},{title:"About",icon:"mdi-help-circle",path:"/about"}]}},props:{machineOn:Boolean},methods:{toggleOnOff:function(){Be.$emit("toggleOnOff")}}},u=d,f=(a("179d"),a("2877")),p=a("6544"),h=a.n(p),m=a("40dc"),v=a("5bc1"),b=a("8336"),g=a("132d"),j=a("adda"),w=a("8860"),y=a("da13"),O=a("1800"),x=a("5d23"),k=a("f774"),A=a("2fa4"),_=a("2a7f"),S=Object(f["a"])(u,c,l,!1,null,"40480864",null),C=S.exports;h()(S,{VAppBar:m["a"],VAppBarNavIcon:v["a"],VBtn:b["a"],VIcon:g["a"],VImg:j["a"],VList:w["a"],VListItem:y["a"],VListItemAction:O["a"],VListItemContent:x["a"],VListItemTitle:x["b"],VNavigationDrawer:k["a"],VSpacer:A["a"],VToolbarTitle:_["a"]}),r.a.defaults.xsrfCookieName="csrftoken",r.a.defaults.xsrfHeaderName="X-CSRFToken",r.a.defaults.headers["Content-Type"]="application/json",r.a.defaults.withCredentials=!0,r.a.defaults.trailingSlash=!0,r.a.interceptors.request.use((function(e){return e.addTrailingSlash&&"/"!==e.url[e.url.length-1]&&(e.url+="/"),e}));var B={name:"App",components:{AppNaviagtion:C},data:function(){return{machineOn:!1,machineBrewing:!1,machineMode:0}},watch:{$route:function(e,t){document.title=e.meta.title||"Silvia"}},created:function(){var e=this;Be.$on("toggleOnOff",(function(){var t={id:1,on:!e.machineOn,brew:!1};r.a.put("/api/v1/status/1/",t).then((function(e){console.log(e)})).catch((function(e){return console.log(e)}))})),Be.$on("toggleBrew",(function(){var t={id:1,brew:!e.machineBrewing};r.a.put("/api/v1/status/1/",t).then((function(e){console.log(e)})).catch((function(e){return console.log(e)}))})),Be.$on("changeMode",(function(t){var a={id:1,brew:e.machineBrewing,on:e.machineOn,mode:t};r.a.put("/api/v1/status/1/",a).then((function(e){console.log(e)})).catch((function(e){return console.log(e)}))})),Be.$on("updateStatus",(function(){r.a.get("/api/v1/status/1/").then((function(t){e.machineOn=Boolean(t.data.on),e.machineBrewing=Boolean(t.data.brew),e.machineMode=Number(t.data.mode)})).catch((function(e){return console.log(e)}))}))}},D=B,z=a("7496"),V=a("a523"),I=a("a75b"),N=a("553a"),M=a("0fd9"),T=Object(f["a"])(D,s,i,!1,null,null,null),K=T.exports;h()(T,{VApp:z["a"],VContainer:V["a"],VContent:I["a"],VFooter:N["a"],VRow:M["a"]});var L=a("9483");Object(L["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});a("d3b7");var R=a("8c4f"),Z=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"home"},[a("MachineInterface",{attrs:{machineOn:e.machineOn,machineBrewing:e.machineBrewing,machineMode:e.machineMode}})],1)},E=[],H=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"machine-interface"},[a("div",{staticClass:"machine-container"},["machine"==e.displayOption?a("div",[a("MachineDisplay",{attrs:{machineOn:e.machineOn,temperature:e.temperature}})],1):e._e(),"graph"==e.displayOption?a("div",[null==e.sessionData?a("div",{staticStyle:{display:"flex","justify-content":"center","align-items":"center","min-width":"350px"}},[a("v-btn",{attrs:{color:"secondary"},on:{click:e.viewLastSession}},[e._v("Last Session")])],1):a("div",[a("single-response-chart",{attrs:{data:e.sessionData}})],1)]):e._e(),"machine"==e.displayOption?a("v-btn",{attrs:{id:"temp-btn",outlined:"",color:e.tempBtnColor},on:{click:e.changeDisplay}},[null==e.temperature?a("div",[e._v("-")]):a("div",[e._v(e._s(e._f("temperatureDisplayFilter")(e.temperature))+"℃")])]):e._e(),e.machineBrewing?a("v-btn",{attrs:{id:"brew-btn",outlined:"",text:"",color:"secondary"}},[a("v-col",[a("v-row",{staticClass:"pb-1",attrs:{justify:"center"}},[e._v(e._s(e._f("temperatureDisplayFilter")(e.m_current))+"g")]),a("v-row",{attrs:{justify:"center"}},[e._v(e._s(e.t_elapsed)+"s")])],1)],1):e._e()],1),a("br"),a("v-row",{attrs:{align:"center"}},[a("v-col",{attrs:{cols:"auto"}},[a("v-switch",{attrs:{color:"secondary",value:e.machineOn,label:e.machineOn?"On":"Off"},on:{change:e.toggleOnOff}})],1),a("v-spacer"),e.machineOn?a("v-col",{staticClass:"px-1",attrs:{cols:"auto"}},[e.machineBrewing?a("div",[a("v-btn",{attrs:{color:"error"},on:{click:e.toggleBrew}},[e._v("Cancel")])],1):a("div",[a("v-btn",{attrs:{color:"accent lighten-1"},on:{click:e.toggleBrew}},[e._v("Brew")])],1)]):e._e(),a("v-col",{staticClass:"px-1",attrs:{cols:"auto"}},[e.machineOn?a("v-btn",{attrs:{fab:"",small:"",outlined:"",color:e.waterLevelColor}},[a("v-icon",[e._v("mdi-water")])],1):e._e()],1),a("v-col",{staticClass:"px-1",attrs:{cols:"auto"}},[a("v-btn",{attrs:{color:e.tempBtnColor,fab:"",small:"",elevation:"1",outlined:""},on:{click:e.changeDisplay}},["machine"==e.displayOption?a("div",[a("v-icon",[e._v("mdi-chart-line")])],1):a("div",[a("v-icon",[e._v("mdi-file-presentation-box")])],1)])],1),a("v-col",{staticClass:"px-1",attrs:{cols:"auto"}},[a("v-btn",{attrs:{color:"secondary",fab:"",small:"",elevation:"1",outlined:""},on:{click:e.toggleOverride}},[a("v-icon",[e._v("mdi-wrench")])],1)],1)],1),e.machineOn?a("div",[a("v-row",{attrs:{align:"center"}},[a("v-progress-linear",{attrs:{value:e.brewProgress,color:"blue-grey",height:"25",rounded:""}},[null==e.m_current?a("div",[e._v(" No scale detected ")]):a("div",[e._v(" "+e._s(e._f("temperatureDisplayFilter")(e.m_current))+"g / "+e._s(e.m_setpoint)+"g ")])])],1)],1):e._e(),0!=e.machineMode?a("div",[a("v-row",{attrs:{align:"center"}},[a("v-col",{staticClass:"px-1",attrs:{cols:"auto"}},[a("v-btn",{attrs:{color:"secondary"},on:{click:e.toggleHeaterOn}},[e._v(" Heat On ")])],1),a("v-col",{staticClass:"px-1",attrs:{cols:"auto"}},[a("v-btn",{attrs:{color:"secondary"},on:{click:e.toggleHeaterOff}},[e._v(" Heat Off ")])],1),a("v-col",{staticClass:"px-1",attrs:{cols:"auto"}},[a("v-btn",{attrs:{color:"accent lighten-1"},on:{click:e.toggleAutoTune}},[2==e.machineMode?a("div",[e._v(" Cancel Tuning ")]):a("div",[e._v(" Auto Tune ")])])],1),a("v-col",{staticClass:"px-1",attrs:{cols:"auto"}},[a("v-chip",{attrs:{color:"info"}},[a("v-avatar",{attrs:{left:"",color:"info darken-1"}},[e._v("Kp")]),e._v(e._s(e.Kp)+" ")],1)],1),a("v-col",{staticClass:"px-1",attrs:{cols:"auto"}},[a("v-chip",{attrs:{color:"info"}},[a("v-avatar",{attrs:{left:"",color:"info darken-1"}},[e._v("Ki")]),e._v(e._s(e.Ki)+" ")],1)],1),a("v-col",{staticClass:"px-1",attrs:{cols:"auto"}},[a("v-chip",{attrs:{color:"info"}},[a("v-avatar",{attrs:{left:"",color:"info darken-1"}},[e._v("Kd")]),e._v(e._s(e.Kd)+" ")],1)],1)],1)],1):e._e()],1)},q=[],X=(a("b64b"),a("25f0"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"machine"},[e.machineOn?n("div",[n("v-img",{staticClass:"machine-image img-center",attrs:{"min-width":"150","max-width":"350",src:a("5345"),contain:""}})],1):n("div",[n("v-img",{staticClass:"machine-image img-center",attrs:{"min-width":"150","max-width":"350",src:a("fd6e"),contain:""}})],1)])}),U=[],P={name:"MachineDisplay",props:{machineOn:Boolean,temperature:Number}},W=P,Y=(a("ccce"),Object(f["a"])(W,X,U,!1,null,"231a1fba",null)),F=Y.exports;h()(Y,{VImg:j["a"]});var Q=a("44ea"),J={methods:{getSessions:function(){r.a.get("/api/v1/session/").then((function(e){return e.data})).catch((function(e){return console.log(e)}))}}},G={name:"MachineInterface",mixins:[J],components:{MachineDisplay:F,SingleResponseChart:Q["a"]},data:function(){return{temperature:0,displayOption:"machine",T_setpoint:60,intervalReference:null,t_update:10,m_current:null,m_setpoint:20,n_datapoints:10,low_water:!1,sessionData:null,heaterOn:!1,Kp:0,Ki:0,Kd:0}},props:{machineOn:Boolean,machineBrewing:Boolean,machineMode:Number},computed:{tempBtnColor:function(){return Math.abs(this.T_setpoint-this.temperature)<2?"success":"secondary"},brewProgress:function(){return 100*this.m_current/this.m_setpoint},waterLevelColor:function(){return this.low_water?"error":"success"},t_elapsed:function(){return 0}},methods:{changeDisplay:function(){"machine"===this.displayOption?this.displayOption="graph":this.displayOption="machine"},toggleOnOff:function(){Be.$emit("toggleOnOff")},toggleBrew:function(){Be.$emit("toggleBrew")},toggleOverride:function(){var e=0===this.machineMode?1:0;Be.$emit("changeMode",e)},toggleHeater:function(){var e=this,t={params:{heaterOn:!this.heaterOn}};r.a.get("/api/v1/override/",t).then((function(t){e.heaterOn=!e.heaterOn})).catch((function(e){return console.log(e)}))},toggleHeaterOn:function(){var e=this,t={params:{heaterOn:!0}};r.a.get("/api/v1/override/",t).then((function(t){e.heaterOn=!0})).catch((function(e){return console.log(e)}))},toggleHeaterOff:function(){var e=this,t={params:{heaterOn:!1}};r.a.get("/api/v1/override/",t).then((function(t){e.heaterOn=!1})).catch((function(e){return console.log(e)}))},toggleAutoTune:function(){2===this.machineMode?Be.$emit("changeMode",1):Be.$emit("changeMode",2)},updateResponse:function(){var e=this;if(Be.$emit("updateStatus"),this.machineOn){var t={params:{session:"active"}};r.a.get("/api/v1/response/sessions/",t).then((function(t){console.log(t.data),e.sessionData=Object.assign({},e.sessionData,t.data);var a=t.data[Object.keys(t.data)[0]],n=a[a.length-1];e.temperature=n.T_boiler,e.m_current=n.m,e.low_water=n.low_water})).catch((function(e){return console.log(e)}))}else r.a.get("/api/v1/response/latest/").then((function(t){console.log(t.data);var a=(new Date-new Date(t.data.t))/1e3;e.temperature=a>15?null:t.data.T_boiler,e.m_current=t.data.m,e.low_water=t.data.low_water})).catch((function(e){return console.log(e)})),this.sessionData=null},updateInterval:function(){var e=this;r.a.get("/api/v1/settings/1/").then((function(t){e.t_update=t.data.t_update,e.m_setpoint=t.data.m,e.T_setpoint=t.data.T_set,e.Kp=t.data.k_p,e.Ki=t.data.k_i,e.Kd=t.data.k_d,e.intervalReference=setInterval((function(){e.updateResponse()}),1e3*e.t_update)})).catch((function(e){return console.log(e)}))},viewLastSession:function(){var e=this;r.a.get("/api/v1/session/").then((function(t){var a=t.data[t.data.length-1];e.$router.push({name:"Session",params:{sessionIds:a.id.toString()}})})).catch((function(e){return console.log(e)}))}},created:function(){this.updateInterval(),this.updateResponse(),Be.$emit("updateStatus")},destroyed:function(){console.log("Cancel temperature update"),clearInterval(this.intervalReference)}},$=G,ee=(a("f9d4"),a("8212")),te=a("cc20"),ae=a("62ad"),ne=a("8e36"),se=a("b73d"),ie=Object(f["a"])($,H,q,!1,null,"34315472",null),oe=ie.exports;h()(ie,{VAvatar:ee["a"],VBtn:b["a"],VChip:te["a"],VCol:ae["a"],VIcon:g["a"],VProgressLinear:ne["a"],VRow:M["a"],VSpacer:A["a"],VSwitch:se["a"]});var re={name:"Home",components:{MachineInterface:oe},props:{machineOn:Boolean,machineBrewing:Boolean,machineMode:Number}},ce=re,le=Object(f["a"])(ce,Z,E,!1,null,"331e977e",null),de=le.exports,ue=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"mx-auto text-center"},[a("h1",[e._v("(404)")]),a("h2",[e._v("Page not found")]),a("v-icon",[e._v("mdi-emoticon-sad")])],1)},fe=[],pe={},he=pe,me=Object(f["a"])(he,ue,fe,!1,null,null,null),ve=me.exports;h()(me,{VIcon:g["a"]});var be=function(){return a.e("chunk-580d4eac").then(a.bind(null,"78b4"))},ge=function(){return a.e("chunk-747c0b3c").then(a.bind(null,"3a39f"))},je=function(){return a.e("chunk-2d0b257b").then(a.bind(null,"2469"))},we=function(){return a.e("chunk-2d0b3289").then(a.bind(null,"26d3"))},ye=function(){return a.e("chunk-c99190f0").then(a.bind(null,"6b7b"))},Oe=function(){return a.e("chunk-2d230643").then(a.bind(null,"eba1"))};n["a"].use(R["a"]);var xe=[{path:"/",name:"Home",component:de,meta:{title:"Silvia"}},{path:"/session/:sessionIds",name:"Session",component:be,meta:{title:"Session"},props:!0},{path:"/sessions",name:"Sessions",component:ge,meta:{title:"Sessions"}},{path:"/info",name:"Info",component:je,meta:{title:"Info"}},{path:"/settings",name:"Settings",component:we,meta:{title:"Settings"}},{path:"/schedule",name:"Schedule",component:ye,meta:{title:"Schedule"}},{path:"/about",name:"About",component:function(){return a.e("about").then(a.bind(null,"f820"))},meta:{title:"About Silvia"}},{path:"/docs",name:"Docs",component:Oe,meta:{title:"Documentation"}},{path:"*",component:ve}],ke=new R["a"]({routes:xe}),Ae=ke,_e=a("f309");n["a"].use(_e["a"]);var Se=new _e["a"]({theme:{themes:{light:{primary:"#eeeeee",secondary:"#90a4ae",accent:"#ff5722",error:"#f44336",warning:"#e91e63",info:"#9c27b0",success:"#4caf50"}}}}),Ce=a("6612");n["a"].config.productionTip=!1;var Be=new n["a"];n["a"].filter("temperatureDisplayFilter",(function(e){return Ce(e).format("0.0")})),new n["a"]({router:Ae,vuetify:Se,render:function(e){return e(K)}}).$mount("#app")},"870d":function(e,t,a){},ccce:function(e,t,a){"use strict";var n=a("fc94"),s=a.n(n);s.a},cf05:function(e,t){e.exports="data:image/png;base64,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"},f72c:function(e,t,a){},f9d4:function(e,t,a){"use strict";var n=a("870d"),s=a.n(n);s.a},fc94:function(e,t,a){},fd6e:function(e,t,a){e.exports=a.p+"img/Silvia_Illustration_off.1783be3b.png"}});
//# sourceMappingURL=app.d3699a61.js.map