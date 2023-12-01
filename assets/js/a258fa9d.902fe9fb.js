"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[588],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>b});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=c(n),m=a,b=d["".concat(s,".").concat(m)]||d[m]||u[m]||o;return n?r.createElement(b,i(i({ref:t},p),{},{components:n})):r.createElement(b,i({ref:t},p))}));function b(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[d]="string"==typeof e?e:a,i[1]=l;for(var c=2;c<o;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},4798:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var r=n(7462),a=(n(7294),n(3905));const o={sidebar_position:1},i="Key Concepts",l={unversionedId:"guide-to-dynamic-builds/key-concepts",id:"guide-to-dynamic-builds/key-concepts",title:"Key Concepts",description:"BuildBeaver is centered on the idea of fully dynamic builds that can be run anywhere. That means on your laptop,",source:"@site/docs/guide-to-dynamic-builds/key-concepts.md",sourceDirName:"guide-to-dynamic-builds",slug:"/guide-to-dynamic-builds/key-concepts",permalink:"/docs/guide-to-dynamic-builds/key-concepts",draft:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Guide to Dynamic Builds",permalink:"/docs/category/guide-to-dynamic-builds"},next:{title:"Workflows",permalink:"/docs/guide-to-dynamic-builds/workflows"}},s={},c=[],p={toc:c},d="wrapper";function u(e){let{components:t,...n}=e;return(0,a.kt)(d,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"key-concepts"},"Key Concepts"),(0,a.kt)("p",null,"BuildBeaver is centered on the idea of fully dynamic builds that can be run anywhere. That means on your laptop,\ninside a CI system (including GitHub Actions)."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Build Controller"),": There is a single ",(0,a.kt)("em",{parentName:"p"},"Build Controller")," job per build, running a program which defines the\nworkflows making up the build and adds all dynamically-submitted jobs. New jobs can be added to any workflow\nat any time in code."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"API Based"),": The Build Controller job communicates with the BuildBeaver server (or a cut-down server running\ninside the ",(0,a.kt)("strong",{parentName:"p"},"bb")," executable) via the ",(0,a.kt)("em",{parentName:"p"},"Dynamic REsT API"),". There is an OpenAPI definition for this API, as well\nas language-specific clients."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Go SDK"),": The Go SDK provides the functionality needed to define the Build Controller for your build as a\nGolang program. The Go SDK is open source and available ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/buildbeaver/go-sdk"},"on GitHub"),", and consists\nof two packages:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"The ",(0,a.kt)("strong",{parentName:"p"},"Dynamic API ",(0,a.kt)("a",{parentName:"strong",href:"https://github.com/buildbeaver/go-sdk/tree/main/bb"},"'bb' package"))," provides an easy-to-use interface\nfor building and submitting Jobs, as well as support for events, subscriptions and workflows.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"The ",(0,a.kt)("strong",{parentName:"p"},"OpenAPI ",(0,a.kt)("a",{parentName:"strong",href:"https://github.com/buildbeaver/go-sdk/tree/main/bb/client"},"'client' package"))," is a generated OpenAPI client.\nThis provides a lower-level (and less friendly) interface to the API, and does not normally need to be\ncalled directly. Many data types from this package are used in the 'bb' package."))),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Python and TypeScript SDKs"),": OpenAPI-generated clients in Python, TypeScript, and other languages are planned,\nfollowed by custom libraries providing similar functionality to the 'bb' package."))}u.isMDXComponent=!0}}]);