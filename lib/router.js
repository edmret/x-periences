Router.configure({
  layoutTemplate: 'mainLayout'
});

Router.route('/', {
  controller: 'HomeController',
  name: 'home'
});

Router.route('/new', {
  controller: 'NewController',
  onBeforeAction: function (pause) {
    if (!Meteor.userId()) {
        Router.go('/');
      }else {
        this.next();
      }
  }
});

Router.route('/profile', {
  path:'/profile',
  controller: 'ProfileController',
  onBeforeAction: function (pause) {
    if (!Meteor.userId()) {
        Router.go('/');
      }else {
        this.next();
      }
  }
});

Router.route('profile-user', {
  path:'/profile/:id',
  controller: 'ProfileController',
  onBeforeAction: function (pause) {
    if (!Meteor.userId()) {
        Router.go('/');
      }else {
        this.next();
      }
  }
});

Router.route('/favorites', {
  controller: 'Favorites'
});

Router.route('/badges', {
  controller: '_Badges'
});

Router.route('/show', {
  controller: 'ShowController'
});
