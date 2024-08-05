/* getQueryVariable("page"); */
$(document).ready(function () {
	var current_width = $(window).width();
	$(".order-type-bt").click(function(){
		var refresh = 0;
		$(document).ajaxStop(function(){
			refresh++;
			if(refresh == 1) {
				if(current_width > 768) {
					scrollTo(); // reload function after changing order type
				}		
			}

		});
	});

	if($('#menu-items').length == 0){
        if($('#menu').length){
            $("#menu li a").each(function() {
                if(!($(this).attr("href") == "?page=half-half")) {
                    $(this).attr("href", "?page=browse" + $(this).attr('href'))
                }
            });
        }
    }
		 
	if($('#half-half-page').length){
		$('#menu ul li').removeClass('active');
		var halfHalf = $('#menu ul li a[href="?page=half-half"]');
		if(halfHalf.length){
			halfHalf.parent().addClass('active');
		}
	}
	if($('#displayDeals').length){
		$('#menu ul li').removeClass('active');
	}
	if($('#customise-page').length){
		$('#menu ul li').removeClass('active');
	}
     
	if(current_width > 768) {
		scrollTo();
	}		
	
	if(current_width <= 768) {
		var navbar_height = $(".navbar").height();

		$("#menu-ul li a").click(function(e) {
			if($(this).attr('href')==='?page=half-half'){
				window.location = '?page=half-half';
			}
			if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$('html,body').animate({
							scrollTop: target.offset().top - navbar_height - 55
					});
					return false;
				}
			}			
		});
	}
});

function scrollTo() {
	var navbar_height = $(".navbar").height();
		
	$("#menu-ul li a, #menu-scroll-down a").click(function(e) {
		if($(this).attr('href')==='?page=half-half'){
			window.location = '?page=half-half';
		}

		if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				var offset_top;
				if(!$("#menu").hasClass("horizontal-menu-fixed") && $(window).width() > 1024){
					offset_top = target.offset().top - 20;
				} else{
					offset_top = target.offset().top;
				}

				$('html,body').animate({
					scrollTop: offset_top - navbar_height - 68
				}, 500);
				return false;
			}
		}
					
	});

}