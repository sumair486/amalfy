// JavaScript Document

//global variables for single item buttons
var add_btn = "";
var customise_button = "";
var isMenuClick = 0;

$(document).ready(function() { 
	//initially hide floatbox
	$("#float-box").hide();
	initialize_template3(true);

	// OOA-897: New Store Unavailable Status
	if ($("#footerOfflineAlert")[0]){
		
		$('#footerOfflineAlert').fadeIn("fast");
		
		//OOA-1046 PLATINA: Add timer on closed banner
		var closeClicked = "";
		$(function() {
			var current_progress = 0;
			var interval = setInterval(function() {				
				current_progress++;
				$("#progressbar")
					.css("width", current_progress + "%")
					.attr("aria-valuenow", current_progress);
				
				if (current_progress >= 100){
					clearInterval(interval);
					$("#footerOfflineAlert").fadeOut("slow");
				}				

				if(closeClicked == "clicked"){
					clearInterval(interval);
				}
			}, 100);
		});

		$("#footerOfflineAlert-close").click(function(){
			closeClicked = "clicked";
			$("#footerOfflineAlert").fadeOut("fast");
		});	

	}	

	// OOA-1026 PLATINA: Moving suburb search bar
	// Click event for close button
	$(".store-details-default-panel #btn-change-store").click(function(){
		$("#store-details").hide();
		$("#store-select").fadeIn("fast");
	});		

	$("#store-select2-close, #order-type-select #order-type-select-close").click(function(){
		$("#store-select").hide();
		$("#order-type-select").hide();	
		$('#store-details').fadeIn("fast");
	});

	$("#store-details #order-type-select-close").click(function(){
		$("#store-select").hide();
		$("#store-details").hide();
		$('#order-type-select').fadeIn("fast");
	});

	$(".order-type-bt").click(function(){		
		var refresh = 0;
		var activeMenu = $("ul#menu-ul li a.menu-active").attr("href");
		$(document).ajaxStop(function(){
			refresh++;
			if(refresh == 1) {
				initialize_template3(false, activeMenu); // call function to re-initialize js generated items
			}
	
		});
	});	

	$(".qty-btn-popup-single").click(function() {
		var parent_div = "#"+$(this).attr("parent-id");
		var target = "#"+$(this).attr("data-target");
		$("#add-popup-qty #modal-addbtn").prop('disabled', true);
		setTimeout(function(){ //wait half second for text to update
			var qty = $("#add-popup-qty").find(".qty-label-popup").text();
			isNaN($(this).attr('ref-group-id')) ? $(parent_div).find(target).val(qty) : $(parent_div+" "+target).val(qty);
			$("#add-popup-qty #modal-addbtn").prop('disabled', false);
		}, 500);
	})


	$("#modal-addbtn").click(function() {
		if(add_btn != "") {
			add_btn.trigger("click");
		}
	})


	$("#modal-customisebtn").click(function() {
		if(customise_button != "") {
			customise_button.trigger("click");
		}
	})

	$(document).ajaxStop(function(){
		var cart_items = 0;
		//count cart items
		$("li.parent-item > .order-item-basket > .qty-label").each(function(){
			var qty = parseInt($(this).text());
			cart_items += qty;
		});

		$("li.parent-item > .order-item-basket > .half-half").each(function(){
			var qty = parseInt($(this).text());
			cart_items += qty;
		}) 


		if(cart_items != 0) {
			$(".cart_items_qty").text(cart_items);
			$(".cart_items_qty").css("display", "inline");
		} else {
			$(".cart_items_qty").css("display", "none");
		}

		$('.modal-popup #accordion a.item').click(function(){
			//slideup or hide all the Submenu
	
			$('#accordion li').children('ul').slideUp('fast');
	
			if ($(this).parent().hasClass('open')) {
				$(this).parent().removeClass('open');
	
			} else {
	
				//remove all the "Over" class, so that the arrow reset to default
	
				$('#accordion a.item').each(function () {
					if ($(this).attr('rel') != '') {
						$(this).removeClass($(this).attr('rel') + 'Over');
	
					}
				});
	
				$('#accordion a.item').parent().removeClass('open');
				$(this).parent().addClass('open');
				/* SECOND SECTION */
	
				//show the selected submenu
				$(this).siblings('ul').slideDown('fast');
	
				//add "Over" class, so that the arrow pointing down
				$(this).children('a').addClass($(this).children('li a').attr('rel') + 'Over');
			}
			
		});

	});

	$(function() {

		$(".navbar a").click(function() {						
			$("#navbar-header").find(".active").removeClass("active");				
			$(this).parent().addClass("active");
		});

		$('.navbar a[href*=#]:not([href=#])').click(function() {			
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname){
				var target = $(this.hash);				
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');				
				if (target.length) {
					$('html,body').animate({
						scrollTop: target.offset().top - 57
					}, 1000);
				}
			}
		});
	});

	if($(window).width() > 1024) {
		var url_vars = getUrlVars();
		var page = url_vars["page"];
		if(!(page == "checkout" || page == "register" || page == "terms" || page == "privacy" || page == "feedback" || page == "forgotten-password")) {
			$("#show_cart").click(function(){				
				$("#float-box").toggle("left");

				var right_nav_bottom = 98;

				if($("#lion_iframe").length) {
					right_nav_bottom += 70;
				}
				
				if($(".item-delivery-fee").length){
					$(".item-delivery-fee").css('bottom', right_nav_bottom+parseInt($(".item-price-total").outerHeight())+'px');
					maxheight = $(window).height() - right_nav_bottom - (257 + parseInt($(".item-delivery-fee").outerHeight()) + parseInt($(".item-price-total").outerHeight())); // 285
				} else {
					maxheight = $(window).height() - right_nav_bottom - (214 + parseInt($(".item-price-total").outerHeight())); // 217
				}

				$("#mybasket-ul").css("max-height", maxheight+"px");
			});
			
			// OOA-1 Template 3 and 4 "Store is currently closed" banner update with "X"
			$("#close_show_cart").click(function(){
				$("#float-box").toggle("left");
			});								
		}
	}

	if($(window).width() <= 1024) {
		$( ".view_cart" ).wrap("<a href='#' data-toggle='offcanvas'>");
	}
	//end of template 3

	get_cart_total();

	jQuery.fn.center = function () {
		this.css("position","absolute");
		this.css("top", ( $(window).height() - this.height() ) / 2+$(window).scrollTop() + "px");
		this.css("left", ( $(window).width() - this.width() ) / 2+$(window).scrollLeft() + "px");
		return this;
	}
	
	$('#menu-items a').addClass('btn btn-primary');
	$('#menu-items ul li #item-buttons input[type=button]').addClass('btn btn-primary');
	$('.item-price-total .item-price-span br').remove();
	$('#checkout br').remove();
	$('#location br').remove();
	$('#half-half-page').prepend('<div id="menu-title">Half/Half</div>');
	$('#street-input p:first').css("display", "none");
	$('#street-block div:first').css("width", "50%");
	$('#estimated-time span:first').css("font-size", "80px");
	$('#street-block div:nth-child(2)').remove();
	$('#street-block div:nth-child(2)').css("width", "50%");

	//clone order type
	var order_pickup = $("#float-box #order-type-bt-pickup").clone(true).prop('id', 'platina-order-type-bt-pickup');
	var order_delivery = $("#float-box #order-type-bt-delivery").clone(true).prop('id', 'platina-order-type-bt-delivery');

	$(order_pickup).addClass("platina-order-type-bt");
	$(order_delivery).addClass("platina-order-type-bt");

	$(order_pickup).appendTo("#platina-order-type-container");
	$(order_delivery).appendTo("#platina-order-type-container");

	initGeoLocation();
	
});

