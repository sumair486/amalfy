$(document).ready(function() {
	$('[data-toggle=offcanvas]').click(function() {
		$('.row-offcanvas').toggleClass('active', 200);
		$('html').toggleClass('overflow-hide', 200);
		$('#menu-cont').toggleClass('hide-div', 200);
		$('.office-info').toggleClass('hide-div', 200);
		$('.checkout-button').toggleClass('hide-div', 200);

		if($(window).width() <= 1024){
			if(!$('#menu-cont').hasClass('hide-div')){
				new Blazy();
			}
		}

		if($('#menu-cont').hasClass("order-type-changed") && $('#menu-cont').css("display") != "none"){
			$('#menu-cont').removeClass("order-type-changed");
			menu_nav();
			arrow_nav();
		}
		
		return false;
	});
  
	$('body').append('<div class="main-mask"></div>');
	 
	$('.toggle-left').click(function(){
		$(this).toggleClass('active');
		$('#left-nav').toggleClass('active');
		$('.main-mask').fadeToggle(400);
	});
	
	$(".main-mask").click(function(){
		$(".toggle-left").click();
	});
	
	$('#left-nav li a').click(function(){
		$('#left-nav').toggleClass('active');
		$('.toggle-left').toggleClass('active');
		$('.main-mask').fadeToggle(400);
	})
	
	$('.upsize').click(function(){
		$('.upsize ul').slideToggle(400)
	})
});
