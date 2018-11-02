!function(e){var t={};function n(r){if(t[r])return t[r].exports;var s=t[r]={i:r,l:!1,exports:{}};return e[r].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(r,s,function(t){return e[t]}.bind(null,s));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);const r={API_URI:"http://localhost:8888/webfeeds"};function s(e){return React.createElement("li",{className:"column column-"+e.color},React.createElement(l,{id:e.id,feeds:e.feeds}))}function l(e){const t=e.feeds.map(e=>React.createElement(i,{title:e.title,url:e.url,resource:e.resource,limit:e.itemLimit,key:e.title}));return React.createElement("ul",{className:"drag-item-list",id:e.id},t)}class i extends React.Component{constructor(e){super(e),this.state={items:[],title:e.title,url:e.url,resource:e.resource,limit:e.limit}}componentDidMount(){this.__fetchRSSFeedItems(),this.timerID=setInterval(()=>this.__fetchRSSFeedItems(),3e5)}componentDidUpdate(){}componentWillUnmount(){clearInterval(this.timerID)}__fetchRSSFeedItems(){fetch(this.state.resource+"?limit="+this.state.limit).then(e=>e.json()).then(e=>{const t=e.Items;this.setState(function(e,n){return{items:t}})})}render(){let e=[];return this.state.items&&(e=this.state.items.map(e=>React.createElement(a,{url:e.Url,title:e.Title,description:e.Description,published:e.Published,key:e.Url}))),React.createElement("li",{className:"drag-item"},React.createElement(o,{text:this.state.title,url:this.state.url}),React.createElement("ul",null,e))}}function o(e){return React.createElement("span",{className:"drag-item-header"},React.createElement("h2",null,e.text))}class a extends React.Component{constructor(e){super(e),this.state={url:e.url,title:e.title,description:e.description,published:new Date(e.published)}}__getClass(){let e=new Date,t=Math.abs(e-this.state.published);return 864e5<=t?"day_old":432e5<=t?"half_day_old":""}render(){return React.createElement("li",null,React.createElement("a",{className:this.__getClass(),href:this.state.url,target:"_blank"},this.state.title))}}ReactDOM.render(React.createElement(class extends React.Component{constructor(e){super(e),this.state={feedColumns:[]}}componentDidMount(){this.__fetchRSSFeeds(),this.timerID=setInterval(()=>this.__fetchRSSFeeds(),3e5)}componentDidUpdate(){this.__enableDragAndDrop()}componentWillUnmount(){clearInterval(this.timerID)}__enableDragAndDrop(){var e=document.querySelectorAll(".drag-item-list");reactDragula(Array.from(e)).on("drag",function(e){e.classList.add("is-moving")}).on("dragend",function(e){e.classList.remove("is-moving"),window.setTimeout(function(){e.classList.add("is-moved"),window.setTimeout(function(){e.classList.remove("is-moved")},200)},100)})}__getFeedIdx(e,t){for(var n=0;n<e.length;n++)if(e[n].title===t)return n;return-1}__initFeedColumn(e,t){if(void 0===e[t]){let n=["red","blue","green"];e[t]={color:n[t]||"yellow",feeds:[]}}}__markUnusedFeedsForRemoval(e){for(var t=0;t<e.length;t++)if("feeds"in e[t])for(var n=0;n<e[t].feeds.length;n++)e[t].feeds[n].canRemove=!0}__removeUnusedFeeds(e){for(var t=0;t<e.length;t++)"feeds"in e[t]&&(e[t].feeds=e[t].feeds.filter(function(e,t,n){return!1===e.canRemove}))}__fetchRSSFeeds(){fetch(r.API_URI).then(e=>e.json()).then(e=>{const t=e.Feeds;this.setState(function(e,n){this.__markUnusedFeedsForRemoval(e.feedColumns);for(var r=0;r<t.length;r++){let n=t[r].Name,s=t[r].Column,l=t[r].Url,i=t[r].Resource,o=t[r].ItemLimit;this.__initFeedColumn(e.feedColumns,s);let a=this.__getFeedIdx(e.feedColumns[s].feeds,n);if(0<=a)e.feedColumns[s].feeds[a].canRemove=!1;else{let t={title:n,url:l,resource:i,itemLimit:o,canRemove:!1};e.feedColumns[s].feeds.push(t)}}return this.__removeUnusedFeeds(e.feedColumns),{feedColumns:e.feedColumns}})})}render(){const e=this.state.feedColumns.map((e,t)=>React.createElement(s,{id:t,color:e.color,feeds:e.feeds,key:t}));return React.createElement("ul",{id:"columns"},e)}},null),document.getElementById("root"))}]);