
$(function(){
	setTimeout(function(){
		$(".faq-toggle").click(function(){
			// $(this).parent("div").parent("div").children(".faq-less").tootle();
			// $(this).parent("div").parent("div").children(".faq-more").tootle();
			$(".faq-less",$(this).parent("div").parent("div")).toggle();
			$(".faq-more",$(this).parent("div").parent("div")).toggle();
		});
	},1000);
});