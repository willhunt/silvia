(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-747c0b3c"],{"3a39f":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"sessions"},[s("v-card",{staticClass:"mx-auto mb-4",attrs:{"min-width":"350","max-width":"1200"}},[s("v-row",{staticClass:"ml-0 mr-4",attrs:{align:"center"}},[s("v-col",{attrs:{cols:"auto"}},[s("v-card-title",[t._v("Sessions")])],1)],1),s("v-data-table",{staticClass:"mx-4",attrs:{headers:t.headers,items:t.sessions,"sort-by":["start_date","start_time"],"sort-desc":[!0,!0],"show-select":""},model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}}),s("v-card-actions",[s("v-spacer"),s("v-btn",{staticClass:"accent lighten-1",on:{click:t.viewData}},[t._v("Graph")]),s("v-btn",{staticClass:"error",on:{click:t.deleteSessions}},[t._v("Delete")]),s("v-btn",{staticClass:"secondary",on:{click:t.loadSessions}},[t._v("Reload")])],1)],1)],1)},n=[],o=(s("4160"),s("a15b"),s("d3b7"),s("25f0"),s("159b"),s("bc3a")),i=s.n(o),c={name:"Sessions",components:{},data:function(){return{sessions:[],selected:[],headers:[{text:"Id",value:"id"},{text:"Date",value:"start_date"},{text:"Time",value:"start_time"},{text:"Duration",value:"duration"},{text:"Active",value:"active"}]}},methods:{loadSessions:function(){var t=this;i.a.get("/api/v1/session/").then((function(e){console.log(e.data),t.sessions=e.data,t.sessions.forEach((function(t,e){var s=new Date(t.t_start),a=new Date(t.t_end);null==t.t_end&&(a=Date.now());var n=Math.ceil((a-s)/6e4),o=n%60,i=(n-o)/60;t.duration=i.toString()+":"+(o<10?"0":"")+o.toString()}))})).catch((function(t){return console.log(t)}))},deleteSessions:function(){var t=this;this.selected.forEach((function(e,s){i.a.delete("/api/v1/session/"+e.id+"/").then((function(t){console.log(t.data)})).catch((function(t){return console.log(t)})),t.loadSessions()}))},viewData:function(){var t=[];this.selected.forEach((function(e,s){t.push(e.id)})),this.$router.push({name:"Session",params:{sessionIds:t.join(",")}})}},created:function(){this.loadSessions()}},l=c,r=s("2877"),d=s("6544"),u=s.n(d),v=s("8336"),h=s("b0af"),f=s("99d9"),m=s("62ad"),b=s("8fea"),p=s("0fd9"),w=s("2fa4"),_=Object(r["a"])(l,a,n,!1,null,"950dfd5c",null);e["default"]=_.exports;u()(_,{VBtn:v["a"],VCard:h["a"],VCardActions:f["a"],VCardTitle:f["c"],VCol:m["a"],VDataTable:b["a"],VRow:p["a"],VSpacer:w["a"]})}}]);
//# sourceMappingURL=chunk-747c0b3c.ad06e63a.js.map