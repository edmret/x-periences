Router.configure({
  layoutTemplate: 'mainLayout'
});

Router.route('/', {
  controller: 'HomeController'
});

Router.route('/new', {
  controller: 'NewController'
});

Router.route('/profile', {
  controller: 'Profile'
});

Router.route('/favorites', {
  controller: 'Favorites'
});

Router.route('/badges', {
  controller: '_Badges'
});