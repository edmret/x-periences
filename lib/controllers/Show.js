ShowController = BaseController.extend({
  template: 'show_post',
  data: function(){
    return Experiences.findOne({_id: this.params.id});
  }
});
