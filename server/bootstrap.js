Meteor.startup(function() {
  if(typeof Categories.findOne() === 'undefined') {
    Categories.insert({name: "Finanzas"});
    Categories.insert({name: "Deportes"});
    Categories.insert({name: "Viajes"});
    Categories.insert({name: "General"});
    Categories.insert({name: "Entretenimiento"});
    Categories.insert({name: "Tecnología"});
    Categories.insert({name: "Educación"});
    Categories.insert({name: "Familia"});
    Categories.insert({name: "Hogar"});
  }
});


/**
* Eecutes on create user
* @param {object} options the options object
* @param {object} user the user object object
*/
Accounts.onCreateUser(function(options, user) {
    
    // the final profile picture
    var profilePicture = 'images/defaultprofile.png';
    
    //check for the login services (current)
    if(!!user.services){
        if(!!user.services.facebook){
            profilePicture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
        }else if( !!user.services.twitter ){
            profilePicture = services.twitter.profile_image_url;
        }
    }
    
    //sets the profile default picture
    options.profile.picture = profilePicture;
    
    //set the birthday
    options.profile.birthdate = '1900/01/01';
    
    
    user.profile = options.profile;
    return user;
});
