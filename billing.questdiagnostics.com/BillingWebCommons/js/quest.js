/* ----------------------- BEGIN THIRD PARTY PLUGINS ----------------------- */

/*!
 * HTML5 Placeholder jQuery Plugin v1.8.2
 * @link http://github.com/mathiasbynens/Placeholder-jQuery-Plugin
 * @author Mathias Bynens <http://mathiasbynens.be/>
 */
(function(f){var e='placeholder' in document.createElement('input'),a='placeholder' in document.createElement('textarea');if(e&&a){f.fn.placeholder=function(){return this};f.fn.placeholder.input=f.fn.placeholder.textarea=true}else{f.fn.placeholder=function(){return this.filter((e?'textarea':':input')+'[placeholder]').on('focus.placeholder',b).on('blur.placeholder',d).trigger('blur.placeholder').end()};f.fn.placeholder.input=e;f.fn.placeholder.textarea=a}function c(h){var g={},i=/^jQuery\d+$/;f.each(h.attributes,function(k,j){if(j.specified&&!i.test(j.name)){g[j.name]=j.value}});return g}function b(){var g=f(this);if(g.val()===g.attr('placeholder')&&g.hasClass('placeholder')){if(g.data('placeholder-password')){g.hide().next().attr('id',g.removeAttr('id').data('placeholder-id')).show().focus()}else{g.val('').removeClass('placeholder')}}}function d(h){var l,k=f(this),g=k,j=this.id;if(k.val()===''){if(k.is(':password')){if(!k.data('placeholder-textinput')){try{l=k.clone().attr({type:'text'})}catch(i){l=f('<input>').attr(f.extend(c(this),{type:'text'}))}l.removeAttr('name').data('placeholder-password',true).data('placeholder-id',j).on('focus.placeholder',b);k.data('placeholder-textinput',l).data('placeholder-id',j).before(l)}k=k.removeAttr('id').hide().prev().attr('id',j).show()}k.addClass('placeholder').val(k.attr('placeholder'))}else{k.removeClass('placeholder')}}f(function(){f('form').on('submit.placeholder',function(){var g=f('.placeholder',this).each(b);setTimeout(function(){g.each(d)},10)})});f(window).on('unload.placeholder',function(){f('.placeholder').val('')})}(jQuery));

/**
* hoverIntent r5 // 2007.03.27 // jQuery 1.1.2+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne <brian@cherne.net>
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY;};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).off("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev]);}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev]);};var handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this){try{p=p.parentNode;}catch(e){p=this;}}if(p==this){return false;}var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}if(e.type=="mouseover"){pX=ev.pageX;pY=ev.pageY;$(ob).on("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}}else{$(ob).off("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}}};return this.on('mouseover',handleHover).on('mouseout',handleHover);};})(jQuery);



/*
 * Superfish v1.4.8 - jQuery menu widget
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 	http://www.gnu.org/licenses/gpl.html
 *
 * CHANGELOG: http://users.tpg.com.au/j_birch/plugins/superfish/changelog.txt
 */
