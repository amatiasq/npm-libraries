parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"28xY":[function(require,module,exports) {
"use strict";function accessor(accessor,handler){void 0===handler&&(handler=null);var get=new Function("return this."+accessor),set=new Function("value","this."+accessor+" = value");return handler&&(set=eval("(function smartSetter(value) {\n      const prev = this."+accessor+";\n      this."+accessor+" = value;\n      handler(this, prev, value);\n    })")),{get:get,set:set}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=accessor;
},{}],"DX3I":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=window.location.search.substr(1).split("&").map(function(e){return e.split("=")}),t=new Map(e);function r(e,r){return t.has(e)?t.get(e):r}exports.default=r;
},{}],"FiHU":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./accessor");exports.accessor=e.default;var r=require("./getParam");exports.getParam=r.default;
},{"./accessor":"28xY","./getParam":"DX3I"}],"dI18":[function(require,module,exports) {
"use strict";function t(t,o){var r=o.x,e=o.y;return e>t.top&&e<t.bottom&&r>t.left&&r<t.right}function o(t,o){var r=o.top,e=o.left,n=o.right,i=o.bottom;return r>=t.top&&i<=t.bottom&&e>=t.left&&n<=t.right}function r(t,o){var r=o.top,e=o.left,n=o.right,i=o.bottom,l=t.bottom>i&&i>t.top,u=t.bottom>r&&r>t.top,p=t.right>n&&n>t.left,f=t.right>e&&e>t.left;return(l||u)&&(p||f)}function e(t,o){var r;return null==t?(r=0,o=1):null==o?(r=0,o=t):r=t,Math.random()*(o-r)+r}Object.defineProperty(exports,"__esModule",{value:!0}),exports.containsPoint=t,exports.contains=o,exports.collides=r,exports.random=e;
},{}],"hM2E":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("@amatiasq/util"),i=require("./util"),o=function(){function t(){}return t.fromCenter=function(t,i,o,e){var h=new this;return h.x=t,h.y=i,h.halfWidth=o,h.halfHeight=e,h},t.fromXY=function(t,i,o,e){var h=o/2,n=e/2;return this.fromCenter(t+h,i+n,h,n)},t.fromCoords=function(t,i,o,e){return this.fromXY(i,t,o-i,e-t)},t.prototype.is=function(t){return this.x===t.x&&this.y===t.y&&this.width===t.width&&this.height===t.height},t.prototype.containsPoint=function(t){return i.containsPoint(this,t)},t.prototype.contains=function(t){return i.contains(this,t)},t.prototype.collides=function(t){return i.collides(this,t)},t.prototype.toString=function(){return"Rectangle(t:"+this.top+",l:"+this.left+",w:"+this.width+",h:"+this.height+")"},t}();function e(t){t._left=t._x-t._halfWidth,t._right=t._x+t._halfWidth}function h(t){t._top=t._y-t._halfHeight,t._bottom=t._y+t._halfHeight}function n(t){t._halfWidth=t._width/2,e(t)}function r(t){t._halfHeight=t._height/2,h(t)}function c(t){t._width=2*t._halfWidth,e(t)}function s(t){t._height=2*t._halfHeight,h(t)}function f(t,i,o){t._y-=i-o,h(t)}function a(t,i,o){t._x-=i-o,e(t)}function u(t,i,o){t._x-=i-o,e(t)}function _(t,i,o){t._y-=i-o,h(t)}exports.default=o,Object.defineProperties(o.prototype,{x:t.accessor("_x",e),y:t.accessor("_y",h),width:t.accessor("_width",n),height:t.accessor("_height",r),halfWidth:t.accessor("_halfWidth",c),halfHeight:t.accessor("_halfHeight",s),top:t.accessor("_top",f),left:t.accessor("_left",a),right:t.accessor("_right",u),bottom:t.accessor("_bottom",_)});
},{"@amatiasq/util":"FiHU","./util":"dI18"}],"fLXr":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("@amatiasq/util"),r=require("./util"),i=function(){function t(){}return t.fromCenter=function(r,i,e){var o=new t;return o.x=r,o.y=i,o.radius=e,o},t.prototype.is=function(t){return this.x===t.x&&this.y===t.y&&this.radius===t.radius},t.prototype.containsPoint=function(t){return r.containsPoint(this,t)},t.prototype.contains=function(t){return r.contains(this,t)},t.prototype.collides=function(t){return r.collides(this,t)},t.prototype.toString=function(){return"["+this.top+","+this.left+"]["+this.bottom+","+this.right+"]"},t}();function e(t){t._left=t._x-t._radius,t._right=t._x+t._radius}function o(t){t._top=t._y-t._radius,t._bottom=t._y+t._radius}function s(t){t._diameter=2*t._radius,e(t),o(t)}function n(t){t._radius=t._diameter/2,e(t),o(t)}function c(t,r,i){t._y+=i-r,o(t)}function a(t,r,i){t._x+=i-r,e(t)}exports.default=i,Object.defineProperties(i.prototype,{x:t.accessor("_x",e),y:t.accessor("_y",o),radius:t.accessor("_radius",s),diameter:t.accessor("_diameter",n),width:t.accessor("diameter"),height:t.accessor("diameter"),halfWidth:t.accessor("radius"),halfHeight:t.accessor("radius"),top:t.accessor("_top",c),left:t.accessor("_left",a),right:t.accessor("_right",a),bottom:t.accessor("_bottom",c)});
},{"@amatiasq/util":"FiHU","./util":"dI18"}],"9Fxo":[function(require,module,exports) {
"use strict";var t=this&&this.__generator||function(t,e){var r,n,i,o,u={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(o){return function(a){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;u;)try{if(r=1,n&&(i=2&o[0]?n.return:o[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,o[1])).done)return i;switch(n=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return u.label++,{value:o[1],done:!1};case 5:u.label++,n=o[1],o=[0];continue;case 7:o=u.ops.pop(),u.trys.pop();continue;default:if(!(i=(i=u.trys).length>0&&i[i.length-1])&&(6===o[0]||2===o[0])){u=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){u.label=o[1];break}if(6===o[0]&&u.label<i[1]){u.label=i[1],i=o;break}if(i&&u.label<i[2]){u.label=i[2],u.ops.push(o);break}i[2]&&u.ops.pop(),u.trys.pop();continue}o=e.call(t,u)}catch(a){o=[6,a],n=0}finally{r=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,a])}}};Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./util"),r=Math.abs,n=function(){function n(t,e){if(this.x=t,this.y=e,isNaN(t)||isNaN(e))throw new Error("Creating vector with NaN: "+this);Object.freeze(this)}return n.of=function(t,e){return new n(t,e)},n.from=function(t){var e=t.x,r=void 0===e?0:e,i=t.y;return new n(r,void 0===i?0:i)},n.fromRandom=function(t,r){return new n(e.random(t,r),e.random(t,r))},n.apply=function(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];return n.of(t.apply(void 0,e.map(function(t){return t.x})),t.apply(void 0,e.map(function(t){return t.y})))},n.range=function(t){var e=t.x,r=void 0===e?0:e,i=t.y,o=void 0===i?0:i;return this.iterate(n.of(r,o))},n.average=function(t){return t.reduce(function(t,e){return t.add(e)}).vdiv(t.length)},n.iterate=function(e,r){var i,o,u,a;return void 0===r&&(r=new n(0,0)),t(this,function(t){switch(t.label){case 0:i=this.apply(Math.min,e,r),o=this.apply(Math.max,e,r),u=i.x,t.label=1;case 1:if(!(u<o.x))return[3,6];a=i.y,t.label=2;case 2:return a<o.y?[4,i.add({x:u,y:a})]:[3,5];case 3:t.sent(),t.label=4;case 4:return a++,[3,2];case 5:return u++,[3,1];case 6:return[2]}})},Object.defineProperty(n.prototype,"isZero",{get:function(){return 0===this.x&&0===this.y},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"magnitude",{get:function(){return this.isZero?0:(this._magnitude||(this._magnitude=Math.hypot(this.x,this.y)),this._magnitude)},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"radians",{get:function(){if(this.isZero)return 0;var t=this.x,e=this.y,r=Math.atan(e/t);return r<0&&(r+=Math.PI),(e<0||0===e&&t<0)&&(r+=Math.PI),r},enumerable:!0,configurable:!0}),n.prototype.setX=function(t){return n.of(t,this.y)},n.prototype.setY=function(t){return n.of(this.x,t)},n.prototype.setMagnitude=function(t){if(0===this.magnitude)return n.of(t,0);var e=this.magnitude/t;return n.of(this.x/e,this.y/e)},n.prototype.diff=function(t){var e=t.x,i=void 0===e?this.x:e,o=t.y,u=void 0===o?this.y:o;return n.of(r(this.x/i),r(this.y/u))},n.prototype.distance=function(t){return this.sub(t).magnitude},n.prototype.is=function(t){var e=t.x,r=void 0===e?this.x:e,n=t.y,i=void 0===n?this.y:n;return this.x===r&&this.y===i},n.prototype.vis=function(t){var e=t.x,r=void 0===e?this.x:e,n=t.y,i=void 0===n?this.y:n;return this.x===r&&this.y===i},n.prototype.sub=function(t){var e=t.x,r=void 0===e?0:e,i=t.y,o=void 0===i?0:i;return n.of(this.x-r,this.y-o)},n.prototype.vsub=function(t){return n.of(this.x-t,this.y-t)},n.prototype.add=function(t){var e=t.x,r=void 0===e?0:e,i=t.y,o=void 0===i?0:i;return n.of(this.x+r,this.y+o)},n.prototype.vadd=function(t){return n.of(this.x+t,this.y+t)},n.prototype.mul=function(t){var e=t.x,r=void 0===e?1:e,i=t.y,o=void 0===i?1:i;return n.of(this.x*r,this.y*o)},n.prototype.vmul=function(t){return n.of(this.x*t,this.y*t)},n.prototype.div=function(t){var e=t.x,r=void 0===e?1:e,i=t.y,o=void 0===i?1:i;return n.of(this.x/r,this.y/o)},n.prototype.vdiv=function(t){return n.of(this.x/t,this.y/t)},n.prototype.toString=function(){return"[Vector("+this.x+", "+this.y+")]"},n.prototype.toJSON=function(){return{$type:"vector",x:this.x,y:this.y}},n.ZERO=n.of(0,0),n}();exports.default=n;
},{"./util":"dI18"}],"hVnM":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./Rectangle");exports.Rectangle=e.default;var r=require("./SquaredCircle");exports.SquaredCircle=r.default;var t=require("./Vector");exports.Vector=t.default;var a=require("./util");exports.random=a.random;
},{"./Rectangle":"hM2E","./SquaredCircle":"fLXr","./Vector":"9Fxo","./util":"dI18"}],"M5tv":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./accessor");exports.accessor=e.default;var r=require("./getParam");exports.getParam=r.default;
},{"./accessor":"28xY","./getParam":"DX3I"}],"RvQ8":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=function(){function e(e,t){this.quadtree=e,this.context=t.getContext("2d")}return e.prototype.render=function(){this.clear(),this.renderQuadrants()},e.prototype.clear=function(){var e=this.context,t=this.quadtree.bounds,r=t.top,n=t.left,i=t.width,s=t.height;e.save(),e.fillStyle="black",e.clearRect(n,r,i,s),e.fillRect(n,r,i,s),e.restore()},e.prototype.renderQuadrants=function(){this.renderQuadrantsRecursive(this.quadtree)},e.prototype.renderQuadrantsRecursive=function(e){if(e.isDivided){var t=e,r=t.nw,n=t.ne,i=t.sw,s=t.se;this.renderQuadrantsRecursive(r),this.renderQuadrantsRecursive(n),this.renderQuadrantsRecursive(i),this.renderQuadrantsRecursive(s);var o=this.context,a=e.bounds,d=a.x,u=a.y,c=a.top,h=a.left,l=a.right,v=a.bottom;o.save(),o.beginPath(),o.strokeStyle="gray",o.moveTo(d,c),o.lineTo(d,v),o.moveTo(h,u),o.lineTo(l,u),o.closePath(),o.stroke(),o.restore()}},e.prototype.renderEntity=function(e){if(!this.quadtree.includes(e))throw new Error("Rendering entity not in the tree");var t=this.context,r=e.x,n=e.y,i=e.width,s=e.height;t.save(),t.fillStyle="white",t.fillRect(r,n,i,s),t.restore()},e}();exports.default=e;
},{}],"5kra":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var t=require("@amatiasq/geometry"),i=function(){function i(t,i,e,s){void 0===s&&(s=0),this.bounds=t,this.maxEntities=i,this.maxDepth=e,this.level=s,this.entities=[],this._isDivided=!1}return Object.defineProperty(i.prototype,"isDivided",{get:function(){return this._isDivided},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"entitiesCount",{get:function(){return this.isDivided?this.entities.length+this.nw.entitiesCount+this.ne.entitiesCount+this.sw.entitiesCount+this.se.entitiesCount:this.entities.length},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"hasNodes",{get:function(){return this.nw&&this.ne&&this.sw&&this.se},enumerable:!0,configurable:!0}),i.prototype.add=function(t){if(!this.isDivided)return this.entities.push(t),void(this.entities.length>this.maxEntities&&this.split());this.addToQuadrant(t)||this.entities.push(t)},i.prototype.includes=function(t){return this.isDivided?this.entities.includes(t)||this.nw.includes(t)||this.ne.includes(t)||this.sw.includes(t)||this.se.includes(t):this.entities.includes(t)},i.prototype.resize=function(i){if(this.bounds=i,this.hasNodes){var e=i;this.nw.resize(t.Rectangle.fromXY(e.left,e.top,e.halfWidth,e.halfHeight)),this.ne.resize(t.Rectangle.fromXY(e.x,e.top,e.halfWidth,e.halfHeight)),this.sw.resize(t.Rectangle.fromXY(e.left,e.y,e.halfWidth,e.halfHeight)),this.se.resize(t.Rectangle.fromXY(e.x,e.y,e.halfWidth,e.halfHeight))}},i.prototype.createChild=function(e,s,n,h){return new i(t.Rectangle.fromXY(e,s,n,h),this.maxEntities,this.maxDepth,this.level+1)},i.prototype.split=function(){if(!(this.level>=this.maxDepth)){if(this.isDivided)throw new Error("Already splitted");this._isDivided=!0,this.hasNodes||this.splitArea(),this.distribute()}},i.prototype.unsplit=function(){if(!this.isDivided)throw new Error("Quadtree not splitted");this.entities=this.entities.concat(this.nw.empty(),this.ne.empty(),this.sw.empty(),this.se.empty()),this._isDivided=!1},i.prototype.splitArea=function(){var t=this.bounds;this.nw=this.createChild(t.left,t.top,t.halfWidth,t.halfHeight),this.ne=this.createChild(t.x,t.top,t.halfWidth,t.halfHeight),this.sw=this.createChild(t.left,t.y,t.halfWidth,t.halfHeight),this.se=this.createChild(t.x,t.y,t.halfWidth,t.halfHeight)},i.prototype.distribute=function(){var t=this.entities;this.entities=[];for(var i=0;i<t.length;i++){var e=t[i];this.addToQuadrant(e)||this.entities.push(e)}},i.prototype.addToQuadrant=function(t){if(!this.contains(t))throw new Error("Can't get index. The entity "+t+" is not contained in "+this.bounds);return this.nw.contains(t)?(this.nw.add(t),!0):this.ne.contains(t)?(this.ne.add(t),!0):this.sw.contains(t)?(this.sw.add(t),!0):!!this.se.contains(t)&&(this.se.add(t),!0)},i.prototype.contains=function(t){return this.bounds.contains(t)},i.prototype.getAt=function(t){if(!this.bounds.collides(t))return[];var i=this.entities.filter(function(i){return t.collides(i)});return this.isDivided?i.concat(this.nw.getAt(t),this.ne.getAt(t),this.sw.getAt(t),this.se.getAt(t)):i},i.prototype.recalculate=function(){var t=[],i=[];this.isDivided&&(t.push.apply(t,this.nw.recalculate()),t.push.apply(t,this.ne.recalculate()),t.push.apply(t,this.sw.recalculate()),t.push.apply(t,this.se.recalculate())),t.push.apply(t,this.entities),this.entities=[];for(var e=0;e<t.length;e++){var s=t[e];this.bounds.contains(s)?this.add(s):i.push(s)}return this.isDivided&&this.entitiesCount<=this.maxEntities&&this.unsplit(),i},i.prototype.empty=function(){var t=this.entities;return this.entities.length&&(this.entities=[]),this.isDivided?this.entities.concat(this.nw.empty(),this.ne.empty(),this.sw.empty(),this.se.empty()):t},i.prototype.getName=function(t){return t===this.nw?"nw":t===this.ne?"ne":t===this.sw?"sw":t===this.se?"se":"NOT A CHILDREN"},i}();exports.default=i;
},{"@amatiasq/geometry":"hVnM"}],"+veH":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var e=function(){function e(e,t){var i=(void 0===t?{}:t).fillScreen,n=void 0===i||i;this.selector=e,this.element=document.querySelector(e),this.context=this.element.getContext("2d"),this.fillScreenSize=this.fillScreenSize.bind(this),n&&this.fillScreen()}return Object.defineProperty(e.prototype,"width",{get:function(){return this.element.width},set:function(e){this.element.width=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"height",{get:function(){return this.element.height},set:function(e){this.element.height=e},enumerable:!0,configurable:!0}),e.prototype.fillScreen=function(e){var t=(void 0===e?{}:e).watchResize,i=void 0===t||t;this.fillScreenSize(),i&&window.addEventListener("resize",this.fillScreenSize)},e.prototype.fillScreenSize=function(){var e=!1;this.element.width!==window.innerWidth&&(this.element.width=window.innerWidth,e=!0),this.element.height!==window.innerHeight&&(this.element.height=window.innerHeight,e=!0),e&&this.onResize&&this.onResize(this)},e}();exports.default=e;
},{}],"7QCb":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),e=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};exports.__esModule=!0;var r=require("@amatiasq/geometry"),n=require("@amatiasq/geometry"),i=require("@amatiasq/util"),o=e(require("../src/QuadtreeCanvasRenderer")),a=e(require("../src/quadtree")),u=e(require("./Canvas")),c=i.getParam("maxEntities",3),s=i.getParam("maxDepth",5),l=i.getParam("entitiesCount",100),f=i.getParam("entitySize",3),h=function(e){function n(){var t=null!==e&&e.apply(this,arguments)||this;return t.velocity=r.Vector.fromRandom(-10,10),t}return t(n,e),n.prototype.update=function(){this.x+=this.velocity.x,this.y+=this.velocity.y},n}(n.Rectangle),d=new u.default("canvas",{fillScreen:!0}),v=new a.default(n.Rectangle.fromXY(0,0,d.width,d.height),c,s),y=new o.default(v,d.element),m=[];d.onResize=function(){v.resize(n.Rectangle.fromXY(0,0,d.width,d.height));for(var t=0,e=v.recalculate();t<e.length;t++){var r=e[t];r.x=d.width/2,r.y=d.height/2,v.add(r)}};for(var p=0;p<l;p++){var g=h.fromXY(n.random(f,d.width-f),n.random(f,d.height-f),f,f);v.add(g),m.push(g)}function _(){for(var t=0,e=m;t<e.length;t++){e[t].update()}w(),q(),requestAnimationFrame(_)}function q(){y.render();for(var t=0,e=m;t<e.length;t++){var r=e[t];y.renderEntity(r)}}function w(){for(var t=0,e=v.recalculate();t<e.length;t++){for(var n=e[t];!v.contains(n);)(n.left<0||n.right>d.width)&&(n.velocity=r.Vector.of(-n.velocity.x,n.velocity.y)),(n.top<0||n.bottom>d.height)&&(n.velocity=r.Vector.of(n.velocity.x,-n.velocity.y)),n.update(),0;v.add(n)}}q(),requestAnimationFrame(_),Object.assign(window,{quadtree:v,renderer:y,entities:m});
},{"@amatiasq/geometry":"hVnM","@amatiasq/util":"M5tv","../src/QuadtreeCanvasRenderer":"RvQ8","../src/quadtree":"5kra","./Canvas":"+veH"}]},{},["7QCb"], null)
//# sourceMappingURL=npm-libraries/demo.9dc32b2b.js.map