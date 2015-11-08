var currentImage = 0;
var images = [
  "https://kevinonkars.files.wordpress.com/2012/05/anger-management2.jpg",
  "http://i50mas.com/wp-content/uploads/2015/09/criticascuidador1.jpg",
  "http://i.huffpost.com/gen/2455818/images/o-HAPPY-WOMAN-facebook.jpg",
  "http://i.huffpost.com/gen/2551372/images/o-FRUSTRATED-WOMAN-facebook.jpg",
  "http://i.huffpost.com/gen/1790980/images/o-SCARED-WOMAN-facebook.jpg",
  "http://i.huffpost.com/gen/2565944/images/o-PERSON-PHONE-SHOCKED-facebook.jpg"
];



/**
 * executes 
 */
function checkComponentHandler(){

    if(typeof componentHandler != "undefined"){

        componentHandler.upgradeDom();

    }else{
        //update material design bindings
        setTimeout(checkComponentHandler,10);
    }
}

// make sure this code is executed after all your templates have been defined
Meteor.startup(function(){
  for(var property in Template){
    // check if the property is actually a blaze template
    if(Blaze.isTemplate(Template[property])){
      var template=Template[property];
      // assign the template an onRendered callback who simply prints the view name
      template.onRendered(function(){
        checkComponentHandler();
      });
    }
  }
});


Template.cover_search.onRendered(function () {
  /**
    * The cover search element
    * @type {HTMLElement}
    */
    var coverSearch = document.getElementById("cover-search");
    
    if(!!coverSearch ){
      setTimeout(function(){
          coverSearch.addEventListener("animationiteration", changeBackgroundImage, false);
          coverSearch.addEventListener("MSAnimationIteration", changeBackgroundImage, false);
          coverSearch.addEventListener("webkitAnimationIteration", changeBackgroundImage, false);
      },1);
    }
});

function changeBackgroundImage(){
  ( currentImage === images.length - 1 ) ? (currentImage = 0) : currentImage++;
  $("#cover-search").css("background-image", "url("+images[currentImage]+")");
}