/* *** DP EDIT superfish code looks for nested uls, selectors changed to find divs *** */
;(function($){
	$.fn.superfish = function(op){

		var sf = $.fn.superfish,
			c = sf.c,
			$arrow = $(['<span class="',c.arrowClass,'"> &#187;</span>'].join('')),
			over = function(){
				var $$ = $(this), menu = getMenu($$);
				clearTimeout(menu.sfTimer);
				$$.showSuperfishUl().siblings().hideSuperfishUl();
			},
			out = function(){
				var $$ = $(this), menu = getMenu($$), o = sf.op;
				clearTimeout(menu.sfTimer);
				menu.sfTimer=setTimeout(function(){
					o.retainPath=($.inArray($$[0],o.$path)>-1);
					$$.hideSuperfishUl();
					if (o.$path.length && $$.parents(['li.',o.hoverClass].join('')).length<1){over.call(o.$path);}
				},o.delay);	
			},
			getMenu = function($menu){
				var menu = $menu.parents(['ul.',c.menuClass,':first'].join(''))[0];
				sf.op = sf.o[menu.serial];
				return menu;
			},
			addArrow = function($a){ $a.addClass(c.anchorClass).append($arrow.clone()); };
			
		return this.each(function() {
			var s = this.serial = sf.o.length;
			var o = $.extend({},sf.defaults,op);
			o.$path = $('li.'+o.pathClass,this).slice(0,o.pathLevels).each(function(){
				
				/* *** BEGIN DP EDIT *** */
				// $(this).addClass([o.hoverClass,c.bcClass].join(' '))
				// 	.filter('li:has(ul)').removeClass(o.pathClass);
				$(this).addClass([o.hoverClass,c.bcClass].join(' '))
					.filter('li:has(div.menu)').removeClass(o.pathClass);
				/* *** END DP EDIT *** */
				
			});
			sf.o[s] = sf.op = o;
			
			/* *** BEGIN DP EDIT *** */
			// $('li:has(ul)',this)[($.fn.hoverIntent && !o.disableHI) ? 'hoverIntent' : 'hover'](over,out).each(function() {
			// 	if (o.autoArrows) addArrow( $('>a:first-child',this) );
			// })
			// .not('.'+c.bcClass)
			// 	.hideSuperfishUl();
			$('li:has(div.menu)',this)[($.fn.hoverIntent && !o.disableHI) ? 'hoverIntent' : 'hover'](over,out).each(function() {
				if (o.autoArrows) addArrow( $('>a:first-child',this) );
			})
			.not('.'+c.bcClass)
				.hideSuperfishUl();			
			/* *** END DP EDIT *** */
					
			var $a = $('a',this);
			$a.each(function(i){
				var $li = $a.eq(i).parents('li');
				$a.eq(i).on("focus",function(){over.call($li);}).on("blur",function(){out.call($li);});
			});
			o.onInit.call(this);
			
		}).each(function() {
			var menuClasses = [c.menuClass];
			if (sf.op.dropShadows  && !(isIE() && isMsieSevenOrNewer() < 7)) menuClasses.push(c.shadowClass);
			$(this).addClass(menuClasses.join(' '));
		});
	};

	var sf = $.fn.superfish;
	sf.o = [];
	sf.op = {};
	sf.IE7fix = function(){
		var o = sf.op;
		if (isIE() && isMsieSevenOrNewer() > 6 && o.dropShadows && o.animation.opacity!=undefined)
			this.toggleClass(sf.c.shadowClass+'-off');
		};
	sf.c = {
		bcClass     : 'sf-breadcrumb',
		menuClass   : 'sf-js-enabled',
		anchorClass : 'sf-with-ul',
		arrowClass  : 'sf-sub-indicator',
		shadowClass : 'sf-shadow'
	};
	sf.defaults = {
		hoverClass	: 'sfHover',
		pathClass	: 'overideThisToUse',
		pathLevels	: 1,
		delay		: 800,
		animation	: {opacity:'show'},
		speed		: 'normal',
		autoArrows	: false,
		dropShadows : false,
		disableHI	: false,		// true disables hoverIntent detection
		onInit		: function(){}, // callback functions
		onBeforeShow: function(){},
		onShow		: function(){},
		onHide		: function(){}
	};
	$.fn.extend({
		hideSuperfishUl : function(){
			var o = sf.op,
				not = (o.retainPath===true) ? o.$path : '';
			o.retainPath = false;
			
			/* *** BEGIN DP EDIT *** */
			// var $ul = $(['li.',o.hoverClass].join(''),this).add(this).not(not).removeClass(o.hoverClass)
			// 		.find('>ul').hide().css('visibility','hidden');
			var $ul = $(['li.',o.hoverClass].join(''),this).add(this).not(not).removeClass(o.hoverClass)
					.find('>div').hide().css('visibility','hidden');
			/* *** END DP EDIT *** */
					
			o.onHide.call($ul);
			return this;
		},
		showSuperfishUl : function(){
			var o = sf.op,
				sh = sf.c.shadowClass+'-off',
				
				/* *** BEGIN DP EDIT *** */
				// $ul = this.addClass(o.hoverClass)
				// 	.find('>ul:hidden').css('visibility','visible');
				$ul = this.addClass(o.hoverClass)
					.find('>div:hidden').css('visibility','visible');
				/* *** END DP EDIT *** */
					
			sf.IE7fix.call($ul);
			o.onBeforeShow.call($ul);
			$ul.animate(o.animation,o.speed,function(){ sf.IE7fix.call($ul); o.onShow.call($ul); });
			return this;
		}
	});
})(jQuery);