$(document).ready(function () {
    //set up some minimal options for the feedback_me plugin
	var client_code = $("#client_code").val();
	var current_width = $(window).width();

	// For franchise_logo on feedback widget (OOA-249)
	var logoHtml = '';
	if(session_logo){
		logoHtml = '<div id="store-logo" style="text-align:center; float:right; margin-right:20px;"><img class="img-responsive" style="width:90%; height: auto; max-width:100px; margin-top: -15px;" src="'+session_logo+'"></div>';
	}

	if(current_width > 1024) {
		fm_options = {
			title_label : "",
			position: "left-bottom",
			bootstrap: true,
			show_email: true,
			show_asterisk_for_required: true,
			custom_html : '<div id="feedback_type2" style="margin-top:-20px;margin-bottom:10px;">' + logoHtml +
						  '<label for="type_of_feedback" class="fieldTitle"> Feedback Type</label> <span class="required_asterisk">*</span><br />' + 
						  '<select style="width:auto;" class="type_of_feedback form-control" required>' +
						  '<option value="">:::Please Select:::</option>' +
						  '<option>General Inquiry</option>' +
						  '<option>Compliment</option>' +
						  '<option>Suggestion</option>' +
						  '<option>Complaint</option>' +
						  '<option>Cant Checkout</option>' +
						  '<option>Cant Do Something I Want</option>' +
						  '<option>Information Incorrect</option>' +
						  '<option>Security Requirements</option>' +
						  '<option>Layout Issue</option>' +
						  '<option>Bug</option>' +
						  '<option>Other</option>' +
						  '</select>' +
						  '</div>'+
						  '<div id="logo" style="text-align: center;">'+
						  '<label style="font-weight:lighter; color: #837f7f; font-size: 11px;margin-top: -5px;">Send Feedback to:<img class="img-responsive" src="'+S3_ASSETS_URL+'template4/img/new_footer/small/'+(typeof PARTNER_ID !== undefined && PARTNER_ID == 3 ? 'idealpos_logo.png' : 'logo-new2.png')+'"></label>'+
						  '</div>',
			email_label: "Email",
			email_placeholder: "Your Email",
			email_required: true,
			name_placeholder: "Your Full Name",
			message_placeholder: "Your Message",
			message_required: true,
			name_required: true,
            feedback_url: HTTP_URL + 'core/ajax/feedback_send.php',
			custom_params: {
				client_code: client_code
			},
			delayed_options: {
				delay_success_milliseconds: 3500,
                sending : "Sending...",
				send_success : "Sent successfully!"
			}
		};
	 
		//init feedback_me plugin
		fm.init(fm_options);
		
		$(".feedback_me_form input[type=text]").addClass( "form-control" );
		$(".feedback_me_form input[type=email]").addClass( "form-control" );
		$(".feedback_me_form textarea").addClass( "form-control" );
		$("#feedback_type2").prependTo(".feedback_me_form ul");
		$(".feedback_message").css("height","3em");
	}
});

