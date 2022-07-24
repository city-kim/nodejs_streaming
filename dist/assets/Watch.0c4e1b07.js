import{d as U,p as o,b as M,j as X,o as $,c as D,g as e,u as s,q as I,k as m,v as y,f as p,_,s as w,h as i,x as q,i as L,l as R,y as Y}from"./index.72c8a0d3.js";import{s as C,t as A}from"./text_converter.5b615358.js";const F={class:"bg-black"},G={class:"flex justify-center relative"},H=["src"],J=L(" Your browser does not support the video tag. "),K={class:"flex w-full h-full absolute top-0 left-0 justify-center items-center"},O={class:"p-5 border-0 rounded-full bg-black/50"},Q=e("div",{class:"w-full h-2 bg-gray-700 absolute top-0 left-0"},null,-1),Z=["value"],ee={class:"flex gap-3 mt-5 items-center fill-white"},le={class:"cursor-pointer"},te={class:"flex gap-3 items-center sound-control"},se={class:"text-white"},oe=e("span",null," / ",-1),ae={class:"pt-5 px-5"},ue={class:"text-2xl"},ie={class:"flex gap-1 mt-3 items-center"},re=U({__name:"Watch",setup(ne){const g=R(),N=Y(),l=o(null),h=M(()=>N.params.key),n=M(()=>g.getters["Video/infomation"]),k=o(null),x=o(!1),c=o(!1),b=o(0),r=o(0),d=o(0),T=o(0),a=o(.5);let z=0;const f=o(!1);function P(){x.value=!0,V(),setTimeout(()=>{x.value=!1},300)}function V(){l.value&&(l.value.paused||l.value.ended?(c.value=!0,l.value.play()):(c.value=!1,l.value.pause()))}function S(){l.value&&(b.value=l.value.currentTime,r.value=Math.floor(b.value/l.value.duration*100))}function j(u){let t=0;k.value&&(t=k.value.clientWidth),t&&u.offsetX>t-50?d.value=t-50:d.value=u.offsetX,T.value=Math.floor(u.offsetX/t*n.value.second)}function B(u){r.value=Number(u.target.value),l.value&&(l.value.currentTime=l.value.duration*(r.value/100))}function E(){l.value&&(l.value.muted&&(l.value.muted=!1,f.value=!1),l.value.volume=a.value)}function W(){f.value?l.value&&(a.value=z,l.value.muted=!1,f.value=!1):l.value&&(z=a.value,a.value=0,l.value.muted=!0,f.value=!0)}return X(()=>{var u;g.dispatch("Video/putVideoCount",{key:h.value}),g.dispatch("Video/getVideoInfomation",{key:h.value}),(u=l.value)==null||u.addEventListener("timeupdate",S)}),(u,t)=>($(),D("div",null,[e("div",F,[e("div",G,[s(h)?($(),D("video",{key:0,class:"w-5/6 max-h-[80vh]",ref_key:"videoEl",ref:l,onClick:P},[e("source",{src:`http://localhost:3000/api/video/stream?key=${s(h)}`,type:"video/mp4"},null,8,H),J],512)):I("",!0),m(e("div",K,[e("div",O,[p(_,{classes:"fill-white",icon:c.value?"play_fill":"pause",size:"3rem"},null,8,["icon"])])],512),[[y,x.value]])]),e("div",{class:"w-full relative video-control",ref_key:"videoWrap",ref:k,onMousemove:t[1]||(t[1]=v=>j(v)),onMouseleave:t[2]||(t[2]=v=>d.value=0)},[m(e("div",{class:"p-1 text-white absolute bg-gary-500 -top-8",style:w(`left: ${d.value}px`)},i(s(C)(T.value)),5),[[y,d.value]]),Q,e("div",{class:"h-2 bg-orange-600 absolute top-0 left-0",style:w(`width: ${r.value}%`)},null,4),e("input",{class:"w-full h-2 absolute top-0 left-0 cursor-pointer",type:"range",step:"1",value:r.value,max:100,onClick:t[0]||(t[0]=v=>B(v))},null,8,Z)],544),e("div",ee,[e("div",le,[m(p(_,{icon:"play_fill",size:"2rem",onClick:V},null,512),[[y,!c.value]]),m(p(_,{icon:"pause",size:"2rem",onClick:V},null,512),[[y,c.value]])]),e("div",te,[p(_,{icon:f.value?"volume_muted":a.value>.6?"volume_high":a.value>.3?"volume_middle":"volume_low",classes:"cursor-pointer",size:"2rem",onClick:W},null,8,["icon"]),m(e("input",{type:"range","onUpdate:modelValue":t[3]||(t[3]=v=>a.value=v),style:w(`background-size: ${a.value*100}% 100%;`),max:"1",min:"0",step:"0.01",onInput:E},null,36),[[q,a.value]])]),e("div",se,[e("time",null,i(s(C)(b.value)),1),oe,e("time",null,i(s(C)(s(n).second)),1)])])]),e("div",ae,[e("h2",ue,i(s(n).title),1),e("div",ie,[e("p",null,"\uC870\uD68C\uC218 "+i(s(n).count)+"\uD68C",1),p(_,{icon:"dot",size:"1rem"}),e("p",null,i(s(A)(s(n).regist_at)),1)]),e("p",null,i(s(n).subject),1)])]))}});export{re as default};