/* ----------------------- END THIRD PARTY PLUGINS ----------------------- */



/* ----------------------- BEGIN DP SLIDER PLUGIN (CAROUSELS) ----------------------- */
(function($){
	$.fn.slider = function(options) {
		/* default settings for sliders */
		var defaults = {
			anim: 'fade',/* animation type */
			delay: 0,/* delay before transitioning in the new slide */
			fade: 500,/* duration of fade in and fade out */
			hold: 5000/* "hold" time (how long a slide stays on screen before autoplaying to the next slide) */
		};
		
		return this.each(function() {
			var $this = $(this);
			if ($this.find('.slides li').length <= 1) {
				/*no need to do anything if not enough slides*/
				return;
			}
			
			var settings = $.extend({}, defaults, options);/* merge the defaults and any passed options into settings (without overriding the defaults) */
			settings.anim = $this.data('anim') || settings.anim;/* override the settings with the slider's data-anim attribute */
			if (settings.anim === 'fade') {
				/* initial setup css for fade animation */
				$this.find('.slides li').hide();/* hide all slides */
				$this.find('.slides li.active').show();/* show the current slide */
				$this.find('.slides .slidetext, .slides .slidebg').css({
					/* show all slidetext/bg (even though they are shown, they'll be covered up due to z-index)*/
					'display':'block',
					'height':'auto',
					'width':'auto'
				});
			}
			$this.on('slider:slideIt', function(e, curr, next) {
				curr = $(curr);
				next = $(next);
				/* grab the current text/bg image and the new text/bg image*/
				var curr_text = curr.find('.slidetext');
				var curr_img = curr.find('.slidebg');
				var next_text = next.find('.slidetext');
				var next_img = next.find('.slidebg');
				if (settings.anim === 'fade') {
					/* fade out the old slide, fade in the new */
					curr.css({'z-index':'1'}).fadeOut(settings.fade);
					next.css({'z-index':'2'}).delay(settings.delay).fadeIn(settings.fade,function(){
						/* move active class from current slide to new */
						curr.removeClass('active');
						next.addClass('active');
						$this.trigger('slider:autoplay');/* autoplay to the next slide when everything is done (autoplay function will determine if user has/hasn't interacted with the slider) */
					});
				} else if (settings.anim === 'slide') {
					/* slide the new slide into view */
					var idx = next.index();
					curr.parent().animate({'margin-left':(-705*idx) + 'px'},settings.fade,function(){
						/* move active class from current slide to new */
						curr.removeClass('active');
						next.addClass('active');
						$this.trigger('slider:autoplay');/* autoplay to the next slide when everything is done (autoplay function will determine if user has/hasn't interacted with the slider) */
					});
				}
				/* move the active class from the old dot to the new */
				$this.find('.slidernav li.active').removeClass('active');
				var idx = next.index();/* grab the index of the new slide */
				$this.find('.slidernav li:eq(' + idx + ')').addClass('active');/* mark the slidernav link that corresponds (same index as slide) to the new slide as current */
				
			});
			
			$this.delegate('.slidernext, .sliderprev','click',function(e){
				e.preventDefault();
				$this.trigger('slider:stopAutoplay');/* stop the autoplay when the user clicks a next/prev arrow */
				/* user clicks next/prev arrows (find the current slide, and show the next (or first if at end) or the prev (or last if at beginning) slide */
				var curr = $this.find('.slides .active');/* grab the current slide */
				var next;
				if ($(this).hasClass('slidernext')) {
					/* if next, grab next (or first) */
					next = curr.next();
					if (!next.length) {
						next = $this.find('.slides li:first');
					}
				} else {
					/* if prev, grab prev (or last) */
					next = curr.prev();
					if (!next.length) {
						next = $this.find('.slides li:last');
					}
				}
				$this.trigger('slider:slideIt',[curr, next]);/* show the new slide */
			});
			
			$this.delegate('.slidernav a','click',function(e){
				e.preventDefault();
				$this.trigger('slider:stopAutoplay');/* stop the autoplay when the user clicks a next/prev arrow */
				/* user clicks slidernav link (dots, etc) - find the associated slide and show it */
				var li = $(this).parent();
				if (!li.hasClass('active')) {/* don't do anything if the slide is already active */
					var idx = li.index();/* get the index of the clicked dot */
					var curr = $this.find('.slides .active');/* grab the current slide */
					var next = $this.find('.slides li:eq(' + idx + ')');/* grab the slide at the same index as the clicked dot */
					$this.trigger('slider:slideIt',[curr, next]);/* show the new slide */
				}
			});
			
			if ($this.index('.slider') === 0) {/* if more than one instance on page, only autoplay the first */
				$this.on('slider:stopAutoplay',function() {
					/* clear the autoplay timeout */
					var autoplay_to = $this.data('slider:autoplay_to');
					clearTimeout(autoplay_to);
					autoplay_to = null;
					$this.data('slider:autoplay_to',autoplay_to);
				});
				
				$this.on('slider:autoplay',function() {
					var autoplay_to = $this.data('slider:autoplay_to');
					if (autoplay_to) {
						var curr = $this.find('.slides .active');/* grab the current slide */
						next = curr.next();/* get the next slide (or the first if the current is the last) */
						if (!next.length) {
							next = $this.find('.slides li:first');
						}
						var hold = curr.data('hold') || settings.hold;/* if the slide has a data-hold attribute, use that to override the default hold time */
						autoplay_to = setTimeout(function(){
							/* show the new slide (after a delay - based on "hold" time) */
							$this.trigger('slider:slideIt',[curr, next]);/* show the new slide */
						}, hold);
					}
					$this.data('slider:autoplay_to',autoplay_to);
				});
				
				$this.data('slider:autoplay_to',true);/* autoplay timeout (normal holds the actual timeout object, but we set it to true so the first run works)*/
				$this.trigger('slider:autoplay');/* trigger the first autoplay */
			}
		});
	};
})(jQuery);
/* ----------------------- END DP SLIDER PLUGIN (CAROUSELS) ----------------------- */

