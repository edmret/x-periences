NewController = BaseController.extend({
  template: 'new_post',
  data: function() {
    return {
      categoryList: function() {
        return Categories.find({}, {sort: {name: 1}});
      },
      feelingList: function() {
        return Feelings.find({},{sort: {enum: 1}})
      }
    }
  }
});

if(Meteor.isClient) {
  Template.new_post.onRendered(function () {
    /**
      * The cover search element
      * @type {HTMLElement}
      */
      $(document).on("click", "#feelJoy", function(e) {
        var enumD = $(e.currentTarget).data('enum');
        $('#exp_form').removeClass().addClass('new-post-container feel-Joy').data('enum', enumD);
      });
      $(document).on("click", "#feelTrust", function(e) {
        var enumD = $(e.currentTarget).data('enum');
        $('#exp_form').removeClass().addClass('new-post-container feel-Trust').data('enum', enumD);
      });
      $(document).on("click", "#feelFear", function(e) {
        var enumD = $(e.currentTarget).data('enum');
        $('#exp_form').removeClass().addClass('new-post-container feel-Fear').data('enum', enumD);
      });
      $(document).on("click", "#feelSurprise", function(e) {
        var enumD = $(e.currentTarget).data('enum');
        $('#exp_form').removeClass().addClass('new-post-container feel-Surprise').data('enum', enumD);
      });
      $(document).on("click", "#feelSadness", function(e) {
        var enumD = $(e.currentTarget).data('enum');
        $('#exp_form').removeClass().addClass('new-post-container feel-Sadness').data('enum', enumD);
      });
      $(document).on("click", "#feelDisgust", function(e) {
        var enumD = $(e.currentTarget).data('enum');
        $('#exp_form').removeClass().addClass('new-post-container feel-Disgust').data('enum', enumD);
      });
      $(document).on("click", "#feelAnger", function(e) {
        var enumD = $(e.currentTarget).data('enum');
        $('#exp_form').removeClass().addClass('new-post-container feel-Anger').data('enum', enumD);
      });
      $(document).on("click", "#feelAnticipation", function(e) {
        var enumD = $(e.currentTarget).data('enum');
        $('#exp_form').removeClass().addClass('new-post-container feel-Anticipation').data('enum', enumD);
      });
      $(document).on("submit", "#exp_form", function(e) {
        //console.info('si jala!');
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
        }
      });
  });
}

// NewController.events({
//     'submit form': function() {
//       console.info('si jala!');
//       var title = $('#exp_title').val();
//       var description =  $('#exp_description').val();
//       var category = $('#exp_category').val();
//       var isAnnon = $('#exp_annon').is(":checked");
//       var feel = $('#exp_form').data('enum');
//       if(!!title || !!description || !!category || !!feel) {
//         var currentUser = Meteor.user();
//         Experiences.insert({
//           Title: title,
//           Description: description,
//           CategoryId: category,
//           Feeling: feel,
//           Rating: {
//   		      TotalPoints: 0,
//   	        UserRates: [
//               {UserId: currentUser._id, Rate: 0, RatedOn: new Date()}
//             ]
//           },
//     			UserId: currentUser._id,
//           asAnnonymous: isAnnon,
//     	    Keywords: [],
//           CreatedOn: new Date()
//         });
//       }
//     }
    // "click #feelJoy": function(e) {
    //   var enumD = $(e.target).data('enum');
    //   $('#exp_form').removeClass().addClass('new-post-container feel-Joy').data('enum', enumD);
    // },
    // "click #feelTrust": function(e) {
    //   var enumD = $(e.target).data('enum');
    //   $('#exp_form').removeClass().addClass('new-post-container feel-Trust').data('enum', enumD);
    // },
    // "click #feelFear": function(e) {
    //   var enumD = $(e.target).data('enum');
    //   $('#exp_form').removeClass().addClass('new-post-container feel-Fear').data('enum', enumD);
    // },
    // "click #feelSurprise": function(e) {
    //   var enumD = $(e.target).data('enum');
    //   $('#exp_form').removeClass().addClass('new-post-container feel-Surprise').data('enum', enumD);
    // },
    // "click #feelSadness": function(e) {
    //   var enumD = $(e.target).data('enum');
    //   $('#exp_form').removeClass().addClass('new-post-container feel-Sadness').data('enum', enumD);
    // },
    // "click #feelDisgust": function(e) {
    //   var enumD = $(e.target).data('enum');
    //   $('#exp_form').removeClass().addClass('new-post-container feel-Disgust').data('enum', enumD);
    // },
    // "click #feelAnger": function(e) {
    //   var enumD = $(e.target).data('enum');
    //   $('#exp_form').removeClass().addClass('new-post-container feel-Anger').data('enum', enumD);
    // },
    // "click #feelAnticipation": function(e) {
    //   var enumD = $(e.target).data('enum');
    //   $('#exp_form').removeClass().addClass('new-post-container feel-Anticipation').data('enum', enumD);
    // }
  // });
