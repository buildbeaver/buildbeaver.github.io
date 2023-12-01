"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[653],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>b});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),u=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=u(e.components);return r.createElement(s.Provider,{value:t},e.children)},c="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},g=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),c=u(n),g=o,b=c["".concat(s,".").concat(g)]||c[g]||p[g]||a;return n?r.createElement(b,i(i({ref:t},d),{},{components:n})):r.createElement(b,i({ref:t},d))}));function b(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=g;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[c]="string"==typeof e?e:o,i[1]=l;for(var u=2;u<a;u++)i[u]=n[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}g.displayName="MDXCreateElement"},9614:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>p,frontMatter:()=>a,metadata:()=>l,toc:()=>u});var r=n(7462),o=(n(7294),n(3905));const a={sidebar_position:1},i="Create a Build in Go",l={unversionedId:"getting-started-go/create-a-build-in-go",id:"getting-started-go/create-a-build-in-go",title:"Create a Build in Go",description:"The easiest and most powerful way to define your build in BuildBeaver is using code. The code can",source:"@site/docs/getting-started-go/create-a-build-in-go.md",sourceDirName:"getting-started-go",slug:"/getting-started-go/create-a-build-in-go",permalink:"/docs/getting-started-go/create-a-build-in-go",draft:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Getting Started - Go",permalink:"/docs/category/getting-started---go"},next:{title:"Run the Go Build",permalink:"/docs/getting-started-go/run-the-go-build"}},s={},u=[{value:"Create a Go program using the BuildBeaver SDK",id:"create-a-go-program-using-the-buildbeaver-sdk",level:2}],d={toc:u},c="wrapper";function p(e){let{components:t,...n}=e;return(0,o.kt)(c,(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"create-a-build-in-go"},"Create a Build in Go"),(0,o.kt)("p",null,"The easiest and most powerful way to define your build in BuildBeaver is using code. The code can\nbe as simple as YAML, but provides all the power of a full programming language."),(0,o.kt)("p",null,"This page shows you how to use the BuildBeaver Go SDK to define a dynamic build, using the ",(0,o.kt)("inlineCode",{parentName:"p"},"build1")," directory you\nalready set up in the ",(0,o.kt)("a",{parentName:"p",href:"../category/getting-started---first-build/"},"Getting Started - First Build")," tutorial."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Prerequisite"),": Install ",(0,o.kt)("a",{parentName:"p",href:"https://go.dev/doc/install"},"Golang")," version 1.18 or greater on your development machine."),(0,o.kt)("h2",{id:"create-a-go-program-using-the-buildbeaver-sdk"},"Create a Go program using the BuildBeaver SDK"),(0,o.kt)("p",null,"Make a new directory with a Go project for the build definition:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"cd build1\nmkdir build\ncd build\ngo mod init example.com/build\n")),(0,o.kt)("p",null,"Fetch the BuildBeaver Go SDK:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"go get github.com/buildbeaver/go-sdk/bb\n")),(0,o.kt)("p",null,"Create a Go file inside the ",(0,o.kt)("inlineCode",{parentName:"p"},"build")," directory called ",(0,o.kt)("inlineCode",{parentName:"p"},"build.go")," and paste in the following contents:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-go"},'package main\n\nimport (\n    "fmt"\n    "github.com/buildbeaver/go-sdk/bb"\n)\n\nfunc main() {\n    bb.Workflows(\n        bb.NewWorkflow().Name("test-workflow").Handler(submitTestJobs),\n    )\n}\n\nfunc submitTestJobs(w *bb.Workflow) error {\n    bb.Log(bb.LogLevelInfo, fmt.Sprintf("Build Beaver dynamic build - running workflow \'%s\'", w.GetName()))\n\n    w.Job(bb.NewJob().\n        Name("run-tests").\n        Desc("This is a Job that simulates running tests").\n        Docker(bb.NewDocker().Image("docker:20.10").Pull(bb.DockerPullIfNotExists)).\n        Step(bb.NewStep().\n            Name("produce-report").\n            Commands("echo \'Run-Tests Job Executing...\'",\n                "mkdir -p reports",\n                "echo >reports/test-report.txt \'Test Report (artifact from the run-tests job)\'",\n            )).\n        Artifact(bb.NewArtifact().Name("test-reports").Paths("reports/test-report.txt")).\n        OnCompletion(func(event *bb.JobStatusChangedEvent) {\n            bb.Log(bb.LogLevelInfo, "run-tests job is finished; new jobs could be added here")\n        }))\n    return nil\n}\n')),(0,o.kt)("p",null,"We'll explain more about what's in the program later."),(0,o.kt)("p",null,"After creating the ",(0,o.kt)("inlineCode",{parentName:"p"},"build.go")," file you should run the following commands to sync the go.mod file and vendor directory:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"go mod tidy\ngo mod vendor\n")))}p.isMDXComponent=!0}}]);