/* ----------------------- BEGIN DP OPEN/CLOSE PLUGIN ----------------------- */
(function($){
	$.fn.openClose = function(child, force) {
		return this.each(function() {
			if (force === 'open') {
				$(this).closest('li').addClass('open').find(child).slideDown();
			} else if (force === 'close') {
				$(this).closest('li').removeClass('open').find(child).slideUp();
			} else {
				$(this).closest('li').toggleClass('open').find(child).slideToggle();
			}
		});
	};
})(jQuery);
/* ----------------------- END DP OPEN/CLOSE PLUGIN ----------------------- */

/* ----------------------- BEGIN DP SCROLL INTO VIEW PLUGIN ----------------------- */
(function($){
	$.fn.scrollIntoView = function(extra) {
		return this.each(function() {
			/* scroll the window so the entire element is in view (bottom of element will be within a few pixels of bottom of window) */
			var win = $(window);
			var el = $(this);
			var el_bottom = el.offset().top + el.height();
			var win_h = win.height();
			/* scroll into view if the bottom of the element is below the bottom of the viewport (current scroll top + window height) */
			if (el_bottom > win.scrollTop() + win_h) {
				/* even though we have to get the current scrolltop from the window, we have to animate the html,body */
				$('html,body').animate({'scrollTop':el_bottom - win_h + extra},500);
			}
		});
	};
})(jQuery);
/* ----------------------- END DP SCROLL INTO VIEW PLUGIN ----------------------- */

