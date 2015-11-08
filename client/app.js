var currentImage = 0;
var images = [
  "https://as.ftcdn.net/r/v1/pics/b1544fcf65d1b929bcb6bb8f377207dbfa3804a8/home/1555/couple.jpg",
  "http://www.lifeofpix.com/wp-content/uploads/2015/11/Life-of-Pix-free-stock-photos-sea-boats-landscape-AidaSadzak.jpg",
  "http://www.lifeofpix.com/wp-content/uploads/2015/11/Life-of-Pix-free-stock-photos-city-view-church-AidaSadzak.jpg",
  "http://www.lifeofpix.com/wp-content/uploads/2015/11/Life-of-Pix-free-stock-photos-river-forest-sunset-AidaSadzak.jpg"
];

Meteor.defer(function(){
    
    /**
     * executes 
     */
    function checkComponentHandler(){
        
        console.log(typeof componentHandler);
        
        if(typeof componentHandler != "undefined"){
            
            setTimeout(function(){
                componentHandler.upgradeDom();
            },5);
            
        }else{
            //update material design bindings
            setTimeout(checkComponentHandler,5);
        }
    }
    
    checkComponentHandler();
    
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

