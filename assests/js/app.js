// inside out project step-105 javascript document
window.onload = init();

function init() {
  window.addEventListener('scroll', function(e) {
    var distanceY = window.pageYOffset || document.documentElement.scrollTop,
      shrinkOn = 300,
      header = document.querySelector("header");
    if (distanceY > shrinkOn) {
      classie.add(header, "smaller");
    } else {
      if (classie.has(header, "smaller")) {
        classie.remove(header, "smaller");
      }
    }
  });

  $.ajax({
    method: 'GET',
    url: 'http://me.tbtestsite.com/wp-json/wp-api-menus/v2/menus/2',
    dataType: 'json',
    success: function(data) {

      $('nav').hide();

      var menu = menuBuilder(data.items);
      $('nav').html(menu).slideDown();
      $('nav li a').click(function(){
        getPage($(this).data("pgid"));
      });
      getPage(52);
      $("#loaderDiv").fadeOut("slow");



    },
    error: function() {
      console.log('all is not good');
    }
  })
}




function menuBuilder(obj) {
  console.log('calling the menuBuilder function starting');
  var theMenu = '';

  if (obj.length > 0) {
    theMenu = theMenu + '<ul>';
    obj.forEach(function(item) {
      theMenu = theMenu + '<li><a href="#" data-pgid="' + item.object_id + '">' + item.title + '</a>';

      if (item.children) {
        theMenu = theMenu + menuBuilder(item.children);

      }
      theMenu = theMenu + '<li>';
    });
    theMenu = theMenu + '</ul>';
  } else {
    console.log('no data');
  }
  return theMenu;

}

function getPage(obj) {
  $("#loaderDiv").fadeIn("slow");
  $.ajax({
    method: 'GET',
    url: 'http://me.tbtestsite.com/wp-json/wp/v2/pages/' + obj,
    dataType: 'json',
    success: function(data) {
      var pgbuild = '';
      pgbuild = '<section><div class="container">' + data.content.rendered + '</div></section>';
      $("#content").fadeOut(function() {
        $('html').animate({
          scrollTop: 0
        }, 'slow');
        $('body').animate({
          scrollTop: 0
        }, 'slow');
        $(this).html(pgbuild).fadeIn();
        $("loaderDiv").fadeOut("slow");
      });
    },
    error: function() {
      console.log('bad');
    }
  });
}
