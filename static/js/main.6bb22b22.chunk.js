(this["webpackJsonpchess-season"]=this["webpackJsonpchess-season"]||[]).push([[0],{1:function(e,t,a){e.exports={event:"cs_event__2tDr_",group:"cs_group__1-hdn",id:"cs_id__3BMVs",date:"cs_date__1dYKo",day:"cs_day__1PdK7",description:"cs_description__3EtTf",type:"cs_type__3nZ3J",button:"cs_button__3EpXZ",inputFieldLabel:"cs_inputFieldLabel__MYFiI",inputField:"cs_inputField__1Lwoq",fieldset:"cs_fieldset__3vDl5",debug:"cs_debug__21WGv",displayNone:"cs_displayNone__3XO6Z",displayInitial:"cs_displayInitial__1aZto"}},11:function(e,t,a){e.exports=a(19)},16:function(e,t,a){},19:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),i=a(6),o=a.n(i),l=(a(16),a(3)),c=a(4),r=a(9),u=a(7),d=a(2),h=a(10),p=a(8),m=a.n(p),v=function(){function e(){Object(l.a)(this,e)}return Object(c.a)(e,null,[{key:"InverseDateString",value:function(e){if(void 0===e)return null;var t=e.split("-");return 3!==t.length?null:"".concat(t[2],"-").concat(t[1],"-").concat(t[0])}},{key:"GetDay",value:function(e){return["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][e.getDay()]}}]),e}();function y(){return"undefined"==typeof y.counter&&(y.counter=0),y.counter++,y.counter}var b=function e(t){Object(l.a)(this,e),this.objectId=y(),this.group=t.group,this.date=t.date,this.description=t.description,this.type=t.type;var a=new Date(t.date);this.day=v.GetDay(a)},w=function e(t,a,n,s){Object(l.a)(this,e),this.group=t,this.date=a,this.description=n,this.type=s},f=function e(t,a,n){Object(l.a)(this,e),this.key=t,this.token=a,this.value=n},g=a(1),E=a.n(g),k=function e(t,a){Object(l.a)(this,e),this.key=t,this.token=a};function D(e){var t=new Date(e.date);return s.a.createElement(m.a,{format:"DD-MM-YYYY"},t)}var S=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(r.a)(this,Object(u.a)(t).call(this,e))).state={events:[],source:"",newGroup:"",newDate:"",newDescription:"",newType:"",key:"",token:"",isShowNewEvent:!1,isShowDebug:!1,isShowInfo:!1},a.onDelete=a.onDelete.bind(Object(d.a)(a)),a.onChangeGroup=a.onChangeGroup.bind(Object(d.a)(a)),a.onChangeDate=a.onChangeDate.bind(Object(d.a)(a)),a.onChangeDescription=a.onChangeDescription.bind(Object(d.a)(a)),a.onChangeType=a.onChangeType.bind(Object(d.a)(a)),a.onChangeKey=a.onChangeKey.bind(Object(d.a)(a)),a.onChangeToken=a.onChangeToken.bind(Object(d.a)(a)),a.onAdd=a.onAdd.bind(Object(d.a)(a)),a.onSave=a.onSave.bind(Object(d.a)(a)),a.onReload=a.onReload.bind(Object(d.a)(a)),a.setIsShowNewEvent=a.setIsShowNewEvent.bind(Object(d.a)(a)),a.setIsShowDebug=a.setIsShowDebug.bind(Object(d.a)(a)),a.setIsShowInfo=a.setIsShowInfo.bind(Object(d.a)(a)),a}return Object(h.a)(t,e),Object(c.a)(t,[{key:"onDelete",value:function(e){var t=this.state.events.filter((function(t){return t.objectId!==e}));this.setState({events:t})}},{key:"onChangeGroup",value:function(e){this.setState({newGroup:e.target.value})}},{key:"onChangeDate",value:function(e){this.setState({newDate:e.target.value})}},{key:"onChangeDescription",value:function(e){this.setState({newDescription:e.target.value})}},{key:"onChangeType",value:function(e){this.setState({newType:e.target.value})}},{key:"onChangeKey",value:function(e){this.setState({key:e.target.value})}},{key:"onChangeToken",value:function(e){this.setState({token:e.target.value})}},{key:"onAdd",value:function(){var e=new Date;if(""!==this.state.newDate){var t=this.state.newDate.split("-");3===t.length&&(e=new Date(Date.UTC(t[2],t[1]-1,t[0])))}e.setHours(0,0,0,0);var a=new w(this.state.newGroup,e.toISOString(),this.state.newDescription,this.state.newType),n=new b(a),s=this.state.events.concat(n);s.sort((function(e,t){return new Date(e.date)-new Date(t.date)})),this.setState({events:s})}},{key:"onSave",value:function(){var e=this,t=window.location.href,a=localStorage.getItem("keys"),n=JSON.parse(a),s="",i="";n&&n.key&&n.token?(s=n.key,i=n.token):t.includes("localhost")&&(s="4265AC3D-DD4B-427C-8BFD-6D7E7BB92C09");var o="https://www.odusseus.org/php/item";t.includes("localhost")&&(o="http://localhost:9000");var l=o+"/postitem.php",c=JSON.stringify(this.state.events),r=new f(s,i,c),u=new Headers;u.append("Accept","application/json"),u.append("Content-Type","application/json"),fetch(l,{method:"POST",body:JSON.stringify(r)}).then((function(e){return e.json()})).then((function(t){var a=new k(t.key,t.token);localStorage.setItem("keys",JSON.stringify(a)),e.setState({key:t.key,token:t.token})})).catch(console.log)}},{key:"setIsShowNewEvent",value:function(){var e=!this.state.isShowNewEvent;this.setState({isShowNewEvent:e})}},{key:"setIsShowDebug",value:function(){var e=!this.state.isShowDebug;this.setState({isShowDebug:e})}},{key:"setIsShowInfo",value:function(){var e=!this.state.isShowInfo;this.setState({isShowInfo:e})}},{key:"setKeys",value:function(){var e=new k(this.state.key,this.state.token);localStorage.setItem("keys",JSON.stringify(e))}},{key:"onReload",value:function(){window.location.reload()}},{key:"componentDidMount",value:function(){var e=this,t=localStorage.getItem("keys"),a=JSON.parse(t);this.setState({key:a.key,token:a.token});var n=window.location.href,s="",i="";a&&a.key&&a.token?(s=a.key,i=a.token):n.includes("localhost")&&(s="4265AC3D-DD4B-427C-8BFD-6D7E7BB92C09");var o="https://www.odusseus.org/php/item";n.includes("localhost")&&(o="http://localhost:9000");var l=o+"/getitem.php?key="+s+"&token="+i;this.setState({source:o}),fetch(l).then((function(e){return e.json()})).then((function(t){var a=JSON.parse(t.value),n=[],s=new Date;s.setHours(0,0,0,0),a.forEach((function(e){if(new Date(e.date)>=s){var t=new b(e);n.push(t)}})),n.sort((function(e,t){return new Date(e.date)-new Date(t.date)})),e.setState({events:n})})).catch(console.log)}},{key:"render",value:function(){var e=this,t=null,a=null,n=this.state.isShowNewEvent?E.a.displayInitial:E.a.displayNone,i=this.state.isShowDebug?E.a.displayInitial:E.a.displayNone,o=this.state.isShowInfo?E.a.displayInitial:E.a.displayNone;return s.a.createElement(s.a.Fragment,null,s.a.createElement("nav",null,s.a.createElement("ul",null,s.a.createElement("li",null,s.a.createElement("div",{className:E.a.button},s.a.createElement("button",{onClick:function(){return e.setIsShowNewEvent()}},"New"))),s.a.createElement("li",null,s.a.createElement("div",{className:E.a.button},s.a.createElement("button",{onClick:function(){return e.setIsShowInfo()}},"Info"))))),s.a.createElement("div",{className:o},s.a.createElement("fieldset",{className:E.a.fieldset},s.a.createElement("legend",null,"Info"),s.a.createElement("div",null,"Events (23-102019) v1.2.0 from ",this.state.source),s.a.createElement("div",{className:E.a.button},s.a.createElement("button",{className:E.a.button,onClick:function(){return e.onReload()}},"Reload")),s.a.createElement("div",{className:E.a.button},s.a.createElement("button",{onClick:function(){return e.setIsShowDebug()}},"Debug")),s.a.createElement("div",{className:E.a.inputField},s.a.createElement("label",{className:E.a.inputFieldLabel},"Key"),s.a.createElement("input",{className:E.a.inputField,type:"text",value:this.state.key,onChange:this.onChangeKey})),s.a.createElement("div",{className:E.a.inputField},s.a.createElement("label",{className:E.a.inputFieldLabel},"Token"),s.a.createElement("input",{className:E.a.inputField,type:"text",value:this.state.token,onChange:this.onChangeToken})),s.a.createElement("div",{className:E.a.button},s.a.createElement("button",{onClick:function(){return e.setKeys()}},"Set Keys")))),s.a.createElement("div",{className:n},s.a.createElement("fieldset",{className:E.a.fieldset},s.a.createElement("legend",null,"New event"),s.a.createElement("div",{className:E.a.inputField},s.a.createElement("label",{className:E.a.inputFieldLabel},"Group"),s.a.createElement("input",{className:E.a.inputField,type:"text",onChange:this.onChangeGroup})),s.a.createElement("div",{className:E.a.inputField},s.a.createElement("label",{className:E.a.inputFieldLabel},"Date"),s.a.createElement("input",{className:E.a.inputField,type:"text",onChange:this.onChangeDate})),s.a.createElement("div",{className:E.a.inputField},s.a.createElement("label",{className:E.a.inputFieldLabel},"Description"),s.a.createElement("input",{className:E.a.inputField,type:"text",onChange:this.onChangeDescription})),s.a.createElement("div",{className:E.a.inputField},s.a.createElement("label",{className:E.a.inputFieldLabel},"Type"),s.a.createElement("input",{className:E.a.inputField,type:"text",onChange:this.onChangeType})),s.a.createElement("div",{className:E.a.button},s.a.createElement("button",{onClick:function(){return e.onAdd()}},"Add")),s.a.createElement("div",{className:E.a.button},s.a.createElement("button",{onClick:function(){return e.onSave()}},"Save"))),s.a.createElement("div",{className:i},s.a.createElement("div",null,"Group: ",this.state.newGroup),s.a.createElement("div",null,"Date: ",this.state.newDate),s.a.createElement("div",null,"Description: ",this.state.newDescription),s.a.createElement("div",null,"Type: ",this.state.newType))),s.a.createElement("div",null,this.state.events.map((function(n){return t!==n.group?(t=n.group,a="For ".concat(n.group)):a="",s.a.createElement("div",{className:E.a.event,key:n.objectId},s.a.createElement("div",{className:E.a.group},a),s.a.createElement("div",{className:E.a.id},n.objectId),s.a.createElement("div",{className:E.a.day},n.day),s.a.createElement("div",{className:E.a.date},s.a.createElement(D,{date:n.date})),s.a.createElement("div",{className:E.a.description},n.description),s.a.createElement("div",{className:E.a.type},n.type),s.a.createElement("div",{className:E.a.button},s.a.createElement("button",{onClick:function(){return e.onDelete(n.objectId)}},"Delete")))}))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(s.a.createElement(S,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[11,1,2]]]);
//# sourceMappingURL=main.6bb22b22.chunk.js.map