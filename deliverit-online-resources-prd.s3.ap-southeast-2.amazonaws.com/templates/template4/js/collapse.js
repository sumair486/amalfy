/* $(document).ready(function(){ */
	//$(window).resize(function(){
		/* var current_width = $(window).width();
		
			if(current_width < 992) {
			  $('#menu-items').addClass("panel-group");
			  $('.menu-item').addClass("panel panel-default"); */
			  
			  /* $('#menu-items ul').each(function () 
				{
					var id = $(this).attr("id");
					$(".menu-item h1").attr( { "data-toggle":"collapse", "data-target":"#"+id } );
			  }); */
			 /*  
			  $(".menu-item h1").each(function(index){
				
				var value= $(this).text();
				var newVal = value.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '');
				
				$(this).wrap('<a href="#collapse'+newVal+'" id="collapse'+index+'" data-toggle="collapse" data-parent="#menu-items" class="accordion-toggle collapsed" data-target="#collapse'+newVal+'"/></a>'); */
				//$(this).attr( { "data-toggle":"collapse", "data-parent":"#menu-items", "data-target":"#collapse"+newVal } );
				
				
				/* $("#menu_items").each(function(){
				  $(this).attr("id","collapse"+newVal);
				  $(this).addClass("menu-item-wrapper");
				});
				});
			  
			  
			  $(".menu-item-wrapper").addClass("collapse");
			  } else {
				$('#menu-items').removeClass("panel-group");				
				$('.menu-item').removeClass("panel panel-default");
				$(".menu-item-wrapper").removeClass("collapse").css("height", "auto");
				$(".menu-item h1").removeAttr("data-toggle").removeAttr("data-parent").removeAttr("data-target");
			} */
	//});

/* $('a[data-toggle="collapse"]').live('click', function(){
   var id = $(this).attr('id');
   setInterval(navigateToElement(id), 1000);
   console.log(id);
}); */

/* $('#menu a[data-toggle="collapse"]').click(function() {
    var id = $(this).attr('id');
	navigateToElement(id);
});

	
});

function navigateToElement(id) {
    $('html, body').animate({
        scrollTop: $("#"+id).offset().top - 60
    }, 800, function() {

        $('html, body').animate({
            scrollTop: $("#"+id).offset().top - 60
        });
	});
}
 */

//var id = $(".menu-item h1").closest(".menu-item").attr("id");
//alert(id);

/* $('#menu-items ul').each(function () 
            {
                var id = $(this).attr("id");
                // compare id to what you want
                alert(id);
            }); */

/* $(".menu-item h1").each(function(){
var value= $(this).text();
alert(value);
}); */

/* Sticky Menu */
var current_width = $(window).width();
if(current_width < 994) {
	
	var stickyHeaders = (function() {

	var $window = $(window),
	$stickies;
	
	var load = function(stickies) {
		
		var navDiv = $('#main-nav');
		var getHeight = navDiv.height();
		var navHeight = "0";
		
		if(navDiv.css('display') == 'none'){
			navHeight = 0;
			$('.followMeBar').addClass('followMeBar2');
		}else{
			navHeight = getHeight;
		}
		
		

		if (typeof stickies === "object" && stickies instanceof jQuery && stickies.length > 0) {

			$stickies = stickies.each(function() {

			var $thisSticky = $(this).wrap('<div class="followWrap" />');
	  
			$thisSticky
				.data('originalPosition', $thisSticky.offset().top - navHeight)
				.data('originalHeight', $thisSticky.outerHeight() - navHeight)
					.parent()
					.height($thisSticky.outerHeight()); 			  
			});

			$window.off("scroll.stickies").on("scroll.stickies", function() {
				_whenScrolling();		
			});
		}
	};

	var _whenScrolling = function() {
		$stickies.each(function(i) {			

			var $thisSticky = $(this),
			$stickyPosition = $thisSticky.data('originalPosition') + $('#menuitems-reorder').height();
			 

			if ($stickyPosition <= $window.scrollTop()) {        
			
				var $nextSticky = $stickies.eq(i + 1),
				$nextStickyPosition = $nextSticky.data('originalPosition') + 500 - $thisSticky.data('originalHeight');

				$thisSticky.addClass("fixed");	

				if ($nextSticky.length > 0 && $thisSticky.offset().top >= $nextStickyPosition) {
					$thisSticky.addClass("absolute").css("top", $nextStickyPosition);
				}

			}
			else{
				var $prevSticky = $stickies.eq(i - 1);

				$thisSticky.removeClass("fixed");

				if ($prevSticky.length > 0 && $window.scrollTop() <= $thisSticky.data('originalPosition') - $thisSticky.data('originalHeight')) {
					$prevSticky.removeClass("absolute").removeAttr("style");
				}
			}
		});
	};

	return {
		load: load
	};
	})();

	$(function() {
		stickyHeaders.load($(".followMeBar"));
	});
}