$(window).on('resize', function(){
	resizeStoreComponents();

	if($(this).width()>994){
		$('#wrap').removeClass('active');	
	}

	arrow_nav();

	if($(window).width() < 480) {
		$('.modal-hh:visible').each(function(){
			var target_modal = $(this);
			var new_height = $(window).height() - (target_modal.find(".modal-header").outerHeight() + target_modal.find(".modal-footer").outerHeight()) - 2;
			target_modal.find(".modal-body").css("min-height", new_height);
			target_modal.find(".modal-body").css("max-height", new_height);
		});

		$('.modal-deals:visible').each(function(){
			var target_modal = $(this);
			var new_height = $(window).height() - (target_modal.find(".modal-header").outerHeight() + target_modal.find(".modal-footer").outerHeight()) - 2;
			target_modal.find(".modal-body").css("min-height", new_height);
			target_modal.find(".modal-body").css("max-height", new_height);
		});
	}

	move_cart();
});

function move_cart(){
	if($(".checkout-container").length){
		if($(this).width() >= 992){
			if($("#customer-card").parent().hasClass("left")){
				$("#customer-card").detach().appendTo('.checkout-container .right');
				$("#float-box").detach().appendTo('.checkout-container .right');
			}
		} else{
			if($("#customer-card").parent().hasClass("right")){
				$("#customer-card").detach().insertAfter("#order-type-card");
				$("#float-box").detach().insertAfter("#customer-card");
			}
		}
	}
}

function get_cart_total(){
	$('#cartTotal').load(HTTP_URL + 'core/ajax/get_cart_total.php?page='+PAGE_NAME, function(data){
		$('.cartTotal').html('$'+data);
	});
}

