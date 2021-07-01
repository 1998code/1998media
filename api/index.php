<?php
session_start();

// Set Language variable
if(isset($_GET['lang']) && !empty($_GET['lang'])){
    $_SESSION['lang'] = $_GET['lang'];
   
    if(isset($_SESSION['lang']) && $_SESSION['lang'] != $_GET['lang']){
     echo "<script type='text/javascript'> location.reload(); </script>";
    }
   }
   
   // Include Language file
   if(isset($_SESSION['lang'])){
    include "lang_".$_SESSION['lang'].".php";
   }else{
    include "lang_en.php";
   }
?>

<!DOCTYPE html>
<html lang="en" style="overflow-x: hidden;font-family: futura!important;">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no, viewport-fit=cover">
    <title>Welcome | 1998 MEDIA</title>
    <meta name="twitter:description" content="The Official Website of 1998 MEDIA.">
    <meta name="twitter:card" content="summary_large_image">
    <meta property="og:image" content="https://1998.media/assets/img/54872601.jpeg">
    <meta name="description" content="The Official Website of 1998 MEDIA.">
    <meta property="og:type" content="website">
    <meta name="twitter:image" content="https://1998.media/assets/img/54872601.jpeg">
    <meta name="twitter:title" content="1998 MEDIA (Official Website)">
    <meta name="theme-color" content="#b3c9ff">
    <link rel="icon" type="image/jpeg" sizes="460x460" href="../assets/img/54872601.jpeg?h=cdcfc44abed6fdb5a8d54fad3122a87b">
    <link rel="icon" type="image/jpeg" sizes="460x460" href="../assets/img/54872601.jpeg?h=cdcfc44abed6fdb5a8d54fad3122a87b">
    <link rel="icon" type="image/jpeg" sizes="460x460" href="../assets/img/54872601.jpeg?h=cdcfc44abed6fdb5a8d54fad3122a87b">
    <link rel="icon" type="image/jpeg" sizes="460x460" href="../assets/img/54872601.jpeg?h=cdcfc44abed6fdb5a8d54fad3122a87b">
    <link rel="icon" type="image/jpeg" sizes="460x460" href="../assets/img/54872601.jpeg?h=cdcfc44abed6fdb5a8d54fad3122a87b">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css">
    <link rel="manifest" href="../manifest.json?h=e2fa655b292aa0a9821c43f4313512be">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=ABeeZee">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Condensed">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.0/css/all.css">
    <link rel="stylesheet" href="../assets/css/styles.min.css?h=c9b0d95e52b9b3ae307bf02f9bac669d">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css">
    <script src="https://static.cdn-apple.com/businesschat/start-chat-button/2/index.js"></script>
    <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
    <script type="text/javascript">
        ;window.NREUM||(NREUM={});NREUM.init={distributed_tracing:{enabled:true},privacy:{cookies_enabled:true}};
        window.NREUM||(NREUM={}),__nr_require=function(t,e,n){function r(n){if(!e[n]){var o=e[n]={exports:{}};t[n][0].call(o.exports,function(e){var o=t[n][1][e];return r(o||e)},o,o.exports)}return e[n].exports}if("function"==typeof __nr_require)return __nr_require;for(var o=0;o<n.length;o++)r(n[o]);return r}({1:[function(t,e,n){function r(t){try{c.console&&console.log(t)}catch(e){}}var o,i=t("ee"),a=t(29),c={};try{o=localStorage.getItem("__nr_flags").split(","),console&&"function"==typeof console.log&&(c.console=!0,o.indexOf("dev")!==-1&&(c.dev=!0),o.indexOf("nr_dev")!==-1&&(c.nrDev=!0))}catch(s){}c.nrDev&&i.on("internal-error",function(t){r(t.stack)}),c.dev&&i.on("fn-err",function(t,e,n){r(n.stack)}),c.dev&&(r("NR AGENT IN DEVELOPMENT MODE"),r("flags: "+a(c,function(t,e){return t}).join(", ")))},{}],2:[function(t,e,n){function r(t,e,n,r,c){try{p?p-=1:o(c||new UncaughtException(t,e,n),!0)}catch(f){try{i("ierr",[f,s.now(),!0])}catch(d){}}return"function"==typeof u&&u.apply(this,a(arguments))}function UncaughtException(t,e,n){this.message=t||"Uncaught error with no additional information",this.sourceURL=e,this.line=n}function o(t,e){var n=e?null:s.now();i("err",[t,n])}var i=t("handle"),a=t(30),c=t("ee"),s=t("loader"),f=t("gos"),u=window.onerror,d=!1,l="nr@seenError";if(!s.disabled){var p=0;s.features.err=!0,t(1),window.onerror=r;try{throw new Error}catch(h){"stack"in h&&(t(13),t(12),"addEventListener"in window&&t(6),s.xhrWrappable&&t(14),d=!0)}c.on("fn-start",function(t,e,n){d&&(p+=1)}),c.on("fn-err",function(t,e,n){d&&!n[l]&&(f(n,l,function(){return!0}),this.thrown=!0,o(n))}),c.on("fn-end",function(){d&&!this.thrown&&p>0&&(p-=1)}),c.on("internal-error",function(t){i("ierr",[t,s.now(),!0])})}},{}],3:[function(t,e,n){var r=t("loader");r.disabled||(r.features.ins=!0)},{}],4:[function(t,e,n){function r(){L++,T=g.hash,this[u]=y.now()}function o(){L--,g.hash!==T&&i(0,!0);var t=y.now();this[h]=~~this[h]+t-this[u],this[d]=t}function i(t,e){E.emit("newURL",[""+g,e])}function a(t,e){t.on(e,function(){this[e]=y.now()})}var c="-start",s="-end",f="-body",u="fn"+c,d="fn"+s,l="cb"+c,p="cb"+s,h="jsTime",m="fetch",v="addEventListener",w=window,g=w.location,y=t("loader");if(w[v]&&y.xhrWrappable&&!y.disabled){var x=t(10),b=t(11),E=t(8),R=t(6),O=t(13),N=t(7),M=t(14),P=t(9),C=t("ee"),S=C.get("tracer");t(16),y.features.spa=!0;var T,L=0;C.on(u,r),b.on(l,r),P.on(l,r),C.on(d,o),b.on(p,o),P.on(p,o),C.buffer([u,d,"xhr-done","xhr-resolved"]),R.buffer([u]),O.buffer(["setTimeout"+s,"clearTimeout"+c,u]),M.buffer([u,"new-xhr","send-xhr"+c]),N.buffer([m+c,m+"-done",m+f+c,m+f+s]),E.buffer(["newURL"]),x.buffer([u]),b.buffer(["propagate",l,p,"executor-err","resolve"+c]),S.buffer([u,"no-"+u]),P.buffer(["new-jsonp","cb-start","jsonp-error","jsonp-end"]),a(M,"send-xhr"+c),a(C,"xhr-resolved"),a(C,"xhr-done"),a(N,m+c),a(N,m+"-done"),a(P,"new-jsonp"),a(P,"jsonp-end"),a(P,"cb-start"),E.on("pushState-end",i),E.on("replaceState-end",i),w[v]("hashchange",i,!0),w[v]("load",i,!0),w[v]("popstate",function(){i(0,L>1)},!0)}},{}],5:[function(t,e,n){function r(t){}if(window.performance&&window.performance.timing&&window.performance.getEntriesByType){var o=t("ee"),i=t("handle"),a=t(13),c=t(12),s="learResourceTimings",f="addEventListener",u="resourcetimingbufferfull",d="bstResource",l="resource",p="-start",h="-end",m="fn"+p,v="fn"+h,w="bstTimer",g="pushState",y=t("loader");if(!y.disabled){y.features.stn=!0,t(8),"addEventListener"in window&&t(6);var x=NREUM.o.EV;o.on(m,function(t,e){var n=t[0];n instanceof x&&(this.bstStart=y.now())}),o.on(v,function(t,e){var n=t[0];n instanceof x&&i("bst",[n,e,this.bstStart,y.now()])}),a.on(m,function(t,e,n){this.bstStart=y.now(),this.bstType=n}),a.on(v,function(t,e){i(w,[e,this.bstStart,y.now(),this.bstType])}),c.on(m,function(){this.bstStart=y.now()}),c.on(v,function(t,e){i(w,[e,this.bstStart,y.now(),"requestAnimationFrame"])}),o.on(g+p,function(t){this.time=y.now(),this.startPath=location.pathname+location.hash}),o.on(g+h,function(t){i("bstHist",[location.pathname+location.hash,this.startPath,this.time])}),f in window.performance&&(window.performance["c"+s]?window.performance[f](u,function(t){i(d,[window.performance.getEntriesByType(l)]),window.performance["c"+s]()},!1):window.performance[f]("webkit"+u,function(t){i(d,[window.performance.getEntriesByType(l)]),window.performance["webkitC"+s]()},!1)),document[f]("scroll",r,{passive:!0}),document[f]("keypress",r,!1),document[f]("click",r,!1)}}},{}],6:[function(t,e,n){function r(t){for(var e=t;e&&!e.hasOwnProperty(u);)e=Object.getPrototypeOf(e);e&&o(e)}function o(t){c.inPlace(t,[u,d],"-",i)}function i(t,e){return t[1]}var a=t("ee").get("events"),c=t("wrap-function")(a,!0),s=t("gos"),f=XMLHttpRequest,u="addEventListener",d="removeEventListener";e.exports=a,"getPrototypeOf"in Object?(r(document),r(window),r(f.prototype)):f.prototype.hasOwnProperty(u)&&(o(window),o(f.prototype)),a.on(u+"-start",function(t,e){var n=t[1],r=s(n,"nr@wrapped",function(){function t(){if("function"==typeof n.handleEvent)return n.handleEvent.apply(n,arguments)}var e={object:t,"function":n}[typeof n];return e?c(e,"fn-",null,e.name||"anonymous"):n});this.wrapped=t[1]=r}),a.on(d+"-start",function(t){t[1]=this.wrapped||t[1]})},{}],7:[function(t,e,n){function r(t,e,n){var r=t[e];"function"==typeof r&&(t[e]=function(){var t=i(arguments),e={};o.emit(n+"before-start",[t],e);var a;e[m]&&e[m].dt&&(a=e[m].dt);var c=r.apply(this,t);return o.emit(n+"start",[t,a],c),c.then(function(t){return o.emit(n+"end",[null,t],c),t},function(t){throw o.emit(n+"end",[t],c),t})})}var o=t("ee").get("fetch"),i=t(30),a=t(29);e.exports=o;var c=window,s="fetch-",f=s+"body-",u=["arrayBuffer","blob","json","text","formData"],d=c.Request,l=c.Response,p=c.fetch,h="prototype",m="nr@context";d&&l&&p&&(a(u,function(t,e){r(d[h],e,f),r(l[h],e,f)}),r(c,"fetch",s),o.on(s+"end",function(t,e){var n=this;if(e){var r=e.headers.get("content-length");null!==r&&(n.rxSize=r),o.emit(s+"done",[null,e],n)}else o.emit(s+"done",[t],n)}))},{}],8:[function(t,e,n){var r=t("ee").get("history"),o=t("wrap-function")(r);e.exports=r;var i=window.history&&window.history.constructor&&window.history.constructor.prototype,a=window.history;i&&i.pushState&&i.replaceState&&(a=i),o.inPlace(a,["pushState","replaceState"],"-")},{}],9:[function(t,e,n){function r(t){function e(){s.emit("jsonp-end",[],l),t.removeEventListener("load",e,!1),t.removeEventListener("error",n,!1)}function n(){s.emit("jsonp-error",[],l),s.emit("jsonp-end",[],l),t.removeEventListener("load",e,!1),t.removeEventListener("error",n,!1)}var r=t&&"string"==typeof t.nodeName&&"script"===t.nodeName.toLowerCase();if(r){var o="function"==typeof t.addEventListener;if(o){var a=i(t.src);if(a){var u=c(a),d="function"==typeof u.parent[u.key];if(d){var l={};f.inPlace(u.parent,[u.key],"cb-",l),t.addEventListener("load",e,!1),t.addEventListener("error",n,!1),s.emit("new-jsonp",[t.src],l)}}}}}function o(){return"addEventListener"in window}function i(t){var e=t.match(u);return e?e[1]:null}function a(t,e){var n=t.match(l),r=n[1],o=n[3];return o?a(o,e[r]):e[r]}function c(t){var e=t.match(d);return e&&e.length>=3?{key:e[2],parent:a(e[1],window)}:{key:t,parent:window}}var s=t("ee").get("jsonp"),f=t("wrap-function")(s);if(e.exports=s,o()){var u=/[?&](?:callback|cb)=([^&#]+)/,d=/(.*)\.([^.]+)/,l=/^(\w+)(\.|$)(.*)$/,p=["appendChild","insertBefore","replaceChild"];Node&&Node.prototype&&Node.prototype.appendChild?f.inPlace(Node.prototype,p,"dom-"):(f.inPlace(HTMLElement.prototype,p,"dom-"),f.inPlace(HTMLHeadElement.prototype,p,"dom-"),f.inPlace(HTMLBodyElement.prototype,p,"dom-")),s.on("dom-start",function(t){r(t[0])})}},{}],10:[function(t,e,n){var r=t("ee").get("mutation"),o=t("wrap-function")(r),i=NREUM.o.MO;e.exports=r,i&&(window.MutationObserver=function(t){return this instanceof i?new i(o(t,"fn-")):i.apply(this,arguments)},MutationObserver.prototype=i.prototype)},{}],11:[function(t,e,n){function r(t){var e=i.context(),n=c(t,"executor-",e,null,!1),r=new f(n);return i.context(r).getCtx=function(){return e},r}var o=t("wrap-function"),i=t("ee").get("promise"),a=t("ee").getOrSetContext,c=o(i),s=t(29),f=NREUM.o.PR;e.exports=i,f&&(window.Promise=r,["all","race"].forEach(function(t){var e=f[t];f[t]=function(n){function r(t){return function(){i.emit("propagate",[null,!o],a,!1,!1),o=o||!t}}var o=!1;s(n,function(e,n){Promise.resolve(n).then(r("all"===t),r(!1))});var a=e.apply(f,arguments),c=f.resolve(a);return c}}),["resolve","reject"].forEach(function(t){var e=f[t];f[t]=function(t){var n=e.apply(f,arguments);return t!==n&&i.emit("propagate",[t,!0],n,!1,!1),n}}),f.prototype["catch"]=function(t){return this.then(null,t)},f.prototype=Object.create(f.prototype,{constructor:{value:r}}),s(Object.getOwnPropertyNames(f),function(t,e){try{r[e]=f[e]}catch(n){}}),o.wrapInPlace(f.prototype,"then",function(t){return function(){var e=this,n=o.argsToArray.apply(this,arguments),r=a(e);r.promise=e,n[0]=c(n[0],"cb-",r,null,!1),n[1]=c(n[1],"cb-",r,null,!1);var s=t.apply(this,n);return r.nextPromise=s,i.emit("propagate",[e,!0],s,!1,!1),s}}),i.on("executor-start",function(t){t[0]=c(t[0],"resolve-",this,null,!1),t[1]=c(t[1],"resolve-",this,null,!1)}),i.on("executor-err",function(t,e,n){t[1](n)}),i.on("cb-end",function(t,e,n){i.emit("propagate",[n,!0],this.nextPromise,!1,!1)}),i.on("propagate",function(t,e,n){this.getCtx&&!e||(this.getCtx=function(){if(t instanceof Promise)var e=i.context(t);return e&&e.getCtx?e.getCtx():this})}),r.toString=function(){return""+f})},{}],12:[function(t,e,n){var r=t("ee").get("raf"),o=t("wrap-function")(r),i="equestAnimationFrame";e.exports=r,o.inPlace(window,["r"+i,"mozR"+i,"webkitR"+i,"msR"+i],"raf-"),r.on("raf-start",function(t){t[0]=o(t[0],"fn-")})},{}],13:[function(t,e,n){function r(t,e,n){t[0]=a(t[0],"fn-",null,n)}function o(t,e,n){this.method=n,this.timerDuration=isNaN(t[1])?0:+t[1],t[0]=a(t[0],"fn-",this,n)}var i=t("ee").get("timer"),a=t("wrap-function")(i),c="setTimeout",s="setInterval",f="clearTimeout",u="-start",d="-";e.exports=i,a.inPlace(window,[c,"setImmediate"],c+d),a.inPlace(window,[s],s+d),a.inPlace(window,[f,"clearImmediate"],f+d),i.on(s+u,r),i.on(c+u,o)},{}],14:[function(t,e,n){function r(t,e){d.inPlace(e,["onreadystatechange"],"fn-",c)}function o(){var t=this,e=u.context(t);t.readyState>3&&!e.resolved&&(e.resolved=!0,u.emit("xhr-resolved",[],t)),d.inPlace(t,g,"fn-",c)}function i(t){y.push(t),h&&(b?b.then(a):v?v(a):(E=-E,R.data=E))}function a(){for(var t=0;t<y.length;t++)r([],y[t]);y.length&&(y=[])}function c(t,e){return e}function s(t,e){for(var n in t)e[n]=t[n];return e}t(6);var f=t("ee"),u=f.get("xhr"),d=t("wrap-function")(u),l=NREUM.o,p=l.XHR,h=l.MO,m=l.PR,v=l.SI,w="readystatechange",g=["onload","onerror","onabort","onloadstart","onloadend","onprogress","ontimeout"],y=[];e.exports=u;var x=window.XMLHttpRequest=function(t){var e=new p(t);try{u.emit("new-xhr",[e],e),e.addEventListener(w,o,!1)}catch(n){try{u.emit("internal-error",[n])}catch(r){}}return e};if(s(p,x),x.prototype=p.prototype,d.inPlace(x.prototype,["open","send"],"-xhr-",c),u.on("send-xhr-start",function(t,e){r(t,e),i(e)}),u.on("open-xhr-start",r),h){var b=m&&m.resolve();if(!v&&!m){var E=1,R=document.createTextNode(E);new h(a).observe(R,{characterData:!0})}}else f.on("fn-end",function(t){t[0]&&t[0].type===w||a()})},{}],15:[function(t,e,n){function r(t){if(!c(t))return null;var e=window.NREUM;if(!e.loader_config)return null;var n=(e.loader_config.accountID||"").toString()||null,r=(e.loader_config.agentID||"").toString()||null,f=(e.loader_config.trustKey||"").toString()||null;if(!n||!r)return null;var h=p.generateSpanId(),m=p.generateTraceId(),v=Date.now(),w={spanId:h,traceId:m,timestamp:v};return(t.sameOrigin||s(t)&&l())&&(w.traceContextParentHeader=o(h,m),w.traceContextStateHeader=i(h,v,n,r,f)),(t.sameOrigin&&!u()||!t.sameOrigin&&s(t)&&d())&&(w.newrelicHeader=a(h,m,v,n,r,f)),w}function o(t,e){return"00-"+e+"-"+t+"-01"}function i(t,e,n,r,o){var i=0,a="",c=1,s="",f="";return o+"@nr="+i+"-"+c+"-"+n+"-"+r+"-"+t+"-"+a+"-"+s+"-"+f+"-"+e}function a(t,e,n,r,o,i){var a="btoa"in window&&"function"==typeof window.btoa;if(!a)return null;var c={v:[0,1],d:{ty:"Browser",ac:r,ap:o,id:t,tr:e,ti:n}};return i&&r!==i&&(c.d.tk=i),btoa(JSON.stringify(c))}function c(t){return f()&&s(t)}function s(t){var e=!1,n={};if("init"in NREUM&&"distributed_tracing"in NREUM.init&&(n=NREUM.init.distributed_tracing),t.sameOrigin)e=!0;else if(n.allowed_origins instanceof Array)for(var r=0;r<n.allowed_origins.length;r++){var o=h(n.allowed_origins[r]);if(t.hostname===o.hostname&&t.protocol===o.protocol&&t.port===o.port){e=!0;break}}return e}function f(){return"init"in NREUM&&"distributed_tracing"in NREUM.init&&!!NREUM.init.distributed_tracing.enabled}function u(){return"init"in NREUM&&"distributed_tracing"in NREUM.init&&!!NREUM.init.distributed_tracing.exclude_newrelic_header}function d(){return"init"in NREUM&&"distributed_tracing"in NREUM.init&&NREUM.init.distributed_tracing.cors_use_newrelic_header!==!1}function l(){return"init"in NREUM&&"distributed_tracing"in NREUM.init&&!!NREUM.init.distributed_tracing.cors_use_tracecontext_headers}var p=t(26),h=t(17);e.exports={generateTracePayload:r,shouldGenerateTrace:c}},{}],16:[function(t,e,n){function r(t){var e=this.params,n=this.metrics;if(!this.ended){this.ended=!0;for(var r=0;r<l;r++)t.removeEventListener(d[r],this.listener,!1);e.aborted||(n.duration=a.now()-this.startTime,this.loadCaptureCalled||4!==t.readyState?null==e.status&&(e.status=0):i(this,t),n.cbTime=this.cbTime,u.emit("xhr-done",[t],t),c("xhr",[e,n,this.startTime]))}}function o(t,e){var n=s(e),r=t.params;r.host=n.hostname+":"+n.port,r.pathname=n.pathname,t.parsedOrigin=s(e),t.sameOrigin=t.parsedOrigin.sameOrigin}function i(t,e){t.params.status=e.status;var n=v(e,t.lastSize);if(n&&(t.metrics.rxSize=n),t.sameOrigin){var r=e.getResponseHeader("X-NewRelic-App-Data");r&&(t.params.cat=r.split(", ").pop())}t.loadCaptureCalled=!0}var a=t("loader");if(a.xhrWrappable&&!a.disabled){var c=t("handle"),s=t(17),f=t(15).generateTracePayload,u=t("ee"),d=["load","error","abort","timeout"],l=d.length,p=t("id"),h=t(22),m=t(21),v=t(18),w=window.XMLHttpRequest;a.features.xhr=!0,t(14),t(7),u.on("new-xhr",function(t){var e=this;e.totalCbs=0,e.called=0,e.cbTime=0,e.end=r,e.ended=!1,e.xhrGuids={},e.lastSize=null,e.loadCaptureCalled=!1,e.params=this.params||{},e.metrics=this.metrics||{},t.addEventListener("load",function(n){i(e,t)},!1),h&&(h>34||h<10)||window.opera||t.addEventListener("progress",function(t){e.lastSize=t.loaded},!1)}),u.on("open-xhr-start",function(t){this.params={method:t[0]},o(this,t[1]),this.metrics={}}),u.on("open-xhr-end",function(t,e){"loader_config"in NREUM&&"xpid"in NREUM.loader_config&&this.sameOrigin&&e.setRequestHeader("X-NewRelic-ID",NREUM.loader_config.xpid);var n=f(this.parsedOrigin);if(n){var r=!1;n.newrelicHeader&&(e.setRequestHeader("newrelic",n.newrelicHeader),r=!0),n.traceContextParentHeader&&(e.setRequestHeader("traceparent",n.traceContextParentHeader),n.traceContextStateHeader&&e.setRequestHeader("tracestate",n.traceContextStateHeader),r=!0),r&&(this.dt=n)}}),u.on("send-xhr-start",function(t,e){var n=this.metrics,r=t[0],o=this;if(n&&r){var i=m(r);i&&(n.txSize=i)}this.startTime=a.now(),this.listener=function(t){try{"abort"!==t.type||o.loadCaptureCalled||(o.params.aborted=!0),("load"!==t.type||o.called===o.totalCbs&&(o.onloadCalled||"function"!=typeof e.onload))&&o.end(e)}catch(n){try{u.emit("internal-error",[n])}catch(r){}}};for(var c=0;c<l;c++)e.addEventListener(d[c],this.listener,!1)}),u.on("xhr-cb-time",function(t,e,n){this.cbTime+=t,e?this.onloadCalled=!0:this.called+=1,this.called!==this.totalCbs||!this.onloadCalled&&"function"==typeof n.onload||this.end(n)}),u.on("xhr-load-added",function(t,e){var n=""+p(t)+!!e;this.xhrGuids&&!this.xhrGuids[n]&&(this.xhrGuids[n]=!0,this.totalCbs+=1)}),u.on("xhr-load-removed",function(t,e){var n=""+p(t)+!!e;this.xhrGuids&&this.xhrGuids[n]&&(delete this.xhrGuids[n],this.totalCbs-=1)}),u.on("addEventListener-end",function(t,e){e instanceof w&&"load"===t[0]&&u.emit("xhr-load-added",[t[1],t[2]],e)}),u.on("removeEventListener-end",function(t,e){e instanceof w&&"load"===t[0]&&u.emit("xhr-load-removed",[t[1],t[2]],e)}),u.on("fn-start",function(t,e,n){e instanceof w&&("onload"===n&&(this.onload=!0),("load"===(t[0]&&t[0].type)||this.onload)&&(this.xhrCbStart=a.now()))}),u.on("fn-end",function(t,e){this.xhrCbStart&&u.emit("xhr-cb-time",[a.now()-this.xhrCbStart,this.onload,e],e)}),u.on("fetch-before-start",function(t){function e(t,e){var n=!1;return e.newrelicHeader&&(t.set("newrelic",e.newrelicHeader),n=!0),e.traceContextParentHeader&&(t.set("traceparent",e.traceContextParentHeader),e.traceContextStateHeader&&t.set("tracestate",e.traceContextStateHeader),n=!0),n}var n,r=t[1]||{};"string"==typeof t[0]?n=t[0]:t[0]&&t[0].url?n=t[0].url:window.URL&&t[0]&&t[0]instanceof URL&&(n=t[0].href),n&&(this.parsedOrigin=s(n),this.sameOrigin=this.parsedOrigin.sameOrigin);var o=f(this.parsedOrigin);if(o&&(o.newrelicHeader||o.traceContextParentHeader))if("string"==typeof t[0]||window.URL&&t[0]&&t[0]instanceof URL){var i={};for(var a in r)i[a]=r[a];i.headers=new Headers(r.headers||{}),e(i.headers,o)&&(this.dt=o),t.length>1?t[1]=i:t.push(i)}else t[0]&&t[0].headers&&e(t[0].headers,o)&&(this.dt=o)})}},{}],17:[function(t,e,n){var r={};e.exports=function(t){if(t in r)return r[t];var e=document.createElement("a"),n=window.location,o={};e.href=t,o.port=e.port;var i=e.href.split("://");!o.port&&i[1]&&(o.port=i[1].split("/")[0].split("@").pop().split(":")[1]),o.port&&"0"!==o.port||(o.port="https"===i[0]?"443":"80"),o.hostname=e.hostname||n.hostname,o.pathname=e.pathname,o.protocol=i[0],"/"!==o.pathname.charAt(0)&&(o.pathname="/"+o.pathname);var a=!e.protocol||":"===e.protocol||e.protocol===n.protocol,c=e.hostname===document.domain&&e.port===n.port;return o.sameOrigin=a&&(!e.hostname||c),"/"===o.pathname&&(r[t]=o),o}},{}],18:[function(t,e,n){function r(t,e){var n=t.responseType;return"json"===n&&null!==e?e:"arraybuffer"===n||"blob"===n||"json"===n?o(t.response):"text"===n||""===n||void 0===n?o(t.responseText):void 0}var o=t(21);e.exports=r},{}],19:[function(t,e,n){function r(){}function o(t,e,n){return function(){return i(t,[f.now()].concat(c(arguments)),e?null:this,n),e?void 0:this}}var i=t("handle"),a=t(29),c=t(30),s=t("ee").get("tracer"),f=t("loader"),u=NREUM;"undefined"==typeof window.newrelic&&(newrelic=u);var d=["setPageViewName","setCustomAttribute","setErrorHandler","finished","addToTrace","inlineHit","addRelease"],l="api-",p=l+"ixn-";a(d,function(t,e){u[e]=o(l+e,!0,"api")}),u.addPageAction=o(l+"addPageAction",!0),u.setCurrentRouteName=o(l+"routeName",!0),e.exports=newrelic,u.interaction=function(){return(new r).get()};var h=r.prototype={createTracer:function(t,e){var n={},r=this,o="function"==typeof e;return i(p+"tracer",[f.now(),t,n],r),function(){if(s.emit((o?"":"no-")+"fn-start",[f.now(),r,o],n),o)try{return e.apply(this,arguments)}catch(t){throw s.emit("fn-err",[arguments,this,t],n),t}finally{s.emit("fn-end",[f.now()],n)}}}};a("actionText,setName,setAttribute,save,ignore,onEnd,getContext,end,get".split(","),function(t,e){h[e]=o(p+e)}),newrelic.noticeError=function(t,e){"string"==typeof t&&(t=new Error(t)),i("err",[t,f.now(),!1,e])}},{}],20:[function(t,e,n){function r(t){if(NREUM.init){for(var e=NREUM.init,n=t.split("."),r=0;r<n.length-1;r++)if(e=e[n[r]],"object"!=typeof e)return;return e=e[n[n.length-1]]}}e.exports={getConfiguration:r}},{}],21:[function(t,e,n){e.exports=function(t){if("string"==typeof t&&t.length)return t.length;if("object"==typeof t){if("undefined"!=typeof ArrayBuffer&&t instanceof ArrayBuffer&&t.byteLength)return t.byteLength;if("undefined"!=typeof Blob&&t instanceof Blob&&t.size)return t.size;if(!("undefined"!=typeof FormData&&t instanceof FormData))try{return JSON.stringify(t).length}catch(e){return}}}},{}],22:[function(t,e,n){var r=0,o=navigator.userAgent.match(/Firefox[\/\s](\d+\.\d+)/);o&&(r=+o[1]),e.exports=r},{}],23:[function(t,e,n){function r(){return c.exists&&performance.now?Math.round(performance.now()):(i=Math.max((new Date).getTime(),i))-a}function o(){return i}var i=(new Date).getTime(),a=i,c=t(31);e.exports=r,e.exports.offset=a,e.exports.getLastTimestamp=o},{}],24:[function(t,e,n){function r(t){return!(!t||!t.protocol||"file:"===t.protocol)}e.exports=r},{}],25:[function(t,e,n){function r(t,e){var n=t.getEntries();n.forEach(function(t){"first-paint"===t.name?d("timing",["fp",Math.floor(t.startTime)]):"first-contentful-paint"===t.name&&d("timing",["fcp",Math.floor(t.startTime)])})}function o(t,e){var n=t.getEntries();n.length>0&&d("lcp",[n[n.length-1]])}function i(t){t.getEntries().forEach(function(t){t.hadRecentInput||d("cls",[t])})}function a(t){if(t instanceof h&&!v){var e=Math.round(t.timeStamp),n={type:t.type};e<=l.now()?n.fid=l.now()-e:e>l.offset&&e<=Date.now()?(e-=l.offset,n.fid=l.now()-e):e=l.now(),v=!0,d("timing",["fi",e,n])}}function c(t){d("pageHide",[l.now(),t])}if(!("init"in NREUM&&"page_view_timing"in NREUM.init&&"enabled"in NREUM.init.page_view_timing&&NREUM.init.page_view_timing.enabled===!1)){var s,f,u,d=t("handle"),l=t("loader"),p=t(28),h=NREUM.o.EV;if("PerformanceObserver"in window&&"function"==typeof window.PerformanceObserver){s=new PerformanceObserver(r);try{s.observe({entryTypes:["paint"]})}catch(m){}f=new PerformanceObserver(o);try{f.observe({entryTypes:["largest-contentful-paint"]})}catch(m){}u=new PerformanceObserver(i);try{u.observe({type:"layout-shift",buffered:!0})}catch(m){}}if("addEventListener"in document){var v=!1,w=["click","keydown","mousedown","pointerdown","touchstart"];w.forEach(function(t){document.addEventListener(t,a,!1)})}p(c)}},{}],26:[function(t,e,n){function r(){function t(){return e?15&e[n++]:16*Math.random()|0}var e=null,n=0,r=window.crypto||window.msCrypto;r&&r.getRandomValues&&(e=r.getRandomValues(new Uint8Array(31)));for(var o,i="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",a="",c=0;c<i.length;c++)o=i[c],"x"===o?a+=t().toString(16):"y"===o?(o=3&t()|8,a+=o.toString(16)):a+=o;return a}function o(){return a(16)}function i(){return a(32)}function a(t){function e(){return n?15&n[r++]:16*Math.random()|0}var n=null,r=0,o=window.crypto||window.msCrypto;o&&o.getRandomValues&&Uint8Array&&(n=o.getRandomValues(new Uint8Array(31)));for(var i=[],a=0;a<t;a++)i.push(e().toString(16));return i.join("")}e.exports={generateUuid:r,generateSpanId:o,generateTraceId:i}},{}],27:[function(t,e,n){function r(t,e){if(!o)return!1;if(t!==o)return!1;if(!e)return!0;if(!i)return!1;for(var n=i.split("."),r=e.split("."),a=0;a<r.length;a++)if(r[a]!==n[a])return!1;return!0}var o=null,i=null,a=/Version\/(\S+)\s+Safari/;if(navigator.userAgent){var c=navigator.userAgent,s=c.match(a);s&&c.indexOf("Chrome")===-1&&c.indexOf("Chromium")===-1&&(o="Safari",i=s[1])}e.exports={agent:o,version:i,match:r}},{}],28:[function(t,e,n){function r(t){function e(){t(a&&document[a]?document[a]:document[o]?"hidden":"visible")}"addEventListener"in document&&i&&document.addEventListener(i,e,!1)}e.exports=r;var o,i,a;"undefined"!=typeof document.hidden?(o="hidden",i="visibilitychange",a="visibilityState"):"undefined"!=typeof document.msHidden?(o="msHidden",i="msvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(o="webkitHidden",i="webkitvisibilitychange",a="webkitVisibilityState")},{}],29:[function(t,e,n){function r(t,e){var n=[],r="",i=0;for(r in t)o.call(t,r)&&(n[i]=e(r,t[r]),i+=1);return n}var o=Object.prototype.hasOwnProperty;e.exports=r},{}],30:[function(t,e,n){function r(t,e,n){e||(e=0),"undefined"==typeof n&&(n=t?t.length:0);for(var r=-1,o=n-e||0,i=Array(o<0?0:o);++r<o;)i[r]=t[e+r];return i}e.exports=r},{}],31:[function(t,e,n){e.exports={exists:"undefined"!=typeof window.performance&&window.performance.timing&&"undefined"!=typeof window.performance.timing.navigationStart}},{}],ee:[function(t,e,n){function r(){}function o(t){function e(t){return t&&t instanceof r?t:t?f(t,s,a):a()}function n(n,r,o,i,a){if(a!==!1&&(a=!0),!p.aborted||i){t&&a&&t(n,r,o);for(var c=e(o),s=m(n),f=s.length,u=0;u<f;u++)s[u].apply(c,r);var l=d[y[n]];return l&&l.push([x,n,r,c]),c}}function i(t,e){g[t]=m(t).concat(e)}function h(t,e){var n=g[t];if(n)for(var r=0;r<n.length;r++)n[r]===e&&n.splice(r,1)}function m(t){return g[t]||[]}function v(t){return l[t]=l[t]||o(n)}function w(t,e){p.aborted||u(t,function(t,n){e=e||"feature",y[n]=e,e in d||(d[e]=[])})}var g={},y={},x={on:i,addEventListener:i,removeEventListener:h,emit:n,get:v,listeners:m,context:e,buffer:w,abort:c,aborted:!1};return x}function i(t){return f(t,s,a)}function a(){return new r}function c(){(d.api||d.feature)&&(p.aborted=!0,d=p.backlog={})}var s="nr@context",f=t("gos"),u=t(29),d={},l={},p=e.exports=o();e.exports.getOrSetContext=i,p.backlog=d},{}],gos:[function(t,e,n){function r(t,e,n){if(o.call(t,e))return t[e];var r=n();if(Object.defineProperty&&Object.keys)try{return Object.defineProperty(t,e,{value:r,writable:!0,enumerable:!1}),r}catch(i){}return t[e]=r,r}var o=Object.prototype.hasOwnProperty;e.exports=r},{}],handle:[function(t,e,n){function r(t,e,n,r){o.buffer([t],r),o.emit(t,e,n)}var o=t("ee").get("handle");e.exports=r,r.ee=o},{}],id:[function(t,e,n){function r(t){var e=typeof t;return!t||"object"!==e&&"function"!==e?-1:t===window?0:a(t,i,function(){return o++})}var o=1,i="nr@id",a=t("gos");e.exports=r},{}],loader:[function(t,e,n){function r(){if(!N++){var t=O.info=NREUM.info,e=m.getElementsByTagName("script")[0];if(setTimeout(f.abort,3e4),!(t&&t.licenseKey&&t.applicationID&&e))return f.abort();s(E,function(e,n){t[e]||(t[e]=n)});var n=a();c("mark",["onload",n+O.offset],null,"api"),c("timing",["load",n]);var r=m.createElement("script");0===t.agent.indexOf("http://")||0===t.agent.indexOf("https://")?r.src=t.agent:r.src=p+"://"+t.agent,e.parentNode.insertBefore(r,e)}}function o(){"complete"===m.readyState&&i()}function i(){c("mark",["domContent",a()+O.offset],null,"api")}var a=t(23),c=t("handle"),s=t(29),f=t("ee"),u=t(27),d=t(24),l=t(20),p=l.getConfiguration("ssl")===!1?"http":"https",h=window,m=h.document,v="addEventListener",w="attachEvent",g=h.XMLHttpRequest,y=g&&g.prototype,x=!d(h.location);NREUM.o={ST:setTimeout,SI:h.setImmediate,CT:clearTimeout,XHR:g,REQ:h.Request,EV:h.Event,PR:h.Promise,MO:h.MutationObserver};var b=""+location,E={beacon:"bam.nr-data.net",errorBeacon:"bam.nr-data.net",agent:"js-agent.newrelic.com/nr-spa-1209.min.js"},R=g&&y&&y[v]&&!/CriOS/.test(navigator.userAgent),O=e.exports={offset:a.getLastTimestamp(),now:a,origin:b,features:{},xhrWrappable:R,userAgent:u,disabled:x};if(!x){t(19),t(25),m[v]?(m[v]("DOMContentLoaded",i,!1),h[v]("load",r,!1)):(m[w]("onreadystatechange",o),h[w]("onload",r)),c("mark",["firstbyte",a.getLastTimestamp()],null,"api");var N=0}},{}],"wrap-function":[function(t,e,n){function r(t,e){function n(e,n,r,s,f){function nrWrapper(){var i,a,u,l;try{a=this,i=d(arguments),u="function"==typeof r?r(i,a):r||{}}catch(p){o([p,"",[i,a,s],u],t)}c(n+"start",[i,a,s],u,f);try{return l=e.apply(a,i)}catch(h){throw c(n+"err",[i,a,h],u,f),h}finally{c(n+"end",[i,a,l],u,f)}}return a(e)?e:(n||(n=""),nrWrapper[l]=e,i(e,nrWrapper,t),nrWrapper)}function r(t,e,r,o,i){r||(r="");var c,s,f,u="-"===r.charAt(0);for(f=0;f<e.length;f++)s=e[f],c=t[s],a(c)||(t[s]=n(c,u?s+r:r,o,s,i))}function c(n,r,i,a){if(!h||e){var c=h;h=!0;try{t.emit(n,r,i,e,a)}catch(s){o([s,n,r,i],t)}h=c}}return t||(t=u),n.inPlace=r,n.flag=l,n}function o(t,e){e||(e=u);try{e.emit("internal-error",t)}catch(n){}}function i(t,e,n){if(Object.defineProperty&&Object.keys)try{var r=Object.keys(t);return r.forEach(function(n){Object.defineProperty(e,n,{get:function(){return t[n]},set:function(e){return t[n]=e,e}})}),e}catch(i){o([i],n)}for(var a in t)p.call(t,a)&&(e[a]=t[a]);return e}function a(t){return!(t&&t instanceof Function&&t.apply&&!t[l])}function c(t,e){var n=e(t);return n[l]=t,i(t,n,u),n}function s(t,e,n){var r=t[e];t[e]=c(r,n)}function f(){for(var t=arguments.length,e=new Array(t),n=0;n<t;++n)e[n]=arguments[n];return e}var u=t("ee"),d=t(30),l="nr@original",p=Object.prototype.hasOwnProperty,h=!1;e.exports=r,e.exports.wrapFunction=c,e.exports.wrapInPlace=s,e.exports.argsToArray=f},{}]},{},["loader",2,16,5,3,4]);
        ;NREUM.loader_config={accountID:"3201143",trustKey:"3201143",agentID:"982650345",licenseKey:"NRJS-5506adfb3135db5bbf6",applicationID:"982650345"}
        ;NREUM.info={beacon:"bam.nr-data.net",errorBeacon:"bam.nr-data.net",licenseKey:"NRJS-5506adfb3135db5bbf6",applicationID:"982650345",sa:1}
    </script>
</head>

<body onload="choosePic()" style="background: #fff6eb;">   
    <script>
        function changeLang(){
         document.getElementById('form_lang').submit();
        }
        function choosePic() {
           images = ["/assets/img/av1.png","/assets/img/av2.png","/assets/img/av3.png","/assets/img/av4.png","/assets/img/av5.png","/assets/img/av6.png",];

           var random = images[Math.floor(Math.random()*images.length)];
           document.getElementById('avatar').src= random;

        }
    </script>
    <div class="d-none d-sm-flex d-md-flex d-lg-flex d-xl-flex d-xxl-flex justify-content-sm-end justify-content-lg-end align-items-lg-center justify-content-xxl-end align-items-xxl-center" style="height: 3vh;margin-bottom: -3vh;width: 100vw;"><a data-aos="fade" data-aos-duration="1000" data-aos-delay="3000" data-aos-once="true" href="https://alt.1998.media" style="color: rgba(255,255,255,0.5);text-decoration: none;font-family: futura;font-size: 10px;margin-right: 0.5vw;">alt version</a></div>
    <section class="d-flex d-lg-flex align-items-center align-items-lg-center" style="height: 100vh;background: url(../assets/img/mesh-gradient.png?h=1489e3ae3c1a78e7c4683d180dbc4a10) no-repeat;background-size: cover;">
        <div class="container d-flex d-lg-flex flex-column justify-content-lg-center align-items-lg-start" style="height: 50vh;max-width: 75%;">
            <div class="flex-grow-1"><img class="flex-grow-0" data-aos="fade" data-aos-duration="1000" data-aos-delay="500" data-aos-once="true" id="avatar" src="../assets/img/av1.png?h=7ea1e0bba9582d3e49cf424737e2fe36" style="width: 10vw;border-style: none;"></div>
            <h1 class="flex-grow-0" data-aos="fade" data-aos-duration="1000" data-aos-delay="1000" data-aos-once="true" style="color: rgba(108,117,125,0.5);"><span style="color: rgb(148,160,190);"><?= _Hello ?>&nbsp;</span><span style="color: var(--bs-white);"><?= _Im ?><strong>&nbsp;<?= _MING ?>!</strong></span><br></h1>
            <h1 class="text-break flex-grow-1" data-aos="fade" data-aos-duration="1000" data-aos-delay="2000" data-aos-once="true" style="line-height: 55px;"><span style="color: rgb(33,37,41);"><strong><?= _UIDesigner ?></strong></span>&nbsp;<span style="color: rgba(108,117,125,0.5);"><strong>&amp;</strong></span>&nbsp;<span style="color: rgb(33,37,41);"><strong><?= _AppDeveloper ?></strong></span><br><span style="background: -webkit-linear-gradient(#ffffff, #00ffc2);-webkit-background-clip: text;-webkit-text-fill-color: transparent;"><strong> WWDC21 <?= _Scholar ?></strong><br /></span></h1>
            <div data-aos="fade" data-aos-duration="1000" data-aos-delay="2500" data-aos-once="true" class="apple-business-chat-banner-container" data-apple-business-id="0b908b93-eb72-4f51-a8de-55d1d58d5301" data-apple-icon-title="Any questions? I am here to help." data-apple-banner-context="Chat with me via iMessage. Available for iPhone / iPad / Mac user." data-apple-business-intent-id="15672e94-a30a-42c0-bf8b-b2a79a99417e" data-apple-banner-background-color="rgba(255,255,255,0.5)" data-apple-banner-cta="Questions? I can help." style="border-radius:15px!important"></div><i class="fas fa-arrow-down d-flex d-lg-flex flex-grow-1 align-items-end my-auto align-items-lg-end" data-aos="fade" data-aos-duration="1000" data-aos-delay="3000" data-aos-once="true" style="font-size: 25px;color: rgba(108,117,125,0.5);"></i>
        </div>
    </section>
    <nav class="navbar navbar-light navbar-expand-md sticky-top navigation-clean" data-aos="fade-up" style="margin-top: -9vh;height: 10vh;">
        <div class="container"><a class="navbar-brand" href="#">1998 MEDIA</a><button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navcol-1"><span class="visually-hidden">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse" id="navcol-1">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item dropdown"><a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">Showcase&nbsp;</a>
                        <div class="dropdown-menu" style="border-radius: 15px;"><a class="dropdown-item" href="https://photoblog.1998.media" target="_blank">Photoblog</a><a class="dropdown-item" href="https://portfolio.1998.media" target="_blank">Design Portfolio</a></div>
                    </li>
                    <li class="nav-item dropdown"><a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">Coding&nbsp;</a>
                        <div class="dropdown-menu" style="border-radius: 15px;"><a class="dropdown-item" href="https://www.behance.net/1998design" target="_blank">Behance@Adobe</a><a class="dropdown-item" href="https://github.com/1998code" target="_blank">OSS@Github</a></div>
                    </li>
                    <li class="nav-item"><a class="nav-link" href="https://github.com/sponsors/1998code" target="_blank">Sponsors</a></li>
                    <li class="nav-item"><a class="nav-link" href="mailto:contact@1998.media" target="_blank">Contact</a></li>
                    <li class="nav-item"><a class="nav-link" href="https://status.1998.media" target="_blank">Status</a></li>
                    <li class="nav-item d-md-flex align-items-md-center"><a class="nav-link d-md-flex align-items-md-center" href="https://shop.1998.media"><i class="fas fa-shopping-bag"></i></a></li>
                    <li class="nav-item dropdown d-md-flex align-items-md-center"><a class="dropdown-toggle nav-link d-md-flex align-items-md-center" aria-expanded="false" data-bs-toggle="dropdown" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" fill="none">

                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.00001 2C7.55229 2 8.00001 2.44772 8.00001 3V4H8.73223C8.744 3.99979 8.75581 3.99979 8.76765 4H11C11.5523 4 12 4.44772 12 5C12 5.55228 11.5523 6 11 6H9.57801C9.21635 7.68748 8.63076 9.29154 7.85405 10.7796C8.14482 11.1338 8.44964 11.476 8.76767 11.8055C9.15124 12.2028 9.14007 12.8359 8.74272 13.2195C8.34537 13.603 7.7123 13.5919 7.32873 13.1945C7.13962 12.9986 6.95468 12.7987 6.77405 12.5948C5.88895 13.9101 4.84387 15.1084 3.66692 16.1618C3.2554 16.5301 2.6232 16.4951 2.25487 16.0836C1.88655 15.672 1.92157 15.0398 2.3331 14.6715C3.54619 13.5858 4.60214 12.3288 5.4631 10.9389C4.90663 10.1499 4.40868 9.31652 3.97558 8.44503C3.7298 7.95045 3.93148 7.35027 4.42606 7.10449C4.92064 6.8587 5.52083 7.06039 5.76661 7.55497C6.00021 8.02502 6.25495 8.48278 6.52961 8.92699C6.947 7.99272 7.28247 7.01402 7.52698 6H3.00001C2.44772 6 2.00001 5.55228 2.00001 5C2.00001 4.44772 2.44772 4 3.00001 4H6.00001V3C6.00001 2.44772 6.44772 2 7.00001 2ZM13 8C13.3788 8 13.725 8.214 13.8944 8.55279L16.8854 14.5348C16.8919 14.5471 16.8982 14.5596 16.9041 14.5722L17.8944 16.5528C18.1414 17.0468 17.9412 17.6474 17.4472 17.8944C16.9532 18.1414 16.3526 17.9412 16.1056 17.4472L15.382 16H10.618L9.89444 17.4472C9.64745 17.9412 9.04677 18.1414 8.5528 17.8944C8.05882 17.6474 7.85859 17.0468 8.10558 16.5528L9.09589 14.5722C9.10187 14.5596 9.1081 14.5471 9.11458 14.5348L12.1056 8.55279C12.275 8.214 12.6212 8 13 8ZM11.618 14H14.382L13 11.2361L11.618 14Z" fill="currentColor"></path>
                            </svg></a>
                        <div class="dropdown-menu" style="border-radius: 15px;"><a class="dropdown-item" href="?lang=en"><i class="fas fa-globe-americas"></i> <?= _English ?></a><a class="dropdown-item" href="?lang=zh"><i class="fas fa-globe-asia"></i> <?= _Chinese ?></a><a class="dropdown-item disabled" href="?lang=ko"><i class="fas fa-globe-asia"></i> <?= _Korean ?></a><a class="dropdown-item disabled" href="?lang=jp"><i class="fas fa-globe-asia"></i> <?= _Japanese ?></a></div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <!-- Intro -->    
    <section data-aos="fade-up" style="margin-top: 5%;font-family: futura;margin-bottom: 5%;">
        <div class="container" style="max-width: 75%;"><h1 style="margin-bottom: 3vw;"><strong><?= _About ?></strong></h1>
            <div class="row">
            <div class="col-xxl-12 d-flex d-sm-flex d-md-flex d-xxl-flex flex-column justify-content-center justify-content-sm-center justify-content-md-center align-items-md-start justify-content-xxl-center align-items-xxl-start" style="background: linear-gradient(-165deg, rgba(255,246,235,0.35), rgba(255,255,255,0)), url(&quot;../assets/img/johannes-plenio-IoY8fvDGCNs-unsplash.jpg?h=9ce8dfc7dba1f7685731a15a8a8e27f9&quot;) center / cover no-repeat;padding: 3vw;height: 50vh;border-style: none;border-color: rgb(255,255,255);margin-bottom: 1.5vh;border-radius: 5px;">
                    <h2 style="color: rgb(255,255,255);"><?= _WhoAmI ?></h2>
                    <p style="color: rgb(255,255,255);"><?= _WhoAmI_detail ?></p>
                </div>
            </div>
            <div class="row" style="border-radius: 5px;border: 0px solid rgba(33,37,41,0) ;">
                <div class="col-xxl-5 d-md-flex d-xxl-flex flex-column justify-content-md-center align-items-md-start justify-content-xxl-center align-items-xxl-start" style="background: linear-gradient(-125deg, rgb(255,246,235) 0%, rgba(255,255,255,0) 98%), url(&quot;../assets/img/mymind-tZCrFpSNiIQ-unsplash.jpg?h=0408858ea21758a14f1feda2b3e56c90&quot;) bottom / cover no-repeat;padding: 3vw;">
                    <h3 style="color: rgb(0,0,0);">Bachelor's degree</h3>
                    <p>A science student graduated at The Hong Kong Polytechnic University and City University of Hong Kong. Passed Korean TOPIK language exam in 2018.<br></p>
                </div>
                <div class="col-xxl-7 d-lg-flex d-xxl-flex flex-column justify-content-lg-center align-items-lg-start justify-content-xxl-center align-items-xxl-start" style="background: linear-gradient(rgb(255,246,235), rgba(255,255,255,0)), url(&quot;../assets/img/asoggetti-cfKC0UOZHJo-unsplash.jpg?h=141c0dbe4ed31d499999b6ffb8f9f106&quot;) top / cover no-repeat;padding: 3vw;">
                    <h2>What I Do</h2>
                    <div class="row" style="width: 100%;">
                        <div class="col">
                            <p>- UI/UX Design<br>- iOS / iPadOS / macOS Application Development<br>- Photo Shooting &amp; Editing<br>- Movie and Short Video Shooting &amp; Editing</p>
                        </div>
                        <div class="col">
                            <p>(Check-out my latest work on dribbble and behance.)<br>(Available on App Store and Mac App Store.)<br>(Available on Adobe Stock.)<br>(Enquiry via email.)</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xxl-12" style="padding: 3vw;border: 3px solid rgb(12,99,228);margin-top: 5vw;background: #ffffff;border-radius: 5px;">
                    <h2 style="margin-bottom: 20px;">Experience</h2>
                    <div class="accordion" role="tablist" id="accordion-2" style="border-radius: 15px;border: 1px solid rgb(231,241,255);margin-bottom: 20px;">
                        <div class="accordion-item" style="border-radius: 15px 15px 0px 0px;border-width: 0px;">
                            <h2 class="accordion-header" role="tab" style="border-color: rgb(231,241,255);"><button class="accordion-button" data-bs-toggle="collapse" data-bs-target="#accordion-2 .item-1" aria-expanded="true" aria-controls="accordion-2 .item-1" style="border-radius: 15px 15px 0px 0px;">2020 Q4 - Now</button></h2>
                            <div class="accordion-collapse collapse show item-1" role="tabpanel" data-bs-parent="#accordion-2">
                                <div class="accordion-body">
                                    <p class="mb-0">PolyU, HONG KONG - As a Student Assistant (PT) Develop website &amp; design booklet for College's Language Scolar Program</p>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item" style="border-width: 0px;border-radius: 15px 15px 0px 0px;">
                            <h2 class="accordion-header" role="tab"><button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#accordion-2 .item-2" aria-expanded="false" aria-controls="accordion-2 .item-2">2020 Q3</button></h2>
                            <div class="accordion-collapse collapse item-2" role="tabpanel" data-bs-parent="#accordion-2">
                                <div class="accordion-body">
                                    <p class="mb-0">PolyU, HONG KONG - As a Student Assistant (PT) Data analytics and visualization<br><br>PolyU, HONG KONG - As a student developer Participate in artificial intelligence and Natural language processing research field</p>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item" style="border-width: 0px;border-radius: 15px 15px 0px 0px;">
                            <h2 class="accordion-header" role="tab"><button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#accordion-2 .item-3" aria-expanded="false" aria-controls="accordion-2 .item-3">2020 Q2</button></h2>
                            <div class="accordion-collapse collapse item-3" role="tabpanel" data-bs-parent="#accordion-2">
                                <div class="accordion-body">
                                    <p class="mb-0">Atlassian, Australia - As a Translator (Chinese, Korean) language of the BitBucket.org Team<br><br>Tokyo Metropolitan Government, Japan - As a CHT Translator of the StopCovid19Tokyo Team with Code of Japan</p>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item" style="border-width: 0px;border-radius: 15px;">
                            <h2 class="accordion-header" role="tab"><button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#accordion-2 .item-4" aria-expanded="false" aria-controls="accordion-2 .item-4" style="border-bottom-right-radius: 15px;border-bottom-left-radius: 15px;">2020 Q1</button></h2>
                            <div class="accordion-collapse collapse item-4" role="tabpanel" data-bs-parent="#accordion-2">
                                <div class="accordion-body">
                                    <p class="mb-0">Freelance works on different platform<br></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2 style="margin-bottom: 20px;margin-top: 20px;">Awards</h2><img class="img-fluid" src="../assets/img/WWDC21Winner.png?h=635e76ae457bd315d787163181b80dd7">
                    <h2 style="margin-bottom: 20px;margin-top: 20px;">Skills</h2>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Software</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Adobe Creative Cloud</td>
                                    <td>Apple Xcode</td>
                                    <td>Microsoft SQL Server</td>
                                </tr>
                                <tr>
                                    <td>Adobe XD</td>
                                    <td>Apple Keynote</td>
                                    <td>Microsoft Office</td>
                                </tr>
                                <tr>
                                    <td>Adobe Dimension</td>
                                    <td>Apple Pages</td>
                                    <td>Sketch</td>
                                </tr>
                                <tr>
                                    <td>Adobe Photoshop</td>
                                    <td>Final Cut Pro</td>
                                    <td>Shapr3D</td>
                                </tr>
                                <tr>
                                    <td>Adobe Premiere Pro</td>
                                    <td>Figma</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Adobe Lightroom</td>
                                    <td>Framer</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Adobe Dreamweaver</td>
                                    <td>Unity Engine</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h2 style="margin-bottom: 20px;margin-top: 20px;">Languages</h2>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Proficient in both spoken and written&nbsp;</th>
                                    <th>Proficient in spoken</th>
                                    <th>Basic in</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Chinese (Cantonese,&nbsp;Mandarin)</td>
                                    <td>Korean (Passed the Test of Proficiency in Korean in 2018)</td>
                                    <td>Japanese</td>
                                </tr>
                                <tr>
                                    <td>English (the United Kingdom, United States of America)</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- QA -->   
    <section data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500" data-aos-once="true" style="margin-bottom: 5%;font-family: futura;">
        <div class="container" style="max-width: 75%;padding: 3vw;border-style: solid;background: #ffffff;border-radius: 5px;">
            <h1 style="margin-bottom: 15px;"><strong>Question and Answering</strong></h1>
            <div class="accordion" role="tablist" id="accordion-1">
                <div class="accordion-item" style="border-width: 0px;border-radius: 15px 15px 0px 0px;">
                    <h2 class="accordion-header" role="tab"><button class="accordion-button" data-bs-toggle="collapse" data-bs-target="#accordion-1 .item-1" aria-expanded="true" aria-controls="accordion-1 .item-1">[Support]&nbsp;How to sponsor your projects?</button></h2>
                    <div class="accordion-collapse collapse show item-1" role="tabpanel" data-bs-parent="#accordion-1">
                        <div class="accordion-body">
                            <p class="mb-0">Github for sponsor:&nbsp;<a href="https://github.com/sponsors/1998code">https://github.com/sponsors/1998code</a><br>Google Ads:</p><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- M-ADS Q1 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-1941913120815371"
     data-ad-slot="1600474556"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
                        </div>
                    </div>
                </div>
                <div class="accordion-item" style="border-width: 0px;border-radius: 15px 15px 0px 0px;">
                    <h2 class="accordion-header" role="tab"><button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#accordion-1 .item-2" aria-expanded="false" aria-controls="accordion-1 .item-2">[OSS] Where do your Open Source works hosts?</button></h2>
                    <div class="accordion-collapse collapse item-2" role="tabpanel" data-bs-parent="#accordion-1">
                        <div class="accordion-body">
                            <p class="mb-0">Github: <a href="https://github.com/1998code">https://github.com/1998code&nbsp;</a><i class="fas fa-external-link-alt" style="color: rgb(19,112,253);"></i><br>Vercel:&nbsp;<a href="https://vercel.com/?utm_source=1998code&amp;utm_campaign=oss">https://vercel.com</a>&nbsp;<i class="fas fa-external-link-alt" style="color: rgb(19,112,253);"></i></p>
                        </div>
                    </div>
                </div>
                <div class="accordion-item" style="border-width: 0px;border-radius: 15px 15px 0px 0px;">
                    <h2 class="accordion-header" role="tab"><button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#accordion-1 .item-3" aria-expanded="false" aria-controls="accordion-1 .item-3">[Job Cooperation] How to contact?</button></h2>
                    <div class="accordion-collapse collapse item-3" role="tabpanel" data-bs-parent="#accordion-1">
                        <div class="accordion-body">
                            <p class="mb-0">Please contact by email: <a href="mailto:job@1998.media">job@1998.media</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Contact --> 
    <section data-aos="fade" data-aos-duration="1000" data-aos-delay="500" data-aos-once="true" style="margin-top: 15%;font-family: futura;margin-bottom: 15%;">
        <div class="container" style="max-width: 75%;background: #fcfcfc;padding: 25px;border-style: solid;border-color: rgb(13,110,253);border-radius: 5px;">
            <h1><strong>Contact</strong></h1>
            <div class="row">
                <div class="col-sm-6 col-lg-4 col-xxl-4 d-sm-flex d-xxl-flex flex-column align-items-sm-center justify-content-xxl-center align-items-xxl-center">
                    <h3 class="d-xxl-flex flex-column justify-content-xxl-center align-items-xxl-start">Email: <a href="mailto:contact@1998.media" target="_blank">contact@1998.media</a><br><br>iMessage:<br></h3>
                    <div data-aos="fade" data-aos-duration="1000" data-aos-delay="2500" data-aos-once="true" class="apple-business-chat-banner-container" data-apple-business-id="0b908b93-eb72-4f51-a8de-55d1d58d5301" data-apple-icon-title="Any questions? I am here to help." data-apple-banner-context="Chat with me via iMessage. Available for iPhone / iPad / Mac user." data-apple-business-intent-id="15672e94-a30a-42c0-bf8b-b2a79a99417e" data-apple-banner-background-color="rgba(255,255,255,0.5)" data-apple-banner-cta="Questions? I can help." style="border-radius:15px!important"></div>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-8 col-xl-8 col-xxl-8 text-truncate text-center d-xxl-flex justify-content-xxl-center"><div style="padding:5%">
<iframe style="border-radius:25px" width="500" height="500" src="https://snapshot.apple-mapkit.com/api/v1/snapshot?center=22.341549380226525%2C114.12976433573806&t=standard&scale=2&spn=0.6647131481197732%2C0.718663199852358&size=250x250&lang=en-US&poi=1&annotations=%5B%7B%22point%22%3A%2222.366249084472656%2C114.15977478027344%22%2C%22markerStyle%22%3A%22large%22%2C%22color%22%3A%2200a3d7%22%7D%5D&teamId=9PAHLTG8AD&keyId=FD3N2TP9F5&signature=Kpb-Pz6C8Fx5V_zdtt6BKSo6ni7WBiWwhNXF19E0LNgtinOm8dFcA2H6kZtPGh_t92OZbJknyjehxvunv-MCHA"></iframe>
</div></div>
            </div>
        </div>
    </section>
    <!-- Credit -->
    <div data-aos="fade" data-aos-duration="1000" data-aos-once="true" id="get-started" class="brands" style="margin-top: 1%;width: 100%;padding: 2%;">
        <div class="container d-flex justify-content-center align-items-center justify-content-md-center justify-content-lg-center justify-content-xl-center">
            <p class="d-none d-sm-inline d-md-inline d-lg-inline d-xl-inline d-xxl-inline" style="margin-bottom: 0px;margin-left: 15px;"><strong>Special thanks to:</strong></p><a href="https://vercel.com/?utm_source=1998code&amp;utm_campaign=oss" style="height: 32px;padding: 0px;margin-left: 15px;max-width: 168px;" target="_blank"><img src="../assets/img/powered-by-vercel.svg?h=91084ef203023a391277bb16f564cc4f" style="filter: grayscale(0%) hue-rotate(0deg) invert(0%) saturate(100%);height: 32px;margin: 0px;"></a><a href="https://betteruptime.com/?ref=i41" style="height: 32px;padding: 0px;margin-left: 15px;max-width: 80px;" target="_blank"><img src="../assets/img/betteruptime-light.png?h=ff4472a36a4efb3c1919010865406953" style="filter: grayscale(0%) hue-rotate(0deg) invert(0%) saturate(100%);height: 32px;margin: 0px;"></a>
        </div>
    </div>
    <footer data-aos="fade" data-aos-duration="1500" data-aos-once="true" class="footer-basic">
        <div class="social"><a href="https://dribbble.com/1998design" target="_blank"><i class="fab fa-dribbble"></i></a><a href="https://behance.net/1998design" target="_blank"><i class="fab fa-behance"></i></a><a href="https://1998design.medium.com" target="_blank"><i class="fab fa-medium-m"></i></a><a href="https://twitter.com/1998design" target="_blank"><i class="fab fa-twitter"></i></a><a href="https://github.com/1998code" target="_blank"><i class="fab fa-github"></i></a></div>
        <p class="copyright">Made&nbsp;by MING with&nbsp;♥ from Hong Kong.</p>
    </footer><a class="cd-top js-cd-top cd-top--fade-out cd-top--show" style="width: 32px;height: 32px;background: url(../assets/img/cd-top-arrow.svg?h=b73f3c59a7f1ec91a545b91f7333e08d) center no-repeat, rgb(190,201,255);border-radius: 10px;" href="#0">Top</a>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
    <script src="../assets/js/script.min.js?h=b1baa46f5676b8d9d4beb3344733b42b"></script>
</body>

</html>