/* ----------------------- BEGIN DP CUSTOM EVENTS ----------------------- */
$(document).ready(function(){
	/* custom dropdowns */
	var $select = $('.selectbox');
	if ($select.length) {
		$select.delegate('span','click',function(){
			var dd = $(this).next(); /* grab the custom select box's options */
			if (dd.is(':visible')) {
				dd.fadeOut(500);/* if the select box options are visible, fade them out */
			} else {
				dd.scrollTop(0).fadeIn(500);/* if the select box options aren't visible, fade them in (after resetting the scrollbar to the top) */
				dd.scrollIntoView(10);/* scroll the page so the select box options are within the viewport */
			}
		}).on('mouseleave',function(){
			$(this).find('ul').fadeOut(500);/* user mouses out of custom select box, "close" it */
		});
	}
	
	
	$(function() {
		$('select, :radio, :checkbox').uniform({
			'buttonClass' : 'button',
			selectAutoWidth : false
		});
	});
	
	/* superfish on main menu */
	//$("#nav-main-list").superfish({
	//	animation: {height:'show'}
	//});
	
	/* open/close "See More..." footer */
	$('#nav-footer-header').on('click', function(e) {
		/* user clicks on footer, reveal it */
		e.preventDefault();
		$('#nav-footer-body').slideDown();
	});
	$('#nav-footer').hoverIntent({
		/* user shows intent to mouse out, slide it closed */
		over: function(){/* required by plugin */},
		timeout: 500,
		out: function() {
			$('#nav-footer-body').slideUp();
		}
	});
	
	/* slide open/close the action menu parent items */
	//$('.actions li.parent a').click(function(e) {
	//	e.preventDefault();
	//	$(this).openClose('ul');
	//});
	
	/* sliders (carousels) */
	$('.slider').slider();
	
	/* animate the special alert */
	$('#specialalert').slideDown(1000);
	
	/* bring up print dialog when user clicks on the print tool */
	$(this).on('click','#tools-print',function(e) {
		e.preventDefault();
		window.print();
	});
	
	/* expand/collapse all faq questions */
	$(this).on('click','#maincontent .faq .toggleall',function(e){
		e.preventDefault();
		if ($('.question.open').length) {
			$('.question').openClose('.answer', 'close');
		} else {
			$('.question').openClose('.answer', 'open');
		}
	});
	/* slide open/close the faq questions */
	$(this).on('click','#maincontent .faq h3, #maincontent .faq span.icon',function(e) { 
		e.preventDefault();
		$(this).openClose('.answer');
	});
	
	/* contact us subpage nav */
	$('.contact-us .section-nav:not(.no-stub) a').append('<span class="stub"></span>');
	$('.contact-us .section-nav a:first').append('<span class="stub stub-extra"></span>')
	if ($('.contact-us .has-subpages').length) {
		$(this).delegate('.contact-us .has-subpages a','click',function(e) {
			/*
				NOTE: Mimicing current questdiagnostics.com functionality:
				- no e.preventDefault(), as the address bar should update each time the user clicks on a nav item
				- hash in nav item links/address bar should not match any ids on the page (so the viewport doesn't scroll to the top of the dom elements)
				- pages should not show up in the history, back and previous buttons will adjust the url, but will not toggle the sub pages
				- copy and paste url into new tab/window, page will load with that sub page open
			*/
			var t = $(this);
			$('.contact-us .has-subpages .selected').removeClass('selected');
			t.parent().addClass('selected');
			$('.subpage').hide();
			$(t.attr('href').replace('#','#subpage-')).show();
		});
		var hash = window.location.hash.split('#')[1];
		$('.contact-us .section-nav a[href=#' + hash + ']').trigger('click');
	}
	
	/* colored hover boxes */
	$('.hover-boxes ol > li').hoverIntent({
		over: function() {
			$('.hover-boxes ol > li').removeClass('full').hide();
			$('.hover-boxes').removeClass().addClass('hover-boxes hover-boxes-' + $(this).attr('className'));
			$(this).addClass('full').show();
		},
		interval: 50,
		out: function() {
			$('.hover-boxes ol > li').show();
			$('.hover-boxes').removeClass().addClass('hover-boxes');
			$(this).removeClass('full');
		}
	});
	
	/* lab tests online search form */
	$(this).on('change','#lab-tests-online select',function(e) {
		window.open('http://labtestsonline.org' + $(this).val());
	});
	
	/* careers tabs */
	if ($('#tabs.tabwrap').length) {
		var recenterTabs = function($li) {
			/* recenter tabs */
			var count = $('#tabs li').length;
			if (count > 6) {
				var index = $li.index();
				var margin;
				var w = - $('#tabs li:first').outerWidth() - 2;
				if (index < 3) {
					margin = 0;/* left align */
				} else if (index < count - 4) {
					margin = (w * (index - 2));/* center */
				} else {
					margin = (w * (count - 6));/* right align */
				}
				$('#tabs ul').animate({'margin-left':margin + 'px'}, 500);
			}
		}
		$(this).delegate('#tabs li a','click',function(e) {
			e.preventDefault();
			var $this = $(this);
			var $li = $this.closest('li');
			/* unmark the old current tab */
			$this.closest('ul').find('.curr').removeClass('curr');
			/* mark the new tab as current */
			$this.addClass('curr');
			/* hide the old tab content */
			$('#tabs .tabcontent-curr').removeClass('tabcontent-curr');
			/* show the new tab content (find the tabcontent with the same index as the clicked link's parent li)*/
			$('#tabs .tabcontent:eq(' + $li.index() + ')').addClass('tabcontent-curr');
			/* recenter tabs */
			recenterTabs($li);
		}).delegate('#tabs .prev, #tabs .next','click',function(e) {
			e.preventDefault();
			/* grab the current link, traverse up to the parent li */
			var $li = $('#tabs li .curr').closest('li');
			/* get the previous or next li */
			$li = $(this).hasClass('prev') ? $li.prev() : $li.next();
			if ($li.length) {
				/* trigger a click event on the link inside that li*/
				$li.find('a').trigger('click');
				/* recenter tabs */
				recenterTabs($li);
			}
		});
	}
	
	/* fancybox video */
	var $fancyvid = $('a.video');
	if ($fancyvid.length) {
		/* manually bind the click handler to each video instead of just calling $fancyvid.fancybox() because we need to do some manual setup */
		$fancyvid.each(function(){
			$(this).on('click', function(e) {
				e.preventDefault();
				/* ajax in the video */
				$.ajax({
					'url': $(this).attr('href'),
					success: function(data) {
						/* find just the video div */
						var $vid = $(data).find('.video-js-box');
						var $video = $vid.find('video');
						/* find the video dimensions */
						var dimensions = {
							h: $video.height(),
							w: $video.width()
						};
						/* if the video tag is unsupported (will return 0 width/height), grab the dimensions from the flash fallback */
						if (dimensions.h === 0) {
							var $flash = $vid.find('object');
							dimensions.h = $flash.height();
							dimensions.w = $flash.width();
						}
						/* append the video div to the body */
						$('body').append($vid);
						/* initialize video with VideoJS (needs to happen before being inserted into fancybox to avoid FOUC) */
						$video.VideoJS();
						/* display the video div in a fancybox */
						$.fancybox({
							autoDimensions: false,
							content: $vid,
							height: dimensions.h,
							width: dimensions.w,
							onComplete: function() {
								$('#fancybox-content > div').css({'overflow':'hidden'});
							}
						});
					}
				})
			});
		});
	}
	
	/* fix for browsers without native placeholder attribute support */
	$placeholders = $('input[placeholder]');
	if ($placeholders.length) {
		$placeholders.placeholder();
	}
	
	/* innovations animation */
	if ($('#bodywrapper').hasClass('innovations-page')) {
		/* create bgcover (mask) div */
		var $bgcover = $('<div id="innovations-bgcover"></div>');
		$('#pagewrapper').prepend($bgcover);
		if (isIE() && isMsieSevenOrNewer() < 9) {
			/* IE 6,7,8 get a simple swipe reveal */
			if (isMsieSevenOrNewer() < 7) {
				/* IE 6 bugfix */
				$bgcover.css({'width':'100%'}).delay(500).animate({'left':'100%','width':'0'},4000);
			} else {
				$bgcover.delay(500).animate({'left':'100%'},4000);
			}
		} else {
			/* modern browsers will actually trace the line */
			var traceIt = function(r, path, step, callback) {
				/* store the subpath attributes */
				var attrs = {stroke: '#2fb135', 'stroke-width': 5};
				/* trace a path by drawing subpaths of the original */
				var subpathlen = 0;
				var oldpath;
				var thisstep;
				/* update the canvas every x ms */
				var subpathInterval = setInterval(function() {
					/* draw another x pixels (whatever the step is) */
					thisstep = step;
					if (subpathlen > 500) { /* halfway through the word, speed up to compensate for less up and down */
						thisstep += step;
					}
					if (subpathlen > 1300) { /* done with the word, speed up and trace the straight line */
						thisstep += step * 2;
					}
					subpathlen += thisstep;
					/* remove the old subpath */
					if (oldpath) {
						oldpath.remove();
					}
					try {
						/* draw a new subpath (from the beginning of the path to the length of the new subpath) */
						oldpath = r.path(path.getSubpath(0,subpathlen)).attr(attrs);
					} catch (e) {
						/* when we go past the end of the line, we'll get an exception... 
						step back and draw the last step and bail out of the loop, call the callback */
						r.path(path.getSubpath(0,subpathlen-thisstep)).attr(attrs);
						clearInterval(subpathInterval);
						if (callback) {
							callback();
						}
					}
				},1);
			};
			/* grab the animation container */
			var $anim = $('#innovations-animation').css({'background':'#fff'});
			/* create a canvas (id, width, height) */
			var r = Raphael('innovations-animation', '100%', 55);
			/* draw the word path (with 0 stroke width, so it's not visible) */
			var p = r.path('M0,50.48c59.241-0.896,84.576,0.043,98.576-28.708c-3.741,7.682-11.75,26.75-5.25,26c6.687-0.771,20.75-19.5,26.257-25.538c-2.007,4.788-8.507,17.288-11.257,26.288c2.312-7.564,11.512-18.988,17.5-24.25c9.41-8.269,7.53,2.821,3.804,9.899c-5.054,9.602-5.017,18.665,2.446,11.602s17.899-19.444,21.535-23.431c-2.007,4.788-8.507,17.288-11.257,26.288c2.312-7.564,11.512-18.988,17.5-24.25c9.41-8.27,7.53,2.821,3.804,9.899c-5.054,9.602-4.616,19.05,2.446,11.602c10.923-11.521,20.461-25.602,24.472-24.357c-7.5-0.25-19.828,20.116-11,26c9.75,6.5,23-26.25,12.25-25c-4.946,0.577-5.714,14.139,12.75,1.75c4.44-2.453,5.5-4,8-1c4.16,4.993-9.025,16.694-5.75,23.75c3.118,6.717,18.872-13.974,22.541-23.842c0.185-0.499,0.925-0.705,1.163-0.374c7.601,10.591,18.181,6.793,24.913,2.766c5.169-3.093-2.993-4.949-8.692-2.596c-12.072,4.983-19.404,23.084-9.75,24.75c5.558,0.959,11-1,19.5-22c-7.031,16.562-7,23,0.25,21.75c6.784-1.17,25.83-32.114,28.923-43.622c0.213-0.791-0.406-1.077-0.959-0.265c-5.865,8.617-21.807,38.998-15.638,43.934c5,4,21.674-11.797,27.5-25.25c-0.083,1.24-9.098,19.1-8.155,24.483c2.405,9.268,27.155-27.233,34.405-24.983c-7.5-0.25-19.828,20.116-11,26c9.75,6.5,23-26.25,12.25-25c-6.076,3.954-0.576,12.204,10.424,4.954c15.07-9.933,14.25-8.25,1.326,19.547c7.75-11.75,10.668-19.607,18.5-23.75c10.742-5.679,2.457,8.543,0.75,12.5c-3.002,6.959-3.75,15.5,3.25,9.75c6.182-5.078,19.25-20.75,24.455-26.352c-5.703,6.136-1.959,14.081-0.262,18.521c3.998,10.445-10.52,14.783-15.369,3.961c12.1,15.572,15.889-1.233,23.174-7.137c12.061-9.771,29.625-12.219,44.564-12.745c18.922-0.598,107.18,0,126.111,-0.5l390,0').attr({'stroke-width': 0});
			/* draw the t cross path (with 0 stroke width, so it's not visible) */
			var p2 = r.path('M268.924,15.217L288.924,15.217').attr({'stroke-width': 0});
			/* slide the bgcover (mask) div from the left side of the screen to the left side of the canvas (revealing the page bg) */
			$bgcover.animate({'left':$anim.offset().left},1000,function(){
				/* once the bgcover reaches the canvas, move the bgcover div to 50% (so that the user can resize the window and there won't be any gaps)*/
				$bgcover.css({'left':'50%'});
				/* store the circle attributes */
				var attrs = {'fill': '#2fb135', 'stroke-width': 0, 'stroke-linecap': 'round', 'stroke-linejoin': 'round'};
				/* now that the bgcover has reached the canvas, we can trace the path for the word */
				traceIt(r,p,4,function(){
					/* when the word is done tracing, offset the left edge of the bg cover div so that it lines up with the right side of the canvas, then animate the bgcover off the right side of the screen 
					NOTE: have to use margin left to offset by a pixel value, rather than setting the left property, because webkit has issues animating from pixel values to a percentage */
					$bgcover.css({'margin-left':$anim.width()/2 + 'px'}).animate({'left':'100%','margin-left':'0'},1000,function(){
						/* once the line is fully revealed, we come back and dot the i's and cross the t's */
						/* dot the first i */
						r.circle(101.576,14,3).attr(attrs);
						setTimeout(function(){
							/* circle cap on left side of t cross (to help with the rounded corner) */
							r.circle(268.924,15.217,2.5).attr(attrs);
							/* cross the t */
							traceIt(r,p2,2,function(){
								/* circle cap on the right side of t cross (to help with the rounded corner) */
								r.circle(288.924,15.217,2.5).attr(attrs);
								setTimeout(function(){
									/* dot the second i */
									r.circle(298.826,14,3).attr(attrs);
								},300);
							});
						},300);
					});
				});
			});
		}
	}
		
});


