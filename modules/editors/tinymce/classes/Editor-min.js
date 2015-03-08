define("tinymce/Editor",["tinymce/dom/DOMUtils","tinymce/AddOnManager","tinymce/html/Node","tinymce/dom/Serializer","tinymce/html/Serializer","tinymce/dom/Selection","tinymce/Formatter","tinymce/UndoManager","tinymce/EnterKey","tinymce/ForceBlocks","tinymce/EditorCommands","tinymce/util/URI","tinymce/dom/ScriptLoader","tinymce/dom/EventUtils","tinymce/WindowManager","tinymce/html/Schema","tinymce/html/DomParser","tinymce/util/Quirks","tinymce/Env","tinymce/util/Tools","tinymce/util/Observable","tinymce/Shortcuts"],function(J,t,o,B,z,v,q,e,A,w,m,u,j,k,D,f,b,s,E,h,d,G){var r=J.DOM,F=t.ThemeManager,I=t.PluginManager;var g=h.extend,C=h.each,i=h.explode;var H=h.inArray,a=h.trim,l=h.resolve;var y=k.Event;var c=E.gecko,x=E.ie;function p(L,K){if(K=="selectionchange"){return L.getDoc()}if(!L.inline&&/^mouse|click|contextmenu|drop/.test(K)){return L.getDoc()}return L.getBody()}function n(P,M,O){var L=this,K,N;K=L.documentBaseUrl=O.documentBaseURL;N=O.baseURI;L.settings=M=g({id:P,theme:"modern",delta_width:0,delta_height:0,popup_css:"",plugins:"",document_base_url:K,add_form_submit_trigger:true,submit_patch:true,add_unload_trigger:true,convert_urls:true,relative_urls:true,remove_script_host:true,object_resizing:true,doctype:"<!DOCTYPE html>",visual:true,font_size_style_values:"xx-small,x-small,small,medium,large,x-large,xx-large",font_size_legacy_values:"xx-small,small,medium,large,x-large,xx-large,300%",forced_root_block:"p",hidden_input:true,padd_empty_editor:true,render_ui:true,indentation:"30px",inline_styles:true,convert_fonts_to_spans:true,indent:"simple",indent_before:"p,h1,h2,h3,h4,h5,h6,blockquote,div,title,style,pre,script,td,ul,li,area,table,thead,tfoot,tbody,tr,section,article,hgroup,aside,figure,option,optgroup,datalist",indent_after:"p,h1,h2,h3,h4,h5,h6,blockquote,div,title,style,pre,script,td,ul,li,area,table,thead,tfoot,tbody,tr,section,article,hgroup,aside,figure,option,optgroup,datalist",validate:true,entity_encoding:"named",url_converter:L.convertURL,url_converter_scope:L,ie7_compat:true},M);t.language=M.language||"en";t.languageLoad=M.language_load;t.baseURL=O.baseURL;L.id=M.id=P;L.isNotDirty=true;L.plugins={};L.documentBaseURI=new u(M.document_base_url||K,{base_uri:N});L.baseURI=N;L.contentCSS=[];L.contentStyles=[];L.shortcuts=new G(L);L.execCommands={};L.queryStateCommands={};L.queryValueCommands={};L.loadedCSS={};L.suffix=O.suffix;L.editorManager=O;L.inline=M.inline;O.fire("SetupEditor",L);L.execCallback("setup",L)}n.prototype={render:function(){var K=this,N=K.settings,Q=K.id,P=K.suffix;function M(){r.unbind(window,"ready",M);K.render()}if(!y.domLoaded){r.bind(window,"ready",M);return}if(!K.getElement()){return}if(!E.contentEditable){return}if(!N.inline){K.orgVisibility=K.getElement().style.visibility;K.getElement().style.visibility="hidden"}else{K.inline=true}var O=K.getElement().form||r.getParent(Q,"form");if(O){K.formElement=O;if(N.hidden_input&&!/TEXTAREA|INPUT/i.test(K.getElement().nodeName)){r.insertAfter(r.create("input",{type:"hidden",name:Q}),Q);K.hasHiddenInput=true}K.formEventDelegate=function(R){K.fire(R.type,R)};r.bind(O,"submit reset",K.formEventDelegate);K.on("reset",function(){K.setContent(K.startContent,{format:"raw"})});if(N.submit_patch&&!O.submit.nodeType&&!O.submit.length&&!O._mceOldSubmit){O._mceOldSubmit=O.submit;O.submit=function(){K.editorManager.triggerSave();K.isNotDirty=true;return O._mceOldSubmit(O)}}}K.windowManager=new D(K);if(N.encoding=="xml"){K.on("GetContent",function(R){if(R.save){R.content=r.encode(R.content)}})}if(N.add_form_submit_trigger){K.on("submit",function(){if(K.initialized){K.save()}})}if(N.add_unload_trigger){K._beforeUnload=function(){if(K.initialized&&!K.destroyed&&!K.isHidden()){K.save({format:"raw",no_events:true,set_dirty:false})}};K.editorManager.on("BeforeUnload",K._beforeUnload)}function L(){var S=j.ScriptLoader;if(N.language&&N.language!="en"&&!N.language_url){N.language_url=K.editorManager.baseURL+"/langs/"+N.language+".js"}if(N.language_url){S.add(N.language_url)}if(N.theme&&typeof N.theme!="function"&&N.theme.charAt(0)!="-"&&!F.urls[N.theme]){var R=N.theme_url;if(R){R=K.documentBaseURI.toAbsolute(R)}else{R="themes/"+N.theme+"/theme"+P+".js"}F.load(N.theme,R)}if(h.isArray(N.plugins)){N.plugins=N.plugins.join(" ")}C(N.external_plugins,function(U,T){I.load(T,U);N.plugins+=" "+T});C(N.plugins.split(/[ ,]/),function(T){T=a(T);if(T&&!I.urls[T]){if(T.charAt(0)=="-"){T=T.substr(1,T.length);var U=I.dependencies(T);C(U,function(W){var V={prefix:"plugins/",resource:W,suffix:"/plugin"+P+".js"};W=I.createUrl(V,W);I.load(W.resource,W)})}else{I.load(T,{prefix:"plugins/",resource:T,suffix:"/plugin"+P+".js"})}}});S.loadQueue(function(){if(!K.removed){K.init()}})}L()},init:function(){var R=this,aa=R.settings,O=R.getElement();var P,Y,N,U,S,K,L,ac,X,T,W,M=[];R.rtl=this.editorManager.i18n.rtl;R.editorManager.add(R);aa.aria_label=aa.aria_label||r.getAttrib(O,"aria-label",R.getLang("aria.rich_text_area"));if(aa.theme){if(typeof aa.theme!="function"){aa.theme=aa.theme.replace(/-/,"");K=F.get(aa.theme);R.theme=new K(R,F.urls[aa.theme]);if(R.theme.init){R.theme.init(R,F.urls[aa.theme]||R.documentBaseUrl.replace(/\/$/,""))}}else{R.theme=aa.theme}}function ab(ag){var af=I.get(ag),ae,ad;ae=I.urls[ag]||R.documentBaseUrl.replace(/\/$/,"");ag=a(ag);if(af&&H(M,ag)===-1){C(I.dependencies(ag),function(ah){ab(ah)});ad=new af(R,ae);R.plugins[ag]=ad;if(ad.init){ad.init(R,ae);M.push(ag)}}}C(aa.plugins.replace(/\-/g,"").split(/[ ,]/),ab);if(aa.render_ui&&R.theme){R.orgDisplay=O.style.display;if(typeof aa.theme!="function"){P=aa.width||O.style.width||O.offsetWidth;Y=aa.height||O.style.height||O.offsetHeight;N=aa.min_height||100;T=/^[0-9\.]+(|px)$/i;if(T.test(""+P)){P=Math.max(parseInt(P,10),100)}if(T.test(""+Y)){Y=Math.max(parseInt(Y,10),N)}S=R.theme.renderUI({targetNode:O,width:P,height:Y,deltaWidth:aa.delta_width,deltaHeight:aa.delta_height});if(!aa.content_editable){r.setStyles(S.sizeContainer||S.editorContainer,{wi2dth:P,h2eight:Y});Y=(S.iframeHeight||Y)+(typeof(Y)=="number"?(S.deltaHeight||0):"");if(Y<N){Y=N}}}else{S=aa.theme(R,O);if(S.editorContainer.nodeType){S.editorContainer=S.editorContainer.id=S.editorContainer.id||R.id+"_parent"}if(S.iframeContainer.nodeType){S.iframeContainer=S.iframeContainer.id=S.iframeContainer.id||R.id+"_iframecontainer"}Y=S.iframeHeight||O.offsetHeight}R.editorContainer=S.editorContainer}if(aa.content_css){C(i(aa.content_css),function(ad){R.contentCSS.push(R.documentBaseURI.toAbsolute(ad))})}if(aa.content_style){R.contentStyles.push(aa.content_style)}if(aa.content_editable){O=U=S=null;return R.initContentBody()}R.iframeHTML=aa.doctype+"<html><head>";if(aa.document_base_url!=R.documentBaseUrl){R.iframeHTML+='<base href="'+R.documentBaseURI.getURI()+'" />'}if(!E.caretAfter&&aa.ie7_compat){R.iframeHTML+='<meta http-equiv="X-UA-Compatible" content="IE=7" />'}R.iframeHTML+='<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />';for(W=0;W<R.contentCSS.length;W++){var V=R.contentCSS[W];R.iframeHTML+='<link type="text/css" rel="stylesheet" href="'+V+'" />';R.loadedCSS[V]=true}ac=aa.body_id||"tinymce";if(ac.indexOf("=")!=-1){ac=R.getParam("body_id","","hash");ac=ac[R.id]||ac}X=aa.body_class||"";if(X.indexOf("=")!=-1){X=R.getParam("body_class","","hash");X=X[R.id]||""}R.iframeHTML+='</head><body id="'+ac+'" class="mce-content-body '+X+'" onload="window.parent.tinymce.get(\''+R.id+"').fire('load');\"><br></body></html>";var Q='javascript:(function(){document.open();document.domain="'+document.domain+'";var ed = window.parent.tinymce.get("'+R.id+'");document.write(ed.iframeHTML);document.close();ed.initContentBody(true);})()';if(document.domain!=location.hostname){L=Q}U=r.add(S.iframeContainer,"iframe",{id:R.id+"_ifr",src:L||'javascript:""',frameBorder:"0",allowTransparency:"true",title:R.editorManager.translate("Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help"),style:{width:"100%",height:Y,display:"block"}});if(x){try{R.getDoc()}catch(Z){U.src=L=Q}}R.contentAreaContainer=S.iframeContainer;if(S.editorContainer){r.get(S.editorContainer).style.display=R.orgDisplay}r.get(R.id).style.display="none";r.setAttrib(R.id,"aria-hidden",true);if(!L){R.initContentBody()}O=U=S=null},initContentBody:function(L){var M=this,N=M.settings,O=r.get(M.id),P=M.getDoc(),K,Q;if(!N.inline){M.getElement().style.visibility=M.orgVisibility}if(!L&&!N.content_editable){P.open();P.write(M.iframeHTML);P.close()}if(N.content_editable){M.on("remove",function(){var R=this.getBody();r.removeClass(R,"mce-content-body");r.removeClass(R,"mce-edit-focus");r.setAttrib(R,"contentEditable",null)});r.addClass(O,"mce-content-body");M.contentDocument=P=N.content_document||document;M.contentWindow=N.content_window||window;M.bodyElement=O;N.content_document=N.content_window=null;N.root_name=O.nodeName.toLowerCase()}K=M.getBody();K.disabled=true;if(!N.readonly){if(M.inline&&r.getStyle(K,"position",true)=="static"){K.style.position="relative"}K.contentEditable=M.getParam("content_editable_state",true)}K.disabled=false;M.schema=new f(N);M.dom=new J(P,{keep_values:true,url_converter:M.convertURL,url_converter_scope:M,hex_colors:N.force_hex_style_colors,class_filter:N.class_filter,update_styles:true,root_element:N.content_editable?M.id:null,collect:N.content_editable,schema:M.schema,onSetAttrib:function(R){M.fire("SetAttrib",R)}});M.parser=new b(N,M.schema);M.parser.addAttributeFilter("src,href,style,tabindex",function(R,S){var T=R.length,V,X=M.dom,W,U;while(T--){V=R[T];W=V.attr(S);U="data-mce-"+S;if(!V.attributes.map[U]){if(S==="style"){V.attr(U,X.serializeStyle(X.parseStyle(W),V.name))}else{if(S==="tabindex"){V.attr(U,W);V.attr(S,null)}else{V.attr(U,M.convertURL(W,S,V.name))}}}}});M.parser.addNodeFilter("script",function(R){var S=R.length,T;while(S--){T=R[S];T.attr("type","mce-"+(T.attr("type")||"text/javascript"))}});M.parser.addNodeFilter("#cdata",function(R){var S=R.length,T;while(S--){T=R[S];T.type=8;T.name="#comment";T.value="[CDATA["+T.value+"]]"}});M.parser.addNodeFilter("p,h1,h2,h3,h4,h5,h6,div",function(S){var T=S.length,U,R=M.schema.getNonEmptyElements();while(T--){U=S[T];if(U.isEmpty(R)){U.empty().append(new o("br",1)).shortEnded=true}}});M.serializer=new B(N,M);M.selection=new v(M.dom,M.getWin(),M.serializer,M);M.formatter=new q(M);M.undoManager=new e(M);M.forceBlocks=new w(M);M.enterKey=new A(M);M.editorCommands=new m(M);M.fire("PreInit");if(!N.browser_spellcheck&&!N.gecko_spellcheck){P.body.spellcheck=false;r.setAttrib(K,"spellcheck","false")}M.fire("PostRender");M.quirks=s(M);if(N.directionality){K.dir=N.directionality}if(N.nowrap){K.style.whiteSpace="nowrap"}if(N.protect){M.on("BeforeSetContent",function(R){C(N.protect,function(S){R.content=R.content.replace(S,function(T){return"<!--mce:protected "+escape(T)+"-->"})})})}M.on("SetContent",function(){M.addVisual(M.getBody())});if(N.padd_empty_editor){M.on("PostProcess",function(R){R.content=R.content.replace(/^(<p[^>]*>(&nbsp;|&#160;|\s|\u00a0|)<\/p>[\r\n]*|<br \/>[\r\n]*)$/,"")})}M.load({initial:true,format:"html"});M.startContent=M.getContent({format:"raw"});M.initialized=true;C(M._pendingNativeEvents,function(R){M.dom.bind(p(M,R),R,function(S){M.fire(S.type,S)})});M.fire("init");M.focus(true);M.nodeChanged({initial:true});M.execCallback("init_instance_callback",M);if(M.contentStyles.length>0){Q="";C(M.contentStyles,function(R){Q+=R+"\r\n"});M.dom.addStyle(Q)}C(M.contentCSS,function(R){if(!M.loadedCSS[R]){M.dom.loadCSS(R);M.loadedCSS[R]=true}});if(N.auto_focus){setTimeout(function(){var R=M.editorManager.get(N.auto_focus);R.selection.select(R.getBody(),1);R.selection.collapse(1);R.getBody().focus();R.getWin().focus()},100)}O=P=K=null},focus:function(O){var N,T=this,S=T.selection,P=T.settings.content_editable,K;var Q,R=T.getDoc(),L;if(!O){K=S.getRng();if(K.item){Q=K.item(0)}T._refreshContentEditable();if(!P){if(!E.opera){T.getBody().focus()}T.getWin().focus()}if(c||P){L=T.getBody();if(L.setActive){try{L.setActive()}catch(M){L.focus()}}else{L.focus()}if(P){S.normalize()}}if(Q&&Q.ownerDocument==R){K=R.body.createControlRange();K.addElement(Q);K.select()}}if(T.editorManager.activeEditor!=T){if((N=T.editorManager.activeEditor)){N.fire("deactivate",{relatedTarget:T})}T.fire("activate",{relatedTarget:N})}T.editorManager.activeEditor=T},execCallback:function(L){var K=this,N=K.settings[L],M;if(!N){return}if(K.callbackLookup&&(M=K.callbackLookup[L])){N=M.func;M=M.scope}if(typeof(N)==="string"){M=N.replace(/\.\w+$/,"");M=M?l(M):0;N=l(N);K.callbackLookup=K.callbackLookup||{};K.callbackLookup[L]={func:N,scope:M}}return N.apply(M||K,Array.prototype.slice.call(arguments,1))},translate:function(M){var L=this.settings.language||"en",K=this.editorManager.i18n;if(!M){return""}return K.data[L+"."+M]||M.replace(/\{\#([^\}]+)\}/g,function(O,N){return K.data[L+"."+N]||"{#"+N+"}"})},getLang:function(K,L){return(this.editorManager.i18n.data[(this.settings.language||"en")+"."+K]||(L!==undefined?L:"{#"+K+"}"))},getParam:function(L,O,M){var N=L in this.settings?this.settings[L]:O,K;if(M==="hash"){K={};if(typeof(N)==="string"){C(N.indexOf("=")>0?N.split(/[;,](?![^=;,]*(?:[;,]|$))/):N.split(","),function(P){P=P.split("=");if(P.length>1){K[a(P[0])]=a(P[1])}else{K[a(P[0])]=a(P)}})}else{K=N}return K}return N},nodeChanged:function(){var L=this,N=L.selection,O,M,K;if(L.initialized&&!L.settings.disable_nodechange&&!L.settings.readonly){K=L.getBody();O=N.getStart()||K;O=x&&O.ownerDocument!=L.getDoc()?L.getBody():O;if(O.nodeName=="IMG"&&N.isCollapsed()){O=O.parentNode}M=[];L.dom.getParent(O,function(P){if(P===K){return true}M.push(P)});L.fire("NodeChange",{element:O,parents:M})}},addButton:function(L,M){var K=this;if(M.cmd){M.onclick=function(){K.execCommand(M.cmd)}}if(!M.text&&!M.icon){M.icon=L}K.buttons=K.buttons||{};M.tooltip=M.tooltip||M.title;K.buttons[L]=M},addMenuItem:function(L,M){var K=this;if(M.cmd){M.onclick=function(){K.execCommand(M.cmd)}}K.menuItems=K.menuItems||{};K.menuItems[L]=M},addCommand:function(K,M,L){this.execCommands[K]={func:M,scope:L||this}},addQueryStateHandler:function(K,M,L){this.queryStateCommands[K]={func:M,scope:L||this}},addQueryValueHandler:function(K,M,L){this.queryValueCommands[K]={func:M,scope:L||this}},addShortcut:function(M,N,L,K){this.shortcuts.add(M,N,L,K)},execCommand:function(Q,P,O,L){var K=this,N=0,M;if(!/^(mceAddUndoLevel|mceEndUndoLevel|mceBeginUndoLevel|mceRepaint)$/.test(Q)&&(!L||!L.skip_focus)){K.focus()}L=g({},L);L=K.fire("BeforeExecCommand",{command:Q,ui:P,value:O});if(L.isDefaultPrevented()){return false}if((M=K.execCommands[Q])){if(M.func.call(M.scope,P,O)!==true){K.fire("ExecCommand",{command:Q,ui:P,value:O});return true}}C(K.plugins,function(R){if(R.execCommand&&R.execCommand(Q,P,O)){K.fire("ExecCommand",{command:Q,ui:P,value:O});N=true;return false}});if(N){return N}if(K.theme&&K.theme.execCommand&&K.theme.execCommand(Q,P,O)){K.fire("ExecCommand",{command:Q,ui:P,value:O});return true}if(K.editorCommands.execCommand(Q,P,O)){K.fire("ExecCommand",{command:Q,ui:P,value:O});return true}K.getDoc().execCommand(Q,P,O);K.fire("ExecCommand",{command:Q,ui:P,value:O})},queryCommandState:function(O){var L=this,K,N;if(L._isHidden()){return}if((K=L.queryStateCommands[O])){N=K.func.call(K.scope);if(N!==true){return N}}N=L.editorCommands.queryCommandState(O);if(N!==-1){return N}try{return L.getDoc().queryCommandState(O)}catch(M){}},queryCommandValue:function(O){var L=this,K,N;if(L._isHidden()){return}if((K=L.queryValueCommands[O])){N=K.func.call(K.scope);if(N!==true){return N}}N=L.editorCommands.queryCommandValue(O);if(N!==undefined){return N}try{return L.getDoc().queryCommandValue(O)}catch(M){}},show:function(){var K=this;r.show(K.getContainer());r.hide(K.id);K.load();K.fire("show")},hide:function(){var K=this,L=K.getDoc();if(x&&L&&!K.inline){L.execCommand("SelectAll")}K.save();r.hide(K.getContainer());r.setStyle(K.id,"display",K.orgDisplay);K.fire("hide")},isHidden:function(){return !r.isHidden(this.id)},setProgressState:function(K,L){this.fire("ProgressState",{state:K,time:L})},load:function(L){var K=this,N=K.getElement(),M;if(N){L=L||{};L.load=true;M=K.setContent(N.value!==undefined?N.value:N.innerHTML,L);L.element=N;if(!L.no_events){K.fire("LoadContent",L)}L.element=N=null;return M}},save:function(L){var K=this,O=K.getElement(),M,N;if(!O||!K.initialized){return}L=L||{};L.save=true;L.element=O;M=L.content=K.getContent(L);if(!L.no_events){K.fire("SaveContent",L)}M=L.content;if(!/TEXTAREA|INPUT/i.test(O.nodeName)){if(!K.inline){O.innerHTML=M}if((N=r.getParent(K.id,"form"))){C(N.elements,function(P){if(P.name==K.id){P.value=M;return false}})}}else{O.value=M}L.element=O=null;if(L.set_dirty!==false){K.isNotDirty=true}return M},setContent:function(O,M){var L=this,K=L.getBody(),N;M=M||{};M.format=M.format||"html";M.set=true;M.content=O;if(!M.no_events){L.fire("BeforeSetContent",M)}O=M.content;if(O.length===0||/^\s+$/.test(O)){N=L.settings.forced_root_block;if(N&&L.schema.isValidChild(K.nodeName.toLowerCase(),N.toLowerCase())){O=x&&x<11?"":'<br data-mce-bogus="1">';O=L.dom.createHTML(N,L.settings.forced_root_block_attrs,O)}else{if(!x){O='<br data-mce-bogus="1">'}}K.innerHTML=O;L.fire("SetContent",M)}else{if(M.format!=="raw"){O=new z({},L.schema).serialize(L.parser.parse(O,{isRootContent:true}))}M.content=a(O);L.dom.setHTML(K,M.content);if(!M.no_events){L.fire("SetContent",M)}}return M.content},getContent:function(M){var L=this,N,K=L.getBody();M=M||{};M.format=M.format||"html";M.get=true;M.getInner=true;if(!M.no_events){L.fire("BeforeGetContent",M)}if(M.format=="raw"){N=K.innerHTML}else{if(M.format=="text"){N=K.innerText||K.textContent}else{N=L.serializer.serialize(K,M)}}if(M.format!="text"){M.content=a(N)}else{M.content=N}if(!M.no_events){L.fire("GetContent",M)}return M.content},insertContent:function(K){this.execCommand("mceInsertContent",false,K)},isDirty:function(){return !this.isNotDirty},getContainer:function(){var K=this;if(!K.container){K.container=r.get(K.editorContainer||K.id+"_parent")}return K.container},getContentAreaContainer:function(){return this.contentAreaContainer},getElement:function(){return r.get(this.settings.content_element||this.id)},getWin:function(){var K=this,L;if(!K.contentWindow){L=r.get(K.id+"_ifr");if(L){K.contentWindow=L.contentWindow}}return K.contentWindow},getDoc:function(){var K=this,L;if(!K.contentDocument){L=K.getWin();if(L){K.contentDocument=L.document}}return K.contentDocument},getBody:function(){return this.bodyElement||this.getDoc().body},convertURL:function(M,L,O){var K=this,N=K.settings;if(N.urlconverter_callback){return K.execCallback("urlconverter_callback",M,O,true,L)}if(!N.convert_urls||(O&&O.nodeName=="LINK")||M.indexOf("file:")===0||M.length===0){return M}if(N.relative_urls){return K.documentBaseURI.toRelative(M)}M=K.documentBaseURI.toAbsolute(M,N.remove_script_host);return M},addVisual:function(O){var L=this,M=L.settings,N=L.dom,K;O=O||L.getBody();if(L.hasVisual===undefined){L.hasVisual=M.visual}C(N.select("table,a",O),function(Q){var P;switch(Q.nodeName){case"TABLE":K=M.visual_table_class||"mce-item-table";P=N.getAttrib(Q,"border");if(!P||P=="0"){if(L.hasVisual){N.addClass(Q,K)}else{N.removeClass(Q,K)}}return;case"A":if(!N.getAttrib(Q,"href",false)){P=N.getAttrib(Q,"name")||Q.id;K=M.visual_anchor_class||"mce-item-anchor";if(P){if(L.hasVisual){N.addClass(Q,K)}else{N.removeClass(Q,K)}}}return}});L.fire("VisualAid",{element:O,hasVisual:L.hasVisual})},remove:function(){var K=this;if(!K.removed){K.removed=1;K.save();if(K.hasHiddenInput){r.remove(K.getElement().nextSibling)}if(!K.inline){if(x&&x<10){K.getDoc().execCommand("SelectAll",false,null)}r.setStyle(K.id,"display",K.orgDisplay);K.getBody().onload=null;y.unbind(K.getWin());y.unbind(K.getDoc())}var L=K.getContainer();y.unbind(K.getBody());y.unbind(L);K.fire("remove");K.editorManager.remove(K);r.remove(L);K.destroy()}},bindNative:function(L){var K=this;if(K.settings.readonly){return}if(K.initialized){K.dom.bind(p(K,L),L,function(M){K.fire(L,M)})}else{if(!K._pendingNativeEvents){K._pendingNativeEvents=[L]}else{K._pendingNativeEvents.push(L)}}},unbindNative:function(L){var K=this;if(K.initialized){K.dom.unbind(L)}},destroy:function(M){var K=this,L;if(K.destroyed){return}if(!M&&!K.removed){K.remove();return}if(M&&c){y.unbind(K.getDoc());y.unbind(K.getWin());y.unbind(K.getBody())}if(!M){K.editorManager.off("beforeunload",K._beforeUnload);if(K.theme&&K.theme.destroy){K.theme.destroy()}K.selection.destroy();K.dom.destroy()}L=K.formElement;if(L){if(L._mceOldSubmit){L.submit=L._mceOldSubmit;L._mceOldSubmit=null}r.unbind(L,"submit reset",K.formEventDelegate)}K.contentAreaContainer=K.formElement=K.container=K.editorContainer=null;K.settings.content_element=K.bodyElement=K.contentDocument=K.contentWindow=null;if(K.selection){K.selection=K.selection.win=K.selection.dom=K.selection.dom.doc=null}K.destroyed=1},_refreshContentEditable:function(){var L=this,K,M;if(L._isHidden()){K=L.getBody();M=K.parentNode;M.removeChild(K);M.appendChild(K);K.focus()}},_isHidden:function(){var K;if(!c){return 0}K=this.selection.getSel();return(!K||!K.rangeCount||K.rangeCount===0)}};g(n.prototype,d);return n});