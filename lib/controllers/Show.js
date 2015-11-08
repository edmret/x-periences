ShowController = BaseController.extend({
  template: 'show_post',
  data: function(){
      
    var experience = Experiences.findOne({_id: this.params.id});
    var userData = Meteor.users.findOne({_id:experience.UserId}).profile;
    _.extend(userData, UsersXP.findOne({user_id:experience.UserId }));
      
    console.log(userData);
      
    experience.user = userData;
      
    return experience;
      
  }
});
