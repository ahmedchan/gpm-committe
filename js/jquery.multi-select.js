!function(u){"use strict";var n="multiSelect",s={containerHTML:'<div class="multi-select-container">',menuHTML:'<div class="multi-select-menu">',buttonHTML:'<span class="multi-select-button">',menuItemsHTML:'<div class="multi-select-menuitems">',menuItemHTML:'<label class="multi-select-menuitem">',presetsHTML:'<div class="multi-select-presets">',modalHTML:void 0,menuItemTitleClass:"multi-select-menuitem--titled",activeClass:"multi-select-container--open",noneText:"Select",allText:void 0,presets:void 0,positionedMenuClass:"multi-select-container--positioned",positionMenuWithin:void 0,viewportBottomGutter:20,menuMinHeight:200};function e(t,e){this.element=t,this.$element=u(t),this.settings=u.extend({},s,e),this._defaults=s,this._name=n,this.init()}u.extend(e.prototype,{init:function(){this.checkSuitableInput(),this.findLabels(),this.constructContainer(),this.constructButton(),this.constructMenu(),this.constructModal(),this.setUpBodyClickListener(),this.setUpLabelsClickListener(),this.$element.hide()},checkSuitableInput:function(t){if(!1===this.$element.is("select[multiple]"))throw new Error("$.multiSelect only works on <select multiple> elements")},findLabels:function(){this.$labels=u('label[for="'+this.$element.attr("id")+'"]')},constructContainer:function(){this.$container=u(this.settings.containerHTML),this.$element.data("multi-select-container",this.$container),this.$container.insertAfter(this.$element)},constructButton:function(){var n=this;this.$button=u(this.settings.buttonHTML),this.$button.attr({role:"button","aria-haspopup":"true",tabindex:0,"aria-label":this.$labels.eq(0).text()}).on("keydown.multiselect",function(t){var e=t.which;13===e||32===e?(t.preventDefault(),n.$button.click()):40===e?(t.preventDefault(),n.menuShow(),(n.$presets||n.$menuItems).children(":first").focus()):27===e&&n.menuHide()}).on("click.multiselect",function(t){n.menuToggle()}).appendTo(this.$container),this.$element.on("change.multiselect",function(){n.updateButtonContents()}),this.updateButtonContents()},updateButtonContents:function(){var e=[],n=[];this.$element.find("option").each(function(){var t=u(this).text();e.push(t),u(this).is(":selected")&&n.push(u.trim(t))}),this.$button.empty(),0==n.length?this.$button.text(this.settings.noneText):n.length===e.length&&this.settings.allText?this.$button.text(this.settings.allText):this.$button.text(n.join(", "))},constructMenu:function(){var e=this;this.$menu=u(this.settings.menuHTML),this.$menu.attr({role:"menu"}).on("keyup.multiselect",function(t){27===t.which&&(e.menuHide(),e.$button.focus())}).appendTo(this.$container),this.constructMenuItems(),this.settings.presets&&this.constructPresets()},constructMenuItems:function(){var n=this;this.$menuItems=u(this.settings.menuItemsHTML),this.$menu.append(this.$menuItems),this.$element.on("change.multiselect",function(t,e){!0!==e&&n.updateMenuItems()}),this.updateMenuItems()},updateMenuItems:function(){var s=this;this.$menuItems.empty(),this.$element.children("optgroup,option").each(function(t,e){var n;"OPTION"===e.nodeName?(n=s.constructMenuItem(u(e),t),s.$menuItems.append(n)):s.constructMenuItemsGroup(u(e),t)})},upDown:function(t,e){var n,s=e.which;38===s?(e.preventDefault(),((n=u(e.currentTarget).prev()).length?n:this.$presets&&"menuitem"===t?this.$presets.children(":last"):this.$button).focus()):40===s&&(e.preventDefault(),((e=u(e.currentTarget).next()).length||"menuitem"===t?e:this.$menuItems.children(":first")).focus())},constructPresets:function(){var s=this;this.$presets=u(this.settings.presetsHTML),this.$menu.prepend(this.$presets),u.each(this.settings.presets,function(t,e){var n=s.$element.attr("name")+"_preset_"+t,t=u(s.settings.menuItemHTML).attr({for:n,role:"menuitem"}).text(" "+e.name).on("keydown.multiselect",s.upDown.bind(s,"preset")).appendTo(s.$presets);u("<input>").attr({type:"radio",name:s.$element.attr("name")+"_presets",id:n}).prependTo(t).on("change.multiselect",function(){s.$element.val(e.options),s.$element.trigger("change")})}),this.$element.on("change.multiselect",function(){s.updatePresets()}),this.updatePresets()},updatePresets:function(){var n=this;u.each(this.settings.presets,function(t,e){t=n.$element.attr("name")+"_preset_"+t,t=n.$presets.find("#"+t);!function(t,e){if(t.length==e.length){t.sort(),e.sort();for(var n=0;n<t.length;n++)if(t[n]!==e[n])return;return 1}}(e.options||[],n.$element.val()||[])?t.prop("checked",!1):t.prop("checked",!0)})},constructMenuItemsGroup:function(s,i){var o=this;s.children("option").each(function(t,e){var n=o.constructMenuItem(u(e),i+"_"+t),e=o.settings.menuItemTitleClass;0!==t&&(e+="sr"),n.addClass(e).attr("data-group-title",s.attr("label")),o.$menuItems.append(n)})},constructMenuItem:function(t,e){var n=this.$element.attr("name")+"_"+e,e=u(this.settings.menuItemHTML).attr({for:n,role:"menuitem"}).on("keydown.multiselect",this.upDown.bind(this,"menuitem")).text(" "+t.text()),n=u("<input>").attr({type:"checkbox",id:n,value:t.val()}).prependTo(e);return t.is(":disabled")&&n.attr("disabled","disabled"),t.is(":selected")&&n.prop("checked","checked"),n.on("change.multiselect",function(){u(this).prop("checked")?t.prop("selected",!0):t.prop("selected",!1),t.trigger("change",[!0])}),e},constructModal:function(){var t=this;this.settings.modalHTML&&(this.$modal=u(this.settings.modalHTML),this.$modal.on("click.multiselect",function(){t.menuHide()}),this.$modal.insertBefore(this.$menu))},setUpBodyClickListener:function(){var t=this;u("html").on("click.multiselect",function(){t.menuHide()}),this.$container.on("click.multiselect",function(t){t.stopPropagation()})},setUpLabelsClickListener:function(){var e=this;this.$labels.on("click.multiselect",function(t){t.preventDefault(),t.stopPropagation(),e.menuToggle()})},menuShow:function(){u("html").trigger("click.multiselect"),this.$container.addClass(this.settings.activeClass),this.settings.positionMenuWithin&&this.settings.positionMenuWithin instanceof u&&(t=this.$menu.offset().left+this.$menu.outerWidth(),(e=this.settings.positionMenuWithin.offset().left+this.settings.positionMenuWithin.outerWidth())<t&&(this.$menu.css("width",e-this.$menu.offset().left),this.$container.addClass(this.settings.positionedMenuClass)));var t=this.$menu.offset().top+this.$menu.outerHeight(),e=u(window).scrollTop()+u(window).height();t>e-this.settings.viewportBottomGutter?this.$menu.css({maxHeight:Math.max(e-this.settings.viewportBottomGutter-this.$menu.offset().top,this.settings.menuMinHeight),overflow:"scroll"}):this.$menu.css({maxHeight:"",overflow:""})},menuHide:function(){this.$container.removeClass(this.settings.activeClass),this.$container.removeClass(this.settings.positionedMenuClass),this.$menu.css("width","auto")},menuToggle:function(){this.$container.hasClass(this.settings.activeClass)?this.menuHide():this.menuShow()}}),u.fn[n]=function(t){return this.each(function(){u.data(this,"plugin_"+n)||u.data(this,"plugin_"+n,new e(this,t))})}}(jQuery);