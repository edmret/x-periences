ProfileController = BaseController.extend({
  template: 'profile',
  data: function(){
      //var params = Router.current().params;
      
      if(!!this.params && !!this.params.id){
          return Meteor.users.findOne(this.params.id);
      }
      
      return Meteor.users.findOne(Meteor.userId());
  }
});