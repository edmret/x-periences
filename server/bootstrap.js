Meteor.startup(function() {
  //Categories collection initialization
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

  //Feeling collection initialization
  if(typeof Feelings.findOne() === 'undefined') {
    Feelings.insert({name_es: "Alegría", name: "Joy", enum: 0});
    Feelings.insert({name_es: "Anticipación", name: "Anticipation", enum: 1});
    Feelings.insert({name_es: "Ira", name: "Anger", enum: 2});
    Feelings.insert({name_es: "Aversión", name: "Disgust", enum: 3});
    Feelings.insert({name_es: "Tristeza", name: "Sadness", enum: 4});
    Feelings.insert({name_es: "Sorpresa", name: "Surprise", enum: 5});
    Feelings.insert({name_es: "Miedo", name: "Fear", enum: 6});
    Feelings.insert({name_es: "Confianza", name: "Trust", enum: 7});
  }
    
    

    //try to allow update data
   Meteor.users.allow({
       update: function (userId, doc, fieldNames, modifier) {
    
           
          if( userId === Meteor.UserId() && 
             fieldNames.indexOf('_id') == -1
          ) {
              return true;
          }
           
       }
   });
    

  //Feeling collection initialization
  if(typeof Badges.findOne() === 'undefined') {
    Badges.insert({
        Name: "¡Tu primer hijo!",
        Description: "¡Has creado tu primer experiencia :)!",
        ShortHand: "first-child",
        ImageUrl: "http://images.clipartpanda.com/police-officer-badge-clipart-clipart-fancy-badge-256x256-561e.png",
        instructions: "¡Crea tu primer nota!",
        reach: {
            post: 1
        }
    });
    Badges.insert({
        Name: "Como tu primera vez",
        Description: "¡Han votado tu nota positivamente por primera vez!",
        ShortHand: "first-time",
        ImageUrl: "http://images.clipartpanda.com/police-officer-badge-clipart-clipart-fancy-badge-256x256-561e.png",
        instructions: "¡Recive un punto positivo en una experiencia!",
        reach: {
            liked: 1
        }
    });
    Badges.insert({
        Name: "!Como un puberto¡",
        Description: "¡empiezas a acumular experiencias, la gente aprende mucho de tí!",
        ShortHand: "puberty",
        ImageUrl: "http://images.clipartpanda.com/police-officer-badge-clipart-clipart-fancy-badge-256x256-561e.png",
        instructions: "¡escribe 10 experiencias!",
        reach: {
            post: 10
        }
    });
    Badges.insert({
        Name: "!Toxido Mask¡",
        Description: "¡Quieres ser tan popular como toxido Mask!",
        ShortHand: "toxydo",
        ImageUrl: "http://images.clipartpanda.com/police-officer-badge-clipart-clipart-fancy-badge-256x256-561e.png",
        instructions: "¡Recive 10 votos positivos!",
        reach: {
            liked: 10
        }
    });
      Badges.insert({
        Name: "!Padawan¡",
        Description: "te encanta aprender de los demás vas por buen camino!",
        ShortHand: "padawan",
        ImageUrl: "http://images.clipartpanda.com/police-officer-badge-clipart-clipart-fancy-badge-256x256-561e.png",
        instructions: "Vota 10 experiencias, aprende de ellos :)",
        reach: {
            voted: 10
        }
    });
      Badges.insert({
        Name: "Jedi Master",
        Description: "¡Maestro, la fuerza es tu aliada, la experiencia te es agraciada!",
        ShortHand: "padawan",
        ImageUrl: "http://images.clipartpanda.com/police-officer-badge-clipart-clipart-fancy-badge-256x256-561e.png",
        instructions: "Comparte 100 experiencias",
        reach: {
            post: 100
        }
    });
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
            profilePicture = user.services.twitter.profile_image_url;
        }
    }
    
    
    /**
    * generates the extra data For users
    */
    var userID = UsersXP.insert({
        user_id: user._id,
        //sets the profile default picture
        picture : profilePicture,
        //set the birthday
        birthdate : '1900/01/01',
        //the empty badges spaces
        badges: [],
        
        //the total of badges
        total_badges: 0
    });
    
    //share IDS between them
    
    _.extend(options.profile,{
        extraDataId: userID
    });
    
    
    


    user.profile = options.profile;
    return user;
});