/* feature grid - 'Innovations' */
$(document).ready(function(){
	$('#feature-grid').find('div.grid-item').addClass('hidden')
	.find('a[rel="slides"]').on("click",function(e) {
		e.preventDefault();
	});
});

$(window).on('load',function() {
	$featgrid = $('#feature-grid');
	if ($featgrid.length) {	
		all_items = $featgrid.find('div.grid-item');
		
		Array.prototype.shuffle = function (){
			var i = this.length, j, temp;
			if ( i == 0 ) return;
			while ( --i ) {
				j = Math.floor( Math.random() * ( i + 1 ) );
				temp = this[i];
				this[i] = this[j];
				this[j] = temp;
			}
		};
		
		grid_ref = [];
		for (i=0; i<all_items.length; i++)
		{
			grid_ref.push(i);
		}
		grid_ref.shuffle();

		function revealGridItem() {
			all_items.eq(grid_ref.shift()).removeClass('hidden')
			.hide()
			.fadeIn(150, function() {
				if (grid_ref.length >=1) {
					revealGridItem();
				}
				else {
					$featgrid.addClass('loaded');
					initGrid();
				}
			});
		}

		revealGridItem();

		if (isIE() && isMsieSevenOrNewer()=="6.0")  { 
			$featgrid.find('div.reveal').hover(function() {
				$(this).addClass('hover');
			}, function() {
				$(this).removeClass('hover');
			});
		}	
		
		function initGrid() {
			$featgrid.delegate('div.reveal', 'hover', function(e){	
				if (e.type == 'mouseenter') {
					$(this).addClass('open')
					.find('img').fadeIn('fast');
				} else {
					$(this).removeClass('open')
					.find('img').hide();
				}
			});	
			$featgrid.find('a[rel="slides"]').fancybox({
				'cyclic' : true,
				'padding' : 0,
				'overlayOpacity' : 0.8,
				'overlayColor' : '#000',
				'changeFade' : 0,
				onStart	: function() {
					$('#fancybox-wrap').addClass('slidebox');
				}
			});
		}
	}
});

/* ----------------------- END DP CUSTOM EVENTS ----------------------- */

/* ----------------------- CUSTOM EVENTS ----------------------- */

/* show/hide functions for payment method */
function ToggleRow(obj, display){
	if(display){
		$(obj).show();
	} else {
		$(obj).hide();
	}
}

function ToggleRows(rows, displayState) { 
	if (rows != null) {
		for (var i = 0; i < rows.length; i++) {
			if(displayState){
				$(rows.eq(i)).show();
			} else {
				$(rows.eq(i)).hide();
			}
		}
	}
}

function isIE() {
	ua = navigator.userAgent;
		var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
		return is_ie;
	}

function isMsieSevenOrNewer() {
	return window.ActiveXObject === undefined ? null : !window.XMLHttpRequest ? 6 : !document.querySelector ? 7 : !document.addEventListener ? 8 : !window.atob ? 9 : !document.__proto__ ? 10 : 11;
}

