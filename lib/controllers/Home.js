HomeController = BaseController.extend({
  template: 'feeds',
  data: function() {
    return {
      feedList: function() {
        return Experiences.find({}, {sort: {CreatedOn:1}});
      },
	  categoryList: function() {
        return Categories.find({}, {sort: {name:1}});
      }
    }
  }
});

HomeController.events({
	"keyup .search": function(e){
		console.log("prueba");
		Toggle();
	},
	"change .categories": function(){
		Toggle();
	},
	"change .moods": function(){
		Toggle();
	}
});

function Toggle(){
	var search = $(".search").val();
	var category = $(".categories").val();
	var mood = $(".moods").val();
	console.log("search:"+search+";category:"+category+";mood="+mood);
	$(".feed").each(function(i,e){
		var descripcion = $(e).attr("data-description")+"/gi";
		var feelingId = $(e).attr("data-mood-id");
		var categoryId = $(e).attr("data-category-id");
		if(!descripcion	.match(search)){
			$(e).hide();
		}else{
			$(e).show();
		}
	});
	if(search.length==0){
		$(".feed").show();
	}
}

function Highlight(e,match){
	$(".highlight").remove();
}