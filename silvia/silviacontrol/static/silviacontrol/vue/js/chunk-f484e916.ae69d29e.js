(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f484e916"],{"16b7":function(t,e,i){"use strict";i("a9e3");var n=i("2b0e");e["a"]=n["a"].extend().extend({name:"delayable",props:{openDelay:{type:[Number,String],default:0},closeDelay:{type:[Number,String],default:0}},data:function(){return{openTimeout:void 0,closeTimeout:void 0}},methods:{clearDelay:function(){clearTimeout(this.openTimeout),clearTimeout(this.closeTimeout)},runDelay:function(t,e){var i=this;this.clearDelay();var n=parseInt(this["".concat(t,"Delay")],10);this["".concat(t,"Timeout")]=setTimeout(e||function(){i.isActive={open:!0,close:!1}[t]},n)}}})},"1c58":function(t,e,i){},"21be":function(t,e,i){"use strict";i("99af"),i("caad"),i("2532");var n=i("2909"),s=i("2b0e"),a=i("80d2");e["a"]=s["a"].extend().extend({name:"stackable",data:function(){return{stackElement:null,stackExclude:null,stackMinZIndex:0,isActive:!1}},computed:{activeZIndex:function(){if("undefined"===typeof window)return 0;var t=this.stackElement||this.$refs.content,e=this.isActive?this.getMaxZIndex(this.stackExclude||[t])+2:Object(a["u"])(t);return null==e?e:parseInt(e)}},methods:{getMaxZIndex:function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=this.$el,i=[this.stackMinZIndex,Object(a["u"])(e)],s=[].concat(Object(n["a"])(document.getElementsByClassName("v-menu__content--active")),Object(n["a"])(document.getElementsByClassName("v-dialog__content--active"))),o=0;o<s.length;o++)t.includes(s[o])||i.push(Object(a["u"])(s[o]));return Math.max.apply(Math,i)}}})},"2af1":function(t,e,i){var n=i("23e7"),s=i("f748");n({target:"Math",stat:!0},{sign:s})},"368e":function(t,e,i){},"480e":function(t,e,i){"use strict";i("7db0");var n=i("7560");e["a"]=n["a"].extend({name:"v-theme-provider",props:{root:Boolean},computed:{isDark:function(){return this.root?this.rootIsDark:n["a"].options.computed.isDark.call(this)}},render:function(){return this.$slots.default&&this.$slots.default.find((function(t){return!t.isComment&&" "!==t.text}))}})},"4ad4":function(t,e,i){"use strict";i("caad"),i("45fc"),i("b0c0"),i("b64b");var n=i("53ca"),s=i("16b7"),a=i("f2e7"),o=i("58df"),r=i("80d2"),c=i("d9bd"),l=Object(o["a"])(s["a"],a["a"]);e["a"]=l.extend({name:"activatable",props:{activator:{default:null,validator:function(t){return["string","object"].includes(Object(n["a"])(t))}},disabled:Boolean,internalActivator:Boolean,openOnHover:Boolean,openOnFocus:Boolean},data:function(){return{activatorElement:null,activatorNode:[],events:["click","mouseenter","mouseleave","focus"],listeners:{}}},watch:{activator:"resetActivator",openOnFocus:"resetActivator",openOnHover:"resetActivator"},mounted:function(){var t=Object(r["t"])(this,"activator",!0);t&&["v-slot","normal"].includes(t)&&Object(c["b"])('The activator slot must be bound, try \'<template v-slot:activator="{ on }"><v-btn v-on="on">\'',this),this.addActivatorEvents()},beforeDestroy:function(){this.removeActivatorEvents()},methods:{addActivatorEvents:function(){if(this.activator&&!this.disabled&&this.getActivator()){this.listeners=this.genActivatorListeners();for(var t=Object.keys(this.listeners),e=0,i=t;e<i.length;e++){var n=i[e];this.getActivator().addEventListener(n,this.listeners[n])}}},genActivator:function(){var t=Object(r["s"])(this,"activator",Object.assign(this.getValueProxy(),{on:this.genActivatorListeners(),attrs:this.genActivatorAttributes()}))||[];return this.activatorNode=t,t},genActivatorAttributes:function(){return{role:"button","aria-haspopup":!0,"aria-expanded":String(this.isActive)}},genActivatorListeners:function(){var t=this;if(this.disabled)return{};var e={};return this.openOnHover?(e.mouseenter=function(e){t.getActivator(e),t.runDelay("open")},e.mouseleave=function(e){t.getActivator(e),t.runDelay("close")}):e.click=function(e){var i=t.getActivator(e);i&&i.focus(),e.stopPropagation(),t.isActive=!t.isActive},this.openOnFocus&&(e.focus=function(e){t.getActivator(e),e.stopPropagation(),t.isActive=!t.isActive}),e},getActivator:function(t){if(this.activatorElement)return this.activatorElement;var e=null;if(this.activator){var i=this.internalActivator?this.$el:document;e="string"===typeof this.activator?i.querySelector(this.activator):this.activator.$el?this.activator.$el:this.activator}else if(1===this.activatorNode.length||this.activatorNode.length&&!t){var n=this.activatorNode[0].componentInstance;e=n&&n.$options.mixins&&n.$options.mixins.some((function(t){return t.options&&["activatable","menuable"].includes(t.options.name)}))?n.getActivator():this.activatorNode[0].elm}else t&&(e=t.currentTarget||t.target);return this.activatorElement=e,this.activatorElement},getContentSlot:function(){return Object(r["s"])(this,"default",this.getValueProxy(),!0)},getValueProxy:function(){var t=this;return{get value(){return t.isActive},set value(e){t.isActive=e}}},removeActivatorEvents:function(){if(this.activator&&this.activatorElement){for(var t=Object.keys(this.listeners),e=0,i=t;e<i.length;e++){var n=i[e];this.activatorElement.removeEventListener(n,this.listeners[n])}this.listeners={}}},resetActivator:function(){this.removeActivatorEvents(),this.activatorElement=null,this.getActivator(),this.addActivatorEvents()}}})},"6b7b":function(t,e,i){"use strict";i.r(e);var n,s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"schedules"},[t._l(t.schedules,(function(e){return i("div",{key:e.id},[i("schedule-entry",{attrs:{schedule:e},on:{saveScheduleEntry:t.saveSchedule,deleteScheduleEntry:t.deleteSchedule}})],1)})),i("v-btn",{staticClass:"accent",attrs:{fixed:"",fab:"",bottom:"",right:""},on:{click:t.addSchedule}},[i("v-icon",[t._v("mdi-plus")])],1)],2)},a=[],o=i("bc3a"),r=i.n(o),c=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"scheduleentry"},[i("v-card",{staticClass:"mx-auto mb-4",attrs:{"min-width":"500"}},[i("v-row",{attrs:{align:"center"}},[t.editName?i("v-col",{staticClass:"mx-4",attrs:{cols:"auto"}},[i("v-text-field",{attrs:{label:"Schedule name"},model:{value:t.scheduleLocal.name,callback:function(e){t.$set(t.scheduleLocal,"name",e)},expression:"scheduleLocal.name"}})],1):i("v-col",{attrs:{cols:"auto"}},[i("v-card-title",[t._v(" "+t._s(t.scheduleLocal.name)+" ")])],1),i("v-col",{attrs:{cols:"auto"}},[t.editName?i("v-btn",{attrs:{fab:"","x-small":"",depressed:""},on:{click:t.saveNameField}},[i("v-icon",{attrs:{small:"",color:"grey"}},[t._v("mdi-check")])],1):i("v-btn",{attrs:{fab:"","x-small":"",depressed:""},on:{click:function(e){t.editName=!0}}},[i("v-icon",{attrs:{small:"",color:"grey"}},[t._v("mdi-pencil")])],1)],1),i("v-col",{attrs:{cols:"auto"}},[i("v-btn",{attrs:{fab:"","x-small":"",outlined:""},on:{click:t.deleteSchedule}},[i("v-icon",{attrs:{small:"",color:"grey"}},[t._v("mdi-delete")])],1)],1),i("v-spacer"),i("v-col",{staticClass:"mx-4",attrs:{cols:"auto"}},[i("v-switch",{attrs:{color:"secondary"},on:{change:t.saveToggleField},model:{value:t.scheduleLocal.active,callback:function(e){t.$set(t.scheduleLocal,"active",e)},expression:"scheduleLocal.active"}})],1)],1),i("v-row",{staticClass:"ml-4 mr-2",attrs:{cols:"auto"}},t._l(t.scheduleLocal.days.split(""),(function(e,n){return i("v-col",{key:n},[i("v-btn",{class:1==e?"secondary":"primary",attrs:{fab:"",small:"",depressed:""},on:{click:function(i){return t.saveDayField(n,e)}}},[t._v(t._s(t.dayLetters[n]))])],1)})),1),i("v-row",{staticClass:"mx-2"},[i("v-col",[i("v-dialog",{ref:"dialog",attrs:{"return-value":t.scheduleLocal.start_time,persistent:"",width:"290px"},on:{"update:returnValue":function(e){return t.$set(t.scheduleLocal,"start_time",e)},"update:return-value":function(e){return t.$set(t.scheduleLocal,"start_time",e)}},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,s=e.attrs;return[i("v-text-field",t._g(t._b({attrs:{value:t.scheduleLocal.start_time,label:"Start time","prepend-inner-icon":"mdi-clock",readonly:"",outlined:""}},"v-text-field",s,!1),n))]}}]),model:{value:t.dialogStart,callback:function(e){t.dialogStart=e},expression:"dialogStart"}},[i("v-card",[t.dialogStart?i("v-time-picker",{attrs:{color:"secondary",format:"24hr","full-width":""},model:{value:t.scheduleLocal.start_time,callback:function(e){t.$set(t.scheduleLocal,"start_time",e)},expression:"scheduleLocal.start_time"}}):t._e(),i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{text:"",color:"error"},on:{click:function(e){t.dialogStart=!1}}},[t._v("Cancel")]),i("v-btn",{attrs:{text:"",color:"success"},on:{click:function(e){return t.saveStartTimeDialog(t.$refs.dialog)}}},[t._v("OK")])],1)],1)],1)],1),i("v-col",[i("v-dialog",{ref:"dialog",attrs:{"return-value":t.scheduleLocal.end_time,persistent:"",width:"290px"},on:{"update:returnValue":function(e){return t.$set(t.scheduleLocal,"end_time",e)},"update:return-value":function(e){return t.$set(t.scheduleLocal,"end_time",e)}},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,s=e.attrs;return[i("v-text-field",t._g(t._b({attrs:{value:t.scheduleLocal.end_time,label:"End time","prepend-inner-icon":"mdi-clock",readonly:"",outlined:""}},"v-text-field",s,!1),n))]}}]),model:{value:t.dialogEnd,callback:function(e){t.dialogEnd=e},expression:"dialogEnd"}},[i("v-card",[t.dialogEnd?i("v-time-picker",{attrs:{color:"secondary",format:"24hr",min:t.scheduleLocal.start_time,"full-width":""},model:{value:t.scheduleLocal.end_time,callback:function(e){t.$set(t.scheduleLocal,"end_time",e)},expression:"scheduleLocal.end_time"}}):t._e(),i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{text:"",color:"error"},on:{click:function(e){t.dialogEnd=!1}}},[t._v("Cancel")]),i("v-btn",{attrs:{text:"",color:"success"},on:{click:function(e){return t.saveEndTimeDialog(t.$refs.dialog)}}},[t._v("OK")])],1)],1)],1)],1)],1)],1)],1)},l=[],u={name:"ScheduleEntry",data:function(){return{dayLetters:["M","T","W","T","F","S","S"],showExtra:!1,dialogStart:!1,dialogEnd:!1,scheduleLocal:null,editName:!1}},props:{schedule:Object},methods:{saveToggleField:function(){this.saveSchedule()},saveSchedule:function(){this.$emit("saveScheduleEntry",this.scheduleLocal)},saveStartTimeDialog:function(t){t.save(this.scheduleLocal.start_time),this.dialogStart=!1,this.saveSchedule()},saveEndTimeDialog:function(t){t.save(this.scheduleLocal.end_time),this.dialogEnd=!1,this.saveSchedule()},saveNameField:function(){this.editName=!1,this.saveSchedule()},saveDayField:function(t,e){var i="0"===e?"1":"0";this.scheduleLocal.days=this.scheduleLocal.days.substr(0,t)+i+this.scheduleLocal.days.substr(t+1),this.saveSchedule()},deleteSchedule:function(){this.$emit("deleteScheduleEntry",this.scheduleLocal.id)}},beforeMount:function(){this.scheduleLocal=Object.assign({},this.schedule)}},h=u,d=i("2877"),v=i("6544"),m=i.n(v),f=i("8336"),p=i("b0af"),g=i("99d9"),b=i("62ad"),y=(i("7db0"),i("caad"),i("45fc"),i("a9e3"),i("2532"),i("498a"),i("5530")),k=i("2909"),S=i("ade3"),w=(i("368e"),i("480e")),A=i("4ad4"),x=i("b848"),_=i("75eb"),C=i("e707"),$=i("e4d3"),M=i("21be"),O=i("f2e7"),E=i("a293"),B=i("58df"),T=i("d9bd"),D=i("80d2"),P=Object(B["a"])(A["a"],x["a"],_["a"],C["a"],$["a"],M["a"],O["a"]),H=P.extend({name:"v-dialog",directives:{ClickOutside:E["a"]},props:{dark:Boolean,disabled:Boolean,fullscreen:Boolean,light:Boolean,maxWidth:{type:[String,Number],default:"none"},noClickAnimation:Boolean,origin:{type:String,default:"center center"},persistent:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,transition:{type:[String,Boolean],default:"dialog-transition"},width:{type:[String,Number],default:"auto"}},data:function(){return{activatedBy:null,animate:!1,animateTimeout:-1,isActive:!!this.value,stackMinZIndex:200}},computed:{classes:function(){var t;return t={},Object(S["a"])(t,"v-dialog ".concat(this.contentClass).trim(),!0),Object(S["a"])(t,"v-dialog--active",this.isActive),Object(S["a"])(t,"v-dialog--persistent",this.persistent),Object(S["a"])(t,"v-dialog--fullscreen",this.fullscreen),Object(S["a"])(t,"v-dialog--scrollable",this.scrollable),Object(S["a"])(t,"v-dialog--animated",this.animate),t},contentClasses:function(){return{"v-dialog__content":!0,"v-dialog__content--active":this.isActive}},hasActivator:function(){return Boolean(!!this.$slots.activator||!!this.$scopedSlots.activator)}},watch:{isActive:function(t){t?(this.show(),this.hideScroll()):(this.removeOverlay(),this.unbind())},fullscreen:function(t){this.isActive&&(t?(this.hideScroll(),this.removeOverlay(!1)):(this.showScroll(),this.genOverlay()))}},created:function(){this.$attrs.hasOwnProperty("full-width")&&Object(T["e"])("full-width",this)},beforeMount:function(){var t=this;this.$nextTick((function(){t.isBooted=t.isActive,t.isActive&&t.show()}))},beforeDestroy:function(){"undefined"!==typeof window&&this.unbind()},methods:{animateClick:function(){var t=this;this.animate=!1,this.$nextTick((function(){t.animate=!0,window.clearTimeout(t.animateTimeout),t.animateTimeout=window.setTimeout((function(){return t.animate=!1}),150)}))},closeConditional:function(t){var e=t.target;return!(this._isDestroyed||!this.isActive||this.$refs.content.contains(e)||this.overlay&&e&&!this.overlay.$el.contains(e))&&this.activeZIndex>=this.getMaxZIndex()},hideScroll:function(){this.fullscreen?document.documentElement.classList.add("overflow-y-hidden"):C["a"].options.methods.hideScroll.call(this)},show:function(){var t=this;!this.fullscreen&&!this.hideOverlay&&this.genOverlay(),this.$nextTick((function(){t.$refs.content.focus(),t.bind()}))},bind:function(){window.addEventListener("focusin",this.onFocusin)},unbind:function(){window.removeEventListener("focusin",this.onFocusin)},onClickOutside:function(t){this.$emit("click:outside",t),this.persistent?this.noClickAnimation||this.animateClick():this.isActive=!1},onKeydown:function(t){if(t.keyCode===D["x"].esc&&!this.getOpenDependents().length)if(this.persistent)this.noClickAnimation||this.animateClick();else{this.isActive=!1;var e=this.getActivator();this.$nextTick((function(){return e&&e.focus()}))}this.$emit("keydown",t)},onFocusin:function(t){if(t&&this.retainFocus){var e=t.target;if(e&&![document,this.$refs.content].includes(e)&&!this.$refs.content.contains(e)&&this.activeZIndex>=this.getMaxZIndex()&&!this.getOpenDependentElements().some((function(t){return t.contains(e)}))){var i=this.$refs.content.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),n=Object(k["a"])(i).find((function(t){return!t.hasAttribute("disabled")}));n&&n.focus()}}},genContent:function(){var t=this;return this.showLazyContent((function(){return[t.$createElement(w["a"],{props:{root:!0,light:t.light,dark:t.dark}},[t.$createElement("div",{class:t.contentClasses,attrs:Object(y["a"])({role:"document",tabindex:t.isActive?0:void 0},t.getScopeIdAttrs()),on:{keydown:t.onKeydown},style:{zIndex:t.activeZIndex},ref:"content"},[t.genTransition()])])]}))},genTransition:function(){var t=this.genInnerContent();return this.transition?this.$createElement("transition",{props:{name:this.transition,origin:this.origin,appear:!0}},[t]):t},genInnerContent:function(){var t={class:this.classes,ref:"dialog",directives:[{name:"click-outside",value:{handler:this.onClickOutside,closeConditional:this.closeConditional,include:this.getOpenDependentElements}},{name:"show",value:this.isActive}],style:{transformOrigin:this.origin}};return this.fullscreen||(t.style=Object(y["a"])(Object(y["a"])({},t.style),{},{maxWidth:"none"===this.maxWidth?void 0:Object(D["g"])(this.maxWidth),width:"auto"===this.width?void 0:Object(D["g"])(this.width)})),this.$createElement("div",t,this.getContentSlot())}},render:function(t){return t("div",{staticClass:"v-dialog__container",class:{"v-dialog__container--attached":""===this.attach||!0===this.attach||"attach"===this.attach},attrs:{role:"dialog"}},[this.genActivator(),this.genContent()])}}),j=i("132d"),N=i("0fd9"),V=i("2fa4"),I=i("b73d"),L=i("8654"),F=(i("99af"),i("d81d"),i("ac1f"),i("466d"),i("1276"),i("3835")),U=(i("e635"),i("a9ad")),z=Object(B["a"])(U["a"]).extend({methods:{genPickerButton:function(t,e,i){var n=this,s=arguments.length>3&&void 0!==arguments[3]&&arguments[3],a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"",o=this[t]===e,r=function(i){i.stopPropagation(),n.$emit("update:".concat(Object(D["w"])(t)),e)};return this.$createElement("div",{staticClass:"v-picker__title__btn ".concat(a).trim(),class:{"v-picker__title__btn--active":o,"v-picker__title__btn--readonly":s},on:o||s?void 0:{click:r}},Array.isArray(i)?i:[i])}}}),W=(i("fb6a"),i("38cf"),function(t,e,i){return e>>=0,t=String(t),i=String(i),t.length>e?String(t):(e-=t.length,e>i.length&&(i+=i.repeat(e/i.length)),i.slice(0,e)+String(t))}),R=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;return W(t,e,"0")};(function(t){t[t["Hour"]=1]="Hour",t[t["Minute"]=2]="Minute",t[t["Second"]=3]="Second"})(n||(n={}));var Z=Object(B["a"])(z).extend({name:"v-time-picker-title",props:{ampm:Boolean,ampmReadonly:Boolean,disabled:Boolean,hour:Number,minute:Number,second:Number,period:{type:String,validator:function(t){return"am"===t||"pm"===t}},readonly:Boolean,useSeconds:Boolean,selecting:Number},methods:{genTime:function(){var t=this.hour;this.ampm&&(t=t?(t-1)%12+1:12);var e=null==this.hour?"--":this.ampm?String(t):R(t),i=null==this.minute?"--":R(this.minute),s=[this.genPickerButton("selecting",n.Hour,e,this.disabled),this.$createElement("span",":"),this.genPickerButton("selecting",n.Minute,i,this.disabled)];if(this.useSeconds){var a=null==this.second?"--":R(this.second);s.push(this.$createElement("span",":")),s.push(this.genPickerButton("selecting",n.Second,a,this.disabled))}return this.$createElement("div",{class:"v-time-picker-title__time"},s)},genAmPm:function(){return this.$createElement("div",{staticClass:"v-time-picker-title__ampm",class:{"v-time-picker-title__ampm--readonly":this.ampmReadonly}},[this.ampmReadonly&&"am"!==this.period?null:this.genPickerButton("period","am",this.$vuetify.lang.t("$vuetify.timePicker.am"),this.disabled||this.readonly),this.ampmReadonly&&"pm"!==this.period?null:this.genPickerButton("period","pm",this.$vuetify.lang.t("$vuetify.timePicker.pm"),this.disabled||this.readonly)])}},render:function(t){var e=[this.genTime()];return this.ampm&&e.push(this.genAmPm()),t("div",{staticClass:"v-time-picker-title"},e)}}),q=(i("2af1"),i("1c58"),i("7560")),K=Object(B["a"])(U["a"],q["a"]).extend({name:"v-time-picker-clock",props:{allowedValues:Function,ampm:Boolean,disabled:Boolean,double:Boolean,format:{type:Function,default:function(t){return t}},max:{type:Number,required:!0},min:{type:Number,required:!0},scrollable:Boolean,readonly:Boolean,rotate:{type:Number,default:0},step:{type:Number,default:1},value:Number},data:function(){return{inputValue:this.value,isDragging:!1,valueOnMouseDown:null,valueOnMouseUp:null}},computed:{count:function(){return this.max-this.min+1},degreesPerUnit:function(){return 360/this.roundCount},degrees:function(){return this.degreesPerUnit*Math.PI/180},displayedValue:function(){return null==this.value?this.min:this.value},innerRadiusScale:function(){return.62},roundCount:function(){return this.double?this.count/2:this.count}},watch:{value:function(t){this.inputValue=t}},methods:{wheel:function(t){t.preventDefault();var e=Math.sign(-t.deltaY||1),i=this.displayedValue;do{i+=e,i=(i-this.min+this.count)%this.count+this.min}while(!this.isAllowed(i)&&i!==this.displayedValue);i!==this.displayedValue&&this.update(i)},isInner:function(t){return this.double&&t-this.min>=this.roundCount},handScale:function(t){return this.isInner(t)?this.innerRadiusScale:1},isAllowed:function(t){return!this.allowedValues||this.allowedValues(t)},genValues:function(){for(var t=[],e=this.min;e<=this.max;e+=this.step){var i=e===this.value&&(this.color||"accent");t.push(this.$createElement("span",this.setBackgroundColor(i,{staticClass:"v-time-picker-clock__item",class:{"v-time-picker-clock__item--active":e===this.displayedValue,"v-time-picker-clock__item--disabled":this.disabled||!this.isAllowed(e)},style:this.getTransform(e),domProps:{innerHTML:"<span>".concat(this.format(e),"</span>")}})))}return t},genHand:function(){var t="scaleY(".concat(this.handScale(this.displayedValue),")"),e=this.rotate+this.degreesPerUnit*(this.displayedValue-this.min),i=null!=this.value&&(this.color||"accent");return this.$createElement("div",this.setBackgroundColor(i,{staticClass:"v-time-picker-clock__hand",class:{"v-time-picker-clock__hand--inner":this.isInner(this.value)},style:{transform:"rotate(".concat(e,"deg) ").concat(t)}}))},getTransform:function(t){var e=this.getPosition(t),i=e.x,n=e.y;return{left:"".concat(50+50*i,"%"),top:"".concat(50+50*n,"%")}},getPosition:function(t){var e=this.rotate*Math.PI/180;return{x:Math.sin((t-this.min)*this.degrees+e)*this.handScale(t),y:-Math.cos((t-this.min)*this.degrees+e)*this.handScale(t)}},onMouseDown:function(t){t.preventDefault(),this.valueOnMouseDown=null,this.valueOnMouseUp=null,this.isDragging=!0,this.onDragMove(t)},onMouseUp:function(t){t.stopPropagation(),this.isDragging=!1,null!==this.valueOnMouseUp&&this.isAllowed(this.valueOnMouseUp)&&this.$emit("change",this.valueOnMouseUp)},onDragMove:function(t){if(t.preventDefault(),this.isDragging||"click"===t.type)for(var e,i=this.$refs.clock.getBoundingClientRect(),n=i.width,s=i.top,a=i.left,o=this.$refs.innerClock.getBoundingClientRect(),r=o.width,c=("touches"in t?t.touches[0]:t),l=c.clientX,u=c.clientY,h={x:n/2,y:-n/2},d={x:l-a,y:s-u},v=Math.round(this.angle(h,d)-this.rotate+360)%360,m=this.double&&this.euclidean(h,d)<(r+r*this.innerRadiusScale)/4,f=Math.ceil(15/this.degreesPerUnit),p=0;p<f;p++){if(e=this.angleToValue(v+p*this.degreesPerUnit,m),this.isAllowed(e))return this.setMouseDownValue(e);if(e=this.angleToValue(v-p*this.degreesPerUnit,m),this.isAllowed(e))return this.setMouseDownValue(e)}},angleToValue:function(t,e){var i=(Math.round(t/this.degreesPerUnit)+(e?this.roundCount:0))%this.count+this.min;return t<360-this.degreesPerUnit/2?i:e?this.max-this.roundCount+1:this.min},setMouseDownValue:function(t){null===this.valueOnMouseDown&&(this.valueOnMouseDown=t),this.valueOnMouseUp=t,this.update(t)},update:function(t){this.inputValue!==t&&(this.inputValue=t,this.$emit("input",t))},euclidean:function(t,e){var i=e.x-t.x,n=e.y-t.y;return Math.sqrt(i*i+n*n)},angle:function(t,e){var i=2*Math.atan2(e.y-t.y-this.euclidean(t,e),e.x-t.x);return Math.abs(180*i/Math.PI)}},render:function(t){var e=this,i={staticClass:"v-time-picker-clock",class:Object(y["a"])({"v-time-picker-clock--indeterminate":null==this.value},this.themeClasses),on:this.readonly||this.disabled?void 0:{mousedown:this.onMouseDown,mouseup:this.onMouseUp,mouseleave:function(t){return e.isDragging&&e.onMouseUp(t)},touchstart:this.onMouseDown,touchend:this.onMouseUp,mousemove:this.onDragMove,touchmove:this.onDragMove},ref:"clock"};return this.scrollable&&i.on&&(i.on.wheel=this.wheel),t("div",i,[t("div",{staticClass:"v-time-picker-clock__inner",ref:"innerClock"},[this.genHand(),this.genValues()])])}}),Y=(i("0481"),i("4069"),i("e53c"),i("615b"),i("c995")),J=Object(B["a"])(U["a"],Y["a"],q["a"]).extend({name:"v-picker",props:{flat:Boolean,fullWidth:Boolean,landscape:Boolean,noTitle:Boolean,transition:{type:String,default:"fade-transition"},width:{type:[Number,String],default:290}},computed:{computedTitleColor:function(){var t=!this.isDark&&(this.color||"primary");return this.color||t}},methods:{genTitle:function(){return this.$createElement("div",this.setBackgroundColor(this.computedTitleColor,{staticClass:"v-picker__title",class:{"v-picker__title--landscape":this.landscape}}),this.$slots.title)},genBodyTransition:function(){return this.$createElement("transition",{props:{name:this.transition}},this.$slots.default)},genBody:function(){return this.$createElement("div",{staticClass:"v-picker__body",class:Object(y["a"])({"v-picker__body--no-title":this.noTitle},this.themeClasses),style:this.fullWidth?void 0:{width:Object(D["g"])(this.width)}},[this.genBodyTransition()])},genActions:function(){return this.$createElement("div",{staticClass:"v-picker__actions v-card__actions",class:{"v-picker__actions--no-title":this.noTitle}},this.$slots.actions)}},render:function(t){return t("div",{staticClass:"v-picker v-card",class:Object(y["a"])(Object(y["a"])({"v-picker--flat":this.flat,"v-picker--landscape":this.landscape,"v-picker--full-width":this.fullWidth},this.themeClasses),this.elevationClasses)},[this.$slots.title?this.genTitle():null,this.genBody(),this.$slots.actions?this.genActions():null])}}),X=J,G=Object(B["a"])(U["a"],Y["a"],q["a"]).extend({name:"picker",props:{flat:Boolean,fullWidth:Boolean,headerColor:String,landscape:Boolean,noTitle:Boolean,width:{type:[Number,String],default:290}},methods:{genPickerTitle:function(){return null},genPickerBody:function(){return null},genPickerActionsSlot:function(){return this.$scopedSlots.default?this.$scopedSlots.default({save:this.save,cancel:this.cancel}):this.$slots.default},genPicker:function(t){var e=[];if(!this.noTitle){var i=this.genPickerTitle();i&&e.push(i)}var n=this.genPickerBody();return n&&e.push(n),e.push(this.$createElement("template",{slot:"actions"},[this.genPickerActionsSlot()])),this.$createElement(X,{staticClass:t,props:{color:this.headerColor||this.color,dark:this.dark,elevation:this.elevation,flat:this.flat,fullWidth:this.fullWidth,landscape:this.landscape,light:this.light,width:this.width,noTitle:this.noTitle}},e)}}}),Q=Object(D["h"])(24),tt=Object(D["h"])(12),et=tt.map((function(t){return t+12})),it=Object(D["h"])(60),nt={1:"hour",2:"minute",3:"second"},st=Object(B["a"])(G,z).extend({name:"v-time-picker",props:{allowedHours:[Function,Array],allowedMinutes:[Function,Array],allowedSeconds:[Function,Array],disabled:Boolean,format:{type:String,default:"ampm",validator:function(t){return["ampm","24hr"].includes(t)}},min:String,max:String,readonly:Boolean,scrollable:Boolean,useSeconds:Boolean,value:null,ampmInTitle:Boolean},data:function(){return{inputHour:null,inputMinute:null,inputSecond:null,lazyInputHour:null,lazyInputMinute:null,lazyInputSecond:null,period:"am",selecting:n.Hour}},computed:{selectingHour:{get:function(){return this.selecting===n.Hour},set:function(t){this.selecting=n.Hour}},selectingMinute:{get:function(){return this.selecting===n.Minute},set:function(t){this.selecting=n.Minute}},selectingSecond:{get:function(){return this.selecting===n.Second},set:function(t){this.selecting=n.Second}},isAllowedHourCb:function(){var t,e=this;if(t=this.allowedHours instanceof Array?function(t){return e.allowedHours.includes(t)}:this.allowedHours,!this.min&&!this.max)return t;var i=this.min?Number(this.min.split(":")[0]):0,n=this.max?Number(this.max.split(":")[0]):23;return function(e){return e>=1*i&&e<=1*n&&(!t||t(e))}},isAllowedMinuteCb:function(){var t,e=this,i=!this.isAllowedHourCb||null===this.inputHour||this.isAllowedHourCb(this.inputHour);if(t=this.allowedMinutes instanceof Array?function(t){return e.allowedMinutes.includes(t)}:this.allowedMinutes,!this.min&&!this.max)return i?t:function(){return!1};var n=this.min?this.min.split(":").map(Number):[0,0],s=Object(F["a"])(n,2),a=s[0],o=s[1],r=this.max?this.max.split(":").map(Number):[23,59],c=Object(F["a"])(r,2),l=c[0],u=c[1],h=60*a+1*o,d=60*l+1*u;return function(n){var s=60*e.inputHour+n;return s>=h&&s<=d&&i&&(!t||t(n))}},isAllowedSecondCb:function(){var t,e=this,i=!this.isAllowedHourCb||null===this.inputHour||this.isAllowedHourCb(this.inputHour),n=i&&(!this.isAllowedMinuteCb||null===this.inputMinute||this.isAllowedMinuteCb(this.inputMinute));if(t=this.allowedSeconds instanceof Array?function(t){return e.allowedSeconds.includes(t)}:this.allowedSeconds,!this.min&&!this.max)return n?t:function(){return!1};var s=this.min?this.min.split(":").map(Number):[0,0,0],a=Object(F["a"])(s,3),o=a[0],r=a[1],c=a[2],l=this.max?this.max.split(":").map(Number):[23,59,59],u=Object(F["a"])(l,3),h=u[0],d=u[1],v=u[2],m=3600*o+60*r+1*(c||0),f=3600*h+60*d+1*(v||0);return function(i){var s=3600*e.inputHour+60*e.inputMinute+i;return s>=m&&s<=f&&n&&(!t||t(i))}},isAmPm:function(){return"ampm"===this.format}},watch:{value:"setInputData"},mounted:function(){this.setInputData(this.value),this.$on("update:period",this.setPeriod)},methods:{genValue:function(){return null==this.inputHour||null==this.inputMinute||this.useSeconds&&null==this.inputSecond?null:"".concat(R(this.inputHour),":").concat(R(this.inputMinute))+(this.useSeconds?":".concat(R(this.inputSecond)):"")},emitValue:function(){var t=this.genValue();null!==t&&this.$emit("input",t)},setPeriod:function(t){if(this.period=t,null!=this.inputHour){var e=this.inputHour+("am"===t?-12:12);this.inputHour=this.firstAllowed("hour",e),this.emitValue()}},setInputData:function(t){if(null==t||""===t)this.inputHour=null,this.inputMinute=null,this.inputSecond=null;else if(t instanceof Date)this.inputHour=t.getHours(),this.inputMinute=t.getMinutes(),this.inputSecond=t.getSeconds();else{var e=t.trim().toLowerCase().match(/^(\d+):(\d+)(:(\d+))?([ap]m)?$/)||new Array(6),i=Object(F["a"])(e,6),n=i[1],s=i[2],a=i[4],o=i[5];this.inputHour=o?this.convert12to24(parseInt(n,10),o):parseInt(n,10),this.inputMinute=parseInt(s,10),this.inputSecond=parseInt(a||0,10)}this.period=null==this.inputHour||this.inputHour<12?"am":"pm"},convert24to12:function(t){return t?(t-1)%12+1:12},convert12to24:function(t,e){return t%12+("pm"===e?12:0)},onInput:function(t){this.selecting===n.Hour?this.inputHour=this.isAmPm?this.convert12to24(t,this.period):t:this.selecting===n.Minute?this.inputMinute=t:this.inputSecond=t,this.emitValue()},onChange:function(t){this.$emit("click:".concat(nt[this.selecting]),t);var e=this.selecting===(this.useSeconds?n.Second:n.Minute);if(this.selecting===n.Hour?this.selecting=n.Minute:this.useSeconds&&this.selecting===n.Minute&&(this.selecting=n.Second),this.inputHour!==this.lazyInputHour||this.inputMinute!==this.lazyInputMinute||this.useSeconds&&this.inputSecond!==this.lazyInputSecond){var i=this.genValue();null!==i&&(this.lazyInputHour=this.inputHour,this.lazyInputMinute=this.inputMinute,this.useSeconds&&(this.lazyInputSecond=this.inputSecond),e&&this.$emit("change",i))}},firstAllowed:function(t,e){var i="hour"===t?this.isAllowedHourCb:"minute"===t?this.isAllowedMinuteCb:this.isAllowedSecondCb;if(!i)return e;var n="minute"===t||"second"===t?it:this.isAmPm?e<12?tt:et:Q,s=n.find((function(t){return i((t+e)%n.length+n[0])}));return((s||0)+e)%n.length+n[0]},genClock:function(){return this.$createElement(K,{props:{allowedValues:this.selecting===n.Hour?this.isAllowedHourCb:this.selecting===n.Minute?this.isAllowedMinuteCb:this.isAllowedSecondCb,color:this.color,dark:this.dark,disabled:this.disabled,double:this.selecting===n.Hour&&!this.isAmPm,format:this.selecting===n.Hour?this.isAmPm?this.convert24to12:function(t){return t}:function(t){return R(t,2)},light:this.light,max:this.selecting===n.Hour?this.isAmPm&&"am"===this.period?11:23:59,min:this.selecting===n.Hour&&this.isAmPm&&"pm"===this.period?12:0,readonly:this.readonly,scrollable:this.scrollable,size:Number(this.width)-(!this.fullWidth&&this.landscape?80:20),step:this.selecting===n.Hour?1:5,value:this.selecting===n.Hour?this.inputHour:this.selecting===n.Minute?this.inputMinute:this.inputSecond},on:{input:this.onInput,change:this.onChange},ref:"clock"})},genClockAmPm:function(){return this.$createElement("div",this.setTextColor(this.color||"primary",{staticClass:"v-time-picker-clock__ampm"}),[this.genPickerButton("period","am",this.$vuetify.lang.t("$vuetify.timePicker.am"),this.disabled||this.readonly),this.genPickerButton("period","pm",this.$vuetify.lang.t("$vuetify.timePicker.pm"),this.disabled||this.readonly)])},genPickerBody:function(){return this.$createElement("div",{staticClass:"v-time-picker-clock__container",key:this.selecting},[!this.ampmInTitle&&this.isAmPm&&this.genClockAmPm(),this.genClock()])},genPickerTitle:function(){var t=this;return this.$createElement(Z,{props:{ampm:this.isAmPm,ampmReadonly:this.isAmPm&&!this.ampmInTitle,disabled:this.disabled,hour:this.inputHour,minute:this.inputMinute,second:this.inputSecond,period:this.period,readonly:this.readonly,useSeconds:this.useSeconds,selecting:this.selecting},on:{"update:selecting":function(e){return t.selecting=e},"update:period":function(e){return t.$emit("update:period",e)}},ref:"title",slot:"title"})}},render:function(){return this.genPicker("v-picker--time")}}),at=Object(d["a"])(h,c,l,!1,null,"28c3a578",null),ot=at.exports;m()(at,{VBtn:f["a"],VCard:p["a"],VCardActions:g["a"],VCardTitle:g["c"],VCol:b["a"],VDialog:H,VIcon:j["a"],VRow:N["a"],VSpacer:V["a"],VSwitch:I["a"],VTextField:L["a"],VTimePicker:st});var rt={name:"Schedules",components:{ScheduleEntry:ot},data:function(){return{schedules:[]}},methods:{addSchedule:function(){var t=this,e={name:"New",days:"0000000",active:!1,start_time:"00:00",end_time:"00:00"};r.a.post("/api/v1/schedule/",e).then((function(e){console.log(e),t.refreshSchedules()})).catch((function(t){console.log(t)}))},saveSchedule:function(t){r.a.put("/api/v1/schedule/"+t.id+"/",t).then((function(t){console.log(t)})).catch((function(t){console.log(t)}))},refreshSchedules:function(){var t=this;r.a.get("/api/v1/schedule/").then((function(e){console.log(e.data),t.schedules=e.data})).catch((function(t){return console.log(t)}))},deleteSchedule:function(t){var e=this;r.a.delete("/api/v1/schedule/"+t+"/").then((function(t){console.log(t),e.refreshSchedules()})).catch((function(t){console.log(t)}))}},created:function(){this.refreshSchedules()}},ct=rt,lt=Object(d["a"])(ct,s,a,!1,null,"791767f6",null);e["default"]=lt.exports;m()(lt,{VBtn:f["a"],VIcon:j["a"]})},"75eb":function(t,e,i){"use strict";i("4160"),i("159b");var n=i("ade3"),s=i("53ca"),a=i("9d65"),o=i("80d2"),r=i("58df"),c=i("d9bd");function l(t){var e=Object(s["a"])(t);return"boolean"===e||"string"===e||t.nodeType===Node.ELEMENT_NODE}e["a"]=Object(r["a"])(a["a"]).extend({name:"detachable",props:{attach:{default:!1,validator:l},contentClass:{type:String,default:""}},data:function(){return{activatorNode:null,hasDetached:!1}},watch:{attach:function(){this.hasDetached=!1,this.initDetach()},hasContent:function(){this.$nextTick(this.initDetach)}},beforeMount:function(){var t=this;this.$nextTick((function(){if(t.activatorNode){var e=Array.isArray(t.activatorNode)?t.activatorNode:[t.activatorNode];e.forEach((function(e){if(e.elm&&t.$el.parentNode){var i=t.$el===t.$el.parentNode.firstChild?t.$el:t.$el.nextSibling;t.$el.parentNode.insertBefore(e.elm,i)}}))}}))},mounted:function(){this.hasContent&&this.initDetach()},deactivated:function(){this.isActive=!1},beforeDestroy:function(){try{if(this.$refs.content&&this.$refs.content.parentNode&&this.$refs.content.parentNode.removeChild(this.$refs.content),this.activatorNode){var t=Array.isArray(this.activatorNode)?this.activatorNode:[this.activatorNode];t.forEach((function(t){t.elm&&t.elm.parentNode&&t.elm.parentNode.removeChild(t.elm)}))}}catch(e){console.log(e)}},methods:{getScopeIdAttrs:function(){var t=Object(o["p"])(this.$vnode,"context.$options._scopeId");return t&&Object(n["a"])({},t,"")},initDetach:function(){var t;this._isDestroyed||!this.$refs.content||this.hasDetached||""===this.attach||!0===this.attach||"attach"===this.attach||(t=!1===this.attach?document.querySelector("[data-app]"):"string"===typeof this.attach?document.querySelector(this.attach):this.attach,t?(t.appendChild(this.$refs.content),this.hasDetached=!0):Object(c["c"])("Unable to locate target ".concat(this.attach||"[data-app]"),this))}}})},e4d3:function(t,e,i){"use strict";var n=i("2b0e");e["a"]=n["a"].extend({name:"returnable",props:{returnValue:null},data:function(){return{isActive:!1,originalValue:null}},watch:{isActive:function(t){t?this.originalValue=this.returnValue:this.$emit("update:return-value",this.originalValue)}},methods:{save:function(t){var e=this;this.originalValue=t,setTimeout((function(){e.isActive=!1}))}}})},e53c:function(t,e,i){},e635:function(t,e,i){}}]);
//# sourceMappingURL=chunk-f484e916.ae69d29e.js.map