NewController = BaseController.extend({
  template: 'new_post',
  data: function() {
    return {

      categoryList: function() {
        return Categories.find({}, {sort: {name: 1}});
      },

      feelingList: function() {
        return Feelings.find({},{sort: {enum: 1}})
      },

      userPicture: function(){
          var currentUser = UsersXP.findOne({user_id: Meteor.userId()});
          return currentUser ? currentUser.picture : "";
      }
    }
  }
});

if(Meteor.isClient) {
  Template.new_post.onRendered(function () {
      $(document).on("click", "#feelJoy", function(e) {
        var enumD = $(e.currentTarget).data('enum');
        $('#exp_form').removeClass().addClass('new-post-container feeling-id-0').data('enum', enumD);
      });
      $(document).on("click", "#feelTrust", function(e) {
        var enumD = $(e.currentTarget).data('enum');
        $('#exp_form').removeClass().addClass('new-post-container feeling-id-7').data('enum', enumD);
      });
      $(document).on("click", "#feelFear", function(e) {
        var enumD = $(e.currentTarget).data('enum');
        $('#exp_form').removeClass().addClass('new-post-container feeling-id-6').data('enum', enumD);
      });
      $(document).on("click", "#feelSurprise", function(e) {
        var enumD = $(e.currentTarget).data('enum');
        $('#exp_form').removeClass().addClass('new-post-container feeling-id-5').data('enum', enumD);
      });
      $(document).on("click", "#feelSadness", function(e) {
        var enumD = $(e.currentTarget).data('enum');
        $('#exp_form').removeClass().addClass('new-post-container feeling-id-4').data('enum', enumD);
      });
      $(document).on("click", "#feelDisgust", function(e) {
        var enumD = $(e.currentTarget).data('enum');
        $('#exp_form').removeClass().addClass('new-post-container feeling-id-3').data('enum', enumD);
      });
      $(document).on("click", "#feelAnger", function(e) {
        var enumD = $(e.currentTarget).data('enum');
        $('#exp_form').removeClass().addClass('new-post-container feeling-id-2').data('enum', enumD);
      });
      $(document).on("click", "#feelAnticipation", function(e) {
        var enumD = $(e.currentTarget).data('enum');
        $('#exp_form').removeClass().addClass('new-post-container feeling-id-1').data('enum', enumD);
      });
      $(document).on("submit", "#exp_form", function(e) {
        var title = $('#exp_title').val();
        var description =  $('#exp_description').val();
        var category = $('#exp_category').val();
        var isAnnon = $('#exp_annon').is(":checked");
        var feel = $('#exp_form').data('enum');
        if(!!title || !!description || !!category || !!feel) {
          var currentUser = Meteor.user();

          Experiences.insert({
            Title: title,
            Description: description,
            CategoryId: category,
            Feeling: feel,
            Rating: {
    		      TotalPoints: 0,
    	        UserRates: [
                {UserId: currentUser._id, Rate: 0, RatedOn: new Date()}
              ]
            },
      			UserId: currentUser._id,
            asAnnonymous: isAnnon,
      	    Keywords: [],
            CreatedOn: new Date()
          });

          //the total amount of experiences
          var addedExperiences = Experiences.find({},{_id:1}).count();

          //get matched badges with the total of posts
          Badges.find({ reach: {post: addedExperiences } })
            .forEach(function(badge){
                var userXP = UsersXP.findOne({ user_id: Meteor.userId() }),
                    badges = userXP.badges;
                badges.push(badge);

                UsersXP.update({_id:userXP._id}, {
                    $set: {
                        badges:badges,

                        total_badges: (userXP.total_badges + 1 )
                    }
                });
          });


        }
      });
  });
}
