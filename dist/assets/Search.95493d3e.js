import{d as g,t as C,e as x,o as n,c as r,f as d,w as y,g as t,u as a,h as i,_ as b,z as k,j as w,A as B,B as v,F as p,r as h,l as S,m as j}from"./index.5f782db2.js";import{t as $}from"./text_converter.5b615358.js";const D={class:"relative"},E=["src"],K={class:"px-1 border-0 rounded-sm absolute right-2 bottom-1 bg-stone-900 text-gray-50"},L={class:"ml-4"},N={class:"text-2xl"},A={class:"flex items-center"},V=g({__name:"VideoList",props:{watchKey:String,name:String,title:String,subject:String,regist_at:{type:String,required:!0},second:{type:Number,required:!0},count:Number},setup(c){const m=c,{watchKey:s,title:l,subject:u,count:o}=C(m);return(_,e)=>{const f=x("router-link");return n(),r("div",null,[d(f,{to:{name:"watch",params:{key:a(s)}}},{default:y(()=>[t("figure",D,[t("img",{class:"block mx-auto",src:`http://localhost:3000/api/thumbnail?key=${a(s)}`},null,8,E),t("figcaption",K,i(c.second),1)])]),_:1},8,["to"]),t("div",L,[t("h2",N,i(a(l)),1),t("div",A,[t("p",null,"\uC870\uD68C\uC218 "+i(a(o))+"\uD68C",1),d(b,{icon:"dot",size:"1rem"}),t("p",null,i(a($)(c.regist_at)),1)])])])}}}),q={class:"pt-5 px-3 bg-gray-200"},z={class:"2xl:container mx-auto flex flex-wrap gap-y-10 justify-center items-baseline"},F={class:"flex flex-col gap-3"},R=g({__name:"Search",setup(c){const s=S().getters["Home/searchList"],l=k(()=>{const u=[];if(s.length>0)for(let o=0;o<s.length;o+=4)u.push(s.slice(o,o+4));return u});return w(()=>{s.length<1&&(B.wakeup({title:"\uC2E4\uD328",contents:"\uAC80\uC0C9\uB0B4\uC6A9\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}),v.push({name:"home"}))}),(u,o)=>(n(),r("div",q,[t("div",z,[(n(!0),r(p,null,h(a(l),_=>(n(),r("div",F,[(n(!0),r(p,null,h(_,e=>(n(),j(V,{class:"flex mx-3",watchKey:e.key,name:e.name,title:e.title,subject:e.subject,second:e.second,count:e.count,regist_at:e.regist_at,type:"wide"},null,8,["watchKey","name","title","subject","second","count","regist_at"]))),256))]))),256))])]))}});export{R as default};
