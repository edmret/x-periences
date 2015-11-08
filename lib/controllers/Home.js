HomeController = BaseController.extend({
  template: 'feeds',
  data: function() {
    return {
      feedList: function() {
        return Experiences.find({}, {sort: {CreatedOn:1}});
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
	});
}

function Toggle(){
	var search = $(".search").val().toLowerCase();
	var category = $(".categories").val();
	var mood = $(".moods").val();
	$(".feed").each(function(i,e){
		var descripcion = $(e).attr("data-description").toLowerCase()+"/gi";
		var feelingId = $(e).attr("data-mood-id");
		var categoryId = $(e).attr("data-category-id");
		if(!descripcion	.match(search)){
			$(e).addClass("feed-hidden");
		}else{
			$(e).removeClass("feed-hidden");
		}
	});
	if(search.length==0){
		$(".feed").show();
	}
	console.log($(".feed").length +":"+ $(".feed-hidden").length);
	if($(".feed").length == $(".feed-hidden").length){
		$(".no-matches").show()
	} else {
		$(".no-matches").hide()
	}
	
}

function Highlight(e,match){
	$(".highlight").remove();
}