ProfileController = BaseController.extend({
  template: 'profile',
  data: function(){
      var userData = {};
      
      if(!!this.params && !!this.params.id){
          userData = Meteor.users.findOne(this.params.id);
      }else{
          userData = Meteor.users.findOne(Meteor.userId());
      }
      
      userData.experiences = Experiences.find({UserId: Meteor.userId() }, {sort: {CreatedOn: -1}});
      
      return userData;
      
  }
});