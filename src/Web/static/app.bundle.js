!function(t){var e={};function s(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,s),i.l=!0,i.exports}s.m=t,s.c=e,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)s.d(n,i,function(e){return t[e]}.bind(null,i));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=12)}([function(t,e){t.exports=React},function(t,e,s){"use strict";var n,i=function(){return void 0===n&&(n=Boolean(window&&document&&document.all&&!window.atob)),n},o=function(){var t={};return function(e){if(void 0===t[e]){var s=document.querySelector(e);if(window.HTMLIFrameElement&&s instanceof window.HTMLIFrameElement)try{s=s.contentDocument.head}catch(t){s=null}t[e]=s}return t[e]}}(),r=[];function a(t){for(var e=-1,s=0;s<r.length;s++)if(r[s].identifier===t){e=s;break}return e}function l(t,e){for(var s={},n=[],i=0;i<t.length;i++){var o=t[i],l=e.base?o[0]+e.base:o[0],c=s[l]||0,h="".concat(l," ").concat(c);s[l]=c+1;var p=a(h),d={css:o[1],media:o[2],sourceMap:o[3]};-1!==p?(r[p].references++,r[p].updater(d)):r.push({identifier:h,updater:f(d,e),references:1}),n.push(h)}return n}function c(t){var e=document.createElement("style"),n=t.attributes||{};if(void 0===n.nonce){var i=s.nc;i&&(n.nonce=i)}if(Object.keys(n).forEach((function(t){e.setAttribute(t,n[t])})),"function"==typeof t.insert)t.insert(e);else{var r=o(t.insert||"head");if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(e)}return e}var h,p=(h=[],function(t,e){return h[t]=e,h.filter(Boolean).join("\n")});function d(t,e,s,n){var i=s?"":n.media?"@media ".concat(n.media," {").concat(n.css,"}"):n.css;if(t.styleSheet)t.styleSheet.cssText=p(e,i);else{var o=document.createTextNode(i),r=t.childNodes;r[e]&&t.removeChild(r[e]),r.length?t.insertBefore(o,r[e]):t.appendChild(o)}}function u(t,e,s){var n=s.css,i=s.media,o=s.sourceMap;if(i?t.setAttribute("media",i):t.removeAttribute("media"),o&&btoa&&(n+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}var g=null,m=0;function f(t,e){var s,n,i;if(e.singleton){var o=m++;s=g||(g=c(e)),n=d.bind(null,s,o,!1),i=d.bind(null,s,o,!0)}else s=c(e),n=u.bind(null,s,e),i=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(s)};return n(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;n(t=e)}else i()}}t.exports=function(t,e){(e=e||{}).singleton||"boolean"==typeof e.singleton||(e.singleton=i());var s=l(t=t||[],e);return function(t){if(t=t||[],"[object Array]"===Object.prototype.toString.call(t)){for(var n=0;n<s.length;n++){var i=a(s[n]);r[i].references--}for(var o=l(t,e),c=0;c<s.length;c++){var h=a(s[c]);0===r[h].references&&(r[h].updater(),r.splice(h,1))}s=o}}}},function(t,e,s){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var s=function(t,e){var s=t[1]||"",n=t[3];if(!n)return s;if(e&&"function"==typeof btoa){var i=(r=n,a=btoa(unescape(encodeURIComponent(JSON.stringify(r)))),l="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(a),"/*# ".concat(l," */")),o=n.sources.map((function(t){return"/*# sourceURL=".concat(n.sourceRoot||"").concat(t," */")}));return[s].concat(o).concat([i]).join("\n")}var r,a,l;return[s].join("\n")}(e,t);return e[2]?"@media ".concat(e[2]," {").concat(s,"}"):s})).join("")},e.i=function(t,s,n){"string"==typeof t&&(t=[[null,t,""]]);var i={};if(n)for(var o=0;o<this.length;o++){var r=this[o][0];null!=r&&(i[r]=!0)}for(var a=0;a<t.length;a++){var l=[].concat(t[a]);n&&i[l[0]]||(s&&(l[2]?l[2]="".concat(s," and ").concat(l[2]):l[2]=s),e.push(l))}},e}},function(t,e){t.exports=ReactDOM},function(t,e,s){var n=s(1),i=s(5);"string"==typeof(i=i.__esModule?i.default:i)&&(i=[[t.i,i,""]]);var o={insert:"head",singleton:!1};n(i,o);t.exports=i.locals||{}},function(t,e,s){(e=s(2)(!1)).push([t.i,'* {\n  box-sizing: border-box;\n}\n\n.col-1 {width: 8.33%;}\n.col-2 {width: 16.66%;}\n.col-3 {width: 25%;}\n.col-4 {width: 33.33%;}\n.col-5 {width: 41.66%;}\n.col-6 {width: 50%;} \n.col-7 {width: 58.33%;}\n.col-8 {width: 66.66%;}\n.col-9 {width: 75%;}\n.col-10 {width: 83.33%;}\n.col-11 {width: 91.66%;}\n.col-12 {width: 100%;}\n\n[class*="col-"] {\n  float: left;\n}\n\n.App {\n  display: flex;\n  flex-flow: row nowrap;\n  height: 100%;\n}\n\n[class~="display"] {\n  display: flex;\n  flex-direction: column;\n}\n\n.selected {\n  background: darkgray;\n}\n\n.visible {\n  display: block; \n}\n\n.not-visible {\n  display: none;\n}',""]),t.exports=e},function(t,e,s){var n=s(1),i=s(7);"string"==typeof(i=i.__esModule?i.default:i)&&(i=[[t.i,i,""]]);var o={insert:"head",singleton:!1};n(i,o);t.exports=i.locals||{}},function(t,e,s){(e=s(2)(!1)).push([t.i,".displaying-trash {\n  background-color: rgb(206, 59, 59);\n}",""]),t.exports=e},function(t,e,s){var n=s(1),i=s(9);"string"==typeof(i=i.__esModule?i.default:i)&&(i=[[t.i,i,""]]);var o={insert:"head",singleton:!1};n(i,o);t.exports=i.locals||{}},function(t,e,s){(e=s(2)(!1)).push([t.i,"#editor {\n  height: 100%;\n}\n\n#editor-header {\n  padding: 0;\n  height: 4%;\n}\n\n#note {\n  width: 100%;\n  height: 95%;\n  white-space: pre-wrap;\n}\n\n#note-info {\n  height: 5%;\n}\n\n#group-header {\n  padding-left: 2%;\n}\n\n#note-header {\n  float: right;\n  padding-right: 2%;\n}",""]),t.exports=e},function(t,e,s){var n=s(1),i=s(11);"string"==typeof(i=i.__esModule?i.default:i)&&(i=[[t.i,i,""]]);var o={insert:"head",singleton:!1};n(i,o);t.exports=i.locals||{}},function(t,e,s){(e=s(2)(!1)).push([t.i,".control-container {\n  display: flex;\n  flex-direction: row;\n}\n\n.create-button {\n  background-color: green;\n}\n\n.delete-button {\n  background-color: crimson;\n}\n\n.selected {\n  background-color: lightcoral;\n}",""]),t.exports=e},function(t,e,s){"use strict";s.r(e);var n=s(0),i=s.n(n),o=s(3),r=s.n(o),a=(s(4),s(6),function(t,e,s,n){return new(s||(s=Promise))((function(i,o){function r(t){try{l(n.next(t))}catch(t){o(t)}}function a(t){try{l(n.throw(t))}catch(t){o(t)}}function l(t){var e;t.done?i(t.value):(e=t.value,e instanceof s?e:new s((function(t){t(e)}))).then(r,a)}l((n=n.apply(t,e||[])).next())}))});class l{static get(t){return a(this,void 0,void 0,(function*(){return l.request("GET",t)}))}static delete(t){return l.request("DELETE",t)}static put(t){return l.request("PUT",t)}static post(t){return a(this,void 0,void 0,(function*(){return yield l.request("POST",t)}))}static request(t,e){return a(this,void 0,void 0,(function*(){return(yield fetch(e,{method:t})).json()}))}}var c=function(t,e,s,n){return new(s||(s=Promise))((function(i,o){function r(t){try{l(n.next(t))}catch(t){o(t)}}function a(t){try{l(n.throw(t))}catch(t){o(t)}}function l(t){var e;t.done?i(t.value):(e=t.value,e instanceof s?e:new s((function(t){t(e)}))).then(r,a)}l((n=n.apply(t,e||[])).next())}))};let h;h="http://localhost:5000/Groups";class p{static create(t){return c(this,void 0,void 0,(function*(){return yield l.post(`${h}/${t}`)}))}static getAll(){return c(this,void 0,void 0,(function*(){return yield l.get(""+h)}))}static get(t){return c(this,void 0,void 0,(function*(){return yield l.get(`${h}/${t}`)}))}static rename(t,e){return c(this,void 0,void 0,(function*(){return yield l.put(`${h}/rename/${t}/${e}`)}))}static trash(t){return c(this,void 0,void 0,(function*(){return yield l.put(`${h}/trash/${t}`)}))}static trashGroups(t){fetch(h+"/trash",{method:"PUT",body:JSON.stringify(t),headers:{"Content-Type":"application/json"}})}static restore(t){return c(this,void 0,void 0,(function*(){return yield l.put(`${h}/restore/${t}`)}))}static delete(t){return c(this,void 0,void 0,(function*(){return yield l.delete(`${h}/${t}`)}))}static selectGroups(t){return c(this,void 0,void 0,(function*(){const e=yield fetch(h+"/selections",{method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json"}}).catch(t=>{console.log(t)});return(e?yield e.json():{}).id}))}static deleteGroupsInSelection(t){fetch(`${h}/deleteGroupsInSelection/${t}`,{method:"DELETE"})}static deleteSelection(t){fetch(`${h}/selections/${t}`,{method:"DELETE"})}}var d=function(t,e,s,n){return new(s||(s=Promise))((function(i,o){function r(t){try{l(n.next(t))}catch(t){o(t)}}function a(t){try{l(n.throw(t))}catch(t){o(t)}}function l(t){var e;t.done?i(t.value):(e=t.value,e instanceof s?e:new s((function(t){t(e)}))).then(r,a)}l((n=n.apply(t,e||[])).next())}))};let u;u="http://localhost:5000/Notes";class g{static getAll(){return d(this,void 0,void 0,(function*(){return yield l.get(u)}))}static create(t,e){return d(this,void 0,void 0,(function*(){return yield l.post(`${u}/${t}/${e}`)}))}static get(t){return d(this,void 0,void 0,(function*(){return yield l.get(`${u}/${t}`)}))}static rename(t,e){return l.put(`${u}/rename/${t}/${e}`)}static move(t,e){return l.put(`${u}/move/${t}/${e}`)}static setContent(t){fetch(u+"/setContent",{method:"PUT",body:JSON.stringify(t),headers:{"Content-Type":"application/json"}})}static trash(t){return l.put(`${u}/trash/${t}`)}static trashNotes(t){fetch(u+"/trash",{method:"PUT",body:JSON.stringify(t),headers:{"Content-Type":"application/json"}})}static trashInGroup(t){return l.put(`${u}/trashInGroup/${t}`)}static restore(t){return l.put(`${u}/restore/${t}`)}static restoreInGroup(t){return l.put(`${u}/restoreInGroup/${t}`)}static delete(t){return l.delete(`${u}/${t}`)}static deleteInGroup(t){return l.delete(`${u}/deleteInGroup/${t}`)}static selectNotes(t){return d(this,void 0,void 0,(function*(){const e=yield fetch(u+"/selections",{method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json"}}).catch(t=>{console.log(t)});return(e?yield e.json():{}).id}))}static deleteNotesInSelection(t){fetch(`${u}/deleteNotesInSelection/${t}`,{method:"DELETE"})}static deleteSelection(t){fetch(`${u}/selections/${t}`,{method:"DELETE"})}}var m=function(t,e,s,n){return new(s||(s=Promise))((function(i,o){function r(t){try{l(n.next(t))}catch(t){o(t)}}function a(t){try{l(n.throw(t))}catch(t){o(t)}}function l(t){var e;t.done?i(t.value):(e=t.value,e instanceof s?e:new s((function(t){t(e)}))).then(r,a)}l((n=n.apply(t,e||[])).next())}))};class f extends i.a.Component{constructor(t){super(t),this.clearTrash=()=>m(this,void 0,void 0,(function*(){if(!this.props.isDisplayingTrash)return;const t=this.props.trashedGroups,e=this.props.trashedNotes,s=confirm("All trashed items will be permanently deleted. Proceed?");if(s&&t.length>0){const e=t.map(t=>t.id);this.props.localGroupService.deleteGroups(e);const s=yield p.selectGroups({ids:e});p.deleteGroupsInSelection(s)}if(s&&e.length>0){const t=e.map(t=>t.id);this.props.localNoteService.deleteNotes(t);const s=yield g.selectNotes({ids:t});g.deleteNotesInSelection(s)}}))}render(){const t=this.props.trashedGroups,e=this.props.trashedNotes;return i.a.createElement("div",{id:this.props.id},i.a.createElement("div",null,i.a.createElement("button",{onClick:this.props.displayAllNotes},"All Notes")),i.a.createElement("div",null,i.a.createElement("button",{className:this.props.isDisplayingTrash?"displaying-trash":"",onClick:this.props.displayTrash},"Trash"),this.props.isDisplayingTrash&&(t.length>0||e.length>0)?i.a.createElement("button",{onClick:this.clearTrash},"Clear trash"):null))}}var v=f;s(8);class y extends i.a.Component{constructor(t){super(t),this.saveTimeout=void 0,this.handleTextChange=t=>{const e=t.target.value;window.clearTimeout(this.saveTimeout),this.saveTimeout=window.setTimeout(()=>this.saveContent(e),2e3)},this.saveContent=t=>{this.props.noteId&&(this.props.localNoteService.setContent(this.props.noteId,t),g.setContent({id:this.props.noteId,content:t}))},this.EditorHeader=t=>{let e;return e=""!==t.groupName?t.groupName:t.isDisplayingTrash?"Trash":"All Notes",i.a.createElement("div",{id:"editor-header"},i.a.createElement("span",{id:"group-header"},e),i.a.createElement("span",{id:"note-header"},t.noteName))}}render(){return i.a.createElement("div",{id:this.props.id,className:this.props.className},i.a.createElement(this.EditorHeader,Object.assign({},this.props)),i.a.createElement("textarea",{id:"note",readOnly:this.props.isDisplayingTrash,onChange:this.handleTextChange,placeholder:this.props.noteId?"This note is empty":"Select a note to display its content"}))}componentDidUpdate(t){if(t.noteContent!==this.props.noteContent){document.getElementById("note").value=this.props.noteContent}}}var b=y;s(10);class O extends i.a.Component{constructor(t){super(t),this.handleChange=t=>{this.setState({value:t.target.value})},this.handleSubmit=t=>{t.preventDefault(),this.setState({value:""}),this.props.submit(this.state.value)},this.state={value:""}}render(){const t=this.props.isVisible?"visible":"not-visible";return i.a.createElement("form",{id:this.props.id,className:t,onSubmit:this.handleSubmit},i.a.createElement("label",null,"Name:",i.a.createElement("input",{type:"text",value:this.state.value,onChange:this.handleChange,onBlur:this.props.blur})))}}var D=O;class S extends i.a.Component{constructor(t){super(t),this.itemFormId=this.props.id+"-form",this.showCreateForm=()=>{this.setState({isCreateFormVisible:!0})},this.hideCreateForm=()=>{this.setState({isCreateFormVisible:!1})},this.showRenameForm=()=>{this.setState({isRenameFormVisible:!0})},this.hideRenameForm=()=>{this.setState({isRenameFormVisible:!1})},this.handleSubmit=t=>{this.state.isCreateFormVisible?(this.props.handleCreate(t),this.hideCreateForm()):(this.props.handleRename(this.props.itemOnDisplayId,t),this.hideRenameForm())},this.state={isCreateFormVisible:!1,isRenameFormVisible:!1}}render(){const t=this.props.isDisplayingTrash,e=this.props.itemOnDisplayId;return i.a.createElement("div",{id:this.props.id,className:this.props.className},i.a.createElement("div",{className:"control-container"},i.a.createElement("span",null,this.props.itemLabel),t?null:i.a.createElement("button",{className:"create-button",onClick:()=>this.showCreateForm()},"+"),t&&e?i.a.createElement("button",{className:"restore-button",onClick:()=>this.props.handleRestore(e)},"Restore"):null,e?i.a.createElement("button",{className:"delete-button",onClick:()=>this.props.handleDelete(e)},"-"):null,!t&&e?i.a.createElement("button",{className:"rename-button",onClick:()=>this.showRenameForm()},"Rename"):null),this.props.items,i.a.createElement(D,{id:this.itemFormId,isVisible:this.state.isCreateFormVisible||this.state.isRenameFormVisible,submit:this.handleSubmit,blur:this.state.isCreateFormVisible?this.hideCreateForm:this.hideRenameForm}))}componentDidUpdate(){if(this.state.isCreateFormVisible||this.state.isRenameFormVisible){document.getElementById(this.itemFormId).children[0].focus()}}}var T=S,I=function(t,e,s,n){return new(s||(s=Promise))((function(i,o){function r(t){try{l(n.next(t))}catch(t){o(t)}}function a(t){try{l(n.throw(t))}catch(t){o(t)}}function l(t){var e;t.done?i(t.value):(e=t.value,e instanceof s?e:new s((function(t){t(e)}))).then(r,a)}l((n=n.apply(t,e||[])).next())}))};class N extends i.a.Component{constructor(t){super(t),this.onNoteDrop=(t,e)=>{t.preventDefault();const s=t.dataTransfer.getData("text");this.props.localNoteService.move(parseInt(s),e),g.move(parseInt(s),e)},this.handleCreate=t=>{this.props.localService.create(t),p.create(t)},this.handleDelete=t=>I(this,void 0,void 0,(function*(){const e=this.props.localService.get(t).name;(yield confirm(`You are about to delete ${e} and its associated notes. BEWARE: This operation can not be reversed!`))&&(this.props.localNoteService.deleteInGroup(t),g.deleteInGroup(t),this.props.localService.delete(t),p.delete(t))})),this.handleRename=(t,e)=>{this.props.localService.rename(t,e),p.rename(t,e)},this.handleRestore=t=>{this.props.localService.restore(t),p.restore(t),this.props.localNoteService.restoreInGroup(t),g.restoreInGroup(t)},this.handleTrash=t=>I(this,void 0,void 0,(function*(){const e=this.props.localService.get(t).name;(yield confirm(`Trash ${e} and its associated notes?`))&&(this.props.localNoteService.trashInGroup(t),g.trashInGroup(t),this.props.localService.trash(t),p.trash(t))}))}render(){const t=this.props.groups.map(t=>i.a.createElement("button",{className:this.props.groupOnDisplayId===t.id?"selected":"",key:t.id,onClick:()=>this.props.showGroup(t.id),onDragOver:t=>t.preventDefault(),onDrop:e=>this.onNoteDrop(e,t.id)},t.name));return i.a.createElement(T,{id:this.props.id,className:this.props.className,handleCreate:this.handleCreate,handleDelete:this.props.isDisplayingTrash?this.handleDelete:this.handleTrash,handleRename:this.handleRename,handleRestore:this.handleRestore,show:this.props.showGroup,items:t,itemLabel:this.props.isDisplayingTrash?"Trashed groups":"Groups",itemOnDisplayId:this.props.groupOnDisplayId,isDisplayingTrash:this.props.isDisplayingTrash})}}var j=N;class C extends i.a.Component{constructor(t){super(t),this.handleCreate=t=>{let e=this.props.groupOnDisplayId,s=this.props.localService.create(t,e);this.props.showNote(s.id),g.create(t,e)},this.handleDelete=t=>{const e=this.props.localService.get(t).name;confirm(`You are about to delete ${e}. BEWARE: This operation can not be reversed`)&&(this.props.localService.delete(t),g.delete(t))},this.handleRename=(t,e)=>{this.props.localService.rename(t,e),g.rename(t,e)},this.handleRestore=t=>{this.props.localService.restore(t),g.restore(t)},this.handleTrash=t=>{const e=this.props.localService.get(t).name;confirm(`Trash ${e}?`)&&(this.props.localService.trash(t),g.trash(t))},this.onNoteDragStart=(t,e)=>{t.dataTransfer.setData("text",String(e))}}render(){const t=this.props.notes.map(t=>i.a.createElement("button",{className:this.props.noteOnDisplayId===t.id?"selected":"",draggable:"true",key:t.id,onClick:()=>this.props.showNote(t.id),onDragStart:e=>this.onNoteDragStart(e,t.id)},t.name));return i.a.createElement(T,{id:this.props.id,className:this.props.className,handleCreate:this.handleCreate,handleDelete:this.props.isDisplayingTrash?this.handleDelete:this.handleTrash,handleRename:this.handleRename,handleRestore:this.handleRestore,show:this.props.showNote,items:t,itemLabel:this.props.isDisplayingTrash?"Trashed notes":"Notes",itemOnDisplayId:this.props.noteOnDisplayId,isDisplayingTrash:this.props.isDisplayingTrash})}}var w=C;class E{constructor(t){this.notes={},this.getAll=()=>this.notes,this.get=t=>this.notes[t],this.getInGroup=t=>{const e={};for(const s of Object.values(this.notes))s.groupId==t&&(e[s.id]=s);return e},this.create=(t,e)=>{const s=Object.assign({},this.client.state.notes),n=this.client.state.nextNoteId,i={id:n,name:t,groupId:e,content:"",isTrashed:!1};return s[n]=i,this.client.setState({nextNoteId:n+1,notes:s}),i},this.rename=(t,e)=>{const s=this.get(t),n=Object.assign({},this.notes);n[t]=Object.assign(Object.assign({},s),{name:e});let i=this.client.state.noteOnDisplay;i&&i.id===t&&(i=n[t]),this.client.setState({notes:n,noteOnDisplay:i})},this.move=(t,e)=>{const s=this.get(t),n=Object.assign({},this.notes);n[t]=Object.assign(Object.assign({},s),{groupId:e}),this.client.setState({noteOnDisplay:s,notes:n})},this.setContent=(t,e)=>{const s=this.get(t),n=Object.assign({},this.notes);n[t]=Object.assign(Object.assign({},s),{content:e}),this.client.setState({notes:n})},this.trash=t=>{const e=this.get(t),s=Object.assign({},this.notes);s[t]=Object.assign(Object.assign({},e),{isTrashed:!0});let n=this.client.state.noteOnDisplay;n&&n.id===t&&(n=void 0),this.client.setState({noteOnDisplay:n,notes:s})},this.trashNotes=t=>{const e=Object.assign({},this.notes);let s=this.client.state.noteOnDisplay;for(let n of t){const t=this.get(n);e[n]=Object.assign(Object.assign({},t),{isTrashed:!0}),s&&s.id===n&&(s=void 0)}this.client.setState({noteOnDisplay:s,notes:e})},this.trashInGroup=t=>{const e=Object.assign({},this.notes);let s=Object.values(e).filter(e=>e.groupId===t);for(const t of s)e[t.id]=Object.assign(Object.assign({},t),{isTrashed:!0});let n=this.client.state.noteOnDisplay;n&&n.groupId===t&&(n=void 0),this.client.setState({notes:e,noteOnDisplay:n})},this.restore=t=>{let e=this.get(t);const s=Object.assign({},this.notes);s[t]=Object.assign(Object.assign({},e),{groupId:-1,isTrashed:!1}),this.client.setState({notes:s,noteOnDisplay:void 0})},this.restoreInGroup=t=>{const e=Object.assign({},this.notes),s=Object.values(e).filter(e=>e.groupId===t);for(let t of s)e[t.id]=Object.assign(Object.assign({},t),{isTrashed:!1});this.client.setState({notes:e})},this.delete=t=>{const e=Object.assign({},this.notes);delete e[t];let s=this.client.state.noteOnDisplay;s&&s.id===t&&(s=void 0),this.client.setState({notes:e,noteOnDisplay:s})},this.deleteNotes=t=>{const e=Object.assign({},this.notes);let s=this.client.state.noteOnDisplay;for(let n of t)delete e[n],s&&s.id===n&&(s=void 0);this.client.setState({noteOnDisplay:s,notes:e})},this.deleteInGroup=t=>{let e=Object.assign({},this.notes);Object.values(e).filter(e=>e.groupId===t).map(t=>{delete e[t.id]});let s=this.client.state.noteOnDisplay;s&&s.groupId===t&&(s=void 0),this.client.setState({notes:e,noteOnDisplay:s})},this.client=t,this.notes=t.state.notes}}class x{constructor(t){this.getAll=()=>this.groups,this.get=t=>this.groups[t],this.create=t=>{const e=Object.assign({},this.client.state.groups),s=this.client.state.nextGroupId,n={id:s,name:t,isTrashed:!1};return e[s]=n,this.client.setState({nextGroupId:s+1,groups:e}),n},this.rename=(t,e)=>{const s=this.get(t),n=Object.assign({},this.groups);n[t]=Object.assign(Object.assign({},s),{name:e}),this.client.setState({groups:n})},this.trash=t=>{const e=this.get(t),s=Object.assign({},this.groups);s[t]=Object.assign(Object.assign({},e),{isTrashed:!0});let n=this.client.state.groupOnDisplayId;n===t&&(n=-1),this.client.setState({groups:s,groupOnDisplayId:n})},this.trashGroups=t=>{const e=Object.assign({},this.groups);let s=this.client.state.groupOnDisplayId;for(const n of t){const t=this.get(n);e[n]=Object.assign(Object.assign({},t),{isTrashed:!0}),s===n&&(s=-1)}this.client.setState({groups:e})},this.restore=t=>{const e=this.get(t),s=Object.assign({},this.groups);s[t]=Object.assign(Object.assign({},e),{isTrashed:!1}),this.client.setState({groups:s,groupOnDisplayId:-1,noteOnDisplay:void 0})},this.delete=t=>{const e=Object.assign({},this.groups);delete e[t];let s=this.client.state.groupOnDisplayId;s===t&&(s=-1),this.client.setState({groups:e,groupOnDisplayId:s})},this.deleteGroups=t=>{const e=Object.assign({},this.groups);let s=this.client.state.groupOnDisplayId;for(const n of t)delete e[n],s===n&&(s=-1);this.client.setState({groupOnDisplayId:s,groups:e})},this.client=t,this.groups=t.state.groups}}class $ extends i.a.Component{constructor(t){super(t),this.displayAllNotes=()=>{this.setState({groupOnDisplayId:-1,isDisplayingTrash:!1})},this.displayGroupWithId=t=>{this.setState({groupOnDisplayId:t,noteOnDisplay:void 0})},this.displayNoteWithId=t=>{this.setState({noteOnDisplay:this.state.notes[t]})},this.displayTrash=()=>{this.setState({groupOnDisplayId:-1,noteOnDisplay:void 0,isDisplayingTrash:!0})},this.state={nextGroupId:-1,nextNoteId:-1,groupOnDisplayId:-1,noteOnDisplay:void 0,groups:{},notes:{},isDisplayingTrash:!1}}componentDidMount(){g.getAll().then(t=>{let e={},s=(t.length>0?t[t.length-1].id:0)+1;for(let s of t)e[s.id]=s;return[s,e]}).then(t=>{let[e,s]=t;this.setState({nextNoteId:e,notes:s})}),p.getAll().then(t=>{let e={},s=(t.length>0?t[t.length-1].id:0)+1;for(let s of t)e[s.id]=s;return[s,e]}).then(t=>{const[e,s]=t;this.setState({nextGroupId:e,groups:s})})}render(){const t=new E(this),e=new x(this),s=this.state;let n=Object.values(s.groups),o=Object.values(s.notes),r="";return-1!==s.groupOnDisplayId&&(r=this.state.groups[s.groupOnDisplayId].name,o=o.filter(t=>t.groupId===this.state.groupOnDisplayId)),n=n.filter(t=>s.isDisplayingTrash?t.isTrashed:!t.isTrashed),o=o.filter(t=>s.isDisplayingTrash?t.isTrashed:!t.isTrashed),i.a.createElement("div",{className:"App"},i.a.createElement("div",{className:"col-3"},i.a.createElement(v,{id:"general-displays",displayAllNotes:this.displayAllNotes,displayTrash:this.displayTrash,isDisplayingTrash:this.state.isDisplayingTrash,localGroupService:e,localNoteService:t,trashedGroups:s.isDisplayingTrash?n:[],trashedNotes:s.isDisplayingTrash?o:[]}),i.a.createElement(j,{id:"groups",className:"display",showGroup:this.displayGroupWithId,groups:n,groupOnDisplayId:-1!==s.groupOnDisplayId?s.groupOnDisplayId:void 0,localService:e,localNoteService:t,isDisplayingTrash:s.isDisplayingTrash})),i.a.createElement(b,{id:"editor",className:"col-6",groupName:r,noteName:s.noteOnDisplay?s.noteOnDisplay.name:"",noteContent:s.noteOnDisplay?s.noteOnDisplay.content:"",noteId:s.noteOnDisplay?s.noteOnDisplay.id:void 0,localNoteService:t,isDisplayingTrash:this.state.isDisplayingTrash}),i.a.createElement("div",{className:"col-3"},i.a.createElement(w,{id:"notes",className:"display",showNote:this.displayNoteWithId,notes:o,noteOnDisplayId:s.noteOnDisplay?s.noteOnDisplay.id:void 0,groupOnDisplayId:s.groupOnDisplayId,localService:t,isDisplayingTrash:s.isDisplayingTrash})))}}var G=$;r.a.render(i.a.createElement(G,null),document.getElementById("root"))}]);