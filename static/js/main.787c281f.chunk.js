(this["webpackJsonpvoca-quiz"]=this["webpackJsonpvoca-quiz"]||[]).push([[0],{14:function(e,t,a){e.exports=a(20)},19:function(e,t,a){},2:function(e,t,a){e.exports={event:"cs_event__3RPh1",group:"cs_group__1AOht",id:"cs_id__3gZxB",date:"cs_date__2x8AP",day:"cs_day__3Vqrj",description:"cs_description__229cd",type:"cs_type__z4ETh",button:"cs_button__3d4Lv",inputFieldLabel:"cs_inputFieldLabel__1c2LT",inputField:"cs_inputField__5jkxO",fieldset:"cs_fieldset__2Mk0m",debug:"cs_debug__1qcK0",displayNone:"cs_displayNone__3hEyG",displayInitial:"cs_displayInitial__2OEDJ"}},20:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(10),l=a.n(r),o=(a(19),a(1)),i=a(21),s=a(4),u="/ItemGetApi.php",m="/UserLoginApi.php",d="https://www.odusseus.org/php/elpida",p=a(7);a(11);var v=a(12),b=a(9),f=a(2),E=a.n(f),h=function e(t,a,n){Object(p.a)(this,e),this.value=a,this.comment=n,this.id=t};function O(e){var t=e.item,a=e.index,n=e.handleItemClick,r=e.handleRemoveClick;return c.a.createElement("div",{className:E.a.group,key:t.id},c.a.createElement("div",{className:E.a.id},t.id),c.a.createElement("div",{className:E.a.description},"Value: ",t.value),c.a.createElement("div",null,"Comment: ",t.comment),c.a.createElement("div",{className:E.a.button},c.a.createElement("button",{onClick:function(){return n(a)}},"Edit"),c.a.createElement("button",{onClick:function(){return r(a)}},"Delete")))}function j(e){var t=e.item,a=e.addItem,r=Object(n.useState)(t.id),l=Object(o.a)(r,2),i=l[0],s=l[1],u=Object(n.useState)(t.value),m=Object(o.a)(u,2),d=m[0],p=m[1],v=Object(n.useState)(t.comment),b=Object(o.a)(v,2),f=b[0],O=b[1],j=Object(n.useState)(""),g=Object(o.a)(j,2),w=g[0],y=(g[1],Object(n.useState)("")),S=Object(o.a)(y,2),k=S[0];S[1];Object(n.useEffect)((function(){s(t.id),p(t.value),O(t.comment)}),[t]);return c.a.createElement("form",{onSubmit:function(e){if(e.preventDefault(),d){var t=new h(i,d,f);a(t);var n=new h(0,"","");s(n.id),p(n.value),O(n.comment)}}},c.a.createElement("fieldset",{className:E.a.fieldset},c.a.createElement("legend",null,"Edit Item:"),c.a.createElement("div",{className:E.a.id},c.a.createElement("label",{className:E.a.inputFieldLabel},"id"),c.a.createElement("div",null,i)),c.a.createElement("div",{className:E.a.inputField},c.a.createElement("label",{className:E.a.inputFieldLabel},"Value",c.a.createElement("input",{className:E.a.inputField,type:"text",value:d,onChange:function(e){return p(e.target.value)},placeholder:"my value..."}))),c.a.createElement("div",{className:E.a.inputField},c.a.createElement("label",{className:E.a.inputFieldLabel},"comment",c.a.createElement("input",{className:E.a.inputField,type:"text",value:f,onChange:function(e){return O(e.target.value)},placeholder:"my comment..."}))),c.a.createElement("div",{className:E.a.button},c.a.createElement("input",{type:"submit",value:"Save"})),c.a.createElement(_,{message:k}),c.a.createElement(N,{error:w})));function N(e){var t=e.error;return c.a.createElement("div",null,t)}function _(e){var t=e.message;return c.a.createElement("div",null,t)}}function g(e){var t=e.show,a=Object(n.useState)(E.a.displayInitial),r=Object(o.a)(a,2),l=r[0],s=r[1],m=Object(n.useState)([]),p=Object(o.a)(m,2),f=p[0],g=p[1],S=Object(n.useState)(new h(0,"","")),k=Object(o.a)(S,2),N=k[0],_=k[1],C=Object(n.useState)(""),I=Object(o.a)(C,2),x=I[0],T=I[1],F=Object(n.useState)(""),L=Object(o.a)(F,2),A=L[0],J=L[1],P=Object(n.useState)(0),D=Object(o.a)(P,2),G=D[0],R=D[1],U=Object(n.useState)(!1),V=Object(o.a)(U,2),q=V[0],z=V[1],B=Object(i.a)(["token"]),M=Object(o.a)(B,3),W=M[0],H=(M[1],M[2],t?E.a.displayInitial:E.a.displayNone);l!==H&&s(H),Object(n.useEffect)((function(){T(""),J("");var e="?token=".concat(W.token);fetch("".concat(d).concat(u).concat(e),{method:"GET",credentials:"include",headers:{"content-type":"application/x-www-form-urlencoded"}}).then((function(e){return e.json()})).then((function(e){if(console.log(e),200===e.statusCode){J(e.message);var t=[],a=0;if(e.message){var n=JSON.parse(e.message);try{t=JSON.parse(n.value)}catch(r){}a=n.version}g(t),R(a),_(new h(0,"",""))}else{var c=e.message;401===e.statusCode&&(c="You are logged out, svp login again."),T(c)}})).catch((function(e){console.error("There was an error.",e),T("There was an error : ".concat(d).concat(u," error:").concat(e))}))}),[l]),Object(n.useEffect)((function(){q&&(K(),z(!1))}),[q]);var K=function(){T(""),J("");var e=JSON.stringify(f),t={credentials:"include",method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},body:JSON.stringify({value:e,version:G})},a="?token=".concat(W.token);fetch("".concat(d).concat("/ItemSetApi.php").concat(a),t).then((function(e){return e.json()})).then((function(e){console.log(e),200===e.statusCode?J(e.message):T(e.message)})).catch((function(e){console.error("There was an error.",e),T("There was an error : ".concat(d).concat("/ItemSetApi.php"))}))};var Q=function(e){var t=Object(b.a)(f);t.splice(e,1),g(t),K()},Y=function(e){var t=f[e];_(Object(v.a)({},t))};return c.a.createElement("div",{className:l},c.a.createElement("h2",null,"List"),c.a.createElement(j,{item:N,addItem:function(e){var t=f;if(void 0===t&&(t=[]),""===e.id||0===e.id){e.id=0;for(var a=0;a<t.length;a++){var n=t[a].id;n>e.id&&(e.id=n)}e.id++}var c=t.filter((function(t){return t.id!==e.id})),r=[].concat(Object(b.a)(c),[e]).sort(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"asc";return function(a,n){if(!a.hasOwnProperty(e)||!n.hasOwnProperty(e))return 0;var c="string"===typeof a[e]?a[e].toUpperCase():a[e],r="string"===typeof n[e]?n[e].toUpperCase():n[e],l=0;return c>r?l=1:c<r&&(l=-1),"desc"===t?-1*l:l}}("value"));g(r),z(!0),_(new h(0,"",""))}}),c.a.createElement("div",null,f.length?f.map((function(e,t){return c.a.createElement(O,{key:e.id,item:e,index:t,handleItemClick:Y,handleRemoveClick:Q})})):""),c.a.createElement(y,{message:A}),c.a.createElement(w,{error:x}))}function w(e){var t=e.error;return c.a.createElement("div",null,t)}function y(e){var t=e.message;return c.a.createElement("div",null,t)}function S(){var e=Object(n.useState)(!1),t=Object(o.a)(e,2),a=t[0],r=t[1],l=Object(n.useState)(!1),i=Object(o.a)(l,2),s=i[0],u=i[1],m=Object(n.useState)(!1),d=Object(o.a)(m,2),p=d[0],v=d[1];return c.a.createElement("div",{className:E.a.event},c.a.createElement("nav",null,c.a.createElement("button",{onClick:function(){r(!a)}},"Info"),c.a.createElement("button",{onClick:function(){u(!s)}},"Sign in"),c.a.createElement("button",{onClick:function(){v(!p)}},"Show Items List")),c.a.createElement("div",{className:E.a.group},c.a.createElement("h1",null,"Hello Voca-Quiz!"),c.a.createElement(k,{show:a}),c.a.createElement(_,{show:s}),c.a.createElement(g,{show:p})))}function k(e){var t=e.show?E.a.displayInitial:E.a.displayNone,a=Object(n.useState)(!1),r=Object(o.a)(a,2),l=r[0],i=r[1],s=Object(n.useState)(!1),u=Object(o.a)(s,2),m=u[0],d=u[1],p=Object(n.useState)(!1),v=Object(o.a)(p,2),b=v[0],f=v[1];return c.a.createElement("div",{className:t},c.a.createElement("nav",null,c.a.createElement("button",{onClick:function(){i(!l)}},"Item length"),c.a.createElement("button",{onClick:function(){d(!m)}},"Save Item"),c.a.createElement("button",{onClick:function(){f(!b)}},"Get Item")),c.a.createElement("div",null,c.a.createElement("p",null,"Item 1.0.4 9-8-2020 Refresh item list when is showed."),c.a.createElement("p",null,"Item 1.0.3 9-8-2020 Timeout cookie is fixed."),c.a.createElement("p",null,"Item 1.0.2 8-8-2020 Save new item is fixed."),c.a.createElement("p",null,"Item 1.0.1 8-8-2020 Basic version.")),c.a.createElement("div",{className:E.a.group},c.a.createElement(C,{show:l}),c.a.createElement(I,{show:m}),c.a.createElement(x,{show:b})))}function N(e){var t=e.show?E.a.displayInitial:E.a.displayNone,a=Object(n.useState)(""),r=Object(o.a)(a,2),l=r[0],i=r[1],u=Object(n.useState)(""),m=Object(o.a)(u,2),p=m[0],v=m[1],b=Object(n.useState)(""),f=Object(o.a)(b,2),h=f[0],O=f[1],j=Object(n.useState)(""),g=Object(o.a)(j,2),w=g[0],y=g[1],S=Object(n.useState)(""),k=Object(o.a)(S,2),N=k[0],_=k[1];return c.a.createElement("div",{className:t},c.a.createElement("form",{onSubmit:function(e){y(""),_(""),e.preventDefault();var t={method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},body:JSON.stringify({appname:"voca",nickname:l,password:p,email:h})};Object(s.a)("".concat(d).concat("/UserCreateApi.php"),t).then((function(e){return e.json()})).then((function(e){console.log(e),console.log("ready"),200===e.statusCode?_(e.message):y(e.message)})).catch((function(e){console.error("There was an error.",e),y("There was an error with UserCreateApi.")}))}},c.a.createElement("fieldset",{className:E.a.fieldset},c.a.createElement("legend",null,"New account:"),c.a.createElement("div",null,c.a.createElement("label",null,"Nickname",c.a.createElement("input",{type:"text",value:l,onChange:function(e){return i(e.target.value)},placeholder:"my nickname"}))),c.a.createElement("div",null,c.a.createElement("label",null,"Password",c.a.createElement("input",{type:"text",value:p,onChange:function(e){return v(e.target.value)},placeholder:"my password"}))),c.a.createElement("div",null,c.a.createElement("label",null,"Email",c.a.createElement("input",{type:"text",value:h,onChange:function(e){return O(e.target.value)},placeholder:"my@mail.org"}))),c.a.createElement("div",null,c.a.createElement("input",{type:"submit",value:"Ok"})),c.a.createElement(F,{message:N}),c.a.createElement(T,{error:w}))))}function _(e){var t=e.show?E.a.displayInitial:E.a.displayNone,a=Object(n.useState)(""),r=Object(o.a)(a,2),l=r[0],u=r[1],p=Object(n.useState)(""),v=Object(o.a)(p,2),b=v[0],f=v[1],h=Object(n.useState)(!1),O=Object(o.a)(h,2),j=O[0],g=O[1],w=Object(n.useState)(""),y=Object(o.a)(w,2),S=y[0],k=y[1],_=Object(n.useState)(""),C=Object(o.a)(_,2),I=C[0],x=C[1],L=Object(i.a)(["token"]),A=Object(o.a)(L,3),J=(A[0],A[1]),P=(A[2],Object(n.useState)(!1)),D=Object(o.a)(P,2),G=D[0],R=D[1];return c.a.createElement("div",{className:t},c.a.createElement("button",{onClick:function(){R(!G)}},"New account"),c.a.createElement(N,{show:G}),c.a.createElement("form",{onSubmit:function(e){k(""),x(""),e.preventDefault();var t={credentials:"include",method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},body:JSON.stringify({appname:"voca",nickname:l,password:b,iscookiepermanent:j})};Object(s.a)("".concat(d).concat(m),t).then((function(e){try{return e.json()}catch(t){return e.text()}})).then((function(e){if(console.log(e),200===e.statusCode){x(e.message);var t=1e3*parseInt(e.tokenTimeoutSeconde,10),a=new Date(t);J("token",e.token,{expires:a})}else void 0!==e.statusCode?k(e.message):k(e)})).catch((function(e){console.error("There was an error.",e),k("There was an error : ".concat(d).concat(m))}))}},c.a.createElement("fieldset",{className:E.a.fieldset},c.a.createElement("legend",null,"Login:"),c.a.createElement("div",null,c.a.createElement("label",null,"Nickname",c.a.createElement("input",{type:"text",value:l,onChange:function(e){return u(e.target.value)},placeholder:"my nickname"}))),c.a.createElement("div",null,c.a.createElement("label",null,"Password",c.a.createElement("input",{type:"text",value:b,onChange:function(e){return f(e.target.value)},placeholder:"my password"}))),c.a.createElement("div",null,c.a.createElement("label",null,"Remember me?",c.a.createElement("input",{type:"checkbox",defaultChecked:j,onChange:function(e){return g(e.target.checked)}}))),c.a.createElement("div",null,c.a.createElement("input",{type:"submit",value:"Ok"})),c.a.createElement(F,{message:I}),c.a.createElement(T,{error:S}))))}function C(e){var t=e.show?E.a.displayInitial:E.a.displayNone,a=Object(n.useState)(""),r=Object(o.a)(a,2),l=r[0],u=r[1],p=Object(n.useState)(""),v=Object(o.a)(p,2),b=v[0],f=v[1],h=Object(i.a)(["token"]),O=Object(o.a)(h,3),j=O[0];O[1],O[2];return c.a.createElement("div",{className:t},c.a.createElement("form",{onSubmit:function(e){u(""),f(""),e.preventDefault();var t="&token=".concat(j.token);Object(s.a)("".concat(d).concat("/ItemGetApi.php?itemlength").concat(t),{method:"GET",credentials:"include",headers:{"content-type":"application/x-www-form-urlencoded"}}).then((function(e){return e.json()})).then((function(e){console.log(e),200===e.statusCode?f(e.message):u(e.message)})).catch((function(e){console.error("There was an error.",e),u("There was an error : ".concat(d).concat(m))}))}},c.a.createElement("fieldset",{className:E.a.fieldset},c.a.createElement("legend",null,"Itemlength:"),c.a.createElement("div",null,c.a.createElement("input",{type:"submit",value:"Ok"})),c.a.createElement(F,{message:b}),c.a.createElement(T,{error:l}))))}function I(e){var t=e.show?E.a.displayInitial:E.a.displayNone,a=Object(n.useState)(""),r=Object(o.a)(a,2),l=r[0],u=r[1],p=Object(n.useState)(0),v=Object(o.a)(p,2),b=v[0],f=v[1],h=Object(n.useState)(""),O=Object(o.a)(h,2),j=O[0],g=O[1],w=Object(n.useState)(""),y=Object(o.a)(w,2),S=y[0],k=y[1],N=Object(i.a)(["token"]),_=Object(o.a)(N,3),C=_[0];_[1],_[2];return c.a.createElement("div",{className:t},c.a.createElement("form",{onSubmit:function(e){g(""),k(""),e.preventDefault();var t={credentials:"include",method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},body:JSON.stringify({value:l,version:b})},a="?token=".concat(C.token);Object(s.a)("".concat(d).concat("/ItemSetApi.php").concat(a),t).then((function(e){return e.json()})).then((function(e){console.log(e),200===e.statusCode?k(e.message):g(e.message)})).catch((function(e){console.error("There was an error.",e),g("There was an error : ".concat(d).concat(m))}))}},c.a.createElement("fieldset",{className:E.a.fieldset},c.a.createElement("legend",null,"Save Item:"),c.a.createElement("div",null,c.a.createElement("label",null,"Version",c.a.createElement("input",{type:"number",value:b,onChange:function(e){return f(e.target.value)},placeholder:"0"}))),c.a.createElement("div",null,c.a.createElement("label",null,"Item",c.a.createElement("input",{type:"text",value:l,onChange:function(e){return u(e.target.value)},placeholder:"my text..."}))),c.a.createElement("div",null,c.a.createElement("input",{type:"submit",value:"Ok"})),c.a.createElement(F,{message:S}),c.a.createElement(T,{error:j}))))}function x(e){var t=e.show?E.a.displayInitial:E.a.displayNone,a=Object(n.useState)(""),r=Object(o.a)(a,2),l=r[0],p=r[1],v=Object(n.useState)(""),b=Object(o.a)(v,2),f=b[0],h=b[1],O=Object(i.a)(["token"]),j=Object(o.a)(O,3),g=j[0];j[1],j[2];return c.a.createElement("div",{className:t},c.a.createElement("form",{onSubmit:function(e){p(""),h(""),e.preventDefault();var t="?token=".concat(g.token);Object(s.a)("".concat(d).concat(u).concat(t),{credentials:"include",method:"GET",headers:{"content-type":"application/x-www-form-urlencoded"}}).then((function(e){return e.json()})).then((function(e){console.log(e),200===e.statusCode?h(e.message):p(e.message)})).catch((function(e){console.error("There was an error.",e),p("There was an error : ".concat(d).concat(m))}))}},c.a.createElement("fieldset",{className:E.a.fieldset},c.a.createElement("legend",null,"Item:"),c.a.createElement("div",null,c.a.createElement("input",{type:"submit",value:"Ok"})),c.a.createElement(F,{message:f}),c.a.createElement(T,{error:l}))))}function T(e){var t=e.error;return c.a.createElement("div",null,t)}function F(e){var t=e.message;return c.a.createElement("div",null,t)}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(S,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[14,1,2]]]);
//# sourceMappingURL=main.787c281f.chunk.js.map