$(document).ready(function(){
	var current_width = $(window).width();
	if(current_width > 1024) {
		$('.modal-popup .customise-add-button, .modal-popup #modal-addbtn, #view-basket .remove-button').live("click", function() {
			get_cart_total();
		});
	}

	
	/* Wrap divs into div.container */
	
	$( "#customise-page" ).wrapInner( "<div class='container'></div>" );
	$( "#half-half-page" ).wrapInner( "<div class='container'></div>" );
	$( "#displayDeals" ).wrapInner( "<div class='container'></div>" );
	$( "#reorder-page" ).wrapInner( "<div class='container'></div>" );
	$( "#new_customer" ).wrapInner( "<div class='container'></div>" );
	$( "#incorrect-alert" ).wrapInner( "<div class='container'></div>" );
	$( ".checkout-container" ).wrapInner( "<div class='col-lg-12 container'></div>" );
	$( "#confirm-order" ).wrapInner( "<div class='container'></div>" );
		
	/* Add min-height to menu item title */
	$('.menu-item').each(function() {
		var menu_items = this.id;
		var hi = 0;
		var vi = 0;
		
		$("#"+menu_items+" .item-title").each(function(){
			var h = $(this).height();
			if(h > hi){
				hi = h;
			}
		});
		
		$("#"+menu_items+" .item-description").each(function(){
			var v = $(this).height();
			if(v > vi){                  
				vi = v;
			}
		});
		
		$("#"+menu_items+" .item-title").css("min-height", hi);
		$("#"+menu_items+" .item-description").css("min-height", vi);
	});
	
	/* Wrap customise divs into div.container */
	
	$("#customise-page #cancel, #half-half-page #cancel, #displayDeals #cancel, #new-customer-details #cancel").click(function(){ window.location = '?page=browse#menu-items'; });
 
    $('button[data-toggle="back"]').live('click', function(e) {
		parent.history.back();
		return false;
    });
	
	if($("#menu-items").length){
		var current_width = $(window).width();
		
    	if(current_width < 993) {
			$(".cart-collapse").css("display", "block");
		}
	}

	if ($("#lion-image").length){ 
		$('#float-box').scroll(function() {  // for order type to fix at the top since we have img of lion - mobile
			var lionImageHeight = $('#float-box').offset().top - $( "#lion-image" ).height() - 12;
			
			if ($('#float-box').scrollTop() > $( "#lion-image" ).height()) {
				$('#order-type-bt').removeClass('order-type-bt-mobile');
			}
			else {
				$('#order-type-bt').addClass('order-type-bt-mobile');
				$('#order-type-bt').attr('style', 'margin: 0 !important');
			}  
		});

		
	}
	
	/* Parralax Effect */
	var current_width = $(window).width();
	if(current_width > 1024) {
		$('body').each(function(){ var $obj = $(this); $(window).scroll(function() { var yPos = -($(window).scrollTop() / $obj.data('speed')); var bgpos = '50% '+ yPos + 'px'; $obj.css('background-position', bgpos ); }); });
	}
	/* Parralax Effect */
	
	/* Hide landing page if other page */
	if($("#menu-items").length == 0){
		$("#float-box").css('display', "none");
		$(".office-info").css('display', "none");
	}else{
		/*if($("#float-box #offline-alert-txt").length){
			$("#float-box").css("cssText", "padding-bottom:0 !important;");
			$("#float-box").css("overflow", "auto");
			$("#offline-alert-txt").css("cssText", "height: 100% !important;");
		}*/
	}
	/* Hide landing page if other page */

	var right_nav_bottom = 98;

	if($("#cart-alert").css("display") != "none") {
		right_nav_bottom += 100;
	}

	if($("#lion_iframe").length) {
		right_nav_bottom += 70;
	}

	if(current_width > 1024) {
		$(document).ajaxStop(function(){
			if($(".item-delivery-fee").length) {
				maxheight = $(window).height() - right_nav_bottom - (257 + parseInt($(".item-delivery-fee").outerHeight()) + parseInt($(".item-price-total").outerHeight())); // 285
			} else {
				maxheight = $(window).height() - right_nav_bottom - (214 + parseInt($(".item-price-total").outerHeight())); // 217
			}
			if($("#menu-items").length) {
				$("#mybasket-ul").attr("style", "max-height:"+maxheight+"px !important");
			}
		});

	}

	if(current_width > 1024) {
		$(document).ajaxStop(function(){
			if($("#cart-alert").css("display") != "none") {
				$("#cart-alert").attr('style', 'bottom:'+(right_nav_bottom+parseInt($(".item-delivery-fee").outerHeight()))+'px !important');
			} else {
				$(".item-delivery-fee").css('bottom', right_nav_bottom+parseInt($(".item-price-total").outerHeight())+'px');
				$(".item-price-total").css('bottom', right_nav_bottom+'px');
			}
		});

	}

	
	/* Scrolling effects */
	var current_item = "";
    $(window).scroll(function() {
		var navbar_height = $(".navbar").height();
		var current_width = $(window).width();
		var footerHeight = $("#footer").height();
		var scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();
		if(scrollBottom < footerHeight) {
			$("#footer-new").removeClass('footer-fixed');
			$("#footer-new").hide();
		} else {
			$("#footer-new").addClass('footer-fixed');
			$("#footer-new").show();

		}

		if($("#menu-items").length){
			var topHeight = $(".office-info").height() + navbar_height - 40;
		}else{
			var topHeight = navbar_height;
		}

		var main_height = $("#landing").height() + $("#store-data").height();
		
		if ($(".navbar").offset().top > topHeight) {
			$(".navbar").addClass("nav-color");
		}else{
			$(".navbar").removeClass("nav-color");
		}

		if ($(".navbar").offset().top > main_height) {
			$("#menu").addClass("horizontal-menu-fixed");
			$("#menu-items").css('padding-top','51px');
		}else{
			$("#menu").removeClass("horizontal-menu-fixed");
			$("#menu-items").css('padding-top','0');
		}

		if($(".navbar").offset().top > main_height + $("#menu-items").height()){			
			$("#menu").removeClass("horizontal-menu-fixed");
			$("#menu-items").css('padding-top','0');	
		}
		
		if ($("#menu-items").length){
			if ($(".navbar").offset().top > topHeight) {
				$("#menu-items, #half-half-page, #customise-page, #displayDeals").addClass("menu-items-fixed");
			}else{
				$("#menu-items, #half-half-page, #customise-page, #displayDeals").removeClass("menu-items-fixed");
				$("#location, #times").show();
			}
		}else{
			$("#footer-new").hide();
		}

		$(".menu-item:visible").each(function(){
			var menu_item = $(this).attr("id");
			/* if(menu_item == "halfhalf-block" || menu_item == "half--half-block") { 
				menu_item = "?page=half-half"; 
			} else {  */
				menu_item = "#"+menu_item; 
			/* } */
			var off_top = $(this).offset().top - 130;
			var menu_height = $(this).height();

			$("#menu-ul a").each(function() {
				if($(window).scrollTop() >= off_top && $(window).scrollTop() <= menu_height + off_top) {
					if($(this).attr("href") == menu_item) {
						if(menu_item != current_item && isMenuClick == 0) {
							var scrollToLeft = $(this).parent().position().left;
							scrollToLeft -= 80;
							$("#menu-ul").animate({'scrollLeft': "+="+scrollToLeft}, 100);
							$(this).addClass("menu-active");
							current_item = menu_item;
						}
					} else {
						if(isMenuClick == 0) {
							$(this).removeClass("menu-active");
						}
					}
				}
			})
		})
    });
	/* Scrolling effects */

	if (!$(".lion-bottom-overlay").length){ //fix for overlay still appearing on first load when lion button is not shown
		$('#lion_overlay_div').css('display', 'none'); 
	}

	$("#ftToggle").toggle(
		function(){
			$("body").animate({"padding-bottom": "150px", scrollTop: $("#footer").offset().top}, 500);
			$("#footer").animate({height: "680"}, 100);
		},
		function(){
			$("body").animate({"padding-bottom": "0px", scrollTop: $("#footer").offset().top}, 500);
			$("#footer").animate({height: "0"}, 500);
	});
	
	move_cart();
});

