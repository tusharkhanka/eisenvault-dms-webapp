define(["dojo/_base/declare","alfresco/preview/AlfDocumentPreviewPlugin","dojo/_base/lang","dojo/has"],function(e,d,f,c){return e([d],{constructor:function g(h){f.mixin(h);this.attributes={src:null,srcMimeType:null}},report:function b(){if((c("ie")>0&&c("ie")<9)||(c("ff")>0&&c("ff")<1.91)||(c("webkit")>0&&c("webkit")<523.12)){return this.previewManager.msg("label.browserReport","&lt;video&gt;")}},display:function a(){var j=this.attributes.src?this.previewManager.getThumbnailUrl(this.attributes.src):this.previewManager.getContentUrl(),i=this.attributes.srcMimeType?this.attributes.srcMimeType:this.previewManager.mimeType;var h="";h+='<audio width="100%" height="100%" controls alt="'+this.previewManager.name+'" title="'+this.previewManager.name+'">';h+='   <source src="'+j+"\"  type='"+i+"'>";h+="</audio>";return h}})});