ShowController = BaseController.extend({
  template: 'show_post',
  data: function(){
      
    var experience = Experiences.findOne({_id: this.params.id});
        
    if( !experience.asAnnonymous ){
        var userData = Meteor.users.findOne({_id:experience.UserId}).profile;
        _.extend(userData, UsersXP.findOne({user_id:experience.UserId }));
        experience.user = userData;
    }else{
        experience.user = {
            picture: 'https://pbs.twimg.com/profile_images/588696411526602754/qY3mHZC-_400x400.jpg',
            name: "Anonymous",
            UserId:""
        };
    }
    return experience;
  }
});