jQuery( document ).ready(function( $ ) {

	if(!$("#menu-items").length){
		$(".feedback_trigger").hide();
	}


	//Registration Page

	if($("#register-detailss").length){
		$("#register-details").validate({
			rules: {	
				'firstName': {
					required: true,
					maxlength: 200
				},
				'surname': {
					required: true, 
					maxlength: 200
				},
				'unitNumber': {
					maxlength: 4
				},
				'houseNumber': {

					required: true,
					maxlength: 200
				},
				'deliveryStreet': {
					required: true,
					maxlength: 200
				},
					'email': {
	 				required: true,
					maxlength: 200,
					email: true,
					remote: {
						type: 'GET',
						url: HTTP_URL+'ajax/check_field.php',
						dataType: 'json',
						dataFilter: function(response) {
							response = jQuery.parseJSON(response);
							if (response[0].response_code === '01'){
								return false;
							}else{
								return true;
							}
						}	
					}           
				},
				'phoneNumber': {
					required: true,
					number: true,
					maxlength: 200,
					remote: {
						type: 'GET',
						url: HTTP_URL + 'core/ajax/check_field.php',
						dataType: 'json',
						dataFilter: function(response) {
							response = jQuery.parseJSON(response);
							if(response[0].response_code === '01'){
								return false;
							}else{
								return true;
							}			
						}	
					}           
				},
				'password': {
					maxlength: 64,
					minlength: 6,
					required: true,
				},
				'retypePassword': {
					required: true,
					equalTo: ".customer-signup-password"
				}
			}, 
			messages: {
				'email':{
					remote: 'Email address already exists'
				},
				'phoneNumber':{
					remote: 'Phone number already exists'
				},
				'retypePassword': 'Retype password'
			},
			submitHandler: function(e) {
				var data = $("#register-details").serialize();
					$.ajax({
						type: "POST",
						url: HTTP_URL + 'core/ajax/save_customer_details.php',
						data: data,
						success: function(msg){
							window.location.href = '?page=browse';
						}
				});
			},
			highlight: function(element) {
				var id_attr = "#" + $( element ).attr("name") + "1";
				$(element).closest('.form-group').removeClass('has-success').addClass('has-error');
				$(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');         
			},
			unhighlight: function(element) {
				var id_attr = "#" + $( element ).attr("id") + "1";
				$(element).closest('.form-group').removeClass('has-error').addClass('has-success');
				$(id_attr).removeClass('glyphicon-remove').addClass('glyphicon-ok');         
			},
			errorElement: 'span',
				errorClass: 'help-block',
				errorPlacement: function(error, element) {
					if(element.length) {
						error.insertAfter(element);
					} else {
					error.insertAfter(element);
					}
			}  
		});
	}
	
	//Loyalty Page
	function isValidEmailAddress(email) {
		var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
		return pattern.test(email);
	};

	
	$('#signup-loyalty').click(function(e){
	var email = $("#loyalty").val();
	
	if( !isValidEmailAddress( email ) ){
		$('#loyalty').val("");
		$('#loyalty').attr("placeholder", "Your Email is invalid");
		$('#loyalty').focus();}
	else{
        $('.alert-success').fadeOut();
		$.ajax({ 
			type: 'POST',
			data: {e: email},
			url: HTTP_URL + 'core/ajax/loyalty_send.php?send-code',
			success: function(response){
				if(response == 'sent') {
                    $('#loyalty-form').fadeOut();
                    $('#success').fadeIn(1000);
                    $('#loyalty-form').before("<div class='alert alert-success fade in'>Confirmation link has been sent to your email.</div>");
                }else{
                    $('#loyalty-form').before("<div class='alert alert-success fade in'>Something went wrong. Please try again.</div>");
				}
			}
		});
	} 
	e.preventDefault();
	});
	
});

jQuery(function ($) {
	function toggleIcon(e) {
        $(e.target)
		.prev('#faq .panel-heading')
		.find(".more-less")
		.toggleClass('glyphicon-plus glyphicon-minus')
		.toggleClass('active');
    }
    $('#faq .panel-group').on('hidden.bs.collapse', toggleIcon);
    $('#faq .panel-group').on('shown.bs.collapse', toggleIcon);
});

function findValue(li) {
	if( li == null ) return alert("No match!");

	// if coming from an AJAX call, let's use the CityId as the value
	if( !!li.extra ) var sValue = li.extra[0];

	// otherwise, let's just display the value in the text box
	else var sValue = li.selectValue;

}

function selectItem(li) {
	findValue(li);
}

function formatItem(row) {
	return row[0];
}

function lookupAjax(){
	var oSuggest = $("#CityAjax")[0].autocompleter;

	oSuggest.findValue();

	return false;
}

function lookupLocal(){
	var oSuggest = $("#CityLocal")[0].autocompleter;

	oSuggest.findValue();

	return false;
}

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function arrow_nav(){
	var sWidth = 0;
	var sOffset = 0;;
	if($(window).width() > 768){ 
		sWidth = "800px";
	} else{
		sWidth = "200px";
	}

	if($(window).width() > 1024){ 
		sOffset = 100;
	} else{
		sOffset = 20;
	}

	if($("#menu-ul")[0]){
		$("#menu").find(".pn-Advancer").remove();

		if($("#menu-ul")[0].scrollWidth+sOffset > $(window).width()){
			$("#menu").append('<button class="pn-Advancer pn-Advancer_Left" type="button">'+
			'<svg class="pn-Advancer_Icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 551 1024"><path d="M445.44 38.183L-2.53 512l447.97 473.817 85.857-81.173-409.6-433.23v81.172l409.6-433.23L445.44 38.18z"/></svg>'+
			'</button>'+
			'<button class="pn-Advancer pn-Advancer_Right" type="button">'+
			'<svg class="pn-Advancer_Icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 551 1024"><path d="M105.56 985.817L553.53 512 105.56 38.183l-85.857 81.173 409.6 433.23v-81.172l-409.6 433.23 85.856 81.174z"/></svg>'+
			'</button>');

			//scroll menu
			$('.pn-Advancer_Left').click(function(){
				$("#menu-ul").animate({scrollLeft: "-="+sWidth});
			});
				
			$('.pn-Advancer_Right').click(function(){
				$("#menu-ul").animate({scrollLeft: "+="+sWidth});
			});
		} else{
			$("#menu").find(".pn-Advancer").remove();
		}
	}
}

function menu_nav(){
	var main_height = $("#landing").height() + $("#store-data").height();

	if($(".navbar").offset().top > main_height + $("#menu-items").height()){			
		$("#menu").removeClass("horizontal-menu-fixed");
	}else if($(".navbar").offset().top > main_height){
		$("#menu").addClass("horizontal-menu-fixed");
	}else{
		$("#menu").removeClass("horizontal-menu-fixed");
	}

	$(".mi-loader").css("display", "");
}

//put in function, to be called when items are reloaded via ajax (changing order type)
function initialize_template3(scrollToHash, activeMenu) {
	if(scrollToHash != undefined && scrollToHash){
		var page_hash = window.location.hash;
		if(page_hash != "") {
			var navbar_height = $(".navbar").height();
			var target = $(page_hash);

			if(target.length){
				if($(window).width() > 1024) {
					$('html,body').animate({
						scrollTop: target.offset().top - navbar_height - 126
					}, 500);
				} else {
					$('html,body').animate({
						scrollTop: target.offset().top - navbar_height - 54
					}, 500);
				}
			}
		}
	}

	if($('body').hasClass('loading')){ //Check if the body has loading class
		setInterval(function(){
			$('body').removeClass('loading'); 
		}, 2000);
	}

	$("#menu-ul li a").click(function() {
		isMenuClick = 1;
		$(this).addClass("menu-active");
		$("#menu-ul li a").not(this).removeClass("menu-active");
		setTimeout(function(){
			isMenuClick = 0;
		}, 1000);
	})

	arrow_nav();

	$("#menu > #menu-ul > li > a").each(function(){
		var menu_id = $(this).attr("href");
		menu_id = menu_id.split("#");
		var url_vars = getUrlVars();
		var page = url_vars["page"];
		var target = "";

		if(page == "half-half"){
			if(menu_id[0] == "?page=half-half" || page[0] == "page=half-half") {
				$(this).css("border-bottom", "3px solid #f00");
			}
		} else if(page == "deals") {
			if(menu_id[1] == "deals-block") {
				$(this).css("border-bottom", "3px solid #f00");
				var scrollToLeft = $(this).parent().position().left; 
				$("#menu-ul").animate({'scrollLeft': scrollToLeft-400}, 500);
			}
		}

		if(activeMenu != undefined && activeMenu){
			if(activeMenu == $(this).attr("href")){
				$(this).addClass("menu-active");
			}
		}
	});

		var customerLoggedIn = $("#customerLoggedIn").val();
		var customerGuest = $("#customerGuest").val();
		var selectedStore = $("#storeSelected").val();

		// display "select store message" when no store is selected or user is not logged in
		if(!(customerLoggedIn == 1 || customerGuest == 1 || selectedStore == 1)) {
			
			// Hide cart icon when no store is selected or user is not logged in
			$("#show_cart").hide();

			$(".menu-item > #menu_items > ul > li").each(function(){
				$(this).find(".item-price").remove();
				$(this).find(".visual-tag-container").remove();
				$("<div class='select_store_notification'>Select location for price and availability</div>").insertAfter($(this).find(".item-block > .item-title-container"));
				$("<div class='select_store_notification'>Select location for price and availability</div>").insertAfter($(this).find(".item-block-no-image > .item-title-container"));
				
				// OOA-119 Platina - Popup 'select store' when clicking an item.
				$(this).bind("click", function() {
					$.prompt("Please login or select a store for pricing and availability", { buttons: {Ok: true}, submit: reloadOption, });							
					function reloadOption(e, v, m, f) {
						if (v) { $('html, body').animate({ scrollTop: $("#store-data").offset().top }, 1000); }
					}
					return false;					
				})
			})			
		} else {
			// Check if user is logged in but not yet selected a store. 
			// When the user clicked the menu items, select lcation prompt will display
			if((customerGuest == 1 || customerLoggedIn == 1) && !(selectedStore == 1)){
				$(".menu-item > #menu_items > ul > li").each(function(){
					$(this).find(".item-price").remove();
					$(this).find(".visual-tag-container").remove();
					$("<div class='select_store_notification'>Select location for price and availability</div>").insertAfter($(this).find(".item-block > .item-title-container"));
					$("<div class='select_store_notification'>Select location for price and availability</div>").insertAfter($(this).find(".item-block-no-image > .item-title-container"));
					
					// OOA-119 Platina - Popup 'select store' when clicking an item.
					$(this).bind("click", function() {
						$.prompt("Please login or select a store for pricing and availability", { buttons: {Ok: true}, submit: reloadOption, });							
						function reloadOption(e, v, m, f) {
							if (v) { $('html, body').animate({ scrollTop: $("#store-data").offset().top }, 1000); }
						}
						return false;					
					});
				});					
			}else{
				//Show cart icon
				$("#show_cart").show();

				//enable redirect for halfhalf
				/* $("#halfhalf-block > #menu_items > ul > li").click(function() {
					if($(this).find(".activetime_span").length == 0) { //check if item is available
						//OOA-71 PLATINA - Deals can still be added even if store is offline
						//Include Half/Half for prevententing redirection
						if($("input[name='storestatus']").val() != 'offline') {
							window.location = '?page=half-half';
						}
					} 
				}); */					
			}			
		}

		$(".menu-item > #menu_items > ul > li").each(function(){
			// disable ordering when no store is selected or user is not logged in
			if(!(customerLoggedIn == 1 || customerGuest == 1 || selectedStore == 1)) {
				return false;
			}

			// disbale ordering if guest/account already logged in but not yet selected a store
			if((customerGuest == 1 || customerLoggedIn == 1) && !(selectedStore == 1)){
				return false;	
			}
			
			//assign button click event to li
			var this_target = "";
			if($(this).find(".add-deal").length == 1) this_target = $(this).find(".add-deal"); //deal buttons to redirect
			if($(this).find(".add-button").length == 1) this_target = "add_button"; //for default buttons to add quantity using modal
			if($(this).find(".add-button-popup").length == 1) this_target = $(this).find(".add-button-popup"); //popup buttons for customise modal
			if($(this).find(".hh-button-popup").length == 1) this_target = $(this).find(".hh-button-popup"); //popup button for half-half modal

			//Define events and objects for menu items
			if(this_target == "add_button") { //do for single items without item options
				$(this).attr("data-toggle", "modal");
				$(this).attr("data-target", "#add-popup-qty");

				$(this).bind("click", function() {
					customise_button = "";
					add_btn = "";					
					if($(this).find(".activetime_span").length == 1) { //check if item is unavailable
						return false;
					} 
					if($('body').hasClass('loading')){ //check the page is not loaded yet
						return false;
					}

					var parent_div = $(this).attr("id");
					var item_title = $(this).find(".item-title").text();
					var item_description = $(this).find(".item-description").text();
					var ref = $(this).find(".add-button").attr("ref");
					var qty = $(this).find(".qty-select").val();

					//attach original object attributes to modal objects
					$("#add-popup-qty").find("h4.modal-title").text(item_title);
					$("#add-popup-qty").find(".item-description-popup").text(item_description);
					$("#add-popup-qty").find(".qty-btn-popup-single").attr("parent-id", parent_div);
					$("#add-popup-qty").find(".qty-btn-popup-single").attr("ref-group-id", ref);
					$("#add-popup-qty").find(".qty-btn-popup-single").attr("data-target", ref+"-qty");
					$("#add-popup-qty").find(".qty-label-popup").attr("id", "qty-"+ref);
					$("#add-popup-qty").find(".qty-label-popup").text(qty);
					add_btn = $(this).find(".add-button");

					if($(this).find(".customise-page").length == 1) {
						$("#modal-customisebtn").show();
						customise_button = $(this).find(".customise-page");
					} else {
						$("#modal-customisebtn").hide();
					}
				})
			} else if (this_target != "") { //for group items and single items with group options
				// event handling
				$(this).click(function(e) {				
					//assign valid classes to avoid event bubbling
					valid_class = ["item-block", "item-thumb", "item-block-no-image", "group", "single", "deals", "valid", "visual-tag-container", "item-title-container"];
					target_class = $(e.target).parent().attr("class");
					if(target_class == undefined) {
						target_class = $(e.target).parent().attr("id"); //if there is no class check for id
						var is_modal = $(e.target).parents(".modal").length; // do not trigger the click event inisde the modal
						
						if(!is_modal && !(target_class == "item-buttons" || target_class == undefined)) {
							target_class = "valid";
						} else {
							target_class = "invalid";
						}
					}
					
					if(valid_class.includes(target_class)) {
						if($('body').hasClass('loading')){ //check the page is not loaded yet
							return false;
						}
						if($(this).find(".activetime_span").length == 0) { //check if item is unavailable
							this_target.trigger("click");
							setTimeout(function(){ 
								if($(window).width() < 1025) {
									//add a toggle for the visible modal description
									$('.modal:visible').each(function () {
										var target_modal = $(this);

										//reset layout
										var item_desc = $(this).find(".item-description-popup");
										$(this).find(".toggle-title").remove();
										item_desc.removeClass("modal-title-full");
										$(this).find(".modal-header").removeClass("toggled-title");
										if($(window).width() < 768) {
											if(!target_modal.hasClass("modal-hh")){
												var new_height = $(window).height() - (target_modal.find(".modal-header").height() + 135);
												target_modal.find(".modal-body").css("min-height", new_height);
												target_modal.find(".modal-body").css("max-height", new_height);
											}
										}


										if(item_desc[0].scrollHeight > item_desc[0].offsetHeight) {
											$(this).find(".modal-header").append("<div class='toggle-title'><span class='glyphicon glyphicon-chevron-down'></span></div>");
										}

										$(".toggle-title").click(function() {
											item_desc.toggleClass("modal-title-full");
											if($(window).width() < 768) {
												new_height = $(window).height() - (target_modal.find(".modal-header").height() + 135);
												target_modal.find(".modal-body").css("min-height", new_height);
												target_modal.find(".modal-body").css("max-height", new_height);
											}
											if($(this).parent().hasClass("toggled-title")) {
												$(this).parent().removeClass("toggled-title");
											} else {
												$(this).parent().addClass("toggled-title");
											}
										})
									});
								}
							}, 500);
						}
					}

				})
			}
		});	
}

var initGeoLocation = function () {
	var searchGeo = $('#searchNearest');

	options = {
		enableHighAccuracy: false,
		timeout: 5000,
		maximumAge: 0
	};
    
    function showLocation(position) {
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;

		var latlng = new google.maps.LatLng(latitude, longitude);
		// This is making the Geocode request
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({ 'latLng': latlng }, function (results, status) {
			if (status !== google.maps.GeocoderStatus.OK) {
				var address = '';
			}
			// This is checking to see if the Geoeode Status is OK before proceeding
			if (status == google.maps.GeocoderStatus.OK) {
				var address = (results[0].formatted_address);
				$("#searchAddress").val(address);

				// Move this code inside this if condition
				// Waiting for the result of address before redirecting it to stores.php
				// START
				$("#searchLat").val(latitude);
				$("#searchLng").val(longitude);

				var local = {"adr":address, "lat":latitude, "lng":longitude};
				localStorage.setItem("addr", JSON.stringify(local));				

				$('#searchAddress').keyup();
				// END
			}
		});
	}

	function error(err) {
		console.warn(`ERROR(${err.code}): ${err.message}`);
	}
    
    searchGeo.live('click', function() {
        if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showLocation, error, options);
		} else { 
			alert('Geolocation is not supported by this browser.')
		}
    });
}

function resizeStoreComponents() {
	let store_container_height = $('#store').height();
	$('#store-data').height(store_container_height + 100);

	let store_select_width = $('#store-select').width();
	if (store_select_width < 480 || $(window).width() < 600) {
		$('.change-order-type-btn').html('Change');
	} else {
		$('.change-order-type-btn').html('Change Order Type');
	}
}

function check_estimated_time() {
	if($('#estimated-time').has('#est-time').length > 0 || $('#estimated-time > .alert:contains("Delivery Starts")').length > 0) {
		$("#estimated-time").removeClass();
	} else {
		$("#estimated-time").addClass('no-bg');
	}
}