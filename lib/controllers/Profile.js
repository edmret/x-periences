ProfileController = BaseController.extend({
  template: 'profile',
  data: function(){
      /*
       * the final User data to display in view
      * @type {object}
      */
      var userData = {},
          /**
          * The user ID, can be the logged ID or passed by parammeter
          */
          userId = Meteor.userId();
      
      //check if any user id param is sent
      if(!!this.params && !!this.params.id){
          /**
          * @type {string} the complete user id
          */
          userId = this.params.id;
          
      }
      
      //get th user data
      userData = Meteor.users.findOne(userId);
    
      
      _.extend(userData.profile, UsersXP.findOne({user_id:userId}));
      
      
      var finalXP = [],
          experiences = Experiences.find({UserId: userId }, {sort: {CreatedOn: -1}});
      
      experiences.forEach(function(xp){
          xp.user = userData.profile;
          finalXP.push(xp);
      });
      
      //returns 
      return {
          profile: userData.profile,
          has_no_badges : !(userData.profile.total_badges > 0 ),
          experiences : finalXP
      };
  }
});