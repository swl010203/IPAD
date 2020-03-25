$('.list .lis').click(function(){
	$(this).children('span').addClass('lisel').parent().siblings().children('span').removeClass('lisel');
});
$('.pBtn').click(function(){
	$('.bgCover').addClass('show');
});