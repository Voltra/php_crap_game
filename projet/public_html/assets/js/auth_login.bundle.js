/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:!0});var _flash=__webpack_require__(2),_flash2=_interopRequireDefault(_flash),_removeSpinnerLord=__webpack_require__(10);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}exports.default=_removeSpinnerLord.removeSpinnerLord;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _jqFlash=__webpack_require__(3),_jqFlash2=_interopRequireDefault(_jqFlash);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function UniversalJQueryPluginDefinition(factory){
    if(true)
        //AMD: register as anonymous module
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    else if(typeof exports == "object")
        //Node(npm)/CommonJS
        module.exports = factory;
    else
        //regular use of the plugin
        factory(jQuery);

})(function($){
    $(document).ready(()=>{
        //////On first DOM load
        $(".flash").click(function(){
            const $this = $(this);
            $this.addClass("flash-folded");
            setTimeout(
                $.fn.remove.bind($this),
                2000//wait 2s before removing node
            );
        });

        $(".flash.flash-folded").each( (i, e)=>$(e).removeClass("flash-folded") );
        //////On first DOM load
    });
    
    
    $.flash = function(message, type=""){
        message = message?""+message:"";//to string
        message.replace(/</g, "&lt;").replace(/>/g, "&gt;");//Protect again XSS

        let ret = null, div = null;

        if(typeof type == "string"){
            const className = `flash-${type}`;
            div = document.createElement("div");
            div.classList.add("flash");
            div.classList.add("flash-folded");
            if(type!="")
                div.classList.add(className);

            const p = document.createElement("p");
            p.appendChild(document.createTextNode(message));

            const button = document.createElement("button");
            button.classList.add("flash-close");
            button.innerHTML = "&#x2716;";//a nice X

            div.appendChild(p);
            div.appendChild(button);

            document.querySelector("body").prepend(div);

            //ret = Array.prototype.slice.apply(document.querySelector("body > .flash")).filter(e=>e == div);
        }else
            throw new TypeError(`expected a string, got ${typeof type}`);

        setTimeout(div.classList.remove.bind(div.classList, "flash-folded"), 100);

        $(div).click(function(){
            const $this = $(this);
            $this.addClass("flash-folded");
            setTimeout(
                $.fn.remove.bind($this),
                2000//wait 2s before removing node
            );
        });
    };
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["$"] = __webpack_require__(6);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["jQuery"] = __webpack_require__(8);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var g,_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a};g=function(){return this}();try{g=g||Function("return this")()||(1,eval)("this")}catch(a){"object"===("undefined"==typeof window?"undefined":_typeof(window))&&(g=window)}module.exports=g;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};(function(e,t){"use strict";"object"===( false?"undefined":_typeof(module))&&"object"===_typeof(module.exports)?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return t(e)}:t(e)})("undefined"==typeof window?void 0:window,function(e,t){"use strict";function DOMEval(e,t){t=t||o;var n=t.createElement("script");n.text=e,t.head.appendChild(n).parentNode.removeChild(n)}function isArrayLike(e){var t=!!e&&"length"in e&&e.length,n=y.type(e);return"function"===n||y.isWindow(e)?!1:"array"===n||0===t||"number"==typeof t&&0<t&&t-1 in e}function nodeName(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()}function winnow(e,t,n){return y.isFunction(t)?y.grep(e,function(e,a){return!!t.call(e,a,e)!==n}):t.nodeType?y.grep(e,function(e){return e===t!==n}):"string"==typeof t?j.test(t)?y.filter(t,e,n):(t=y.filter(t,e),y.grep(e,function(e){return-1<l.call(t,e)!==n&&1===e.nodeType})):y.grep(e,function(e){return-1<l.call(t,e)!==n})}function sibling(e,t){for(;(e=e[t])&&1!==e.nodeType;);return e}function createOptions(e){var t={};return y.each(e.match(H)||[],function(e,n){t[n]=!0}),t}function Identity(e){return e}function Thrower(e){throw e}function adoptValue(e,t,n,a){var o;try{e&&y.isFunction(o=e.promise)?o.call(e).done(t).fail(n):e&&y.isFunction(o=e.then)?o.call(e,t,n):t.apply(void 0,[e].slice(a))}catch(e){n.apply(void 0,[e])}}function completed(){o.removeEventListener("DOMContentLoaded",completed),e.removeEventListener("load",completed),y.ready()}function Data(){this.expando=y.expando+Data.uid++}function getData(e){return"true"===e||"false"!==e&&("null"===e?null:e===+e+""?+e:R.test(e)?JSON.parse(e):e)}function dataAttr(e,t,n){var a;if(void 0===n&&1===e.nodeType)if(a="data-"+t.replace(B,"-$&").toLowerCase(),n=e.getAttribute(a),"string"==typeof n){try{n=getData(n)}catch(t){}W.set(e,t,n)}else n=void 0;return n}function adjustCSS(e,t,n,a){var o,i=1,s=20,d=a?function(){return a.cur()}:function(){return y.css(e,t,"")},r=d(),l=n&&n[3]||(y.cssNumber[t]?"":"px"),p=(y.cssNumber[t]||"px"!==l&&+r)&&X.exec(y.css(e,t));if(p&&p[3]!==l){l=l||p[3],n=n||[],p=+r||1;do i=i||".5",p/=i,y.style(e,t,p+l);while(i!=(i=d()/r)&&1!=i&&--s)}return n&&(p=+p||+r||0,o=n[1]?p+(n[1]+1)*n[2]:+n[2],a&&(a.unit=l,a.start=p,a.end=o)),o}function getDefaultDisplay(e){var t,n=e.ownerDocument,a=e.nodeName,o=V[a];return o?o:(t=n.body.appendChild(n.createElement(a)),o=y.css(t,"display"),t.parentNode.removeChild(t),"none"===o&&(o="block"),V[a]=o,o)}function showHide(e,t){for(var n,a,o=[],i=0,s=e.length;i<s;i++)(a=e[i],!!a.style)&&(n=a.style.display,t?("none"===n&&(o[i]=I.get(a,"display")||null,!o[i]&&(a.style.display="")),""===a.style.display&&U(a)&&(o[i]=getDefaultDisplay(a))):"none"!==n&&(o[i]="none",I.set(a,"display",n)));for(i=0;i<s;i++)null!=o[i]&&(e[i].style.display=o[i]);return e}function getAll(e,t){var n;return n="undefined"==typeof e.getElementsByTagName?"undefined"==typeof e.querySelectorAll?[]:e.querySelectorAll(t||"*"):e.getElementsByTagName(t||"*"),void 0===t||t&&nodeName(e,t)?y.merge([e],n):n}function setGlobalEval(e,t){for(var n=0,a=e.length;n<a;n++)I.set(e[n],"globalEval",!t||I.get(t[n],"globalEval"))}function buildFragment(e,t,n,a,o){for(var s,d,r,p,c,u,f=t.createDocumentFragment(),h=[],m=0,i=e.length;m<i;m++)if(s=e[m],s||0===s)if("object"===y.type(s))y.merge(h,s.nodeType?[s]:s);else if(!J.test(s))h.push(t.createTextNode(s));else{for(d=d||f.appendChild(t.createElement("div")),r=(G.exec(s)||["",""])[1].toLowerCase(),p=K[r]||K._default,d.innerHTML=p[1]+y.htmlPrefilter(s)+p[2],u=p[0];u--;)d=d.lastChild;y.merge(h,d.childNodes),d=f.firstChild,d.textContent=""}for(f.textContent="",m=0;s=h[m++];){if(a&&-1<y.inArray(s,a)){o&&o.push(s);continue}if(c=y.contains(s.ownerDocument,s),d=getAll(f.appendChild(s),"script"),c&&setGlobalEval(d),n)for(u=0;s=d[u++];)Q.test(s.type||"")&&n.push(s)}return f}function returnTrue(){return!0}function returnFalse(){return!1}function safeActiveElement(){try{return o.activeElement}catch(e){}}function _on(e,t,n,a,o,i){var s,d;if("object"===("undefined"==typeof t?"undefined":_typeof(t))){for(d in"string"!=typeof n&&(a=a||n,n=void 0),t)_on(e,d,n,a,t[d],i);return e}if(null==a&&null==o?(o=n,a=n=void 0):null==o&&("string"==typeof n?(o=a,a=void 0):(o=a,a=n,n=void 0)),!1===o)o=returnFalse;else if(!o)return e;return 1===i&&(s=o,o=function fn(e){return y().off(e),s.apply(this,arguments)},o.guid=s.guid||(s.guid=y.guid++)),e.each(function(){y.event.add(this,t,o,a,n)})}function manipulationTarget(e,t){return nodeName(e,"table")&&nodeName(11===t.nodeType?t.firstChild:t,"tr")?y(">tbody",e)[0]||e:e}function disableScript(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function restoreScript(e){var t=se.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function cloneCopyEvent(e,t){var n,a,o,i,s,d,r,l;if(1===t.nodeType){if(I.hasData(e)&&(i=I.access(e),s=I.set(t,i),l=i.events,l))for(o in delete s.handle,s.events={},l)for(n=0,a=l[o].length;n<a;n++)y.event.add(t,o,l[o][n]);W.hasData(e)&&(d=W.access(e),r=y.extend({},d),W.set(t,r))}}function fixInput(e,t){var n=t.nodeName.toLowerCase();"input"===n&&Y.test(e.type)?t.checked=e.checked:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}function domManip(e,t,n,a){t=d.apply([],t);var o,s,r,p,c,u,f=0,i=e.length,l=t[0],h=y.isFunction(l);if(h||1<i&&"string"==typeof l&&!m.checkClone&&ie.test(l))return e.each(function(o){var i=e.eq(o);h&&(t[0]=l.call(this,o,i.html())),domManip(i,t,n,a)});if(i&&(o=buildFragment(t,e[0].ownerDocument,!1,e,a),s=o.firstChild,1===o.childNodes.length&&(o=s),s||a)){for(r=y.map(getAll(o,"script"),disableScript),p=r.length;f<i;f++)c=o,f!=i-1&&(c=y.clone(c,!0,!0),p&&y.merge(r,getAll(c,"script"))),n.call(e[f],c,f);if(p)for(u=r[r.length-1].ownerDocument,y.map(r,restoreScript),f=0;f<p;f++)c=r[f],Q.test(c.type||"")&&!I.access(c,"globalEval")&&y.contains(u,c)&&(c.src?y._evalUrl&&y._evalUrl(c.src):DOMEval(c.textContent.replace(de,""),u))}return e}function _remove(e,t,n){for(var a,o=t?y.filter(t,e):e,s=0;null!=(a=o[s]);s++)n||1!==a.nodeType||y.cleanData(getAll(a)),a.parentNode&&(n&&y.contains(a.ownerDocument,a)&&setGlobalEval(getAll(a,"script")),a.parentNode.removeChild(a));return e}function curCSS(e,t,n){var a,o,i,s,d=e.style;return n=n||pe(e),n&&(s=n.getPropertyValue(t)||n[t],""===s&&!y.contains(e.ownerDocument,e)&&(s=y.style(e,t)),!m.pixelMarginRight()&&le.test(s)&&re.test(t)&&(a=d.width,o=d.minWidth,i=d.maxWidth,d.minWidth=d.maxWidth=d.width=s,s=n.width,d.width=a,d.minWidth=o,d.maxWidth=i)),void 0===s?s:s+""}function addGetHookIf(e,t){return{get:function get(){return e()?void delete this.get:(this.get=t).apply(this,arguments)}}}function vendorPropName(e){if(e in ge)return e;for(var t=e[0].toUpperCase()+e.slice(1),n=me.length;n--;)if(e=me[n]+t,e in ge)return e}function finalPropName(e){var t=y.cssProps[e];return t||(t=y.cssProps[e]=vendorPropName(e)||e),t}function setPositiveNumber(e,t,a){var o=X.exec(t);return o?n(0,o[2]-(a||0))+(o[3]||"px"):t}function augmentWidthOrHeight(e,t,n,a,o){var s,i=0;for(s=n===(a?"border":"content")?4:"width"===t?1:0;4>s;s+=2)"margin"===n&&(i+=y.css(e,n+$[s],!0,o)),a?("content"===n&&(i-=y.css(e,"padding"+$[s],!0,o)),"margin"!==n&&(i-=y.css(e,"border"+$[s]+"Width",!0,o))):(i+=y.css(e,"padding"+$[s],!0,o),"padding"!==n&&(i+=y.css(e,"border"+$[s]+"Width",!0,o)));return i}function getWidthOrHeight(e,t,n){var a,o=pe(e),i=curCSS(e,t,o),s="border-box"===y.css(e,"boxSizing",!1,o);return le.test(i)?i:(a=s&&(m.boxSizingReliable()||i===e.style[t]),"auto"===i&&(i=e["offset"+t[0].toUpperCase()+t.slice(1)]),i=parseFloat(i)||0,i+augmentWidthOrHeight(e,t,n||(s?"border":"content"),a,o)+"px")}function Tween(e,t,n,a,o){return new Tween.prototype.init(e,t,n,a,o)}function schedule(){xe&&(!1===o.hidden&&e.requestAnimationFrame?e.requestAnimationFrame(schedule):e.setTimeout(schedule,y.fx.interval),y.fx.tick())}function createFxNow(){return e.setTimeout(function(){ye=void 0}),ye=y.now()}function genFx(e,t){var n,a=0,o={height:e};for(t=t?1:0;4>a;a+=2-t)n=$[a],o["margin"+n]=o["padding"+n]=e;return t&&(o.opacity=o.width=e),o}function createTween(e,t,n){for(var a,o=(Animation.tweeners[t]||[]).concat(Animation.tweeners["*"]),i=0,s=o.length;i<s;i++)if(a=o[i].call(n,t,e))return a}function propFilter(e,t){var n,a,o,i,s;for(n in e)if(a=y.camelCase(n),o=t[a],i=e[n],Array.isArray(i)&&(o=i[1],i=e[n]=i[0]),n!==a&&(e[a]=i,delete e[n]),s=y.cssHooks[a],s&&"expand"in s)for(n in i=s.expand(i),delete e[a],i)n in e||(e[n]=i[n],t[n]=o);else t[a]=o}function Animation(e,t,a){var o,i,s=0,d=Animation.prefilters.length,r=y.Deferred().always(function(){delete l.elem}),l=function tick(){if(i)return!1;for(var t=ye||createFxNow(),a=n(0,p.startTime+p.duration-t),o=a/p.duration||0,s=1-o,d=0,l=p.tweens.length;d<l;d++)p.tweens[d].run(s);return(r.notifyWith(e,[p,s,a]),1>s&&l)?a:(l||r.notifyWith(e,[p,1,0]),r.resolveWith(e,[p]),!1)},p=r.promise({elem:e,props:y.extend({},t),opts:y.extend(!0,{specialEasing:{},easing:y.easing._default},a),originalProperties:t,originalOptions:a,startTime:ye||createFxNow(),duration:a.duration,tweens:[],createTween:function createTween(t,n){var a=y.Tween(e,p.opts,t,n,p.opts.specialEasing[t]||p.opts.easing);return p.tweens.push(a),a},stop:function stop(t){var n=0,a=t?p.tweens.length:0;if(i)return this;for(i=!0;n<a;n++)p.tweens[n].run(1);return t?(r.notifyWith(e,[p,1,0]),r.resolveWith(e,[p,t])):r.rejectWith(e,[p,t]),this}}),c=p.props;for(propFilter(c,p.opts.specialEasing);s<d;s++)if(o=Animation.prefilters[s].call(p,e,c,p.opts),o)return y.isFunction(o.stop)&&(y._queueHooks(p.elem,p.opts.queue).stop=y.proxy(o.stop,o)),o;return y.map(c,createTween,p),y.isFunction(p.opts.start)&&p.opts.start.call(e,p),p.progress(p.opts.progress).done(p.opts.done,p.opts.complete).fail(p.opts.fail).always(p.opts.always),y.fx.timer(y.extend(l,{elem:e,anim:p,queue:p.opts.queue})),p}function stripAndCollapse(e){var t=e.match(H)||[];return t.join(" ")}function getClass(e){return e.getAttribute&&e.getAttribute("class")||""}function buildParams(e,t,n,a){if(Array.isArray(t))y.each(t,function(t,o){n||Ae.test(e)?a(e,o):buildParams(e+"["+("object"===("undefined"==typeof o?"undefined":_typeof(o))&&null!=o?t:"")+"]",o,n,a)});else if(!n&&"object"===y.type(t))for(var o in t)buildParams(e+"["+o+"]",t[o],n,a);else a(e,t)}function addToPrefiltersOrTransports(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var a,o=0,i=t.toLowerCase().match(H)||[];if(y.isFunction(n))for(;a=i[o++];)"+"===a[0]?(a=a.slice(1)||"*",(e[a]=e[a]||[]).unshift(n)):(e[a]=e[a]||[]).push(n)}}function inspectPrefiltersOrTransports(e,t,n,a){function inspect(s){var d;return o[s]=!0,y.each(e[s]||[],function(e,s){var r=s(t,n,a);return"string"!=typeof r||i||o[r]?i?!(d=r):void 0:(t.dataTypes.unshift(r),inspect(r),!1)}),d}var o={},i=e===_e;return inspect(t.dataTypes[0])||!o["*"]&&inspect("*")}function ajaxExtend(e,t){var n,a,o=y.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((o[n]?e:a||(a={}))[n]=t[n]);return a&&y.extend(!0,e,a),e}function ajaxHandleResponses(e,t,n){for(var a,o,i,s,d=e.contents,r=e.dataTypes;"*"===r[0];)r.shift(),void 0==a&&(a=e.mimeType||t.getResponseHeader("Content-Type"));if(a)for(o in d)if(d[o]&&d[o].test(a)){r.unshift(o);break}if(r[0]in n)i=r[0];else{for(o in n){if(!r[0]||e.converters[o+" "+r[0]]){i=o;break}s||(s=o)}i=i||s}return i?(i!==r[0]&&r.unshift(i),n[i]):void 0}function ajaxConvert(e,t,n,a){var o,i,s,d,r,l={},p=e.dataTypes.slice();if(p[1])for(s in e.converters)l[s.toLowerCase()]=e.converters[s];for(i=p.shift();i;)if(e.responseFields[i]&&(n[e.responseFields[i]]=t),!r&&a&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),r=i,i=p.shift(),i)if("*"===i)i=r;else if("*"!==r&&r!==i){if(s=l[r+" "+i]||l["* "+i],!s)for(o in l)if(d=o.split(" "),d[1]===i&&(s=l[r+" "+d[0]]||l["* "+d[0]],s)){!0===s?s=l[o]:!0!==l[o]&&(i=d[0],p.unshift(d[1]));break}if(!0!==s)if(s&&e.throws)t=s(t);else try{t=s(t)}catch(t){return{state:"parsererror",error:s?t:"No conversion from "+r+" to "+i}}}return{state:"success",data:t}}var n=Math.max,a=[],o=e.document,i=Object.getPrototypeOf,s=a.slice,d=a.concat,r=a.push,l=a.indexOf,p={},c=p.toString,u=p.hasOwnProperty,f=u.toString,h=f.call(Object),m={},g="3.2.1",y=function jQuery(e,t){return new y.fn.init(e,t)},x=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,b=/^-ms-/,v=/-([a-z])/g,T=function fcamelCase(e,t){return t.toUpperCase()};y.fn=y.prototype={jquery:g,constructor:y,length:0,toArray:function toArray(){return s.call(this)},get:function get(e){return null==e?s.call(this):0>e?this[e+this.length]:this[e]},pushStack:function pushStack(e){var t=y.merge(this.constructor(),e);return t.prevObject=this,t},each:function each(e){return y.each(this,e)},map:function map(e){return this.pushStack(y.map(this,function(t,n){return e.call(t,n,t)}))},slice:function slice(){return this.pushStack(s.apply(this,arguments))},first:function first(){return this.eq(0)},last:function last(){return this.eq(-1)},eq:function eq(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(0<=n&&n<t?[this[n]]:[])},end:function end(){return this.prevObject||this.constructor()},push:r,sort:a.sort,splice:a.splice},y.extend=y.fn.extend=function(){var e,t,n,a,o,s,d=arguments[0]||{},r=1,i=arguments.length,l=!1;for("boolean"==typeof d&&(l=d,d=arguments[r]||{},r++),"object"===("undefined"==typeof d?"undefined":_typeof(d))||y.isFunction(d)||(d={}),r===i&&(d=this,r--);r<i;r++)if(null!=(e=arguments[r]))for(t in e)(n=d[t],a=e[t],d!==a)&&(l&&a&&(y.isPlainObject(a)||(o=Array.isArray(a)))?(o?(o=!1,s=n&&Array.isArray(n)?n:[]):s=n&&y.isPlainObject(n)?n:{},d[t]=y.extend(l,s,a)):void 0!==a&&(d[t]=a));return d},y.extend({expando:"jQuery"+(g+Math.random()).replace(/\D/g,""),isReady:!0,error:function error(e){throw new Error(e)},noop:function noop(){},isFunction:function isFunction(e){return"function"===y.type(e)},isWindow:function isWindow(e){return null!=e&&e===e.window},isNumeric:function isNumeric(e){var t=y.type(e);return("number"===t||"string"===t)&&!isNaN(e-parseFloat(e))},isPlainObject:function isPlainObject(e){var t,n;return e&&"[object Object]"===c.call(e)&&((t=i(e),!!!t)||(n=u.call(t,"constructor")&&t.constructor,"function"==typeof n&&f.call(n)===h))},isEmptyObject:function isEmptyObject(e){for(var t in e)return!1;return!0},type:function type(e){return null==e?e+"":"object"===("undefined"==typeof e?"undefined":_typeof(e))||"function"==typeof e?p[c.call(e)]||"object":"undefined"==typeof e?"undefined":_typeof(e)},globalEval:function globalEval(e){DOMEval(e)},camelCase:function camelCase(e){return e.replace(b,"ms-").replace(v,T)},each:function each(e,t){var n,a=0;if(isArrayLike(e))for(n=e.length;a<n&&!1!==t.call(e[a],a,e[a]);a++);else for(a in e)if(!1===t.call(e[a],a,e[a]))break;return e},trim:function trim(e){return null==e?"":(e+"").replace(x,"")},makeArray:function makeArray(e,t){var n=t||[];return null!=e&&(isArrayLike(Object(e))?y.merge(n,"string"==typeof e?[e]:e):r.call(n,e)),n},inArray:function inArray(e,t,n){return null==t?-1:l.call(t,e,n)},merge:function merge(e,t){for(var n=+t.length,a=0,o=e.length;a<n;a++)e[o++]=t[a];return e.length=o,e},grep:function grep(e,t,n){for(var a,o=[],s=0,i=e.length;s<i;s++)a=!t(e[s],s),a!==!n&&o.push(e[s]);return o},map:function map(e,t,n){var a,o,s=0,i=[];if(isArrayLike(e))for(a=e.length;s<a;s++)o=t(e[s],s,n),null!=o&&i.push(o);else for(s in e)o=t(e[s],s,n),null!=o&&i.push(o);return d.apply([],i)},guid:1,proxy:function proxy(e,t){var n,a,o;if("string"==typeof t&&(n=e[t],t=e,e=n),!!y.isFunction(e))return a=s.call(arguments,2),o=function proxy(){return e.apply(t||this,a.concat(s.call(arguments)))},o.guid=e.guid=e.guid||y.guid++,o},now:Date.now,support:m}),"function"==typeof Symbol&&(y.fn[Symbol.iterator]=a[Symbol.iterator]),y.each(["Boolean","Number","String","Function","Array","Date","RegExp","Object","Error","Symbol"],function(e,t){p["[object "+t+"]"]=t.toLowerCase()});var w=function(e){function Sizzle(e,t,a,o){var d,l,i,p,c,h,m,x=t&&t.ownerDocument,w=t?t.nodeType:9;if(a=a||[],"string"!=typeof e||!e||1!==w&&9!==w&&11!==w)return a;if(!o&&((t?t.ownerDocument||t:T)!==f&&u(t),t=t||f,g)){if(11!==w&&(c=G.exec(e)))if(!(d=c[1])){if(c[2])return q.apply(a,t.getElementsByTagName(e)),a;if((d=c[3])&&n.getElementsByClassName&&t.getElementsByClassName)return q.apply(a,t.getElementsByClassName(d)),a}else if(9===w){if(!(i=t.getElementById(d)))return a;if(i.id===d)return a.push(i),a}else if(x&&(i=x.getElementById(d))&&v(t,i)&&i.id===d)return a.push(i),a;if(n.qsa&&!S[e+" "]&&(!y||!y.test(e))){if(1!==w)x=t,m=e;else if("object"!==t.nodeName.toLowerCase()){for((p=t.getAttribute("id"))?p=p.replace(Z,ee):t.setAttribute("id",p=b),h=s(e),l=h.length;l--;)h[l]="#"+p+" "+toSelector(h[l]);m=h.join(","),x=Q.test(e)&&testContext(t.parentNode)||t}if(m)try{return q.apply(a,x.querySelectorAll(m)),a}catch(e){}finally{p===b&&t.removeAttribute("id")}}}return r(e.replace(W,"$1"),t,a,o)}function createCache(){function cache(t,n){return e.push(t+" ")>a.cacheLength&&delete cache[e.shift()],cache[t+" "]=n}var e=[];return cache}function markFunction(e){return e[b]=!0,e}function assert(e){var t=f.createElement("fieldset");try{return!!e(t)}catch(t){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function addHandle(e,t){for(var n=e.split("|"),o=n.length;o--;)a.attrHandle[n[o]]=t}function siblingCheck(e,t){var n=t&&e,a=n&&1===e.nodeType&&1===t.nodeType&&e.sourceIndex-t.sourceIndex;if(a)return a;if(n)for(;n=n.nextSibling;)if(n===t)return-1;return e?1:-1}function createInputPseudo(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function createButtonPseudo(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function createDisabledPseudo(e){return function(t){return"form"in t?t.parentNode&&!1===t.disabled?"label"in t?"label"in t.parentNode?t.parentNode.disabled===e:t.disabled===e:t.isDisabled===e||t.isDisabled!==!e&&ne(t)===e:t.disabled===e:!!("label"in t)&&t.disabled===e}}function createPositionalPseudo(e){return markFunction(function(t){return t=+t,markFunction(function(n,a){for(var o,s=e([],n.length,t),d=s.length;d--;)n[o=s[d]]&&(n[o]=!(a[o]=n[o]))})})}function testContext(e){return e&&"undefined"!=typeof e.getElementsByTagName&&e}function setFilters(){}function toSelector(e){for(var t=0,n=e.length,a="";t<n;t++)a+=e[t].value;return a}function addCombinator(e,t,n){var a=t.dir,o=t.next,i=o||a,s=n&&"parentNode"===i,d=C++;return t.first?function(t,n,o){for(;t=t[a];)if(1===t.nodeType||s)return e(t,n,o);return!1}:function(t,n,r){var l,p,c,u=[w,d];if(r){for(;t=t[a];)if((1===t.nodeType||s)&&e(t,n,r))return!0;}else for(;t=t[a];)if(1===t.nodeType||s)if(c=t[b]||(t[b]={}),p=c[t.uniqueID]||(c[t.uniqueID]={}),o&&o===t.nodeName.toLowerCase())t=t[a]||t;else{if((l=p[i])&&l[0]===w&&l[1]===d)return u[2]=l[2];if(p[i]=u,u[2]=e(t,n,r))return!0}return!1}}function elementMatcher(e){return 1<e.length?function(t,n,a){for(var o=e.length;o--;)if(!e[o](t,n,a))return!1;return!0}:e[0]}function multipleContexts(e,t,n){for(var a=0,o=t.length;a<o;a++)Sizzle(e,t[a],n);return n}function condense(e,t,n,a,o){for(var s,d=[],r=0,i=e.length;r<i;r++)(s=e[r])&&(!n||n(s,a,o))&&(d.push(s),null!=t&&t.push(r));return d}function setMatcher(e,t,n,a,o,i){return a&&!a[b]&&(a=setMatcher(a)),o&&!o[b]&&(o=setMatcher(o,i)),markFunction(function(s,d,r,l){var p,c,i,u=[],f=[],h=d.length,m=s||multipleContexts(t||"*",r.nodeType?[r]:r,[]),g=e&&(s||!t)?condense(m,u,e,r,l):m,y=n?o||(s?e:h||a)?[]:d:g;if(n&&n(g,y,r,l),a)for(p=condense(y,f),a(p,[],r,l),c=p.length;c--;)(i=p[c])&&(y[f[c]]=!(g[f[c]]=i));if(!s)y=condense(y===d?y.splice(h,y.length):y),o?o(null,d,y,l):q.apply(d,y);else if(o||e){if(o){for(p=[],c=y.length;c--;)(i=y[c])&&p.push(g[c]=i);o(null,y=[],p,l)}for(c=y.length;c--;)(i=y[c])&&-1<(p=o?O(s,i):u[c])&&(s[p]=!(d[p]=i))}})}function matcherFromTokens(e){for(var t,n,o,s=e.length,d=a.relative[e[0].type],r=d||a.relative[" "],p=d?1:0,i=addCombinator(function(e){return e===t},r,!0),c=addCombinator(function(e){return-1<O(t,e)},r,!0),u=[function(e,n,a){var o=!d&&(a||n!==l)||((t=n).nodeType?i(e,n,a):c(e,n,a));return t=null,o}];p<s;p++)if(n=a.relative[e[p].type])u=[addCombinator(elementMatcher(u),n)];else{if(n=a.filter[e[p].type].apply(null,e[p].matches),n[b]){for(o=++p;o<s&&!a.relative[e[o].type];o++);return setMatcher(1<p&&elementMatcher(u),1<p&&toSelector(e.slice(0,p-1).concat({value:" "===e[p-2].type?"*":""})).replace(W,"$1"),n,p<o&&matcherFromTokens(e.slice(p,o)),o<s&&matcherFromTokens(e=e.slice(o)),o<s&&toSelector(e))}u.push(n)}return elementMatcher(u)}function matcherFromGroupMatchers(e,t){var n=0<t.length,o=0<e.length,i=function superMatcher(s,d,r,p,c){var h,m,y,x=0,b="0",i=s&&[],v=[],T=l,C=s||o&&a.find.TAG("*",c),N=w+=null==T?1:Math.random()||0.1,k=C.length;for(c&&(l=d===f||d||c);b!==k&&null!=(h=C[b]);b++){if(o&&h){for(m=0,d||h.ownerDocument===f||(u(h),r=!g);y=e[m++];)if(y(h,d||f,r)){p.push(h);break}c&&(w=N)}n&&((h=!y&&h)&&x--,s&&i.push(h))}if(x+=b,n&&b!==x){for(m=0;y=t[m++];)y(i,v,d,r);if(s){if(0<x)for(;b--;)i[b]||v[b]||(v[b]=A.call(p));v=condense(v)}q.apply(p,v),c&&!s&&0<v.length&&1<x+t.length&&Sizzle.uniqueSort(p)}return c&&(w=N,l=T),i};return n?markFunction(i):i}var t,n,a,o,i,s,d,r,l,p,c,u,f,h,g,y,m,x,v,b="sizzle"+1*new Date,T=e.document,w=0,C=0,N=createCache(),k=createCache(),S=createCache(),D=function sortOrder(e,t){return e===t&&(c=!0),0},j={}.hasOwnProperty,E=[],A=E.pop,L=E.push,q=E.push,H=E.slice,O=function indexOf(e,t){for(var n=0,a=e.length;n<a;n++)if(e[n]===t)return n;return-1},P="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",F="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",I=/[\x20\t\r\n\f]+/g,W=/^[\x20\t\r\n\f]+|((?:^|[^\\])(?:\\.)*)[\x20\t\r\n\f]+$/g,R=/^[\x20\t\r\n\f]*,[\x20\t\r\n\f]*/,B=/^[\x20\t\r\n\f]*([>+~]|[\x20\t\r\n\f])[\x20\t\r\n\f]*/,_=/=[\x20\t\r\n\f]*([^\]'"]*?)[\x20\t\r\n\f]*\]/g,X=/:((?:\\.|[\w-]|[^ -\xa0])+)(?:\((('((?:\\.|[^\\'])*)'|"((?:\\.|[^\\"])*)")|((?:\\.|[^\\()[\]]|\[[\x20\t\r\n\f]*((?:\\.|[\w-]|[^ -\xa0])+)(?:[\x20\t\r\n\f]*([*^$|!~]?=)[\x20\t\r\n\f]*(?:'((?:\\.|[^\\'])*)'|"((?:\\.|[^\\"])*)"|((?:\\.|[\w-]|[^ -\xa0])+))|)[\x20\t\r\n\f]*\])*)|.*)\)|)/,$=/^(?:\\.|[\w-]|[^ -\xa0])+$/,U={ID:/^#((?:\\.|[\w-]|[^ -\xa0])+)/,CLASS:/^\.((?:\\.|[\w-]|[^ -\xa0])+)/,TAG:/^((?:\\.|[\w-]|[^ -\xa0])+|[*])/,ATTR:/^\[[\x20\t\r\n\f]*((?:\\.|[\w-]|[^ -\xa0])+)(?:[\x20\t\r\n\f]*([*^$|!~]?=)[\x20\t\r\n\f]*(?:'((?:\\.|[^\\'])*)'|"((?:\\.|[^\\"])*)"|((?:\\.|[\w-]|[^ -\xa0])+))|)[\x20\t\r\n\f]*\]/,PSEUDO:/^:((?:\\.|[\w-]|[^ -\xa0])+)(?:\((('((?:\\.|[^\\'])*)'|"((?:\\.|[^\\"])*)")|((?:\\.|[^\\()[\]]|\[[\x20\t\r\n\f]*((?:\\.|[\w-]|[^ -\xa0])+)(?:[\x20\t\r\n\f]*([*^$|!~]?=)[\x20\t\r\n\f]*(?:'((?:\\.|[^\\'])*)'|"((?:\\.|[^\\"])*)"|((?:\\.|[\w-]|[^ -\xa0])+))|)[\x20\t\r\n\f]*\])*)|.*)\)|)/,CHILD:/^:(only|first|last|nth|nth-last)-(child|of-type)(?:\([\x20\t\r\n\f]*(even|odd|(([+-]|)(\d*)n|)[\x20\t\r\n\f]*(?:([+-]|)[\x20\t\r\n\f]*(\d+)|))[\x20\t\r\n\f]*\)|)/i,bool:/^(?:checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)$/i,needsContext:/^[\x20\t\r\n\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\([\x20\t\r\n\f]*((?:-\d)?\d*)[\x20\t\r\n\f]*\)|)(?=[^-]|$)/i},z=/^(?:input|select|textarea|button)$/i,V=/^h\d$/i,Y=/^[^{]+\{\s*\[native \w/,G=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,Q=/[+~]/,K=/\\([\da-f]{1,6}[\x20\t\r\n\f]?|([\x20\t\r\n\f])|.)/ig,J=function funescape(e,t,n){var a=String.fromCharCode,o="0x"+t-65536;return o!=o||n?t:0>o?a(o+65536):a(55296|o>>10,56320|1023&o)},Z=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,ee=function fcssescape(e,t){return t?"\0"===e?"\uFFFD":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e},te=function unloadHandler(){u()},ne=addCombinator(function(e){return!0===e.disabled&&("form"in e||"label"in e)},{dir:"parentNode",next:"legend"});try{q.apply(E=H.call(T.childNodes),T.childNodes),E[T.childNodes.length].nodeType}catch(t){q={apply:E.length?function(e,t){L.apply(e,H.call(t))}:function(e,t){for(var n=e.length,a=0;e[n++]=t[a++];);e.length=n-1}}}for(t in n=Sizzle.support={},i=Sizzle.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return!!t&&"HTML"!==t.nodeName},u=Sizzle.setDocument=function(e){var t,o,s=e?e.ownerDocument||e:T;return s!==f&&9===s.nodeType&&s.documentElement?(f=s,h=f.documentElement,g=!i(f),T!==f&&(o=f.defaultView)&&o.top!==o&&(o.addEventListener?o.addEventListener("unload",te,!1):o.attachEvent&&o.attachEvent("onunload",te)),n.attributes=assert(function(e){return e.className="i",!e.getAttribute("className")}),n.getElementsByTagName=assert(function(e){return e.appendChild(f.createComment("")),!e.getElementsByTagName("*").length}),n.getElementsByClassName=Y.test(f.getElementsByClassName),n.getById=assert(function(e){return h.appendChild(e).id=b,!f.getElementsByName||!f.getElementsByName(b).length}),n.getById?(a.filter.ID=function(e){var t=e.replace(K,J);return function(e){return e.getAttribute("id")===t}},a.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&g){var n=t.getElementById(e);return n?[n]:[]}}):(a.filter.ID=function(e){var t=e.replace(K,J);return function(e){var n="undefined"!=typeof e.getAttributeNode&&e.getAttributeNode("id");return n&&n.value===t}},a.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&g){var n,a,o,i=t.getElementById(e);if(i){if(n=i.getAttributeNode("id"),n&&n.value===e)return[i];for(o=t.getElementsByName(e),a=0;i=o[a++];)if(n=i.getAttributeNode("id"),n&&n.value===e)return[i]}return[]}}),a.find.TAG=n.getElementsByTagName?function(e,t){return"undefined"==typeof t.getElementsByTagName?n.qsa?t.querySelectorAll(e):void 0:t.getElementsByTagName(e)}:function(e,t){var n,a=[],o=0,i=t.getElementsByTagName(e);if("*"===e){for(;n=i[o++];)1===n.nodeType&&a.push(n);return a}return i},a.find.CLASS=n.getElementsByClassName&&function(e,t){if("undefined"!=typeof t.getElementsByClassName&&g)return t.getElementsByClassName(e)},m=[],y=[],(n.qsa=Y.test(f.querySelectorAll))&&(assert(function(e){h.appendChild(e).innerHTML="<a id='"+b+"'></a><select id='"+b+"-\r\\' msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&y.push("[*^$]="+F+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||y.push("\\["+F+"*(?:value|"+P+")"),e.querySelectorAll("[id~="+b+"-]").length||y.push("~="),e.querySelectorAll(":checked").length||y.push(":checked"),e.querySelectorAll("a#"+b+"+*").length||y.push(".#.+[+~]")}),assert(function(e){e.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var t=f.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&y.push("name"+F+"*[*^$|!~]?="),2!==e.querySelectorAll(":enabled").length&&y.push(":enabled",":disabled"),h.appendChild(e).disabled=!0,2!==e.querySelectorAll(":disabled").length&&y.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),y.push(",.*:")})),(n.matchesSelector=Y.test(x=h.matches||h.webkitMatchesSelector||h.mozMatchesSelector||h.oMatchesSelector||h.msMatchesSelector))&&assert(function(e){n.disconnectedMatch=x.call(e,"*"),x.call(e,"[s!='']:x"),m.push("!=",":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+("\\["+F+"*("+M+")(?:"+F+"*([*^$|!~]?=)"+F+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+M+"))|)"+F+"*\\]")+")*)|.*)\\)|)")}),y=y.length&&new RegExp(y.join("|")),m=m.length&&new RegExp(m.join("|")),t=Y.test(h.compareDocumentPosition),v=t||Y.test(h.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,a=t&&t.parentNode;return e===a||!!(a&&1===a.nodeType&&(n.contains?n.contains(a):e.compareDocumentPosition&&16&e.compareDocumentPosition(a)))}:function(e,t){if(t)for(;t=t.parentNode;)if(t===e)return!0;return!1},D=t?function(e,t){if(e===t)return c=!0,0;var a=!e.compareDocumentPosition-!t.compareDocumentPosition;return a?a:(a=(e.ownerDocument||e)===(t.ownerDocument||t)?e.compareDocumentPosition(t):1,1&a||!n.sortDetached&&t.compareDocumentPosition(e)===a?e===f||e.ownerDocument===T&&v(T,e)?-1:t===f||t.ownerDocument===T&&v(T,t)?1:p?O(p,e)-O(p,t):0:4&a?-1:1)}:function(e,t){if(e===t)return c=!0,0;var n,a=0,o=e.parentNode,i=t.parentNode,s=[e],d=[t];if(!o||!i)return e===f?-1:t===f?1:o?-1:i?1:p?O(p,e)-O(p,t):0;if(o===i)return siblingCheck(e,t);for(n=e;n=n.parentNode;)s.unshift(n);for(n=t;n=n.parentNode;)d.unshift(n);for(;s[a]===d[a];)a++;return a?siblingCheck(s[a],d[a]):s[a]===T?-1:d[a]===T?1:0},f):f},Sizzle.matches=function(e,t){return Sizzle(e,null,null,t)},Sizzle.matchesSelector=function(e,t){if((e.ownerDocument||e)!==f&&u(e),t=t.replace(_,"='$1']"),n.matchesSelector&&g&&!S[t+" "]&&(!m||!m.test(t))&&(!y||!y.test(t)))try{var a=x.call(e,t);if(a||n.disconnectedMatch||e.document&&11!==e.document.nodeType)return a}catch(t){}return 0<Sizzle(t,f,null,[e]).length},Sizzle.contains=function(e,t){return(e.ownerDocument||e)!==f&&u(e),v(e,t)},Sizzle.attr=function(e,t){(e.ownerDocument||e)!==f&&u(e);var o=a.attrHandle[t.toLowerCase()],i=o&&j.call(a.attrHandle,t.toLowerCase())?o(e,t,!g):void 0;return void 0===i?n.attributes||!g?e.getAttribute(t):(i=e.getAttributeNode(t))&&i.specified?i.value:null:i},Sizzle.escape=function(e){return(e+"").replace(Z,ee)},Sizzle.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},Sizzle.uniqueSort=function(e){var t,a=[],o=0,s=0;if(c=!n.detectDuplicates,p=!n.sortStable&&e.slice(0),e.sort(D),c){for(;t=e[s++];)t===e[s]&&(o=a.push(s));for(;o--;)e.splice(a[o],1)}return p=null,e},o=Sizzle.getText=function(e){var t,n="",a=0,i=e.nodeType;if(!i)for(;t=e[a++];)n+=o(t);else if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue;return n},a=Sizzle.selectors={cacheLength:50,createPseudo:markFunction,match:U,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function ATTR(e){return e[1]=e[1].replace(K,J),e[3]=(e[3]||e[4]||e[5]||"").replace(K,J),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function CHILD(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(!e[3]&&Sizzle.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&Sizzle.error(e[0]),e},PSEUDO:function PSEUDO(e){var t,n=!e[6]&&e[2];return U.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&X.test(n)&&(t=s(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function TAG(e){var t=e.replace(K,J).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function CLASS(e){var t=N[e+" "];return t||(t=new RegExp("(^|"+F+")"+e+"("+F+"|$)"))&&N(e,function(e){return t.test("string"==typeof e.className&&e.className||"undefined"!=typeof e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function ATTR(e,t,n){return function(a){var o=Sizzle.attr(a,e);return null==o?"!="===t:!t||(o+="","="===t?o===n:"!="===t?o!==n:"^="===t?n&&0===o.indexOf(n):"*="===t?n&&-1<o.indexOf(n):"$="===t?n&&o.slice(-n.length)===n:"~="===t?-1<(" "+o.replace(I," ")+" ").indexOf(n):"|="===t&&(o===n||o.slice(0,n.length+1)===n+"-"))}},CHILD:function CHILD(e,t,n,a,o){var i="nth"!==e.slice(0,3),s="last"!==e.slice(-4),d="of-type"===t;return 1===a&&0===o?function(e){return!!e.parentNode}:function(t,n,r){var l,p,c,u,f,h,m=i==s?"previousSibling":"nextSibling",g=t.parentNode,y=d&&t.nodeName.toLowerCase(),x=!r&&!d,v=!1;if(g){if(i){for(;m;){for(u=t;u=u[m];)if(d?u.nodeName.toLowerCase()===y:1===u.nodeType)return!1;h=m="only"===e&&!h&&"nextSibling"}return!0}if(h=[s?g.firstChild:g.lastChild],s&&x){for(u=g,c=u[b]||(u[b]={}),p=c[u.uniqueID]||(c[u.uniqueID]={}),l=p[e]||[],f=l[0]===w&&l[1],v=f&&l[2],u=f&&g.childNodes[f];u=++f&&u&&u[m]||(v=f=0)||h.pop();)if(1===u.nodeType&&++v&&u===t){p[e]=[w,f,v];break}}else if(x&&(u=t,c=u[b]||(u[b]={}),p=c[u.uniqueID]||(c[u.uniqueID]={}),l=p[e]||[],f=l[0]===w&&l[1],v=f),!1===v)for(;(u=++f&&u&&u[m]||(v=f=0)||h.pop())&&!((d?u.nodeName.toLowerCase()===y:1===u.nodeType)&&++v&&(x&&(c=u[b]||(u[b]={}),p=c[u.uniqueID]||(c[u.uniqueID]={}),p[e]=[w,v]),u===t)););return v-=o,v===a||0==v%a&&0<=v/a}}},PSEUDO:function PSEUDO(e,t){var n,o=a.pseudos[e]||a.setFilters[e.toLowerCase()]||Sizzle.error("unsupported pseudo: "+e);return o[b]?o(t):1<o.length?(n=[e,e,"",t],a.setFilters.hasOwnProperty(e.toLowerCase())?markFunction(function(e,n){for(var a,s=o(e,t),d=s.length;d--;)a=O(e,s[d]),e[a]=!(n[a]=s[d])}):function(e){return o(e,0,n)}):o}},pseudos:{not:markFunction(function(e){var t=[],n=[],a=d(e.replace(W,"$1"));return a[b]?markFunction(function(e,t,n,o){for(var s,d=a(e,null,o,[]),r=e.length;r--;)(s=d[r])&&(e[r]=!(t[r]=s))}):function(e,o,i){return t[0]=e,a(t,null,i,n),t[0]=null,!n.pop()}}),has:markFunction(function(e){return function(t){return 0<Sizzle(e,t).length}}),contains:markFunction(function(e){return e=e.replace(K,J),function(t){return-1<(t.textContent||t.innerText||o(t)).indexOf(e)}}),lang:markFunction(function(e){return $.test(e||"")||Sizzle.error("unsupported lang: "+e),e=e.replace(K,J).toLowerCase(),function(t){var n;do if(n=g?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function target(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function root(e){return e===h},focus:function focus(e){return e===f.activeElement&&(!f.hasFocus||f.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:createDisabledPseudo(!1),disabled:createDisabledPseudo(!0),checked:function checked(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function selected(e){return e.parentNode&&e.parentNode.selectedIndex,!0===e.selected},empty:function empty(e){for(e=e.firstChild;e;e=e.nextSibling)if(6>e.nodeType)return!1;return!0},parent:function parent(e){return!a.pseudos.empty(e)},header:function header(e){return V.test(e.nodeName)},input:function input(e){return z.test(e.nodeName)},button:function button(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function text(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:createPositionalPseudo(function(){return[0]}),last:createPositionalPseudo(function(e,t){return[t-1]}),eq:createPositionalPseudo(function(e,t,n){return[0>n?n+t:n]}),even:createPositionalPseudo(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:createPositionalPseudo(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:createPositionalPseudo(function(e,t,n){for(var a=0>n?n+t:n;0<=--a;)e.push(a);return e}),gt:createPositionalPseudo(function(e,t,n){for(var a=0>n?n+t:n;++a<t;)e.push(a);return e})}},a.pseudos.nth=a.pseudos.eq,{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})a.pseudos[t]=createInputPseudo(t);for(t in{submit:!0,reset:!0})a.pseudos[t]=createButtonPseudo(t);return setFilters.prototype=a.filters=a.pseudos,a.setFilters=new setFilters,s=Sizzle.tokenize=function(e,t){var n,o,i,s,d,r,l,p=k[e+" "];if(p)return t?0:p.slice(0);for(d=e,r=[],l=a.preFilter;d;){for(s in(!n||(o=R.exec(d)))&&(o&&(d=d.slice(o[0].length)||d),r.push(i=[])),n=!1,(o=B.exec(d))&&(n=o.shift(),i.push({value:n,type:o[0].replace(W," ")}),d=d.slice(n.length)),a.filter)(o=U[s].exec(d))&&(!l[s]||(o=l[s](o)))&&(n=o.shift(),i.push({value:n,type:s,matches:o}),d=d.slice(n.length));if(!n)break}return t?d.length:d?Sizzle.error(e):k(e,r).slice(0)},d=Sizzle.compile=function(e,t){var n,a=[],o=[],i=S[e+" "];if(!i){for(t||(t=s(e)),n=t.length;n--;)i=matcherFromTokens(t[n]),i[b]?a.push(i):o.push(i);i=S(e,matcherFromGroupMatchers(o,a)),i.selector=e}return i},r=Sizzle.select=function(e,t,n,o){var r,i,l,p,c,u="function"==typeof e&&e,f=!o&&s(e=u.selector||e);if(n=n||[],1===f.length){if(i=f[0]=f[0].slice(0),2<i.length&&"ID"===(l=i[0]).type&&9===t.nodeType&&g&&a.relative[i[1].type]){if(t=(a.find.ID(l.matches[0].replace(K,J),t)||[])[0],!t)return n;u&&(t=t.parentNode),e=e.slice(i.shift().value.length)}for(r=U.needsContext.test(e)?0:i.length;r--&&(l=i[r],!a.relative[p=l.type]);)if((c=a.find[p])&&(o=c(l.matches[0].replace(K,J),Q.test(i[0].type)&&testContext(t.parentNode)||t))){if(i.splice(r,1),e=o.length&&toSelector(i),!e)return q.apply(n,o),n;break}}return(u||d(e,f))(o,t,!g,n,!t||Q.test(e)&&testContext(t.parentNode)||t),n},n.sortStable=b.split("").sort(D).join("")===b,n.detectDuplicates=!!c,u(),n.sortDetached=assert(function(e){return 1&e.compareDocumentPosition(f.createElement("fieldset"))}),assert(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||addHandle("type|href|height|width",function(e,t,n){if(!n)return e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),n.attributes&&assert(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||addHandle("value",function(e,t,n){if(!n&&"input"===e.nodeName.toLowerCase())return e.defaultValue}),assert(function(e){return null==e.getAttribute("disabled")})||addHandle(P,function(e,t,n){var a;if(!n)return!0===e[t]?t.toLowerCase():(a=e.getAttributeNode(t))&&a.specified?a.value:null}),Sizzle}(e);y.find=w,y.expr=w.selectors,y.expr[":"]=y.expr.pseudos,y.uniqueSort=y.unique=w.uniqueSort,y.text=w.getText,y.isXMLDoc=w.isXML,y.contains=w.contains,y.escapeSelector=w.escape;var C=function dir(e,t,n){for(var a=[];(e=e[t])&&9!==e.nodeType;)if(1===e.nodeType){if(void 0!==n&&y(e).is(n))break;a.push(e)}return a},N=function _siblings(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n},k=y.expr.match.needsContext,S=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,j=/^.[^:#\[\.,]*$/;y.filter=function(e,t,n){var a=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===a.nodeType?y.find.matchesSelector(a,e)?[a]:[]:y.find.matches(e,y.grep(t,function(e){return 1===e.nodeType}))},y.fn.extend({find:function find(e){var t,n,a=this.length,o=this;if("string"!=typeof e)return this.pushStack(y(e).filter(function(){for(t=0;t<a;t++)if(y.contains(o[t],this))return!0}));for(n=this.pushStack([]),t=0;t<a;t++)y.find(e,o[t],n);return 1<a?y.uniqueSort(n):n},filter:function filter(e){return this.pushStack(winnow(this,e||[],!1))},not:function not(e){return this.pushStack(winnow(this,e||[],!0))},is:function is(e){return!!winnow(this,"string"==typeof e&&k.test(e)?y(e):e||[],!1).length}});var D,E=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,A=y.fn.init=function(e,t,n){var a,i;if(!e)return this;if(n=n||D,"string"==typeof e){if(a="<"===e[0]&&">"===e[e.length-1]&&3<=e.length?[null,e,null]:E.exec(e),a&&(a[1]||!t)){if(a[1]){if(t=t instanceof y?t[0]:t,y.merge(this,y.parseHTML(a[1],t&&t.nodeType?t.ownerDocument||t:o,!0)),S.test(a[1])&&y.isPlainObject(t))for(a in t)y.isFunction(this[a])?this[a](t[a]):this.attr(a,t[a]);return this}return i=o.getElementById(a[2]),i&&(this[0]=i,this.length=1),this}return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e)}return e.nodeType?(this[0]=e,this.length=1,this):y.isFunction(e)?void 0===n.ready?e(y):n.ready(e):y.makeArray(e,this)};A.prototype=y.fn,D=y(o);var L=/^(?:parents|prev(?:Until|All))/,q={children:!0,contents:!0,next:!0,prev:!0};y.fn.extend({has:function has(e){var t=y(e,this),n=t.length;return this.filter(function(){for(var e=0;e<n;e++)if(y.contains(this,t[e]))return!0})},closest:function closest(e,t){var n,a=0,o=this.length,i=[],s="string"!=typeof e&&y(e);if(!k.test(e))for(;a<o;a++)for(n=this[a];n&&n!==t;n=n.parentNode)if(11>n.nodeType&&(s?-1<s.index(n):1===n.nodeType&&y.find.matchesSelector(n,e))){i.push(n);break}return this.pushStack(1<i.length?y.uniqueSort(i):i)},index:function index(e){return e?"string"==typeof e?l.call(y(e),this[0]):l.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function add(e,t){return this.pushStack(y.uniqueSort(y.merge(this.get(),y(e,t))))},addBack:function addBack(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),y.each({parent:function parent(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function parents(e){return C(e,"parentNode")},parentsUntil:function parentsUntil(e,t,n){return C(e,"parentNode",n)},next:function next(e){return sibling(e,"nextSibling")},prev:function prev(e){return sibling(e,"previousSibling")},nextAll:function nextAll(e){return C(e,"nextSibling")},prevAll:function prevAll(e){return C(e,"previousSibling")},nextUntil:function nextUntil(e,t,n){return C(e,"nextSibling",n)},prevUntil:function prevUntil(e,t,n){return C(e,"previousSibling",n)},siblings:function siblings(e){return N((e.parentNode||{}).firstChild,e)},children:function children(e){return N(e.firstChild)},contents:function contents(e){return nodeName(e,"iframe")?e.contentDocument:(nodeName(e,"template")&&(e=e.content||e),y.merge([],e.childNodes))}},function(e,t){y.fn[e]=function(n,a){var o=y.map(this,t,n);return"Until"!==e.slice(-5)&&(a=n),a&&"string"==typeof a&&(o=y.filter(a,o)),1<this.length&&(!q[e]&&y.uniqueSort(o),L.test(e)&&o.reverse()),this.pushStack(o)}});var H=/[^\x20\t\r\n\f]+/g;y.Callbacks=function(e){e="string"==typeof e?createOptions(e):y.extend({},e);var t,n,a,o,i=[],s=[],d=-1,r=function fire(){for(o=o||e.once,a=t=!0;s.length;d=-1)for(n=s.shift();++d<i.length;)!1===i[d].apply(n[0],n[1])&&e.stopOnFalse&&(d=i.length,n=!1);e.memory||(n=!1),t=!1,o&&(n?i=[]:i="")},l={add:function add(){return i&&(n&&!t&&(d=i.length-1,s.push(n)),function add(t){y.each(t,function(t,n){y.isFunction(n)?(!e.unique||!l.has(n))&&i.push(n):n&&n.length&&"string"!==y.type(n)&&add(n)})}(arguments),n&&!t&&r()),this},remove:function remove(){return y.each(arguments,function(e,t){for(var n;-1<(n=y.inArray(t,i,n));)i.splice(n,1),n<=d&&d--}),this},has:function has(e){return e?-1<y.inArray(e,i):0<i.length},empty:function empty(){return i&&(i=[]),this},disable:function disable(){return o=s=[],i=n="",this},disabled:function disabled(){return!i},lock:function lock(){return o=s=[],n||t||(i=n=""),this},locked:function locked(){return!!o},fireWith:function fireWith(e,n){return o||(n=n||[],n=[e,n.slice?n.slice():n],s.push(n),!t&&r()),this},fire:function fire(){return l.fireWith(this,arguments),this},fired:function fired(){return!!a}};return l},y.extend({Deferred:function Deferred(t){var n=[["notify","progress",y.Callbacks("memory"),y.Callbacks("memory"),2],["resolve","done",y.Callbacks("once memory"),y.Callbacks("once memory"),0,"resolved"],["reject","fail",y.Callbacks("once memory"),y.Callbacks("once memory"),1,"rejected"]],a="pending",o={state:function state(){return a},always:function always(){return s.done(arguments).fail(arguments),this},catch:function _catch(e){return o.then(null,e)},pipe:function pipe(){var e=arguments;return y.Deferred(function(t){y.each(n,function(n,a){var o=y.isFunction(e[a[4]])&&e[a[4]];s[a[1]](function(){var e=o&&o.apply(this,arguments);e&&y.isFunction(e.promise)?e.promise().progress(t.notify).done(t.resolve).fail(t.reject):t[a[0]+"With"](this,o?[e]:arguments)})}),e=null}).promise()},then:function then(t,a,o){function resolve(t,n,a,o){return function(){var s=this,d=arguments,r=function mightThrow(){var e,r;if(!(t<i)){if(e=a.apply(s,d),e===n.promise())throw new TypeError("Thenable self-resolution");r=e&&("object"===("undefined"==typeof e?"undefined":_typeof(e))||"function"==typeof e)&&e.then,y.isFunction(r)?o?r.call(e,resolve(i,n,Identity,o),resolve(i,n,Thrower,o)):(i++,r.call(e,resolve(i,n,Identity,o),resolve(i,n,Thrower,o),resolve(i,n,Identity,n.notifyWith))):(a!==Identity&&(s=void 0,d=[e]),(o||n.resolveWith)(s,d))}},l=o?r:function(){try{r()}catch(o){y.Deferred.exceptionHook&&y.Deferred.exceptionHook(o,l.stackTrace),t+1>=i&&(a!==Thrower&&(s=void 0,d=[o]),n.rejectWith(s,d))}};t?l():(y.Deferred.getStackHook&&(l.stackTrace=y.Deferred.getStackHook()),e.setTimeout(l))}}var i=0;return y.Deferred(function(e){n[0][3].add(resolve(0,e,y.isFunction(o)?o:Identity,e.notifyWith)),n[1][3].add(resolve(0,e,y.isFunction(t)?t:Identity)),n[2][3].add(resolve(0,e,y.isFunction(a)?a:Thrower))}).promise()},promise:function promise(e){return null==e?o:y.extend(e,o)}},s={};return y.each(n,function(e,t){var i=t[2],d=t[5];o[t[1]]=i.add,d&&i.add(function(){a=d},n[3-e][2].disable,n[0][2].lock),i.add(t[3].fire),s[t[0]]=function(){return s[t[0]+"With"](this===s?void 0:this,arguments),this},s[t[0]+"With"]=i.fireWith}),o.promise(s),t&&t.call(s,s),s},when:function when(e){var t=arguments.length,n=t,a=Array(n),o=s.call(arguments),d=y.Deferred(),i=function updateFunc(e){return function(n){a[e]=this,o[e]=1<arguments.length?s.call(arguments):n,--t||d.resolveWith(a,o)}};if(1>=t&&(adoptValue(e,d.done(i(n)).resolve,d.reject,!t),"pending"===d.state()||y.isFunction(o[n]&&o[n].then)))return d.then();for(;n--;)adoptValue(o[n],i(n),d.reject);return d.promise()}});var O=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;y.Deferred.exceptionHook=function(t,n){e.console&&e.console.warn&&t&&O.test(t.name)&&e.console.warn("jQuery.Deferred exception: "+t.message,t.stack,n)},y.readyException=function(t){e.setTimeout(function(){throw t})};var P=y.Deferred();y.fn.ready=function(e){return P.then(e).catch(function(e){y.readyException(e)}),this},y.extend({isReady:!1,readyWait:1,ready:function ready(e){(!0===e?! --y.readyWait:!y.isReady)&&(y.isReady=!0,!0!==e&&0<--y.readyWait||P.resolveWith(o,[y]))}}),y.ready.then=P.then,"complete"!==o.readyState&&("loading"===o.readyState||o.documentElement.doScroll)?(o.addEventListener("DOMContentLoaded",completed),e.addEventListener("load",completed)):e.setTimeout(y.ready);var F=function access(e,t,n,a,o,s,d){var r=0,i=e.length,l=null==n;if("object"===y.type(n))for(r in o=!0,n)F(e,t,r,n[r],!0,s,d);else if(void 0!==a&&(o=!0,y.isFunction(a)||(d=!0),l&&(d?(t.call(e,a),t=null):(l=t,t=function fn(e,t,n){return l.call(y(e),n)})),t))for(;r<i;r++)t(e[r],n,d?a:a.call(e[r],r,t(e[r],n)));return o?e:l?t.call(e):i?t(e[0],n):s},M=function acceptData(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType};Data.uid=1,Data.prototype={cache:function cache(e){var t=e[this.expando];return t||(t={},M(e)&&(e.nodeType?e[this.expando]=t:Object.defineProperty(e,this.expando,{value:t,configurable:!0}))),t},set:function set(e,t,n){var a,o=this.cache(e);if("string"==typeof t)o[y.camelCase(t)]=n;else for(a in t)o[y.camelCase(a)]=t[a];return o},get:function get(e,t){return void 0===t?this.cache(e):e[this.expando]&&e[this.expando][y.camelCase(t)]},access:function access(e,t,n){return void 0===t||t&&"string"==typeof t&&void 0===n?this.get(e,t):(this.set(e,t,n),void 0===n?t:n)},remove:function remove(e,t){var n,a=e[this.expando];if(void 0!==a){if(void 0!==t)for(Array.isArray(t)?t=t.map(y.camelCase):(t=y.camelCase(t),t=(t in a)?[t]:t.match(H)||[]),n=t.length;n--;)delete a[t[n]];(void 0===t||y.isEmptyObject(a))&&(e.nodeType?e[this.expando]=void 0:delete e[this.expando])}},hasData:function hasData(e){var t=e[this.expando];return void 0!==t&&!y.isEmptyObject(t)}};var I=new Data,W=new Data,R=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,B=/[A-Z]/g;y.extend({hasData:function hasData(e){return W.hasData(e)||I.hasData(e)},data:function data(e,t,n){return W.access(e,t,n)},removeData:function removeData(e,t){W.remove(e,t)},_data:function _data(e,t,n){return I.access(e,t,n)},_removeData:function _removeData(e,t){I.remove(e,t)}}),y.fn.extend({data:function data(e,t){var n,a,o,i=this[0],s=i&&i.attributes;if(void 0===e){if(this.length&&(o=W.get(i),1===i.nodeType&&!I.get(i,"hasDataAttrs"))){for(n=s.length;n--;)s[n]&&(a=s[n].name,0===a.indexOf("data-")&&(a=y.camelCase(a.slice(5)),dataAttr(i,a,o[a])));I.set(i,"hasDataAttrs",!0)}return o}return"object"===("undefined"==typeof e?"undefined":_typeof(e))?this.each(function(){W.set(this,e)}):F(this,function(t){var n;return i&&void 0===t?(n=W.get(i,e),void 0!==n)?n:(n=dataAttr(i,e),void 0===n?void 0:n):void this.each(function(){W.set(this,e,t)})},null,t,1<arguments.length,null,!0)},removeData:function removeData(e){return this.each(function(){W.remove(this,e)})}}),y.extend({queue:function queue(e,t,n){var a;if(e)return t=(t||"fx")+"queue",a=I.get(e,t),n&&(!a||Array.isArray(n)?a=I.access(e,t,y.makeArray(n)):a.push(n)),a||[]},dequeue:function dequeue(e,t){t=t||"fx";var n=y.queue(e,t),a=n.length,o=n.shift(),i=y._queueHooks(e,t);"inprogress"===o&&(o=n.shift(),a--),o&&("fx"===t&&n.unshift("inprogress"),delete i.stop,o.call(e,function next(){y.dequeue(e,t)},i)),!a&&i&&i.empty.fire()},_queueHooks:function _queueHooks(e,t){var n=t+"queueHooks";return I.get(e,n)||I.access(e,n,{empty:y.Callbacks("once memory").add(function(){I.remove(e,[t+"queue",n])})})}}),y.fn.extend({queue:function queue(e,t){var n=2;return"string"!=typeof e&&(t=e,e="fx",n--),arguments.length<n?y.queue(this[0],e):void 0===t?this:this.each(function(){var n=y.queue(this,e,t);y._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&y.dequeue(this,e)})},dequeue:function dequeue(e){return this.each(function(){y.dequeue(this,e)})},clearQueue:function clearQueue(e){return this.queue(e||"fx",[])},promise:function promise(e,t){var n,a=1,o=y.Deferred(),s=this,d=this.length,i=function resolve(){--a||o.resolveWith(s,[s])};for("string"!=typeof e&&(t=e,e=void 0),e=e||"fx";d--;)n=I.get(s[d],e+"queueHooks"),n&&n.empty&&(a++,n.empty.add(i));return i(),o.promise(t)}});var _=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,X=new RegExp("^(?:([+-])=|)("+_+")([a-z%]*)$","i"),$=["Top","Right","Bottom","Left"],U=function isHiddenWithinTree(e,t){return e=t||e,"none"===e.style.display||""===e.style.display&&y.contains(e.ownerDocument,e)&&"none"===y.css(e,"display")},z=function swap(e,t,n,a){var o,i,s={};for(i in t)s[i]=e.style[i],e.style[i]=t[i];for(i in o=n.apply(e,a||[]),t)e.style[i]=s[i];return o},V={};y.fn.extend({show:function show(){return showHide(this,!0)},hide:function hide(){return showHide(this)},toggle:function toggle(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){U(this)?y(this).show():y(this).hide()})}});var Y=/^(?:checkbox|radio)$/i,G=/<([a-z][^\/\0>\x20\t\r\n\f]+)/i,Q=/^$|\/(?:java|ecma)script/i,K={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};K.optgroup=K.option,K.tbody=K.tfoot=K.colgroup=K.caption=K.thead,K.th=K.td;var J=/<|&#?\w+;/;(function(){var e=o.createDocumentFragment(),t=e.appendChild(o.createElement("div")),n=o.createElement("input");n.setAttribute("type","radio"),n.setAttribute("checked","checked"),n.setAttribute("name","t"),t.appendChild(n),m.checkClone=t.cloneNode(!0).cloneNode(!0).lastChild.checked,t.innerHTML="<textarea>x</textarea>",m.noCloneChecked=!!t.cloneNode(!0).lastChild.defaultValue})();var Z=o.documentElement,ee=/^key/,te=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,ne=/^([^.]*)(?:\.(.+)|)/;y.event={global:{},add:function add(n,e,a,o,i){var s,d,r,l,p,t,c,u,f,h,m,g=I.get(n);if(g)for(a.handler&&(s=a,a=s.handler,i=s.selector),i&&y.find.matchesSelector(Z,i),a.guid||(a.guid=y.guid++),(l=g.events)||(l=g.events={}),(d=g.handle)||(d=g.handle=function(t){return"undefined"!=typeof y&&y.event.triggered!==t.type?y.event.dispatch.apply(n,arguments):void 0}),e=(e||"").match(H)||[""],p=e.length;p--;)(r=ne.exec(e[p])||[],f=m=r[1],h=(r[2]||"").split(".").sort(),!!f)&&(c=y.event.special[f]||{},f=(i?c.delegateType:c.bindType)||f,c=y.event.special[f]||{},t=y.extend({type:f,origType:m,data:o,handler:a,guid:a.guid,selector:i,needsContext:i&&y.expr.match.needsContext.test(i),namespace:h.join(".")},s),(u=l[f])||(u=l[f]=[],u.delegateCount=0,(!c.setup||!1===c.setup.call(n,o,h,d))&&n.addEventListener&&n.addEventListener(f,d)),c.add&&(c.add.call(n,t),!t.handler.guid&&(t.handler.guid=a.guid)),i?u.splice(u.delegateCount++,0,t):u.push(t),y.event.global[f]=!0)},remove:function remove(e,n,a,o,i){var s,d,r,l,p,t,c,u,f,h,m,g=I.hasData(e)&&I.get(e);if(g&&(l=g.events)){for(n=(n||"").match(H)||[""],p=n.length;p--;){if(r=ne.exec(n[p])||[],f=m=r[1],h=(r[2]||"").split(".").sort(),!f){for(f in l)y.event.remove(e,f+n[p],a,o,!0);continue}for(c=y.event.special[f]||{},f=(o?c.delegateType:c.bindType)||f,u=l[f]||[],r=r[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),d=s=u.length;s--;)t=u[s],(i||m===t.origType)&&(!a||a.guid===t.guid)&&(!r||r.test(t.namespace))&&(!o||o===t.selector||"**"===o&&t.selector)&&(u.splice(s,1),t.selector&&u.delegateCount--,c.remove&&c.remove.call(e,t));d&&!u.length&&((!c.teardown||!1===c.teardown.call(e,h,g.handle))&&y.removeEvent(e,f,g.handle),delete l[f])}y.isEmptyObject(l)&&I.remove(e,"handle events")}},dispatch:function dispatch(e){var t,n,a,o,i,s,d=y.event.fix(e),r=Array(arguments.length),l=(I.get(this,"events")||{})[d.type]||[],p=y.event.special[d.type]||{};for(r[0]=d,t=1;t<arguments.length;t++)r[t]=arguments[t];if(d.delegateTarget=this,!(p.preDispatch&&!1===p.preDispatch.call(this,d))){for(s=y.event.handlers.call(this,d,l),t=0;(o=s[t++])&&!d.isPropagationStopped();)for(d.currentTarget=o.elem,n=0;(i=o.handlers[n++])&&!d.isImmediatePropagationStopped();)(!d.rnamespace||d.rnamespace.test(i.namespace))&&(d.handleObj=i,d.data=i.data,a=((y.event.special[i.origType]||{}).handle||i.handler).apply(o.elem,r),void 0!==a&&!1===(d.result=a)&&(d.preventDefault(),d.stopPropagation()));return p.postDispatch&&p.postDispatch.call(this,d),d.result}},handlers:function handlers(e,t){var n,a,o,i,s,d=[],r=t.delegateCount,l=e.target;if(r&&l.nodeType&&!("click"===e.type&&1<=e.button))for(;l!==this;l=l.parentNode||this)if(1===l.nodeType&&("click"!==e.type||!0!==l.disabled)){for(i=[],s={},n=0;n<r;n++)a=t[n],o=a.selector+" ",void 0===s[o]&&(s[o]=a.needsContext?-1<y(o,this).index(l):y.find(o,this,null,[l]).length),s[o]&&i.push(a);i.length&&d.push({elem:l,handlers:i})}return l=this,r<t.length&&d.push({elem:l,handlers:t.slice(r)}),d},addProp:function addProp(e,t){Object.defineProperty(y.Event.prototype,e,{enumerable:!0,configurable:!0,get:y.isFunction(t)?function(){if(this.originalEvent)return t(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[e]},set:function set(t){Object.defineProperty(this,e,{enumerable:!0,configurable:!0,writable:!0,value:t})}})},fix:function fix(e){return e[y.expando]?e:new y.Event(e)},special:{load:{noBubble:!0},focus:{trigger:function trigger(){if(this!==safeActiveElement()&&this.focus)return this.focus(),!1},delegateType:"focusin"},blur:{trigger:function trigger(){if(this===safeActiveElement()&&this.blur)return this.blur(),!1},delegateType:"focusout"},click:{trigger:function trigger(){if("checkbox"===this.type&&this.click&&nodeName(this,"input"))return this.click(),!1},_default:function _default(e){return nodeName(e.target,"a")}},beforeunload:{postDispatch:function postDispatch(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}},y.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n)},y.Event=function(e,t){return this instanceof y.Event?void(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&!1===e.returnValue?returnTrue:returnFalse,this.target=e.target&&3===e.target.nodeType?e.target.parentNode:e.target,this.currentTarget=e.currentTarget,this.relatedTarget=e.relatedTarget):this.type=e,t&&y.extend(this,t),this.timeStamp=e&&e.timeStamp||y.now(),this[y.expando]=!0):new y.Event(e,t)},y.Event.prototype={constructor:y.Event,isDefaultPrevented:returnFalse,isPropagationStopped:returnFalse,isImmediatePropagationStopped:returnFalse,isSimulated:!1,preventDefault:function preventDefault(){var t=this.originalEvent;this.isDefaultPrevented=returnTrue,t&&!this.isSimulated&&t.preventDefault()},stopPropagation:function stopPropagation(){var t=this.originalEvent;this.isPropagationStopped=returnTrue,t&&!this.isSimulated&&t.stopPropagation()},stopImmediatePropagation:function stopImmediatePropagation(){var t=this.originalEvent;this.isImmediatePropagationStopped=returnTrue,t&&!this.isSimulated&&t.stopImmediatePropagation(),this.stopPropagation()}},y.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,char:!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function which(e){var t=e.button;return null==e.which&&ee.test(e.type)?null==e.charCode?e.keyCode:e.charCode:!e.which&&void 0!==t&&te.test(e.type)?1&t?1:2&t?3:4&t?2:0:e.which}},y.event.addProp),y.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,t){y.event.special[e]={delegateType:t,bindType:t,handle:function handle(e){var n,a=this,o=e.relatedTarget,i=e.handleObj;return o&&(o===a||y.contains(a,o))||(e.type=i.origType,n=i.handler.apply(this,arguments),e.type=t),n}}}),y.fn.extend({on:function on(e,t,n,a){return _on(this,e,t,n,a)},one:function one(e,t,n,a){return _on(this,e,t,n,a,1)},off:function off(e,t,n){var a,o;if(e&&e.preventDefault&&e.handleObj)return a=e.handleObj,y(e.delegateTarget).off(a.namespace?a.origType+"."+a.namespace:a.origType,a.selector,a.handler),this;if("object"===("undefined"==typeof e?"undefined":_typeof(e))){for(o in e)this.off(o,t,e[o]);return this}return(!1===t||"function"==typeof t)&&(n=t,t=void 0),!1===n&&(n=returnFalse),this.each(function(){y.event.remove(this,e,n,t)})}});var ae=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,oe=/<script|<style|<link/i,ie=/checked\s*(?:[^=]|=\s*.checked.)/i,se=/^true\/(.*)/,de=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;y.extend({htmlPrefilter:function htmlPrefilter(e){return e.replace(ae,"<$1></$2>")},clone:function clone(e,t,n){var a,o,i,s,d=e.cloneNode(!0),r=y.contains(e.ownerDocument,e);if(!m.noCloneChecked&&(1===e.nodeType||11===e.nodeType)&&!y.isXMLDoc(e))for(s=getAll(d),i=getAll(e),(a=0,o=i.length);a<o;a++)fixInput(i[a],s[a]);if(t)if(n)for(i=i||getAll(e),s=s||getAll(d),(a=0,o=i.length);a<o;a++)cloneCopyEvent(i[a],s[a]);else cloneCopyEvent(e,d);return s=getAll(d,"script"),0<s.length&&setGlobalEval(s,!r&&getAll(e,"script")),d},cleanData:function cleanData(e){for(var t,n,a,o=y.event.special,s=0;void 0!==(n=e[s]);s++)if(M(n)){if(t=n[I.expando]){if(t.events)for(a in t.events)o[a]?y.event.remove(n,a):y.removeEvent(n,a,t.handle);n[I.expando]=void 0}n[W.expando]&&(n[W.expando]=void 0)}}}),y.fn.extend({detach:function detach(e){return _remove(this,e,!0)},remove:function remove(e){return _remove(this,e)},text:function text(e){return F(this,function(e){return void 0===e?y.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=e)})},null,e,arguments.length)},append:function append(){return domManip(this,arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=manipulationTarget(this,e);t.appendChild(e)}})},prepend:function prepend(){return domManip(this,arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=manipulationTarget(this,e);t.insertBefore(e,t.firstChild)}})},before:function before(){return domManip(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function after(){return domManip(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},empty:function empty(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(y.cleanData(getAll(e,!1)),e.textContent="");return this},clone:function clone(e,t){return e=null!=e&&e,t=null==t?e:t,this.map(function(){return y.clone(this,e,t)})},html:function html(e){return F(this,function(e){var t=this[0]||{},n=0,a=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!oe.test(e)&&!K[(G.exec(e)||["",""])[1].toLowerCase()]){e=y.htmlPrefilter(e);try{for(;n<a;n++)t=this[n]||{},1===t.nodeType&&(y.cleanData(getAll(t,!1)),t.innerHTML=e);t=0}catch(t){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function replaceWith(){var e=[];return domManip(this,arguments,function(t){var n=this.parentNode;0>y.inArray(this,e)&&(y.cleanData(getAll(this)),n&&n.replaceChild(t,this))},e)}}),y.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){y.fn[e]=function(e){for(var n,a=[],o=y(e),s=o.length-1,d=0;d<=s;d++)n=d==s?this:this.clone(!0),y(o[d])[t](n),r.apply(a,n.get());return this.pushStack(a)}});var re=/^margin/,le=new RegExp("^("+_+")(?!px)[a-z%]+$","i"),pe=function getStyles(t){var n=t.ownerDocument.defaultView;return n&&n.opener||(n=e),n.getComputedStyle(t)};(function(){function computeStyleTests(){if(d){d.style.cssText="box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",d.innerHTML="",Z.appendChild(s);var o=e.getComputedStyle(d);t="1%"!==o.top,i="2px"===o.marginLeft,n="4px"===o.width,d.style.marginRight="50%",a="4px"===o.marginRight,Z.removeChild(s),d=null}}var t,n,a,i,s=o.createElement("div"),d=o.createElement("div");d.style&&(d.style.backgroundClip="content-box",d.cloneNode(!0).style.backgroundClip="",m.clearCloneStyle="content-box"===d.style.backgroundClip,s.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",s.appendChild(d),y.extend(m,{pixelPosition:function pixelPosition(){return computeStyleTests(),t},boxSizingReliable:function boxSizingReliable(){return computeStyleTests(),n},pixelMarginRight:function pixelMarginRight(){return computeStyleTests(),a},reliableMarginLeft:function reliableMarginLeft(){return computeStyleTests(),i}}))})();var ce=/^(none|table(?!-c[ea]).+)/,ue=/^--/,fe={position:"absolute",visibility:"hidden",display:"block"},he={letterSpacing:"0",fontWeight:"400"},me=["Webkit","Moz","ms"],ge=o.createElement("div").style;y.extend({cssHooks:{opacity:{get:function get(e,t){if(t){var n=curCSS(e,"opacity");return""===n?"1":n}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{float:"cssFloat"},style:function style(e,t,n,a){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var o,i,s,d=y.camelCase(t),r=ue.test(t),l=e.style;if(r||(t=finalPropName(d)),s=y.cssHooks[t]||y.cssHooks[d],void 0!==n){if(i="undefined"==typeof n?"undefined":_typeof(n),"string"===i&&(o=X.exec(n))&&o[1]&&(n=adjustCSS(e,t,o),i="number"),null==n||n!==n)return;"number"===i&&(n+=o&&o[3]||(y.cssNumber[d]?"":"px")),m.clearCloneStyle||""!==n||0!==t.indexOf("background")||(l[t]="inherit"),s&&"set"in s&&void 0===(n=s.set(e,n,a))||(r?l.setProperty(t,n):l[t]=n)}else return s&&"get"in s&&void 0!==(o=s.get(e,!1,a))?o:l[t]}},css:function css(e,t,n,a){var o,i,s,d=y.camelCase(t),r=ue.test(t);return r||(t=finalPropName(d)),s=y.cssHooks[t]||y.cssHooks[d],s&&"get"in s&&(o=s.get(e,!0,n)),void 0===o&&(o=curCSS(e,t,a)),"normal"===o&&t in he&&(o=he[t]),""===n||n?(i=parseFloat(o),!0===n||isFinite(i)?i||0:o):o}}),y.each(["height","width"],function(e,t){y.cssHooks[t]={get:function get(e,n,a){if(n)return!ce.test(y.css(e,"display"))||e.getClientRects().length&&e.getBoundingClientRect().width?getWidthOrHeight(e,t,a):z(e,fe,function(){return getWidthOrHeight(e,t,a)})},set:function set(e,n,a){var o,i=a&&pe(e),s=a&&augmentWidthOrHeight(e,t,a,"border-box"===y.css(e,"boxSizing",!1,i),i);return s&&(o=X.exec(n))&&"px"!==(o[3]||"px")&&(e.style[t]=n,n=y.css(e,t)),setPositiveNumber(e,n,s)}}}),y.cssHooks.marginLeft=addGetHookIf(m.reliableMarginLeft,function(e,t){if(t)return(parseFloat(curCSS(e,"marginLeft"))||e.getBoundingClientRect().left-z(e,{marginLeft:0},function(){return e.getBoundingClientRect().left}))+"px"}),y.each({margin:"",padding:"",border:"Width"},function(e,t){y.cssHooks[e+t]={expand:function expand(n){for(var a=0,o={},i="string"==typeof n?n.split(" "):[n];4>a;a++)o[e+$[a]+t]=i[a]||i[a-2]||i[0];return o}},re.test(e)||(y.cssHooks[e+t].set=setPositiveNumber)}),y.fn.extend({css:function css(e,t){return F(this,function(e,t,n){var a,o,s={},d=0;if(Array.isArray(t)){for(a=pe(e),o=t.length;d<o;d++)s[t[d]]=y.css(e,t[d],!1,a);return s}return void 0===n?y.css(e,t):y.style(e,t,n)},e,t,1<arguments.length)}}),y.Tween=Tween,Tween.prototype={constructor:Tween,init:function init(e,t,n,a,o,i){this.elem=e,this.prop=n,this.easing=o||y.easing._default,this.options=t,this.start=this.now=this.cur(),this.end=a,this.unit=i||(y.cssNumber[n]?"":"px")},cur:function cur(){var e=Tween.propHooks[this.prop];return e&&e.get?e.get(this):Tween.propHooks._default.get(this)},run:function run(e){var t,n=Tween.propHooks[this.prop];return this.pos=this.options.duration?t=y.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):Tween.propHooks._default.set(this),this}},Tween.prototype.init.prototype=Tween.prototype,Tween.propHooks={_default:{get:function get(e){var t;return 1!==e.elem.nodeType||null!=e.elem[e.prop]&&null==e.elem.style[e.prop]?e.elem[e.prop]:(t=y.css(e.elem,e.prop,""),t&&"auto"!==t?t:0)},set:function set(e){y.fx.step[e.prop]?y.fx.step[e.prop](e):1===e.elem.nodeType&&(null!=e.elem.style[y.cssProps[e.prop]]||y.cssHooks[e.prop])?y.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},Tween.propHooks.scrollTop=Tween.propHooks.scrollLeft={set:function set(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},y.easing={linear:function linear(e){return e},swing:function swing(e){return 0.5-Math.cos(e*Math.PI)/2},_default:"swing"},y.fx=Tween.prototype.init,y.fx.step={};var ye,xe,be=/^(?:toggle|show|hide)$/,ve=/queueHooks$/;y.Animation=y.extend(Animation,{tweeners:{"*":[function(e,t){var n=this.createTween(e,t);return adjustCSS(n.elem,e,X.exec(t),n),n}]},tweener:function tweener(e,t){y.isFunction(e)?(t=e,e=["*"]):e=e.match(H);for(var n,a=0,o=e.length;a<o;a++)n=e[a],Animation.tweeners[n]=Animation.tweeners[n]||[],Animation.tweeners[n].unshift(t)},prefilters:[function defaultPrefilter(e,t,n){var a,o,i,s,d,r,l,p,c=this,u={},f=e.style,h=e.nodeType&&U(e),m=I.get(e,"fxshow");for(a in n.queue||(s=y._queueHooks(e,"fx"),null==s.unqueued&&(s.unqueued=0,d=s.empty.fire,s.empty.fire=function(){s.unqueued||d()}),s.unqueued++,c.always(function(){c.always(function(){s.unqueued--,y.queue(e,"fx").length||s.empty.fire()})})),t)if(o=t[a],be.test(o)){if(delete t[a],i=i||"toggle"===o,o===(h?"hide":"show"))if("show"===o&&m&&void 0!==m[a])h=!0;else continue;u[a]=m&&m[a]||y.style(e,a)}if(r=!y.isEmptyObject(t),r||!y.isEmptyObject(u))for(a in("width"in t||"height"in t)&&1===e.nodeType&&(n.overflow=[f.overflow,f.overflowX,f.overflowY],l=m&&m.display,null==l&&(l=I.get(e,"display")),p=y.css(e,"display"),"none"===p&&(l?p=l:(showHide([e],!0),l=e.style.display||l,p=y.css(e,"display"),showHide([e]))),("inline"===p||"inline-block"===p&&null!=l)&&"none"===y.css(e,"float")&&(!r&&(c.done(function(){f.display=l}),null==l&&(p=f.display,l="none"===p?"":p)),f.display="inline-block")),n.overflow&&(f.overflow="hidden",c.always(function(){f.overflow=n.overflow[0],f.overflowX=n.overflow[1],f.overflowY=n.overflow[2]})),r=!1,u)r||(m?"hidden"in m&&(h=m.hidden):m=I.access(e,"fxshow",{display:l}),i&&(m.hidden=!h),h&&showHide([e],!0),c.done(function(){for(a in h||showHide([e]),I.remove(e,"fxshow"),u)y.style(e,a,u[a])})),r=createTween(h?m[a]:0,a,c),a in m||(m[a]=r.start,h&&(r.end=r.start,r.start=0))}],prefilter:function prefilter(e,t){t?Animation.prefilters.unshift(e):Animation.prefilters.push(e)}}),y.speed=function(e,t,n){var a=e&&"object"===("undefined"==typeof e?"undefined":_typeof(e))?y.extend({},e):{complete:n||!n&&t||y.isFunction(e)&&e,duration:e,easing:n&&t||t&&!y.isFunction(t)&&t};return y.fx.off?a.duration=0:"number"!=typeof a.duration&&(a.duration in y.fx.speeds?a.duration=y.fx.speeds[a.duration]:a.duration=y.fx.speeds._default),(null==a.queue||!0===a.queue)&&(a.queue="fx"),a.old=a.complete,a.complete=function(){y.isFunction(a.old)&&a.old.call(this),a.queue&&y.dequeue(this,a.queue)},a},y.fn.extend({fadeTo:function fadeTo(e,t,n,a){return this.filter(U).css("opacity",0).show().end().animate({opacity:t},e,n,a)},animate:function animate(e,t,n,a){var o=y.isEmptyObject(e),i=y.speed(t,n,a),s=function doAnimation(){var t=Animation(this,y.extend({},e),i);(o||I.get(this,"finish"))&&t.stop(!0)};return s.finish=s,o||!1===i.queue?this.each(s):this.queue(i.queue,s)},stop:function stop(e,t,n){var a=function stopQueue(e){var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=void 0),t&&!1!==e&&this.queue(e||"fx",[]),this.each(function(){var t=!0,o=null!=e&&e+"queueHooks",i=y.timers,s=I.get(this);if(o)s[o]&&s[o].stop&&a(s[o]);else for(o in s)s[o]&&s[o].stop&&ve.test(o)&&a(s[o]);for(o=i.length;o--;)i[o].elem===this&&(null==e||i[o].queue===e)&&(i[o].anim.stop(n),t=!1,i.splice(o,1));(t||!n)&&y.dequeue(this,e)})},finish:function finish(e){return!1!==e&&(e=e||"fx"),this.each(function(){var t,n=I.get(this),a=n[e+"queue"],o=n[e+"queueHooks"],i=y.timers,s=a?a.length:0;for(n.finish=!0,y.queue(this,e,[]),o&&o.stop&&o.stop.call(this,!0),t=i.length;t--;)i[t].elem===this&&i[t].queue===e&&(i[t].anim.stop(!0),i.splice(t,1));for(t=0;t<s;t++)a[t]&&a[t].finish&&a[t].finish.call(this);delete n.finish})}}),y.each(["toggle","show","hide"],function(e,t){var n=y.fn[t];y.fn[t]=function(e,a,o){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(genFx(t,!0),e,a,o)}}),y.each({slideDown:genFx("show"),slideUp:genFx("hide"),slideToggle:genFx("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){y.fn[e]=function(e,n,a){return this.animate(t,e,n,a)}}),y.timers=[],y.fx.tick=function(){var e,t=0,n=y.timers;for(ye=y.now();t<n.length;t++)e=n[t],e()||n[t]!==e||n.splice(t--,1);n.length||y.fx.stop(),ye=void 0},y.fx.timer=function(e){y.timers.push(e),y.fx.start()},y.fx.interval=13,y.fx.start=function(){xe||(xe=!0,schedule())},y.fx.stop=function(){xe=null},y.fx.speeds={slow:600,fast:200,_default:400},y.fn.delay=function(t,n){return t=y.fx?y.fx.speeds[t]||t:t,n=n||"fx",this.queue(n,function(n,a){var o=e.setTimeout(n,t);a.stop=function(){e.clearTimeout(o)}})},function(){var e=o.createElement("input"),t=o.createElement("select"),n=t.appendChild(o.createElement("option"));e.type="checkbox",m.checkOn=""!==e.value,m.optSelected=n.selected,e=o.createElement("input"),e.value="t",e.type="radio",m.radioValue="t"===e.value}();var Te,we=y.expr.attrHandle;y.fn.extend({attr:function attr(e,t){return F(this,y.attr,e,t,1<arguments.length)},removeAttr:function removeAttr(e){return this.each(function(){y.removeAttr(this,e)})}}),y.extend({attr:function attr(e,t,n){var a,o,i=e.nodeType;if(3!==i&&8!==i&&2!==i)return"undefined"==typeof e.getAttribute?y.prop(e,t,n):(1===i&&y.isXMLDoc(e)||(o=y.attrHooks[t.toLowerCase()]||(y.expr.match.bool.test(t)?Te:void 0)),void 0!==n)?null===n?void y.removeAttr(e,t):o&&"set"in o&&void 0!==(a=o.set(e,n,t))?a:(e.setAttribute(t,n+""),n):o&&"get"in o&&null!==(a=o.get(e,t))?a:(a=y.find.attr(e,t),null==a?void 0:a)},attrHooks:{type:{set:function set(e,t){if(!m.radioValue&&"radio"===t&&nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},removeAttr:function removeAttr(e,t){var n,a=0,o=t&&t.match(H);if(o&&1===e.nodeType)for(;n=o[a++];)e.removeAttribute(n)}}),Te={set:function set(e,t,n){return!1===t?y.removeAttr(e,n):e.setAttribute(n,n),n}},y.each(y.expr.match.bool.source.match(/\w+/g),function(e,t){var n=we[t]||y.find.attr;we[t]=function(e,t,a){var o,i,s=t.toLowerCase();return a||(i=we[s],we[s]=o,o=null==n(e,t,a)?null:s,we[s]=i),o}});var Ce=/^(?:input|select|textarea|button)$/i,Ne=/^(?:a|area)$/i;y.fn.extend({prop:function prop(e,t){return F(this,y.prop,e,t,1<arguments.length)},removeProp:function removeProp(e){return this.each(function(){delete this[y.propFix[e]||e]})}}),y.extend({prop:function prop(e,t,n){var a,o,i=e.nodeType;if(3!==i&&8!==i&&2!==i)return 1===i&&y.isXMLDoc(e)||(t=y.propFix[t]||t,o=y.propHooks[t]),void 0===n?o&&"get"in o&&null!==(a=o.get(e,t))?a:e[t]:o&&"set"in o&&void 0!==(a=o.set(e,n,t))?a:e[t]=n},propHooks:{tabIndex:{get:function get(e){var t=y.find.attr(e,"tabindex");return t?parseInt(t,10):Ce.test(e.nodeName)||Ne.test(e.nodeName)&&e.href?0:-1}}},propFix:{for:"htmlFor",class:"className"}}),m.optSelected||(y.propHooks.selected={get:function get(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null},set:function set(e){var t=e.parentNode;t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex)}}),y.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){y.propFix[this.toLowerCase()]=this}),y.fn.extend({addClass:function addClass(e){var t,n,a,o,s,d,r,l=0;if(y.isFunction(e))return this.each(function(t){y(this).addClass(e.call(this,t,getClass(this)))});if("string"==typeof e&&e)for(t=e.match(H)||[];n=this[l++];)if(o=getClass(n),a=1===n.nodeType&&" "+stripAndCollapse(o)+" ",a){for(d=0;s=t[d++];)0>a.indexOf(" "+s+" ")&&(a+=s+" ");r=stripAndCollapse(a),o!==r&&n.setAttribute("class",r)}return this},removeClass:function removeClass(e){var t,n,a,o,s,d,r,l=0;if(y.isFunction(e))return this.each(function(t){y(this).removeClass(e.call(this,t,getClass(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof e&&e)for(t=e.match(H)||[];n=this[l++];)if(o=getClass(n),a=1===n.nodeType&&" "+stripAndCollapse(o)+" ",a){for(d=0;s=t[d++];)for(;-1<a.indexOf(" "+s+" ");)a=a.replace(" "+s+" "," ");r=stripAndCollapse(a),o!==r&&n.setAttribute("class",r)}return this},toggleClass:function toggleClass(e,t){var n="undefined"==typeof e?"undefined":_typeof(e);return"boolean"==typeof t&&"string"===n?t?this.addClass(e):this.removeClass(e):y.isFunction(e)?this.each(function(n){y(this).toggleClass(e.call(this,n,getClass(this),t),t)}):this.each(function(){var t,a,o,i;if("string"===n)for(a=0,o=y(this),i=e.match(H)||[];t=i[a++];)o.hasClass(t)?o.removeClass(t):o.addClass(t);else(void 0===e||"boolean"===n)&&(t=getClass(this),t&&I.set(this,"__className__",t),this.setAttribute&&this.setAttribute("class",t||!1===e?"":I.get(this,"__className__")||""))})},hasClass:function hasClass(e){var t,n,a=0;for(t=" "+e+" ";n=this[a++];)if(1===n.nodeType&&-1<(" "+stripAndCollapse(getClass(n))+" ").indexOf(t))return!0;return!1}});var ke=/\r/g;y.fn.extend({val:function val(e){var t,n,a,o=this[0];return arguments.length?(a=y.isFunction(e),this.each(function(n){var o;1!==this.nodeType||(o=a?e.call(this,n,y(this).val()):e,null==o?o="":"number"==typeof o?o+="":Array.isArray(o)&&(o=y.map(o,function(e){return null==e?"":e+""})),t=y.valHooks[this.type]||y.valHooks[this.nodeName.toLowerCase()],(!t||!("set"in t)||void 0===t.set(this,o,"value"))&&(this.value=o))})):o?(t=y.valHooks[o.type]||y.valHooks[o.nodeName.toLowerCase()],t&&"get"in t&&void 0!==(n=t.get(o,"value")))?n:(n=o.value,"string"==typeof n?n.replace(ke,""):null==n?"":n):void 0}}),y.extend({valHooks:{option:{get:function get(e){var t=y.find.attr(e,"value");return null==t?stripAndCollapse(y.text(e)):t}},select:{get:function get(e){var t,n,a,o=e.options,i=e.selectedIndex,s="select-one"===e.type,d=s?null:[],r=s?i+1:o.length;for(a=0>i?r:s?i:0;a<r;a++)if(n=o[a],(n.selected||a===i)&&!n.disabled&&(!n.parentNode.disabled||!nodeName(n.parentNode,"optgroup"))){if(t=y(n).val(),s)return t;d.push(t)}return d},set:function set(e,t){for(var n,a,o=e.options,s=y.makeArray(t),d=o.length;d--;)a=o[d],(a.selected=-1<y.inArray(y.valHooks.option.get(a),s))&&(n=!0);return n||(e.selectedIndex=-1),s}}}}),y.each(["radio","checkbox"],function(){y.valHooks[this]={set:function set(e,t){if(Array.isArray(t))return e.checked=-1<y.inArray(y(e).val(),t)}},m.checkOn||(y.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})});var Se=/^(?:focusinfocus|focusoutblur)$/;y.extend(y.event,{trigger:function trigger(t,n,a,s){var d,i,r,l,p,c,f,h=[a||o],m=u.call(t,"type")?t.type:t,g=u.call(t,"namespace")?t.namespace.split("."):[];if((i=r=a=a||o,3!==a.nodeType&&8!==a.nodeType)&&!Se.test(m+y.event.triggered)&&(-1<m.indexOf(".")&&(g=m.split("."),m=g.shift(),g.sort()),p=0>m.indexOf(":")&&"on"+m,t=t[y.expando]?t:new y.Event(m,"object"===("undefined"==typeof t?"undefined":_typeof(t))&&t),t.isTrigger=s?2:3,t.namespace=g.join("."),t.rnamespace=t.namespace?new RegExp("(^|\\.)"+g.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,t.result=void 0,t.target||(t.target=a),n=null==n?[t]:y.makeArray(n,[t]),f=y.event.special[m]||{},s||!f.trigger||!1!==f.trigger.apply(a,n))){if(!s&&!f.noBubble&&!y.isWindow(a)){for(l=f.delegateType||m,Se.test(l+m)||(i=i.parentNode);i;i=i.parentNode)h.push(i),r=i;r===(a.ownerDocument||o)&&h.push(r.defaultView||r.parentWindow||e)}for(d=0;(i=h[d++])&&!t.isPropagationStopped();)t.type=1<d?l:f.bindType||m,c=(I.get(i,"events")||{})[t.type]&&I.get(i,"handle"),c&&c.apply(i,n),c=p&&i[p],c&&c.apply&&M(i)&&(t.result=c.apply(i,n),!1===t.result&&t.preventDefault());return t.type=m,s||t.isDefaultPrevented()||f._default&&!1!==f._default.apply(h.pop(),n)||!M(a)||!p||!y.isFunction(a[m])||y.isWindow(a)||(r=a[p],r&&(a[p]=null),y.event.triggered=m,a[m](),y.event.triggered=void 0,r&&(a[p]=r)),t.result}},simulate:function simulate(t,n,a){var o=y.extend(new y.Event,a,{type:t,isSimulated:!0});y.event.trigger(o,null,n)}}),y.fn.extend({trigger:function trigger(e,t){return this.each(function(){y.event.trigger(e,t,this)})},triggerHandler:function triggerHandler(e,t){var n=this[0];if(n)return y.event.trigger(e,t,n,!0)}}),y.each(["blur","focus","focusin","focusout","resize","scroll","click","dblclick","mousedown","mouseup","mousemove","mouseover","mouseout","mouseenter","mouseleave","change","select","submit","keydown","keypress","keyup","contextmenu"],function(e,t){y.fn[t]=function(e,n){return 0<arguments.length?this.on(t,null,e,n):this.trigger(t)}}),y.fn.extend({hover:function hover(e,t){return this.mouseenter(e).mouseleave(t||e)}}),m.focusin="onfocusin"in e,m.focusin||y.each({focus:"focusin",blur:"focusout"},function(e,t){var n=function handler(e){y.event.simulate(t,e.target,y.event.fix(e))};y.event.special[t]={setup:function setup(){var a=this.ownerDocument||this,o=I.access(a,t);o||a.addEventListener(e,n,!0),I.access(a,t,(o||0)+1)},teardown:function teardown(){var a=this.ownerDocument||this,o=I.access(a,t)-1;o?I.access(a,t,o):(a.removeEventListener(e,n,!0),I.remove(a,t))}}});var je=e.location,De=y.now(),Ee=/\?/;y.parseXML=function(t){var n;if(!t||"string"!=typeof t)return null;try{n=new e.DOMParser().parseFromString(t,"text/xml")}catch(t){n=void 0}return(!n||n.getElementsByTagName("parsererror").length)&&y.error("Invalid XML: "+t),n};var Ae=/\[\]$/,Le=/\r?\n/g,qe=/^(?:submit|button|image|reset|file)$/i,He=/^(?:input|select|textarea|keygen)/i;y.param=function(e,t){var n,a=[],o=function add(e,t){var n=y.isFunction(t)?t():t;a[a.length]=encodeURIComponent(e)+"="+encodeURIComponent(null==n?"":n)};if(Array.isArray(e)||e.jquery&&!y.isPlainObject(e))y.each(e,function(){o(this.name,this.value)});else for(n in e)buildParams(n,e[n],t,o);return a.join("&")},y.fn.extend({serialize:function serialize(){return y.param(this.serializeArray())},serializeArray:function serializeArray(){return this.map(function(){var e=y.prop(this,"elements");return e?y.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!y(this).is(":disabled")&&He.test(this.nodeName)&&!qe.test(e)&&(this.checked||!Y.test(e))}).map(function(e,t){var n=y(this).val();return null==n?null:Array.isArray(n)?y.map(n,function(e){return{name:t.name,value:e.replace(Le,"\r\n")}}):{name:t.name,value:n.replace(Le,"\r\n")}}).get()}});var Oe=/%20/g,Pe=/#.*$/,Fe=/([?&])_=[^&]*/,Me=/^(.*?):[ \t]*([^\r\n]*)$/mg,Ie=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,We=/^(?:GET|HEAD)$/,Re=/^\/\//,Be={},_e={},Xe="*/".concat("*"),$e=o.createElement("a");$e.href=je.href,y.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:je.href,type:"GET",isLocal:Ie.test(je.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Xe,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":y.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function ajaxSetup(e,t){return t?ajaxExtend(ajaxExtend(e,y.ajaxSettings),t):ajaxExtend(y.ajaxSettings,e)},ajaxPrefilter:addToPrefiltersOrTransports(Be),ajaxTransport:addToPrefiltersOrTransports(_e),ajax:function ajax(t,n){function done(t,n,o,i){var l,c,h,T,w,C=n;u||(u=!0,p&&e.clearTimeout(p),a=void 0,r=i||"",N.readyState=0<t?4:0,l=200<=t&&300>t||304===t,o&&(T=ajaxHandleResponses(m,N,o)),T=ajaxConvert(m,T,N,l),l?(m.ifModified&&(w=N.getResponseHeader("Last-Modified"),w&&(y.lastModified[d]=w),w=N.getResponseHeader("etag"),w&&(y.etag[d]=w)),204===t||"HEAD"===m.type?C="nocontent":304===t?C="notmodified":(C=T.state,c=T.data,h=T.error,l=!h)):(h=C,(t||!C)&&(C="error",0>t&&(t=0))),N.status=t,N.statusText=(n||C)+"",l?x.resolveWith(s,[c,C,N]):x.rejectWith(s,[N,C,h]),N.statusCode(v),v=void 0,f&&g.trigger(l?"ajaxSuccess":"ajaxError",[N,m,l?c:h]),b.fireWith(s,[N,C]),f&&(g.trigger("ajaxComplete",[N,m]),! --y.active&&y.event.trigger("ajaxStop")))}"object"===("undefined"==typeof t?"undefined":_typeof(t))&&(n=t,t=void 0),n=n||{};var a,d,r,l,p,c,u,f,h,i,m=y.ajaxSetup({},n),s=m.context||m,g=m.context&&(s.nodeType||s.jquery)?y(s):y.event,x=y.Deferred(),b=y.Callbacks("once memory"),v=m.statusCode||{},T={},w={},C="canceled",N={readyState:0,getResponseHeader:function getResponseHeader(e){var t;if(u){if(!l)for(l={};t=Me.exec(r);)l[t[1].toLowerCase()]=t[2];t=l[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function getAllResponseHeaders(){return u?r:null},setRequestHeader:function setRequestHeader(e,t){return null==u&&(e=w[e.toLowerCase()]=w[e.toLowerCase()]||e,T[e]=t),this},overrideMimeType:function overrideMimeType(e){return null==u&&(m.mimeType=e),this},statusCode:function statusCode(e){if(e)if(u)N.always(e[N.status]);else for(var t in e)v[t]=[v[t],e[t]];return this},abort:function abort(e){var t=e||C;return a&&a.abort(t),done(0,t),this}};if(x.promise(N),m.url=((t||m.url||je.href)+"").replace(Re,je.protocol+"//"),m.type=n.method||n.type||m.method||m.type,m.dataTypes=(m.dataType||"*").toLowerCase().match(H)||[""],null==m.crossDomain){c=o.createElement("a");try{c.href=m.url,c.href=c.href,m.crossDomain=$e.protocol+"//"+$e.host!=c.protocol+"//"+c.host}catch(t){m.crossDomain=!0}}if(m.data&&m.processData&&"string"!=typeof m.data&&(m.data=y.param(m.data,m.traditional)),inspectPrefiltersOrTransports(Be,m,n,N),u)return N;for(h in f=y.event&&m.global,f&&0==y.active++&&y.event.trigger("ajaxStart"),m.type=m.type.toUpperCase(),m.hasContent=!We.test(m.type),d=m.url.replace(Pe,""),m.hasContent?m.data&&m.processData&&0===(m.contentType||"").indexOf("application/x-www-form-urlencoded")&&(m.data=m.data.replace(Oe,"+")):(i=m.url.slice(d.length),m.data&&(d+=(Ee.test(d)?"&":"?")+m.data,delete m.data),!1===m.cache&&(d=d.replace(Fe,"$1"),i=(Ee.test(d)?"&":"?")+"_="+De++ +i),m.url=d+i),m.ifModified&&(y.lastModified[d]&&N.setRequestHeader("If-Modified-Since",y.lastModified[d]),y.etag[d]&&N.setRequestHeader("If-None-Match",y.etag[d])),(m.data&&m.hasContent&&!1!==m.contentType||n.contentType)&&N.setRequestHeader("Content-Type",m.contentType),N.setRequestHeader("Accept",m.dataTypes[0]&&m.accepts[m.dataTypes[0]]?m.accepts[m.dataTypes[0]]+("*"===m.dataTypes[0]?"":", "+Xe+"; q=0.01"):m.accepts["*"]),m.headers)N.setRequestHeader(h,m.headers[h]);if(m.beforeSend&&(!1===m.beforeSend.call(s,N,m)||u))return N.abort();if(C="abort",b.add(m.complete),N.done(m.success),N.fail(m.error),a=inspectPrefiltersOrTransports(_e,m,n,N),!a)done(-1,"No Transport");else{if(N.readyState=1,f&&g.trigger("ajaxSend",[N,m]),u)return N;m.async&&0<m.timeout&&(p=e.setTimeout(function(){N.abort("timeout")},m.timeout));try{u=!1,a.send(T,done)}catch(t){if(u)throw t;done(-1,t)}}return N},getJSON:function getJSON(e,t,n){return y.get(e,t,n,"json")},getScript:function getScript(e,t){return y.get(e,void 0,t,"script")}}),y.each(["get","post"],function(e,t){y[t]=function(e,n,a,o){return y.isFunction(n)&&(o=o||a,a=n,n=void 0),y.ajax(y.extend({url:e,type:t,dataType:o,data:n,success:a},y.isPlainObject(e)&&e))}}),y._evalUrl=function(e){return y.ajax({url:e,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,throws:!0})},y.fn.extend({wrapAll:function wrapAll(e){var t;return this[0]&&(y.isFunction(e)&&(e=e.call(this[0])),t=y(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){for(var e=this;e.firstElementChild;)e=e.firstElementChild;return e}).append(this)),this},wrapInner:function wrapInner(e){return y.isFunction(e)?this.each(function(t){y(this).wrapInner(e.call(this,t))}):this.each(function(){var t=y(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function wrap(e){var t=y.isFunction(e);return this.each(function(n){y(this).wrapAll(t?e.call(this,n):e)})},unwrap:function unwrap(e){return this.parent(e).not("body").each(function(){y(this).replaceWith(this.childNodes)}),this}}),y.expr.pseudos.hidden=function(e){return!y.expr.pseudos.visible(e)},y.expr.pseudos.visible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},y.ajaxSettings.xhr=function(){try{return new e.XMLHttpRequest}catch(t){}};var Ue={0:200,1223:204},ze=y.ajaxSettings.xhr();m.cors=!!ze&&"withCredentials"in ze,m.ajax=ze=!!ze,y.ajaxTransport(function(t){var n,a;if(m.cors||ze&&!t.crossDomain)return{send:function send(o,s){var d,i=t.xhr();if(i.open(t.type,t.url,t.async,t.username,t.password),t.xhrFields)for(d in t.xhrFields)i[d]=t.xhrFields[d];for(d in t.mimeType&&i.overrideMimeType&&i.overrideMimeType(t.mimeType),t.crossDomain||o["X-Requested-With"]||(o["X-Requested-With"]="XMLHttpRequest"),o)i.setRequestHeader(d,o[d]);n=function callback(e){return function(){n&&(n=a=i.onload=i.onerror=i.onabort=i.onreadystatechange=null,"abort"===e?i.abort():"error"===e?"number"==typeof i.status?s(i.status,i.statusText):s(0,"error"):s(Ue[i.status]||i.status,i.statusText,"text"!==(i.responseType||"text")||"string"!=typeof i.responseText?{binary:i.response}:{text:i.responseText},i.getAllResponseHeaders()))}},i.onload=n(),a=i.onerror=n("error"),void 0===i.onabort?i.onreadystatechange=function(){4===i.readyState&&e.setTimeout(function(){n&&a()})}:i.onabort=a,n=n("abort");try{i.send(t.hasContent&&t.data||null)}catch(t){if(n)throw t}},abort:function abort(){n&&n()}}}),y.ajaxPrefilter(function(e){e.crossDomain&&(e.contents.script=!1)}),y.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function textScript(e){return y.globalEval(e),e}}}),y.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),y.ajaxTransport("script",function(e){if(e.crossDomain){var t,n;return{send:function send(a,i){t=y("<script>").prop({charset:e.scriptCharset,src:e.url}).on("load error",n=function callback(e){t.remove(),n=null,e&&i("error"===e.type?404:200,e.type)}),o.head.appendChild(t[0])},abort:function abort(){n&&n()}}}});var Ve=[],Ye=/(=)\?(?=&|$)|\?\?/;y.ajaxSetup({jsonp:"callback",jsonpCallback:function jsonpCallback(){var e=Ve.pop()||y.expando+"_"+De++;return this[e]=!0,e}}),y.ajaxPrefilter("json jsonp",function(t,n,a){var o,i,s,d=!1!==t.jsonp&&(Ye.test(t.url)?"url":"string"==typeof t.data&&0===(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&Ye.test(t.data)&&"data");if(d||"jsonp"===t.dataTypes[0])return o=t.jsonpCallback=y.isFunction(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,d?t[d]=t[d].replace(Ye,"$1"+o):!1!==t.jsonp&&(t.url+=(Ee.test(t.url)?"&":"?")+t.jsonp+"="+o),t.converters["script json"]=function(){return s||y.error(o+" was not called"),s[0]},t.dataTypes[0]="json",i=e[o],e[o]=function(){s=arguments},a.always(function(){void 0===i?y(e).removeProp(o):e[o]=i,t[o]&&(t.jsonpCallback=n.jsonpCallback,Ve.push(o)),s&&y.isFunction(i)&&i(s[0]),s=i=void 0}),"script"}),m.createHTMLDocument=function(){var e=o.implementation.createHTMLDocument("").body;return e.innerHTML="<form></form><form></form>",2===e.childNodes.length}(),y.parseHTML=function(e,t,n){if("string"!=typeof e)return[];"boolean"==typeof t&&(n=t,t=!1);var a,i,s;return(t||(m.createHTMLDocument?(t=o.implementation.createHTMLDocument(""),a=t.createElement("base"),a.href=o.location.href,t.head.appendChild(a)):t=o),i=S.exec(e),s=!n&&[],i)?[t.createElement(i[1])]:(i=buildFragment([e],t,s),s&&s.length&&y(s).remove(),y.merge([],i.childNodes))},y.fn.load=function(e,t,n){var a,o,i,s=this,d=e.indexOf(" ");return-1<d&&(a=stripAndCollapse(e.slice(d)),e=e.slice(0,d)),y.isFunction(t)?(n=t,t=void 0):t&&"object"===("undefined"==typeof t?"undefined":_typeof(t))&&(o="POST"),0<s.length&&y.ajax({url:e,type:o||"GET",dataType:"html",data:t}).done(function(e){i=arguments,s.html(a?y("<div>").append(y.parseHTML(e)).find(a):e)}).always(n&&function(e,t){s.each(function(){n.apply(this,i||[e.responseText,t,e])})}),this},y.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){y.fn[t]=function(e){return this.on(t,e)}}),y.expr.pseudos.animated=function(e){return y.grep(y.timers,function(t){return e===t.elem}).length},y.offset={setOffset:function setOffset(e,t,n){var a,o,i,s,d,r,l,p=y.css(e,"position"),c=y(e),u={};"static"===p&&(e.style.position="relative"),d=c.offset(),i=y.css(e,"top"),r=y.css(e,"left"),l=("absolute"===p||"fixed"===p)&&-1<(i+r).indexOf("auto"),l?(a=c.position(),s=a.top,o=a.left):(s=parseFloat(i)||0,o=parseFloat(r)||0),y.isFunction(t)&&(t=t.call(e,n,y.extend({},d))),null!=t.top&&(u.top=t.top-d.top+s),null!=t.left&&(u.left=t.left-d.left+o),"using"in t?t.using.call(e,u):c.css(u)}},y.fn.extend({offset:function offset(e){if(arguments.length)return void 0===e?this:this.each(function(t){y.offset.setOffset(this,e,t)});var t,n,a,o,i=this[0];if(i)return i.getClientRects().length?(a=i.getBoundingClientRect(),t=i.ownerDocument,n=t.documentElement,o=t.defaultView,{top:a.top+o.pageYOffset-n.clientTop,left:a.left+o.pageXOffset-n.clientLeft}):{top:0,left:0}},position:function position(){if(this[0]){var e,t,n=this[0],a={top:0,left:0};return"fixed"===y.css(n,"position")?t=n.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),!nodeName(e[0],"html")&&(a=e.offset()),a={top:a.top+y.css(e[0],"borderTopWidth",!0),left:a.left+y.css(e[0],"borderLeftWidth",!0)}),{top:t.top-a.top-y.css(n,"marginTop",!0),left:t.left-a.left-y.css(n,"marginLeft",!0)}}},offsetParent:function offsetParent(){return this.map(function(){for(var e=this.offsetParent;e&&"static"===y.css(e,"position");)e=e.offsetParent;return e||Z})}}),y.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,t){var n="pageYOffset"===t;y.fn[e]=function(a){return F(this,function(e,a,o){var i;return y.isWindow(e)?i=e:9===e.nodeType&&(i=e.defaultView),void 0===o?i?i[t]:e[a]:void(i?i.scrollTo(n?i.pageXOffset:o,n?o:i.pageYOffset):e[a]=o)},e,a,arguments.length)}}),y.each(["top","left"],function(e,t){y.cssHooks[t]=addGetHookIf(m.pixelPosition,function(e,n){if(n)return n=curCSS(e,t),le.test(n)?y(e).position()[t]+"px":n})}),y.each({Height:"height",Width:"width"},function(e,t){y.each({padding:"inner"+e,content:t,"":"outer"+e},function(a,o){y.fn[o]=function(i,s){var d=arguments.length&&(a||"boolean"!=typeof i),r=a||(!0===i||!0===s?"margin":"border");return F(this,function(t,a,i){var s;return y.isWindow(t)?0===o.indexOf("outer")?t["inner"+e]:t.document.documentElement["client"+e]:9===t.nodeType?(s=t.documentElement,n(t.body["scroll"+e],s["scroll"+e],t.body["offset"+e],s["offset"+e],s["client"+e])):void 0===i?y.css(t,a,r):y.style(t,a,i,r)},t,d?i:void 0,d)}})}),y.fn.extend({bind:function bind(e,t,n){return this.on(e,null,t,n)},unbind:function unbind(e,t){return this.off(e,null,t)},delegate:function delegate(e,t,n,a){return this.on(t,e,n,a)},undelegate:function undelegate(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}}),y.holdReady=function(e){e?y.readyWait++:y.ready(!0)},y.isArray=Array.isArray,y.parseJSON=JSON.parse,y.nodeName=nodeName,"function"=="function"&&__webpack_require__(9)&&!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){return y}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));var Ge=e.jQuery,Qe=e.$;return y.noConflict=function(t){return e.$===y&&(e.$=Qe),t&&e.jQuery===y&&(e.jQuery=Ge),y},t||(e.jQuery=e.$=y),y});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 9 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:!0}),exports.removeSpinnerLord=removeSpinnerLord;function removeSpinnerLord(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:100,c=2<arguments.length&&arguments[2]!==void 0?arguments[2]:100;setTimeout(function(){$("#spinner-lord").removeClass("active").addClass("inactive"),setTimeout(function(){a(),$("#spinner-lord").remove()},c)},b)}

/***/ }),
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _globalIncludes=__webpack_require__(1),_globalIncludes2=_interopRequireDefault(_globalIncludes),_fetch_json=__webpack_require__(13),_fetch_json2=_interopRequireDefault(_fetch_json),_yavljs=__webpack_require__(14),_yavljs2=_interopRequireDefault(_yavljs);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}$(document).ready(function(){(0,_globalIncludes2.default)(function(){},100,500),(0,_fetch_json2.default)("/assets/json/auth/login/validation.json",function(a){return a}).then(function(a){return(0,_fetch_json2.default)("/assets/json/auth/login/locale.json",function(b){var c=new _yavljs2.default(a.form,a.fields,b),d=function validateFunc(a){c.validateForm(a)};$(a.form).on("submit",d),$(a.form+" *").on("change",d)})}).catch(function(a){console.log("There has been an error while setting up front-end form validation, falling back to back-end validation."),console.log(a)})});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof='function'==typeof Symbol&&'symbol'==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&'function'==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?'symbol':typeof a};(function UniversalModuleDefinition(a,b){'object'===( false?'undefined':_typeof(exports))&&'object'===( false?'undefined':_typeof(module))?module.exports=b(): true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (b),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):'object'===('undefined'==typeof exports?'undefined':_typeof(exports))?exports.fetchJSON=b():a.fetchJSON=b()})(void 0,function(){return function(a,b){return new Promise(function(c,d){if(('undefined'==typeof b?'undefined':_typeof(b))==_typeof(function(a){return a})&&('undefined'==typeof a?'undefined':_typeof(a))==_typeof('42xyz')){var e=fetch(a);return e.then(function(a){var e=a.headers.get('content-type');return e&&e.includes('application/json')?a.json().then(function(a){b(a),c(a)}):(d('Something went wrong during data inspection (data is not JSON or couldn\'t reach file)'),null)}),e}return('undefined'==typeof a?'undefined':_typeof(a))!=_typeof('42xyz')&&d('The 1st argument must be a string'),('undefined'==typeof b?'undefined':_typeof(b))!=_typeof(function(a){return a})&&d('The 2nd argument must be a function'),null})}});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

