import{d as b,l as v,b as x,o as r,c as C,g as e,u as s,h as a,p as g,j as D,F as w,r as $,k as A,v as M,m as L,q as E,a as V,e as j,f as i,w as p,n as y,_ as m}from"./index.4521b066.js";import{s as B}from"./text_converter.5b615358.js";const z={class:"flex w-full h-full items-center justify-center bg-black/50 fixed top-0 right-0 z-10"},S={class:"w-4/12 p-5 bg-white rounded-lg"},N=e("h2",{class:"text-xl"},"\uC774 \uB3D9\uC601\uC0C1\uC744 \uC644\uC804\uD788 \uC0AD\uC81C\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?",-1),q={class:"flex mt-6 p-4 bg-gray-200"},F={class:"flex"},T={class:"relative"},O=["src"],U={class:"px-1 border-0 rounded-sm absolute right-2 bottom-1 bg-stone-900 text-gray-50"},G={class:"ml-3"},H={class:"text-base"},I={class:"text-base text-gray-700"},J={class:"text-base text-gray-500"},K=e("fieldset",{class:"mt-3"},[e("label",null,[e("input",{type:"checkbox"}),e("span",{class:"ml-3"},"\uC0AD\uC81C\uB41C \uB3D9\uC601\uC0C1\uC740 \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C\uC744 \uC54C\uACE0 \uC788\uC2B5\uB2C8\uB2E4.")])],-1),P={class:"flex mt-6 justify-between"},Q=["href"],R={class:"flex gap-5 text-blue-700"},W=b({__name:"Modal",props:{modalConfig:{type:Object,required:!0}},emits:["update:closeModal"],setup(f,{emit:l}){const n=f,d=v(),o=x(()=>n.modalConfig);function _(){d.dispatch("MyList/removeVideo",n.modalConfig.key).then(c=>{console.log(c),l("update:closeModal",!0)}).catch(c=>{console.log(c),l("update:closeModal",!0)})}return(c,u)=>(r(),C("div",z,[e("div",S,[N,e("div",q,[e("div",F,[e("figure",T,[e("img",{class:"w-40",src:`http://localhost:3000/api/thumbnail?key=${s(o).key}`},null,8,O),e("figcaption",U,a(s(B)(s(o).second)),1)])]),e("section",G,[e("h2",H,a(s(o).title?s(o).title:"\uC81C\uBAA9\uC5C6\uC74C"),1),e("h3",I,"\uC5C5\uB85C\uB4DC \uB0A0\uC9DC: "+a(s(o).regist_at),1),e("p",J,"\uC870\uD68C\uC218 "+a(s(o).count)+"\uD68C",1)])]),K,e("div",P,[e("a",{class:"text-blue-700",href:`http://localhost:3000/api/thumbnail?key=${s(o).key}`,target:"_blank"},"\uB3D9\uC601\uC0C1 \uC624\uD504\uB77C\uC778 \uC800\uC7A5",8,Q),e("div",R,[e("button",{type:"button",onClick:u[0]||(u[0]=k=>l("update:closeModal",!1))},"\uCDE8\uC18C"),e("button",{type:"button",onClick:_},"\uC0AD\uC81C")])])])]))}}),X={class:"pt-5 px-3"},Y={class:"bg-white"},Z=V('<h2 class="p-5 text-3xl font-bold">\uB098\uC758 \uCF58\uD150\uCE20 \uBAA9\uB85D</h2><div class="flex w-full mt-3 py-3 px-5 border-y border-gray-300"><div class="w-1/2 pl-5">\uB3D9\uC601\uC0C1</div><div class="w-1/4">\uB0A0\uC9DC</div><div class="w-1/4">\uC870\uD68C\uC218</div></div>',2),ee={class:"flex w-1/2 py-1 pl-5 items-center"},te={class:"relative"},se=["src"],oe={class:"px-1 border-0 rounded-sm absolute right-2 bottom-1 bg-stone-900 text-gray-50"},ae={class:"ml-5"},le={class:"flex pl-5 gap-3"},ue=["onClick"],ce={class:"flex w-4/12 items-center"},ie={class:"flex w-3/12 items-center"},ne={class:"py-5 text-center"},_e=b({__name:"Mylist",setup(f){const l=v(),n=x(()=>l.getters["MyList/videoList"]);let d=g({key:"",title:"",regist_at:"",count:0,second:0});const o=g(!1);function _(u){d.value=u,o.value=!0}function c(u){o.value=!1,d.value={key:"",title:"",regist_at:"",count:0,second:0},u&&(console.log("?"),l.dispatch("MyList/getVideoList"))}return D(()=>{l.dispatch("MyList/getVideoList")}),(u,k)=>{const h=j("router-link");return r(),C("div",X,[e("div",Y,[Z,(r(!0),C(w,null,$(s(n),t=>(r(),C("div",{class:"flex px-5 border-b border-gray-300 hover:bg-gray-100",key:t.key},[e("div",ee,[e("div",null,[i(h,{to:{name:"mylist.modify",params:{key:t.key}}},{default:p(()=>[e("figure",te,[e("img",{class:"w-40",src:`http://localhost:3000/api/thumbnail?key=${t.key}`},null,8,se),e("figcaption",oe,a(s(B)(t.second)),1)])]),_:2},1032,["to"])]),e("div",ae,[e("h3",{class:y(["text-lg",[t.title?"text-black":"text-gray-400"]])},a(t.title?t.title:"\uC81C\uBAA9\uC5C6\uC74C"),3),e("h3",{class:y(["text-base",[t.title?"text-gray-800":"text-gray-300"]])},a(t.subject?t.subject:"\uC124\uBA85\uC5C6\uC74C"),3)]),e("div",le,[i(h,{to:{name:"mylist.modify",params:{key:t.key}}},{default:p(()=>[i(m,{icon:"pencil_square",size:"1.5rem",classes:"fill-gray-500 hover:fill-black"})]),_:2},1032,["to"]),i(h,{to:{name:"watch",params:{key:t.key}}},{default:p(()=>[i(m,{icon:"play_fill",size:"1.5rem",classes:"fill-gray-500 hover:fill-black"})]),_:2},1032,["to"]),e("button",{type:"button",onClick:de=>_(t)},[i(m,{icon:"trash",size:"1.5rem",classes:"fill-gray-500 hover:fill-black"})],8,ue)])]),e("div",ce,a(t.regist_at),1),e("div",ie,a(t.count),1)]))),128)),A(e("div",ne," \uC5C5\uB85C\uB4DC\uB41C \uBE44\uB514\uC624\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4 ",512),[[M,s(n).length<1]])]),o.value?(r(),L(W,{key:0,modalConfig:s(d),"onUpdate:closeModal":c},null,8,["modalConfig"])):E("",!0)])}}});export{_e as default};
