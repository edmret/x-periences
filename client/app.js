var currentImage = 0;
var images = [
  "https://as.ftcdn.net/r/v1/pics/b1544fcf65d1b929bcb6bb8f377207dbfa3804a8/home/1555/couple.jpg",
  "http://www.lifeofpix.com/wp-content/uploads/2015/11/Life-of-Pix-free-stock-photos-sea-boats-landscape-AidaSadzak.jpg",
  "http://www.lifeofpix.com/wp-content/uploads/2015/11/Life-of-Pix-free-stock-photos-city-view-church-AidaSadzak.jpg",
  "http://www.lifeofpix.com/wp-content/uploads/2015/11/Life-of-Pix-free-stock-photos-river-forest-sunset-AidaSadzak.jpg"
];

$(document).on("ready", function(){
  document.getElementById("cover-search").addEventListener("animationiteration", changeBackgroundImage, false);
  document.getElementById("cover-search").addEventListener("MSAnimationIteration", changeBackgroundImage, false);
  document.getElementById("cover-search").addEventListener("webkitAnimationIteration", changeBackgroundImage, false);
});

function changeBackgroundImage(){
  ( currentImage === images.length - 1 ) ? (currentImage = 0) : currentImage++;
  $("#cover-search").css("background-image", "url("+images[currentImage]+")");
}

