!function(t,e){"use strict";"undefined"!=typeof module&&module.exports?module.exports=e(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],function(t){return e(t)}):e(t.jQuery)}(this,function(t){"use strict";var e=function(e,s){this.$element=t(e),this.options=t.extend({},t.fn.typeahead.defaults,s),this.matcher=this.options.matcher||this.matcher,this.sorter=this.options.sorter||this.sorter,this.select=this.options.select||this.select,this.autoSelect="boolean"==typeof this.options.autoSelect?this.options.autoSelect:!0,this.highlighter=this.options.highlighter||this.highlighter,this.render=this.options.render||this.render,this.updater=this.options.updater||this.updater,this.displayText=this.options.displayText||this.displayText,this.source=this.options.source,this.delay=this.options.delay,this.$menu=t(this.options.menu),this.$appendTo=this.options.appendTo?t(this.options.appendTo):null,this.shown=!1,this.listen(),this.showHintOnFocus="boolean"==typeof this.options.showHintOnFocus?this.options.showHintOnFocus:!1,this.afterSelect=this.options.afterSelect,this.addItem=!1};e.prototype={constructor:e,select:function(){var t=this.$menu.find(".active").data("value");if(this.$element.data("active",t),this.autoSelect||t){var e=this.updater(t);this.$element.val(this.displayText(e)||e).change(),this.afterSelect(e)}return this.hide()},updater:function(t){return t},setSource:function(t){this.source=t},show:function(){var e,s=t.extend({},this.$element.position(),{height:this.$element[0].offsetHeight});return e="function"==typeof this.options.scrollHeight?this.options.scrollHeight.call():this.options.scrollHeight,(this.$appendTo?this.$menu.appendTo(this.$appendTo):this.$menu.insertAfter(this.$element)).css({top:s.top+s.height+e,left:s.left}).show(),this.shown=!0,this},hide:function(){return this.$menu.hide(),this.shown=!1,this},lookup:function(e){if("undefined"!=typeof e&&null!==e?this.query=e:this.query=this.$element.val()||"",this.query.length<this.options.minLength)return this.shown?this.hide():this;var s=t.proxy(function(){t.isFunction(this.source)?this.source(this.query,t.proxy(this.process,this)):this.source&&this.process(this.source)},this);clearTimeout(this.lookupWorker),this.lookupWorker=setTimeout(s,this.delay)},process:function(e){var s=this;return e=t.grep(e,function(t){return s.matcher(t)}),e=this.sorter(e),e.length||this.options.addItem?(e.length>0?this.$element.data("active",e[0]):this.$element.data("active",null),this.options.addItem&&e.push(this.options.addItem),"all"==this.options.items?this.render(e).show():this.render(e.slice(0,this.options.items)).show()):this.shown?this.hide():this},matcher:function(t){var e=this.displayText(t);return~e.toLowerCase().indexOf(this.query.toLowerCase())},sorter:function(t){for(var e,s=[],i=[],o=[];e=t.shift();){var n=this.displayText(e);n.toLowerCase().indexOf(this.query.toLowerCase())?~n.indexOf(this.query)?i.push(e):o.push(e):s.push(e)}return s.concat(i,o)},highlighter:function(e){var s,i,o,n,h,r=t("<div></div>"),a=this.query,u=e.toLowerCase().indexOf(a.toLowerCase());if(s=a.length,0===s)return r.text(e).html();for(;u>-1;)i=e.substr(0,u),o=e.substr(u,s),n=e.substr(u+s),h=t("<strong></strong>").text(o),r.append(document.createTextNode(i)).append(h),e=n,u=e.toLowerCase().indexOf(a.toLowerCase());return r.append(document.createTextNode(e)).html()},render:function(e){var s=this,i=this,o=!1;return e=t(e).map(function(e,n){var h=i.displayText(n);return e=t(s.options.item).data("value",n),e.find("a").html(s.highlighter(h)),h==i.$element.val()&&(e.addClass("active"),i.$element.data("active",n),o=!0),e[0]}),this.autoSelect&&!o&&(e.first().addClass("active"),this.$element.data("active",e.first().data("value"))),this.$menu.html(e),this},displayText:function(t){return t.name||t},next:function(e){var s=this.$menu.find(".active").removeClass("active"),i=s.next();i.length||(i=t(this.$menu.find("li")[0])),i.addClass("active")},prev:function(t){var e=this.$menu.find(".active").removeClass("active"),s=e.prev();s.length||(s=this.$menu.find("li").last()),s.addClass("active")},listen:function(){this.$element.on("focus",t.proxy(this.focus,this)).on("blur",t.proxy(this.blur,this)).on("keypress",t.proxy(this.keypress,this)).on("keyup",t.proxy(this.keyup,this)),this.eventSupported("keydown")&&this.$element.on("keydown",t.proxy(this.keydown,this)),this.$menu.on("click",t.proxy(this.click,this)).on("mouseenter","li",t.proxy(this.mouseenter,this)).on("mouseleave","li",t.proxy(this.mouseleave,this))},destroy:function(){this.$element.data("typeahead",null),this.$element.data("active",null),this.$element.off("focus").off("blur").off("keypress").off("keyup"),this.eventSupported("keydown")&&this.$element.off("keydown"),this.$menu.remove()},eventSupported:function(t){var e=t in this.$element;return e||(this.$element.setAttribute(t,"return;"),e="function"==typeof this.$element[t]),e},move:function(t){if(this.shown){switch(t.keyCode){case 9:case 13:case 27:t.preventDefault();break;case 38:if(t.shiftKey)return;t.preventDefault(),this.prev();break;case 40:if(t.shiftKey)return;t.preventDefault(),this.next()}t.stopPropagation()}},keydown:function(e){this.suppressKeyPressRepeat=~t.inArray(e.keyCode,[40,38,9,13,27]),this.shown||40!=e.keyCode?this.move(e):this.lookup()},keypress:function(t){this.suppressKeyPressRepeat||this.move(t)},keyup:function(t){switch(t.keyCode){case 40:case 38:case 16:case 17:case 18:break;case 9:case 13:if(!this.shown)return;this.select();break;case 27:if(!this.shown)return;this.hide();break;default:this.lookup()}t.stopPropagation(),t.preventDefault()},focus:function(t){this.focused||(this.focused=!0,this.options.showHintOnFocus&&this.lookup(""))},blur:function(t){this.focused=!1,!this.mousedover&&this.shown&&this.hide()},click:function(t){t.stopPropagation(),t.preventDefault(),this.select(),this.$element.focus()},mouseenter:function(e){this.mousedover=!0,this.$menu.find(".active").removeClass("active"),t(e.currentTarget).addClass("active")},mouseleave:function(t){this.mousedover=!1,!this.focused&&this.shown&&this.hide()}};var s=t.fn.typeahead;t.fn.typeahead=function(s){var i=arguments;return"string"==typeof s&&"getActive"==s?this.data("active"):this.each(function(){var o=t(this),n=o.data("typeahead"),h="object"==typeof s&&s;n||o.data("typeahead",n=new e(this,h)),"string"==typeof s&&(i.length>1?n[s].apply(n,Array.prototype.slice.call(i,1)):n[s]())})},t.fn.typeahead.defaults={source:[],items:8,menu:'<ul class="typeahead dropdown-menu" role="listbox"></ul>',item:'<li><a href="#" role="option"></a></li>',minLength:1,scrollHeight:0,autoSelect:!0,afterSelect:t.noop,addItem:!1,delay:0},t.fn.typeahead.Constructor=e,t.fn.typeahead.noConflict=function(){return t.fn.typeahead=s,this},t(document).on("focus.typeahead.data-api",'[data-provide="typeahead"]',function(e){var s=t(this);s.data("typeahead")||s.typeahead(s.data())})});
