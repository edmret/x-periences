Router.configure({
  layoutTemplate: 'mainLayout'
});

Router.route('/', {
  controller: 'HomeController'
});

Router.route('/new', {
  controller: 'NewController'
});