(function UniversalModuleDefinition(root, factory){
	if(true)
        module.exports = factory();
    else{
		const module_name = "yavl";
		if(typeof define === 'function' && define.amd)
			define(module_name, [], factory);
		else
			if(typeof exports === 'object')
				exports[module_name] = factory();
			else
				root[module_name] = factory();
	}
})(this, function(){
    /**Yet Another Validation Library
    *@class yavl
    */
    const yavl = function(formSelector, fields={}, localeObj={}, validate, invalidate){
        Object.defineProperty(this, "locale", {
            value: Object.assign({
                "NaN": "Invalid format (NaN)",
                "required": "This field is required",
                "min": "Must be &ge; %value%",
                "max": "Must be &le; %value%",
                "nomatch_regex": "Invalid format",
                "minLength": "Expects a minimum of %value% characters",
                "maxLength": "Expects a maximum of %value% characters",
                "notEqual": "Value mismatch"
            }, localeObj)
        });

        Object.defineProperty(this, "form", {
            value: document.querySelector(formSelector)
        });

        Object.defineProperty(this, "fields", {
            value: fields
        });

        if(typeof validate == "function")
            this.setValidationFunction(validate);
        else
            this.setValidationFunction(es=>{
                document.querySelector(es).innerHTML = "";
            });


        if(typeof invalidate == "function")
            this.setInvalidationFunction(invalidate);
        else
            this.setInvalidationFunction((event, es, msg)=>{
                event.preventDefault();
                document.querySelector(es).innerHTML = msg;
                return true;
            });
    }
    /**@@ Core Functioning @@**/

    //validate: (error_selector) -> void
    //invalidate: (event, error_selector, err_msg) -> true
    //
    //rule:: (errorMsgDB, validate, invalidate, event, error_sel, value, expected?, fieldsObj?) -> true/false

    yavl.prototype.validateForm = function(event){
        Object.values(this.fields).forEach(field=>{
            const isFilled = document.querySelector(field.selector).value!=="";
            if(yavl.parseBool(field.required) || isFilled){
                let val = document.querySelector(field.selector).value;

                if(yavl.parseBool(field.required)){
                    if(!isFilled)
                        return this.invalidate(event, field.error_selector, this.locale["required"]);
                    else
                        this.validate(field.error_selector);
                }

                if(field.rules){
                    switch(field.type){
                        case "int":
                            val = parseInt(val);
                            if(yavl.isNaN(val))
                                return this.invalidate(event, field.error_selector, this.locale["NaN"]);
                            break;
                        case "float":
                            val = parseFloat(val);
                            if(yavl.isNaN(val))
                                return this.invalidate(event, field.error_selector, this.locale["NaN"]);
                            break;
                        case "bool":
                            val = yavl.parseBool(val);
                            break;
                        default:
                            break;
                    }

                    const rules = field.rules;

                    const coreRules = Object.keys(this.__proto__)
                                        .filter( key=>RegExp(`${yavl.coreBaseName}\\w+`).test(key) )
                                        .map( key=>key.replace(`${yavl.coreBaseName}`, "") );

                    const pluginRules = Object.keys(this.__proto__)
                                          .filter( key=>RegExp(`${yavl.pluginBaseName}\\w+`).test(key) )
                                          .map( key=>key.replace(`${yavl.pluginBaseName}`, "") );

                    /*for(let rule in rules)*/
                    Object.keys(rules).some((rule)=>{
                        if(coreRules.includes(rule))
                            return this[`${yavl.coreBaseName}${rule}`](
                                this.locale,
                                this.validate.bind(this),
                                this.invalidate.bind(this),
                                event,
                                field.error_selector,
                                val,
                                rules[rule],
                                this.fields
                            );
                        else if(pluginRules.includes(rule))
                            return this[`${yavl.pluginBaseName}${rule}`](
                                this.locale,
                                this.validate.bind(this),
                                this.invalidate.bind(this),
                                event,
                                field.error_selector,
                                val,
                                rules[rule],
                                this.fields
                            );
                    });
                }
            }
        });
    };

    /**@@ Helpers @@**/

    //validate: (error_selector) -> void
    //invalidate: (event, error_selector, err_msg) -> true

    Object.defineProperty(yavl, "coreBaseName", {
        value: "yavl_validate_",
        enumerable: true
    });

    Object.defineProperty(yavl, "pluginBaseName", {
        value: "yavlPlugin_",
        enumerable: true
    });

    Object.defineProperty(yavl, "isNaN", {
        value: arg=>(arg!==arg),
        enumerable: true
    });

    Object.defineProperty(yavl, "parseBool", {
        value: (...param)=>{
            if(param.length < 1)
                throw new TypeError("Not enough parameters: got 0 expected 1");
            else{
                if(!param[0]) return false;

                const toParse = ""+param[0];

                const boolPattern = /((true|false|0|1))/i;

                const matches = boolPattern.exec(toParse)

                const result = (matches ? matches[0] : "");

                switch(result){
                    case "1":
                    case "true":
                        return true;

                    case "0":
                    case "false":
                        return false;

                    case "":
                    default:
                        return null;
                };
            }
        },
        enumerable: true
    });

    //Setter for the validation function
    yavl.prototype.setValidationFunction = function(functor){
        if(typeof functor == "function"){
            if(functor.length === 1)
                Object.defineProperty(this, "validate", {
                    value: functor
                });
            else
                throw new Error("The validation MUST accept one argument : the selector to the error message 'holder'.");
        }else
            throw new TypeError("The validation function MUST be a Function.");
    };

    //Setter for the invalidation function
    yavl.prototype.setInvalidationFunction = function(functor){
        if(typeof functor == "function"){
            if(functor.length === 3)
                Object.defineProperty(this, "invalidate", {
                    value: functor
                });
            else
                throw new Error("The validation MUST accept three arguments : the event, the selecto to the error message 'holder' and the error message itself.");
        }else
            throw new TypeError("The validation function MUST be a Function.");
    };


    /**@@ Core Rules @@**/

    //rule:: (errorMsgDB, validate, invalidate, event, error_sel, value, expected?, fieldsObj?) -> true/false
    //validate:: (error_selector) -> void
    //invalidate:: (event, error_selector, error_message) -> true

    /**Rule to satisfy a minimum
    *
    *@param {Object} errorMsgDB - "Database" of the error messages passed via dependecy injection
    *@param {Function} validate - Validation function passed via dependency injection
    *@param {Function} invalidate - Invalidation function passed via dependency injection
    *
    *@param {Event} event - the form's submission event
    *@param {String} es - the CSS selector to the DOMNode that will contain the related error message
    *@param {number} val - The actual value extracted from the form
    *@param {number} ex - The "expected" value (here the reference for the minimum)
    *
    */
    yavl.prototype[`${yavl.coreBaseName}min`] = function(errorMsgDB, validate, invalidate, event, es, val, ex){
        if(val >= ex)
            validate(es);
        else
            return invalidate(event, es, errorMsgDB["min"].replace("%value%", `${ex}`));
    }

    /**Rule to satisfy a maximum
    *
    *@param {Object} errorMsgDB - "Database" of the error messages passed via dependecy injection
    *@param {Function} validate - Validation function passed via dependency injection
    *@param {Function} invalidate - Invalidation function passed via dependency injection
    *
    *@param {Event} event - the form's submission event
    *@param {String} es - the CSS selector to the DOMNode that will contain the related error message
    *@param {number} val - The actual value extracted from the form
    *@param {number} ex - The "expected" value (here the reference for the maximum)
    *
    */
    yavl.prototype[`${yavl.coreBaseName}max`] = function(errorMsgDB, validate, invalidate, event, es, val, ex){
        if(val <= ex)
            validate(es);
        else
            return invalidate(event, es, errorMsgDB["max"].replace("%value%", `${ex}`));
    }

    /**Rule to match a specified regex
    *
    *@param {Object} errorMsgDB - "Database" of the error messages passed via dependecy injection
    *@param {Function} validate - Validation function passed via dependency injection
    *@param {Function} invalidate - Invalidation function passed via dependency injection
    *
    *@param {Event} event - the form's submission event
    *@param {String} es - the CSS selector to the DOMNode that will contain the related error message
    *@param {String} val - The actual value extracted from the form
    *@param {String} ex - The regex (as a String ready to be passed to RegExp) the value must match
    *
    */
    yavl.prototype[`${yavl.coreBaseName}regex`] = function(errorMsgDB, validate, invalidate, event, es, val, ex){
        if(RegExp(ex).exec(`${val}`))
            validate(es);
        else
            return invalidate(event, es, errorMsgDB["nomatch_regex"].replace("%value%", `${ex}`));
    }

    /**Rule to satisfy a minimum amount of character
    *
    *@param {Object} errorMsgDB - "Database" of the error messages passed via dependecy injection
    *@param {Function} validate - Validation function passed via dependency injection
    *@param {Function} invalidate - Invalidation function passed via dependency injection
    *
    *@param {Event} event - the form's submission event
    *@param {String} es - the CSS selector to the DOMNode that will contain the related error message
    *@param {?} val - The actual value extracted from the form
    *@param {number} ex - The minimum amount of character
    *
    */
    yavl.prototype[`${yavl.coreBaseName}minLength`] = function(errorMsgDB, validate, invalidate, event, es, val, ex){
        if(`${val}`.length >= parseInt(ex))
            validate(es);
        else
            return invalidate(event, es, errorMsgDB["minLength"].replace("%value%", `${ex}`));
    }

    /**Rule to satisfy a minimum amount of character
    *
    *@param {Object} errorMsgDB - "Database" of the error messages passed via dependecy injection
    *@param {Function} validate - Validation function passed via dependency injection
    *@param {Function} invalidate - Invalidation function passed via dependency injection
    *
    *@param {Event} event - the form's submission event
    *@param {String} es - the CSS selector to the DOMNode that will contain the related error message
    *@param {?} val - The actual value extracted from the form
    *@param {number} ex - The minimum amount of character
    *
    */
    yavl.prototype[`${yavl.coreBaseName}maxLength`] = function(errorMsgDB, validate, invalidate, event, es, val, ex){
        if(`${val}`.length <= parseInt(ex))
            validate(es);
        else
            return invalidate(event, es, errorMsgDB["maxLength"].replace("%value%", `${ex}`));
    }

    /**Rule to match the value of another field
    *
    *@param {Object} errorMsgDB - "Database" of the error messages passed via dependecy injection
    *@param {Function} validate - Validation function passed via dependency injection
    *@param {Function} invalidate - Invalidation function passed via dependency injection
    *
    *@param {Event} event - the form's submission event
    *@param {String} es - the CSS selector to the DOMNode that will contain the related error message
    *@param {String} val - The actual value extracted from the form (directly as the string)
    *@param {String} ex - The "name" of the field to match (name in config, not the HTML attribute)
    *@param {Objet} fields - An object (similar to config) containing the other fields (config like)
    *
    */
    yavl.prototype[`${yavl.coreBaseName}match`] = function(errorMsgDB, validate, invalidate, event, es, val, ex, fields){
        const otherNodeValue = document.querySelector(fields[ex].selector).value;

        if(otherNodeValue !== `${val}`)
            return invalidate(event, es, errorMsgDB["notEqual"].replace("%value%", `${ex}`));
        else
            validate(es);
    }

    /**@@ Custom Rules @@**/

    //Register a rule
    yavl.registerRule = function(name, functor){
        if(typeof name != "string")
            throw new TypeError("The name of the plugin MUST be a string.");

        if(typeof functor != "function")
            throw new TypeError("The callback MUST be a function.");

        //plugin:: (errMsgDB, validate, invalidate, event, error_sel, value, expected?, fieldsObj?) -> true/false
        if( !([6, 7, 8].includes(functor.length)) )
            throw new Error("The plugin's callback MUST follows this pattern : '(errMsgDB, validate, invalidate, event, error_sel, value, expected, otherFieldArr?) -> true/false'.");

        yavl.prototype[`${yavl.pluginBaseName}${name}`] = functor;
    };

    //Remove a rule
    yavl.removeRule = function(name){
        if(typeof name != "string")
            throw new TypeError("The name of a plugin IS a string.");

        if(`yavlPlugin_${name}` in yavl.prototype)
            delete yavl.prototype[`${yavl.pluginBaseName}${name}`];
    }
    
    
    return yavl;
});

/***/ })
/******/ ]);