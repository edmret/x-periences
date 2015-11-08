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
        $('.post-ribbon').removeClass().addClass('post-ribbon feeling-id-0');
        var enumD = $(e.currentTarget).data('enum');
        $('#exp_form').data('enum', enumD);
      });
      $(document).on("click", "#feelTrust", function(e) {
        $('.post-ribbon').removeClass().addClass('post-ribbon feeling-id-7');
        var enumD = $(e.currentTarget).data('enum');
        $('#exp_form').data('enum', enumD);
      });
      $(document).on("click", "#feelFear", function(e) {
        $('.post-ribbon').removeClass().addClass('post-ribbon feeling-id-6');
        var enumD = $(e.currentTarget).data('enum');
        $('#exp_form').data('enum', enumD);
      });
      $(document).on("click", "#feelSurprise", function(e) {
        $('.post-ribbon').removeClass().addClass('post-ribbon feeling-id-5');
        var enumD = $(e.currentTarget).data('enum');
        $('#exp_form').data('enum', enumD);
      });
      $(document).on("click", "#feelSadness", function(e) {
        $('.post-ribbon').removeClass().addClass('post-ribbon feeling-id-4');
        var enumD = $(e.currentTarget).data('enum');
        $('#exp_form').data('enum', enumD);
      });
      $(document).on("click", "#feelDisgust", function(e) {
        $('.post-ribbon').removeClass().addClass('post-ribbon feeling-id-3');
        var enumD = $(e.currentTarget).data('enum');
        $('#exp_form').data('enum', enumD);
      });
      $(document).on("click", "#feelAnger", function(e) {
        $('.post-ribbon').removeClass().addClass('post-ribbon feeling-id-2');
        var enumD = $(e.currentTarget).data('enum');
        $('#exp_form').data('enum', enumD);
      });
      $(document).on("click", "#feelAnticipation", function(e) {
        $('.post-ribbon').removeClass().addClass('post-ribbon feeling-id-1');
        var enumD = $(e.currentTarget).data('enum');
        $('#exp_form').data('enum', enumD);
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
