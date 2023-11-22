"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[229],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>b});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=a.createContext({}),l=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=l(e.components);return a.createElement(p.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=l(n),m=r,b=u["".concat(p,".").concat(m)]||u[m]||d[m]||i;return n?a.createElement(b,o(o({ref:t},c),{},{components:n})):a.createElement(b,o({ref:t},c))}));function b(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=m;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s[u]="string"==typeof e?e:r,o[1]=s;for(var l=2;l<i;l++)o[l]=n[l];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},2522:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>d,frontMatter:()=>i,metadata:()=>s,toc:()=>l});var a=n(7462),r=(n(7294),n(3905));const i={sidebar_position:4},o="Steps",s={unversionedId:"guide-to-dynamic-builds/steps",id:"guide-to-dynamic-builds/steps",title:"Steps",description:"Steps are individually tracked units of work within a job; the BuildBeaver server can show the progress within a",source:"@site/docs/guide-to-dynamic-builds/steps.md",sourceDirName:"guide-to-dynamic-builds",slug:"/guide-to-dynamic-builds/steps",permalink:"/docs/guide-to-dynamic-builds/steps",draft:!1,tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Jobs",permalink:"/docs/guide-to-dynamic-builds/jobs"},next:{title:"Docker Configuration",permalink:"/docs/guide-to-dynamic-builds/docker-configuration"}},p={},l=[{value:"Adding a Step",id:"adding-a-step",level:2},{value:"Step Execution",id:"step-execution",level:2},{value:"Step Definitions",id:"step-definitions",level:2}],c={toc:l},u="wrapper";function d(e){let{components:t,...n}=e;return(0,r.kt)(u,(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"steps"},"Steps"),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Steps")," are individually tracked units of work within a job; the BuildBeaver server can show the progress within a\nJob by displaying the status of each Step."),(0,r.kt)("p",null,"Each job must contain at least one Step, and each Step contains a list of shell commands to run."),(0,r.kt)("h2",{id:"adding-a-step"},"Adding a Step"),(0,r.kt)("p",null,"The workflow handler function adds a new Step to a Job by calling ",(0,r.kt)("inlineCode",{parentName:"p"},"NewStep()")," to create a\n",(0,r.kt)("em",{parentName:"p"},"Step object"),", then calling the Job's ",(0,r.kt)("inlineCode",{parentName:"p"},"Step()")," method to add the Step. Properties are set on the Step\nby calling methods on the object."),(0,r.kt)("p",null,"Here's an example (in Go) of a Job containing two Steps, run sequentially:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},'    w.Job(bb.NewJob().\n        Name("test-job").\n        Docker(bb.NewDocker().Image("docker:20.10").Pull(bb.DockerPullIfNotExists)).\n        StepExecution(bb.StepExecutionSequential). // this is the default, can be omitted\n        Step(bb.NewStep().\n            Name("first-step").\n            Commands("echo This is the first step in the Job...")).\n        Step(bb.NewStep().\n            Name("second-step").\n            Commands("echo A second step..."), \n        ))\n')),(0,r.kt)("h2",{id:"step-execution"},"Step Execution"),(0,r.kt)("p",null,"All Steps within a Job are run within the same environment, specified in the Job. This means that steps within\na single Job can share files or other state. Steps do not have access to the output from jobs other than their\nown unless they use ",(0,r.kt)("a",{parentName:"p",href:"jobs#job-dependencies"},"Artifact Dependencies")," to make files available."),(0,r.kt)("p",null,"By default the steps in a job will be run sequentially. The Job can be configured to run all\nSteps in parallel using the ",(0,r.kt)("a",{parentName:"p",href:"jobs#job-definitions"},"StepExecution")," method on the Job object."),(0,r.kt)("h2",{id:"step-definitions"},"Step Definitions"),(0,r.kt)("p",null,"The following methods are available to set properties on a Step:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Name")," (mandatory): a name to use when referencing the step, unique within the Job.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Desc")," (optional): a human-readable description for the step.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Commands")," (mandatory): A list of command strings to run, to perform the work of the Step. These commands\nwill be run sequentially using the shell specified in the Job configuration, on a runner that matches\nthe RunsOn() specified in the Job.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Depends")," (optional): A list of step names that must be completed before this step can be run. Only steps within\nthe current job can be referenced, and this list is only used when steps in the current job are\nbeing executed in parallel.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"DependsOnSteps")," (optional): Similar to the ",(0,r.kt)("em",{parentName:"p"},"Depends")," method but takes a list of ",(0,r.kt)("em",{parentName:"p"},"Step objects")," rather\nthan step names, specifying steps that must be completed before this step can be run."))))}d.isMDXComponent=!0}}]);