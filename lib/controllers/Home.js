HomeController = BaseController.extend({
  template: 'feeds',
  data: function() {
    return {
      feedList: function() {
        return Experiences.find({}, {sort: {CreatedOn:1}});
      }
    }
  }
});
