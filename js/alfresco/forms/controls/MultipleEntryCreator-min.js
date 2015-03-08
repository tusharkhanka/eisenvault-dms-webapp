define(["dojo/_base/declare","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_OnDijitClickMixin","dojo/text!./templates/MultipleEntryCreator.html","alfresco/core/Core","alfresco/forms/controls/MultipleEntryElementWrapper","alfresco/forms/controls/MultipleEntryElement","alfresco/forms/controls/SimpleMultipleEntryElement","dojo/_base/array","dijit/focus","dijit/registry","dojo/aspect","dojo/dnd/Source","dojo/dom-construct"],function(B,l,k,o,E,m,p,z,n,i,w,j,r,q,h){return B([l,k,o,m],{cssRequirements:[{cssFile:"./css/MultipleEntryCreator.css"}],i18nRequirements:[{i18nFile:"./i18n/MultipleEntryCreator.properties"}],templateString:E,addEntryAltText:"multiple-entry.add",addEntryImageSrc:null,addEntryImage:"add-icon-16.png",constructor:function f(G){B.safeMixin(this,G);if(typeof this.value=="undefined"||this.value==null){this.value=[];this.elements=[]}else{if(this.value instanceof Array){this.elements=this.value}else{this.alfLog("log","The value assigned to the MultipleEntryCreator '"+this.name+"' was not a JSON array",this.value)}}},enableDND:false,_dndSource:null,dndCreator:function a(I,K){var G=this.getDNDType();var H;if(K==="avatar"){var J=this.getDNDAvatarWidget(I);H=this.createDNDAvatarNode(J)}else{H=this.createElementWrapper(I).domNode}return{node:H,data:I,type:G}},getDNDAvatarWidget:function t(G){var H=null;var I=this._dndSource.getSelectedNodes();i.forEach(I,function(K,J){var L=j.byNode(K);if(L&&L.widget&&L.widget.value&&G._alfMultipleElementId==L.widget.value._alfMultipleElementId){H=L.widget}else{this.alfLog("warn","MultipleEntryCreator.getDNDAvatarWidget function was expecting 'wrapper.widget.value._alfMultipleElementId' attribute:",L)}});return H},createDNDAvatarNode:function A(G){return h.create("div",{innerHTML:this.encodeHTML((G&&G.value&&G.value.value)?G.value.value:"")})},elements:null,elementWrappers:null,postMixInProperties:function x(){if(this.addEntryImageSrc==null||this.addEntryImageSrc==""){this.addEntryImageSrc=require.toUrl("alfresco/forms/controls")+"/css/images/"+this.addEntryImage}this.addEntryAltText=this.message(this.addEntryAltText)},postCreate:function C(){if(this.enableDND){this._dndSource=new q(this.currentEntries,{copyOnly:false,selfCopy:false,selfAccept:true,accept:this.getAcceptedDNDTypes(),creator:dojo.hitch(this,"dndCreator")})}this.createEntries(this.elements)},getAcceptedDNDTypes:function g(){return[this.getDNDType()]},getDNDType:function D(){return"MultipleEntryElementWrapper"},createEntries:function u(G){if(G==null){G=[]}if(this.enableDND){this._dndSource.insertNodes(false,G)}else{this.alfLog("log","Creating entries for MultipleEntryCreator",G);i.forEach(G,function(I,H){if(I!=null){var J=this.createElementWrapper(I,true);if(J.widget){J.widget.createReadDisplay()}}else{this.alfLog("log","An element in the value for MultipleEntryCreatory '"+this.name+"' was not an Object",I)}},this)}},createElementWrapper:function b(I,H){this.alfLog("log","Creating MultipleEntryElementWrapper",I);var K=this;var G=this.createElementWidget({pubSubScope:this.pubSubScope,dataScope:this.dataScope,elementConfig:I,widgets:this.widgets,valueDisplayMap:this.valueDisplayMap,readDisplayAttribute:this.readDisplayAttribute});var J=new p({creator:this,previouslyExisted:H,widget:G});r.after(J,"blurWrapper",function(L){K.alfLog("log","Wrapper 'blurWrapper' function processed");K.validationRequired()});J.placeAt(this.currentEntries);return J},validationRequired:function y(){this.alfLog("log","Validation Required function called")},createElementWidget:function F(G){var I=null;var H=[this.elementWidget];require(H,function(J){I=new J(G)});return I},addEntry:function v(I){var J;var H={};if(this.enableDND){this._dndSource.selectNone();this._dndSource.insertNodes(true,[H]);var G=this._dndSource.getSelectedNodes();if(G instanceof Array&&G.length>0){J=j.byNode(G[0]);if(J){J.editElement(I)}}}else{J=this.createElementWrapper(H);J.editElement(I);w.focus(J.widget)}return J},deleteEntry:function s(G){G.destroy(false);this.validationRequired()},getValue:function e(){var H=[];var G=j.findWidgets(this.currentEntries);i.forEach(G,function(K,I){var J=K.widget;if(typeof J.getValue=="function"){H.push(J.getValue())}else{this.alfLog("warn","The following widget has no getValue() function",J)}},this);return H},setValue:function c(H){this.alfLog("log","Setting value of MultipleEntryCreator",this,H);var G=j.findWidgets(this.currentEntries);i.forEach(G,function(J,I){J.destroyRecursive()});if(!H instanceof Array){this.alfLog("warn","The value provided to the MultipleEntryCreator setValue was not an array:",H)}else{this.createEntries(H)}},validate:function d(){var G=true;var H=j.findWidgets(this.currentEntries);var I=this;i.forEach(H,function(K,J){G=G&&K.widget.validate()});return G}})});