define(["alfresco/forms/controls/MultipleEntryElement","dojo/_base/declare","alfresco/forms/PublishForm","alfresco/core/ObjectTypeUtils","dojo/_base/lang","dojo/_base/array","alfresco/forms/controls/DojoValidationTextBox","alfresco/forms/controls/DojoSelect","alfresco/forms/controls/MultipleEntryFormControl"],function(e,f,n,p,c,j,k,b,a){return f([e],{i18nRequirements:[{i18nFile:"./i18n/FormCreation.properties"}],determineKeyAndValue:function m(){this.inherited(arguments);if(this.elementValue.targetId===undefined){this.elementValue.targetId=""}if(this.elementValue.is===undefined){this.elementValue.is=[]}if(this.elementValue.isNot===undefined){this.elementValue.isNot=[]}},postCreate:function h(){this.alfSubscribe("ALF_FORM_FIELDS_UPDATE",c.hitch(this,"updateAvailableFields"));this.alfPublish("ALF_REQUEST_AVAILABLE_FORM_FIELDS",{});this.inherited(arguments)},updateAvailableFields:function q(s){var r=c.getObject("options",false,s);if(r!=null&&p.isArray(r)){this.availableFields=r}else{this.availableFields=[]}},createReadDisplay:function o(){var s=this.getValue();if(s.is!=null&&s.isNot!=null){var r="";if(s.is.length==0&&s.isNot.length==0){r="rule.display.any"}else{if(s.is.length>0&&s.isNot.length==0){r="rule.display.mustBe"}else{if(s.isNot.length>0&&s.is.length==0){r="rule.display.mustNotBe"}else{r="rule.display.mustAndmustNotBe"}}}var t=this.findAvailableField(s);if(t!=null){this.readDisplay.innerHTML=this.message(r,{field:t,mustBe:this.generateReadValues(s.is),mustNotBe:this.generateReadValues(s.isNot)})}else{this.readDisplay.innerHTML=this.message("rule.fieldDeleted.label")}}else{this.readDisplay.innerHTML=""}},createEditDisplay:function d(){this.inherited(arguments);this.alfPublish("ALF_REQUEST_AVAILABLE_FORM_FIELDS",{})},findAvailableField:function i(s){var t=null;if(this.availableFields!=null){for(var r=0;r<this.availableFields.length;r++){if(this.availableFields[r].value==s.targetId){t=this.availableFields[r].label;break}}}return t},generateReadValues:function l(s){var r="";j.forEach(s,function(u,t){r=r+"'"+u.value+"'"+((t<s.length-1)?", ":"")});return r},getFormWidgets:function g(){return[{name:"alfresco/forms/controls/DojoValidationTextBox",config:{name:"fieldId",label:"fieldId",value:this.elementValue.fieldId,visibilityConfig:{initialValue:false}}},{name:"alfresco/forms/controls/DojoSelect",config:{name:"targetId",label:"rule.field.label",description:"rule.field.description",value:this.elementValue.targetId,optionsConfig:{updateTopics:[{topic:this.pubSubScope+"ALF_FORM_FIELDS_UPDATE",global:true}],callback:"getOptionsFromPublication"},requirementConfig:{initialValue:true}}},{name:"alfresco/forms/controls/MultipleEntryFormControl",config:{name:"is",label:"rule.is.label",description:"rule.is.description",value:this.elementValue.is}},{name:"alfresco/forms/controls/MultipleEntryFormControl",config:{name:"isNot",label:"rule.isNot.label",description:"rule.isNot.description",value:this.elementValue.isNot}}]}})});