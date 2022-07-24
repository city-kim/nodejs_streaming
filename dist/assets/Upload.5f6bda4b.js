import{d as A,p as o,o as z,c as S,g as e,k as h,v as D,n as F,f as T,_ as j,s as L,h as V,i as R,l as M,B as N}from"./index.4521b066.js";const I={class:"h-full p-5"},O={class:"mt-[30vh] text-center"},$={class:"upload-btn-group"},Z=e("div",{class:"w-0 h-0"},null,-1),q=e("div",{class:"w-full h-2 mt-3 bg-gray-300"},null,-1),G=e("h2",{class:"mt-3 text-3xl font-bold"},"\uB3D9\uC601\uC0C1 \uC5C5\uB85C\uB4DC",-1),H=e("p",{class:"mt-3 text-gray-700"},"\uB3D9\uC601\uC0C1 \uD30C\uC77C\uC744 \uB4DC\uB798\uADF8 \uC564 \uB4DC\uB86D\uD558\uC5EC \uC5C5\uB85C\uB4DC",-1),J={class:"flex mt-3 items-center justify-center"},K=R("\uD30C\uC77C \uD615\uC2DD\uC774 \uC798\uBABB\uB418\uC5C8\uC2B5\uB2C8\uB2E4. "),P={class:"w-1/2 mt-[30vh] p-y-2 bg-gray-200 rounded-full h-2.5"},Q={class:"mt-3 text-center text-3xl"},W=["src"],X=e("p",{class:"mt-auto pb-2 text-gray-500"},"\uBD88\uBC95\uCD2C\uC601\uBB3C \uAC8C\uC7AC\uC2DC \uC0AD\uC81C \uC870\uCE58\uB418\uACE0 \uAD00\uB828 \uBC95\uC5D0 \uB530\uB77C \uCC98\uBC8C \uBC1B\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uD0C0\uC778\uC758 \uC800\uC791\uAD8C \uB610\uB294 \uAC1C\uC778\uC815\uBCF4 \uBCF4\uD638 \uAD8C\uD55C\uC744 \uCE68\uD574\uD574\uC11C\uB294 \uC548 \uB429\uB2C8\uB2E4.",-1),te=A({__name:"Upload",setup(Y){const d=M(),C=o(null),t=o(null),m=o(!1),r=o(""),_=o(null),f=o(null),n=o(0),v=o("\uC5C5\uB85C\uB4DC\uC911...");function g(){var u;(u=C.value)==null||u.click()}function x(u){u.preventDefault()}function w(u){u.preventDefault(),u.dataTransfer&&(t.value=u.dataTransfer.files[0])}function E(u){let l=u.target.files;l?(t.value=l[0],k()):m.value=!0,C.value&&(C.value.value="")}async function k(){if(t.value){r.value=URL.createObjectURL(t.value);const u=_.value,l=1*(1024*1024),s=Math.ceil(t.value.size/l);let B=[],b=0;for(let a=0;a<s;a++){let i=Math.min(l*(a+1),t.value.size);B.push(t.value.slice(b,i,t.value.type)),b=i}const c=Math.random().toString(16).substring(2);for(let a=0;a<B.length;a++)await d.dispatch("Upload/postUploadFile",{key:c,file:B[a],size:s,index:a}),n.value=(a+1)/s*100;d.dispatch("Upload/createVideo",{key:c,size:s,name:t.value.name,type:t.value.type}).then(a=>{var i,y;if(v.value="\uBE44\uB514\uC624\uB97C \uB9CC\uB4DC\uB294\uC911...",t.value=null,u){let p=(i=f.value)==null?void 0:i.getContext("2d");p==null||p.drawImage(u,0,0,360,200),(y=f.value)==null||y.toBlob(U=>{d.dispatch("Upload/postUploadThumbnail",{file:U,key:c}).then(ee=>{v.value="\uC378\uB124\uC77C \uC81C\uC791\uC911...",setTimeout(()=>{N.push({name:"mylist.modify",params:{key:c}}),n.value=0},500)}),URL.revokeObjectURL(r.value),r.value=""},"image/png")}})}}return(u,l)=>(z(),S("div",I,[e("div",{class:"flex flex-col h-full items-center justify-between bg-white border-0 rounded-lg",id:"dragZone",onDragover:l[1]||(l[1]=s=>x(s)),onDrop:l[2]||(l[2]=s=>w(s))},[h(e("section",O,[e("input",{class:"hidden",type:"file",ref_key:"fileUploader",ref:C,onChange:l[0]||(l[0]=s=>E(s))},null,544),e("div",{class:"flex w-40 h-40 mx-auto items-center justify-center bg-gray-200 rounded-full cursor-pointer",onClick:g},[e("div",$,[Z,e("div",{class:F(["w-8 mx-auto bg-gray-300 transition-all",[t.value?"h-2":"h-5"]])},null,2),q])]),G,H,h(e("p",J,[T(j,{icon:"exclamation",class:"fill-red-500 mr-3"}),K],512),[[D,m.value]]),e("button",{class:"mt-8 px-8 py-3 border border-blue-700 rounded bg-blue-500 text-white",type:"button",onClick:g},"\uD30C\uC77C \uC120\uD0DD")],512),[[D,n.value<1]]),h(e("div",P,[e("div",{class:"bg-blue-600 h-2.5 rounded-full",style:L(`width: ${n.value}%`)},null,4),e("h2",Q,V(v.value),1)],512),[[D,n.value>0]]),e("video",{class:"w-0 h-0 invisible",src:r.value,ref_key:"videoEl",ref:_},null,8,W),e("canvas",{class:"invisible fixed right-0 bottom-0 z-0",width:"360",height:"200",ref_key:"canvasEl",ref:f},null,512),X],32)]))}});export{te as default};
