NewController = BaseController.extend({
  template: 'new_post',
  data: function() {
    return {
      categoryList: function() {
        return Categories.find({}, {sort: {name:1}});
      }
    }
  }
});

NewController.events({
    'submit form': function() {
      console.info('si jala!');
      var title = $('#exp_title').val();
      var description =  $('#exp_description').val();
      var category = $('#exp_category').val();
      var isAnnon = $('#exp_annon').is(":checked");
      if(!!title || !!description || !!category) {
        var currentUser = Meteor.user();
        Experiences.insert({
          Title: title,
          Description: description,
          CategoryId: category,
          Feeling: 3,
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
      }
    }
  });
