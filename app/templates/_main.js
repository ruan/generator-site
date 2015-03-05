$(document).ready(function(){
	$('#home').find('.carrossel').projetos();
});
$(window).load(function(){
	$('#moldura').find('.moldura').each(function(i,moldura){
		var $last = $('body').children('section:last');
		var $moldura = $(moldura);
		var height = $last.outerHeight() + $last.offset().top;
		var lacoHeight = $('#moldura').find('.laco').outerHeight();
		var mb = 220;
		var m = 8;

		if($moldura.hasClass('left')){
			$moldura.height(height);
		}
		if($moldura.hasClass('right-1')){
			$moldura.height((height - lacoHeight - mb + m));
		}
		if($moldura.hasClass('laco')){
			$moldura.css({top:(height - lacoHeight - mb)});
		}
		if($moldura.hasClass('right-2')){
			$moldura.css({top:height - mb - m , height: mb + m});
		}
		if($moldura.hasClass('bottom')){
			$moldura.css({top:height - 10});
		}
	}).fadeTo(300,1);
});
