parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Sfw4":[function(require,module,exports) {
"use strict";function t(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,r)}return n}function e(e){for(var r=1;r<arguments.length;r++){var o=null!=arguments[r]?arguments[r]:{};r%2?t(Object(o),!0).forEach(function(t){n(e,t,o[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):t(Object(o)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))})}return e}function n(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function r(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=a(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,o=function(){};return{s:o,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,u=!0,s=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return u=t.done,t},e:function(t){s=!0,i=t},f:function(){try{u||null==n.return||n.return()}finally{if(s)throw i}}}}function o(t,e){return c(t)||s(t,e)||a(t,e)||i()}function i(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function a(t,e){if(t){if("string"==typeof t)return u(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?u(t,e):void 0}}function u(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function s(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,i=[],a=!0,u=!1;try{for(n=n.call(t);!(a=(r=n.next()).done)&&(i.push(r.value),!e||i.length!==e);a=!0);}catch(s){u=!0,o=s}finally{try{a||null==n.return||n.return()}finally{if(u)throw o}}return i}}function c(t){if(Array.isArray(t))return t}Object.defineProperty(exports,"__esModule",{value:!0}),exports.getClientCoords=y,exports.default=void 0;var f="ontouchstart"in window;function l(t,e){for(var n=0,r=Object.entries(e);n<r.length;n++){var i=o(r[n],2),a=i[0],u=i[1];t.style[a]=u}}var d={position:"absolute",width:"6px",height:"1px",display:"inline-block",backgroundColor:"grey",transition:"transform 500ms"},b=function(t){return t*(180/Math.PI)},v=function(t){return t*(Math.PI/180)};function y(t){return f?{x:t.touches[0].clientX,y:t.touches[0].clientY}:{x:t.clientX,y:t.clientY}}function p(t,e,n){return t>=e&&t<=n}function h(t,e){var n,i,a=r(e.entries());try{for(a.s();!(i=a.n()).done;){var u=o(i.value,2),s=u[0],c=u[1];if(t===c)return c;if(void 0===n&&t<c)return c;if(t>n&&t<c)return Math.abs(t-n)>Math.abs(t-c)?c:n;if(s===e.length-1)return c;n=c}}catch(f){a.e(f)}finally{a.f()}}function m(t,n){n.forEach(function(n,r){n-=180;var o={x:40*Math.cos(v(n))+25-3,y:40*Math.sin(v(n))+25-0},i=document.createElement("div");i.classList.add("notchElem"),l(i,e(e({},d),{},{left:"".concat(o.x,"px"),top:"".concat(o.y,"px"),transform:"rotate(".concat(n,"deg) scale(0)")})),t.appendChild(i),setTimeout(function(){l(i,{transform:"rotate(".concat(n,"deg) scale(1)")})},50*r)})}function g(t,e){return Math.round(t/e)*e}function w(t,e,n,r){var o=360-t;return o<90&&(o+=360),o=o-90-e/2,o=n+(o/=360-e)*(r-n)}function O(t,e,n,r){var o=(t-n)/(r-n)*(360-e);return o=270-o,o-=e/2}function j(t){for(var e=t.selector,n=t.notches,r=t.min,o=void 0===r?0:r,i=t.max,a=void 0===i?100:i,u=t.deadArea,s=void 0===u?90:u,c=e,f=e.firstChild,l=function(){},d=(360-s)/(s?n-1:n)||1,v=[],p=270-s/2,g=0;g<n;g++){var j=p-g*d;j=(j+360)%360,v.push(j)}m(c,v.reverse()),v.sort(function(t,e){return t-e});var x=0,E=!1;function L(t){E&&(c.classList.remove("is-active"),document.body.classList.remove("is-grabbing"),E=!1)}function M(t){x=t,f.style.transform="rotate(".concat(90-t,"deg)")}function P(t){if(t.preventDefault(),E){var e=y(t),n=e.x,r=e.y,i={x:c.offsetLeft+c.offsetWidth/2,y:c.offsetTop+c.offsetHeight/2},u=n-i.x,f=i.y-r,d=Math.atan2(f,u),p=h((b(d)+360)%360,v);if(Math.abs(p)===Math.abs(x))return;M(p),l(w(p,s,o,a))}}function S(t){E||(E=!0,c.classList.add("is-active"),document.body.classList.add("is-grabbing"),P(t))}return c.addEventListener("mousedown",S,{passive:!1,bubbles:!1}),c.addEventListener("mousedown",S,{passive:!1,bubbles:!1}),c.addEventListener("touchstart",S,{passive:!1,bubbles:!1}),window.addEventListener("mouseup",L,{passive:!1,bubbles:!1}),window.addEventListener("touchend",L,{passive:!1,bubbles:!1}),window.addEventListener("mousemove",P,{passive:!1,bubbles:!1}),window.addEventListener("touchmove",P,{passive:!1,bubbles:!1}),{setValue:function(t){return M(O(t,s,o,a)),this},onChange:function(t){return l=t,this}}}var x=j;exports.default=x;
},{}],"NhPo":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.DrawForceController=void 0;var t=require("./Knob");function n(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function e(t,n){for(var e=0;e<n.length;e++){var o=n[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function o(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}function s(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}var a=function(){function e(o){var a=this;n(this,e),s(this,"onChange",function(t){a._onChange=t}),s(this,"onMouseDown",function(t){t.preventDefault();var n=a.getCanvasCoords(t),e=n.x,o=n.y;a.startPoint={x:e,y:o},a.endPoint={x:e,y:o},a.state.down=!0}),s(this,"onMouseUp",function(t){t.preventDefault(),a.state.down&&(a.state.down=!1,a._onChange(a.endPoint.x-a.startPoint.x,a.endPoint.y-a.startPoint.y))}),s(this,"onMouseMove",function(t){t.preventDefault();var n=a.getCanvasCoords(t),e=n.x,o=n.y;a.state.down&&(a.endPoint={x:e,y:o})}),s(this,"getCanvasCoords",function(n){var e=(0,t.getClientCoords)(n),o=e.x,s=e.y;return{x:o-n.target.offsetLeft,y:s-n.target.offsetTop}}),this.canvasContext=o,this.canvasContext.canvas.addEventListener("mousedown",this.onMouseDown),this.canvasContext.canvas.addEventListener("mouseup",this.onMouseUp),this.canvasContext.canvas.addEventListener("mousemove",this.onMouseMove),this.canvasContext.canvas.addEventListener("touchstart",this.onMouseDown),this.canvasContext.canvas.addEventListener("touchend",this.onMouseUp),this.canvasContext.canvas.addEventListener("touchmove",this.onMouseMove),this.state={down:!1},this._onChange=function(){}}return o(e,[{key:"update",value:function(){this.state.down&&(this.canvasContext.strokeStyle="red",this.canvasContext.beginPath(),this.canvasContext.moveTo(this.startPoint.x,this.startPoint.y),this.canvasContext.lineTo(this.endPoint.x,this.endPoint.y),this.canvasContext.stroke())}}]),e}();exports.DrawForceController=a;
},{"./Knob":"Sfw4"}],"xNDZ":[function(require,module,exports) {
"use strict";function t(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),i.push.apply(i,s)}return i}function e(e){for(var i=1;i<arguments.length;i++){var s=null!=arguments[i]?arguments[i]:{};i%2?t(Object(s),!0).forEach(function(t){n(e,t,s[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):t(Object(s)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(s,t))})}return e}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}function o(t,e,i){return e&&s(t.prototype,e),i&&s(t,i),t}function n(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}Object.defineProperty(exports,"__esModule",{value:!0}),exports.Particle=void 0;var r=function(){function t(s){var o=this,r=s.startPosition;i(this,t),n(this,"onDelete",function(t){o._onDelete=t}),this.position=e({},r),this.force={x:0,y:0},this.acceleration={x:0,y:0},this.velocity={x:0,y:0},this.mass=.1,this.seeds=[Math.random(),Math.random(),Math.random(),Math.random(),Math.random()],this.config={lifespan:500,autonomy:1,size:5},this.life=0,this._onDelete=function(){}}return o(t,[{key:"setContext",value:function(t){this.context=t}},{key:"setGravity",value:function(t){this.force.y=t}},{key:"setWind",value:function(t){this.force.x=t}},{key:"setConfig",value:function(t){this.config=t}},{key:"getWobble",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=Math.PI/180,i=this.life*e*this.seeds[t],s=.5*this.seeds[t],o=10*this.seeds[t];return s*Math.sin(i*o)}},{key:"destroy",value:function(){this._onDelete(this)}},{key:"update",value:function(t){this.life+=1,this.lastTime=t,this.acceleration={x:this.force.x*this.mass,y:this.force.y*this.mass};for(var e=0;e<this.config.autonomy;e++){var i=e%2==0?"x":"y";this.position[i]+=this.getWobble(e)*(this.config.autonomy+1)}if(this.velocity={x:this.life*this.acceleration.x,y:this.life*this.acceleration.y},this.position.x+=this.velocity.x,this.position.y+=this.velocity.y,this.config.lifespan<1/0){var s=Math.max((this.config.lifespan-this.life)/this.config.lifespan,0);this.context.fillStyle="rgba(0, 0, 0, ".concat(s,")")}else this.context.fillStyle="rgba(0, 0, 0, 1)";var o=this.config.size*this.seeds[0];this.context.beginPath(),this.context.arc(this.position.x,-this.position.y,o,0,2*Math.PI,!1),this.context.fill();var n=this.context.canvas;this.life>=this.config.lifespan&&this.destroy(),this.force.y<0?this.position.y<=-n.height&&this.destroy():this.force.y>0&&this.position.y>=0&&this.destroy(),this.force.x>=0&&this.position.x>=n.width&&(this.position.x=0),this.force.x<0&&this.position.x<=0&&(this.position.x=n.width)}}]),t}();exports.Particle=r;
},{}],"yntx":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.init=exports.INITIAL_VALUES=void 0;var e=n(require("./Knob"));function n(e){return e&&e.__esModule?e:{default:e}}var t={lifespan:1620,autonomy:1,size:3,intensity:100,gravity:.1,wind:.1};exports.INITIAL_VALUES=t;var o=function(n){new e.default({notches:16,min:100,max:2e3,selector:document.getElementById("knob-1")}).setValue(t.lifespan).onChange(function(e){var t=Math.round(e);n.setConfig({lifespan:2e3===t?1/0:t})}),new e.default({notches:6,min:0,max:5,selector:document.getElementById("knob-2")}).setValue(t.autonomy).onChange(function(e){n.setConfig({autonomy:Math.round(e)})}),new e.default({notches:8,min:2,max:9,selector:document.getElementById("knob-3")}).setValue(t.size).onChange(function(e){n.setConfig({size:Math.round(e)})}),new e.default({notches:16,min:0,max:100,selector:document.getElementById("knob-4")}).setValue(t.intensity).onChange(function(e){n.setConfig({intensity:Math.round(e)})})};exports.init=o;
},{"./Knob":"Sfw4"}],"PT0a":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Field=void 0;var t=require("./Particle"),e=require("./UI");function i(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),i.push.apply(i,n)}return i}function n(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach(function(e){c(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function o(t,e,i){return e&&a(t.prototype,e),i&&a(t,i),t}function c(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var s=function(){function i(){var t=this;r(this,i),c(this,"setConfig",function(e){t.particleConfig=n(n({},t.particleConfig),e),t.particles.forEach(function(e){return e.setConfig(t.particleConfig)})}),c(this,"onResize",function(){t.canvas.width=window.innerWidth,t.canvas.height=window.innerHeight-document.getElementById("hud").getBoundingClientRect().height}),this.canvas=document.createElement("canvas"),this.canvas.width=window.innerWidth*window.devicePixelRatio,this.canvas.height=(window.innerHeight-document.getElementById("hud").getBoundingClientRect().height)*window.devicePixelRatio,this.context=this.canvas.getContext("2d"),this.context.scale(window.devicePixelRatio,window.devicePixelRatio),this.particles=new Set,document.body.appendChild(this.canvas),this.gravity=e.INITIAL_VALUES.gravity,this.wind=e.INITIAL_VALUES.wind,this.particleConfig=n({},e.INITIAL_VALUES),this.emitting=!1}return o(i,[{key:"update",value:function(t){this.context.clearRect(0,0,this.canvas.width,this.canvas.height),this.particles.forEach(function(e){return e.update(t)})}},{key:"updateForces",value:function(t,e){var i=this;this.gravity=-e/1e3,this.wind=t/1e3,this.particles.forEach(function(t){t.setGravity(i.gravity),t.setWind(i.wind)}),0===this.gravity?this.stop():this.emitting||this.start()}},{key:"addParticle",value:function(t){var e=this;t.setContext(this.context),t.setGravity(this.gravity),t.setWind(this.wind),t.setConfig(this.particleConfig),this.particles.add(t),t.onDelete(function(t){e.particles.delete(t)})}},{key:"start",value:function(){var e=this;!function i(){e.addParticle(new t.Particle({startPosition:{x:Math.random()*e.canvas.width,y:e.gravity<0?1:-(e.canvas.height-e.particleConfig.size)}}));var n=100-e.particleConfig.intensity;e.timeout=setTimeout(i,n)}(),this.emitting=!0}},{key:"stop",value:function(){this.emitting=!1,clearTimeout(this.timeout)}}]),i}();exports.Field=s;
},{"./Particle":"xNDZ","./UI":"yntx"}],"Focm":[function(require,module,exports) {
"use strict";var e=require("./draw-force"),r=require("./Field"),n=require("./UI"),t=new r.Field,i=new e.DrawForceController(t.context);i.onChange(function(e,r){t.updateForces(e,r)}),t.start();var o=function(e){var r;return function(){for(var n=arguments.length,t=new Array(n),i=0;i<n;i++)t[i]=arguments[i];clearTimeout(r),r=setTimeout(function(){return e.apply(void 0,t)},300)}};window.addEventListener("resize",o(t.onResize));var a=function e(r){t.update(r),i.update(),requestAnimationFrame(e)};(0,n.init)(t),a();
},{"./draw-force":"NhPo","./Field":"PT0a","./UI":"yntx"}]},{},["Focm"], null)
//# sourceMappingURL=particles.a2ae5859.js.map