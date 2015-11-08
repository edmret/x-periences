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
			$(".feed").each(function(i,e){
				if(i==0) {
					var feelingId = $(".feed-user",e).attr("data-feeling-id");
					getFeelingClass(feelingId);
				}
				getUserName($(".feed-user",e));
			});
		},1000);
	});
}

function getUserName(e){
	if(!$(e).attr("data-annonimous"))
		$(e).text(Meteor.users.findOne($(e).text()).profile.name);
	else
		$(e).text("Anónimo");
}

function getFeelingClass(id){
	console.log(id);
	$(".mdl-layout__header-row")
		.removeClass("feeling-id-0 feeling-id-1 feeling-id-2 feeling-id-3 feeling-id-4 feeling-id-5 feeling-id-6 feeling-id-8");
	$(".mdl-layout__header-row").addClass("feeling-id-"+id);
	$(".mdl-layout__header-row a").addClass("feeling-id-"+id);
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