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
});
