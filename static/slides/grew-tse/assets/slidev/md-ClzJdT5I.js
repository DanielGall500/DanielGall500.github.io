import{f as u,o as i,e as d,g as t,i as p,k as f,z as m,b as _,w as v,v as b,x as h,T as a}from"../modules/vue-CVLCRBkq.js";import{u as c,f as g}from"./context-BWYgGo19.js";import"../index-DADfVdSF.js";import"../modules/shiki-DeylvYgB.js";function l(e){return e.startsWith("/")?"/"+e.slice(1):e}function k(e,s=!1){const r=e&&["#","rgb","hsl"].some(n=>e.indexOf(n)===0),o={background:r?e:void 0,color:e&&!r?"white":void 0,backgroundImage:r?void 0:e?s?`linear-gradient(#0005, #0008), url(${l(e)})`:`url("${l(e)}")`:void 0,backgroundRepeat:"no-repeat",backgroundPosition:"center",backgroundSize:"cover"};return o.background||delete o.background,o}const x={class:"my-auto w-full"},y=u({__name:"cover",props:{background:{default:""}},setup(e){c();const s=e,r=m(()=>k(s.background,!0));return(o,n)=>(i(),d("div",{class:"slidev-layout cover",style:f(r.value)},[t("div",x,[p(o.$slots,"default")])],4))}}),S={__name:"slides.md__slidev_1",setup(e){const{$clicksContext:s,$frontmatter:r}=c();return s.setup(),(o,n)=>(i(),_(y,b(h(a(g)(a(r),0))),{default:v(()=>[...n[0]||(n[0]=[t("h2",null,"Understanding Syntactic Performance in LLMs",-1),t("h3",null,"A Do-It-Yourself Approach",-1),t("pre",null,`

Daniel Gallagher
Wissenschaftlicher Mitarbeiter (NLP) @ InfAI


`,-1),t("p",null,[t("br"),t("br"),t("br"),t("br"),t("br"),t("br"),t("br")],-1)])]),_:1},16))}};export{S as default};
