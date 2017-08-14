var app;

$(document).ready(function(){
    console.log('DOM is ready');
    $("button").click(function() {
      $('html,body').animate({
          scrollTop: $(".details").offset().top},
          'slow');
  });
});
