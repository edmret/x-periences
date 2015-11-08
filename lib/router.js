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
  controller: 'ProfileController'
});

Router.route('experience-show', {
  path:'/show/:id',
  controller: 'ShowController'
});

Router.route('/favorites', {
  controller: 'Favorites'
});

Router.route('/badges', {
  controller: '_Badges'
});

Router.route('/faq', {
  controller: 'Faq'
});

Router.route('/show', {
  controller: 'ShowController'
});

Router.route('/filter', {
  path: "/filter/:q/:cat/:feel",
  controller: 'HomeController'
});
