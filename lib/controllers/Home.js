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
      },
      feedFilter: function(q, category, feeling, isPointSorted) {
        var filter = {};
        var sort = {CreatedOn: -1};
        if(!!q) {
          filter.Title = q;
        }
        if(!!category) {
          filter.Category = category;
        }
        if(!!feeling) {
          filter.Feeling = feeling;
        }
        if(isPointSorted) {
          sort = {"Rating.TotalPoints": -1};
        }
        return Experiences.find(filter, {sort: sort})
      }
    }
  }
});

if(Meteor.isClient){
	Template.feeds.onRendered(function () {
		$(".search").keypress(Toggle);
		$(".search").keyup(Toggle);
		$(".categories").change(Toggle);
		$(".exp_feel").click(Toggle);
	});
}
if(Meteor.isServer) {
  function feedFiltering(q, category, feeling, isPointSorted) {
    var filter = {};
    var sort = {CreatedOn: -1};
    if(!!q) {
      filter.Title = q;
    }
    if(!!category) {
      filter.Category = category;
    }
    if(!!feeling) {
      filter.Feeling = feeling;
    }
    if(isPointSorted) {
      sort = {"Rating.TotalPoints": -1};
    }
    return Experiences.find(filter, {sort: sort})
  }
}

function Toggle(e){
	var search = $(".search").val().toLowerCase();
	var category = $(".categories").val();
  var feeling;
  if($(e.currentTarget).hasClass("exp_feel")) {
    $(".exp_feel").removeClass("active");
    feeling = $(e.currentTarget).addClass("active").data("enum") || null;
  }
  //Meteor.call("feedFilter",{q: search, category: category,feeling: feeling,isPointSorted: true});
  var search = feedFiltering(search, category, feeling, true);
  //HomeController.

  //feedList = feedFilter(search, category, feeling, true);
	// $(".feed").each(function(i,e){
	// 	var descripcion = $(e).attr("data-description").toLowerCase()+"/gi";
	// 	var feelingId = $(e).attr("data-mood-id");
	// 	var categoryId = $(e).attr("data-category-id");
	// 	if(!descripcion	.match(search)){
	// 		$(e).addClass("feed-hidden");
	// 	}else{
	// 		$(e).removeClass("feed-hidden");
	// 	}
	// });
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
