define(["alfresco/layout/HorizontalWidgets","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/dom-construct","dojo/dom-class"],function(l,d,b,g,c,i){return d([l],{cssRequirements:[{cssFile:"./css/ControlRow.css"}],widgetMarginLeft:0,widgetMarginRight:30,title:null,postCreate:function a(){this.inherited(arguments);i.add(this.domNode,"alfresco-forms-ControlRow");var m=false;if(this.description!=null&&b.trim(this.description)!==""){m=true;this.description=this.message(this.description);c.create("div",{innerHTML:this.description,className:"description border"},this.domNode,"first")}if(this.title!=null&&b.trim(this.title)!==""){this.title=this.message(this.title);c.create("div",{innerHTML:this.title,className:"title"+(m?"":" border")},this.domNode,"first")}},addFormControlValue:function f(m){g.forEach(this._processedWidgets,b.hitch(this,this.addChildFormControlValue,m))},addChildFormControlValue:function h(m,o,n){if(typeof o.addFormControlValue==="function"){o.addFormControlValue(m)}},updateFormControlValue:function f(m){g.forEach(this._processedWidgets,b.hitch(this,this.updateChildFormControlValue,m))},updateChildFormControlValue:function e(m,o,n){if(typeof o.addFormControlValue==="function"){o.updateFormControlValue(m)}},validateFormControlValue:function k(){g.forEach(this._processedWidgets,b.hitch(this,this.validateChildFormControlValue))},validateChildFormControlValue:function j(n,m){if(typeof n.validateFormControlValue==="function"){n.validateFormControlValue()}}})});