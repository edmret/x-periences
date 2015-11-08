HomeController = BaseController.extend({
  template: 'feeds',
  data: function() {
    return {
      feedList: function() {
        var experiences = Experiences.find({}, {sort: {CreatedOn:-1}}),
        finalXP = [];
        experiences.forEach(function(experience){
            
            if( !experience.asAnnonymous ){
                var userData = Meteor.users.findOne({_id:experience.UserId}).profile;
                _.extend(userData, UsersXP.findOne({user_id:experience.UserId }));
                experience.user = userData;
                
            }else{
                experience.user = {
                    picture: 'https://pbs.twimg.com/profile_images/588696411526602754/qY3mHZC-_400x400.jpg',
                    name: "Anonymous"
                };
            }
            
            finalXP.push(experience);
            
        });
          
        return finalXP;
          
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
		$(".moods").change(Toggle);
		setTimeout(function(){
			preparar();
		},1000);
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
}
				//getUserName($(".feed-user",e));
	$(".feed").each(function(i,e){
	});
}

function getUserName(e){
	if(!$(e).attr("data-annonimous"))
		$(e).text(Meteor.users.findOne($(e).text()).profile.name);
	else
		$(e).text("Anónimo");
}

	//console.log(id);
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
