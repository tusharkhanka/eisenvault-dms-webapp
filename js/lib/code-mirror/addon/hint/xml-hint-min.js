(function(a){if(typeof exports=="object"&&typeof module=="object"){a(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],a)}else{a(CodeMirror)}}})(function(b){var c=b.Pos;function a(o,h){var t=h&&h.schemaInfo;var E=(h&&h.quoteChar)||'"';if(!t){return}var g=o.getCursor(),m=o.getTokenAt(g);var F=b.innerMode(o.getMode(),m.state);if(F.mode.name!="xml"){return}var p=[],z=false,A;var H=/\btag\b/.test(m.type),e=H&&/^\w/.test(m.string),C;if(e){var s=o.getLine(g.line).slice(Math.max(0,m.start-2),m.start);var l=/<\/$/.test(s)?"close":/<$/.test(s)?"open":null;if(l){C=m.start-(l=="close"?2:1)}}else{if(H&&m.string=="<"){l="open"}else{if(H&&m.string=="</"){l="close"}}}if(!H&&!F.state.tagName||l){if(e){A=m.string}z=l;var f=F.state.context,u=f&&t[f.tagName];var k=f?u&&u.children:t["!top"];if(k&&l!="close"){for(var B=0;B<k.length;++B){if(!A||k[B].lastIndexOf(A,0)==0){p.push("<"+k[B])}}}else{if(l!="close"){for(var G in t){if(t.hasOwnProperty(G)&&G!="!top"&&G!="!attrs"&&(!A||G.lastIndexOf(A,0)==0)){p.push("<"+G)}}}}if(f&&(!A||l=="close"&&f.tagName.lastIndexOf(A,0)==0)){p.push("</"+f.tagName+">")}}else{var u=t[F.state.tagName],x=u&&u.attrs;var j=t["!attrs"];if(!x&&!j){return}if(!x){x=j}else{if(j){var r={};for(var d in j){if(j.hasOwnProperty(d)){r[d]=j[d]}}for(var d in x){if(x.hasOwnProperty(d)){r[d]=x[d]}}x=r}}if(m.type=="string"||m.string=="="){var s=o.getRange(c(g.line,Math.max(0,g.ch-60)),c(g.line,m.type=="string"?m.start:m.end));var v=s.match(/([^\s\u00a0=<>\"\']+)=$/),q;if(!v||!x.hasOwnProperty(v[1])||!(q=x[v[1]])){return}if(typeof q=="function"){q=q.call(this,o)}if(m.type=="string"){A=m.string;var w=0;if(/['"]/.test(m.string.charAt(0))){E=m.string.charAt(0);A=m.string.slice(1);w++}var D=m.string.length;if(/['"]/.test(m.string.charAt(D-1))){E=m.string.charAt(D-1);A=m.string.substr(w,D-2)}z=true}for(var B=0;B<q.length;++B){if(!A||q[B].lastIndexOf(A,0)==0){p.push(E+q[B]+E)}}}else{if(m.type=="attribute"){A=m.string;z=true}for(var y in x){if(x.hasOwnProperty(y)&&(!A||y.lastIndexOf(A,0)==0)){p.push(y)}}}}return{list:p,from:z?c(g.line,C==null?m.start:C):g,to:z?c(g.line,m.end):g}}b.registerHelper("hint","xml",a)});