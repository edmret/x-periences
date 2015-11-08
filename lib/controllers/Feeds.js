NewController = BaseController.extend({
  template: 'feeds',
  data: function() {
    return;
  }
});

NewController.events({
	'click': function() {
		console.log("prueba");
	}
});