HomeController = BaseController.extend({
  template: 'feeds',
  data: function() {
    return {
      feedList: function() {
        return Experiences.find({}, {sort: {CreatedOn:-1}});
      },
	  categoryList: function() {
        return Categories.find({}, {sort: {name:1}});
      },
      feelingList: function() {
        return Feelings.find({},{sort: {enum: 1}})
      }
    }
  }
});

if(Meteor.isClient){
	Template.feeds.onRendered(function () {
		$(".search").keypress(Toggle);
		$(".search").keyup(Toggle);
		$(".categories").change(Toggle);
		$(".moods").change(Toggle);
		setTimeout(function(){
			preparar();
		},1000);
	});
}

function preparar(){
	$(".feed").each(function(i,e){
		getUserName($(".feed-user",e));
	});
}

function getUserName(e){
	if(!$(e).attr("data-annonimous"))
		$(e).text(Meteor.users.findOne($(e).text()).profile.name);
	else
		$(e).text("Anónimo");
}

function Toggle(){
	var search = $(".search").val().toLowerCase();
	var category = ($(".categories").val()!="undefined") ? $(".categories").val() : "";
	var mood = ($(".moods").val()!="undefined") ? $(".moods").val() : "";
	$(".feed").each(function(i,e){
		var descripcion = ($(e).attr("data-description").length>0) ? $(e).attr("data-description").toLowerCase()+"/gi" : "";
		var feelingId = ($(e).attr("data-feeling-id")!="undefined") ? $(e).attr("data-feeling-id") : "";
		var categoryId = ($(e).attr("data-category-id")!="undefined") ? $(e).attr("data-category-id") : "";
		console.log(category +" , "+ mood);
		console.log(categoryId +" , "+ feelingId);
		console.log(((!descripcion.match(search) && search.length>0) ||  (category!=categoryId && category.length>0) || (mood!=feelingId && mood.length>0)));
		if((!descripcion.match(search) && search.length>0) ||  (category!=categoryId && category.length>0) || (mood!=feelingId && mood.length>0)){
			$(e).addClass("feed-hidden");
		}else{
			$(e).removeClass("feed-hidden");
		}
	});
	if(search.length==0 && category.length==0 && mood.length==0){
		$(".feed").removeClass("feed-hidden");
	}
	if($(".feed").length == $(".feed-hidden").length){
		$(".no-matches").show();
	} else {
		$(".no-matches").hide();
	}
	
}

function Highlight(e,match){
	$(".highlight").remove();
}