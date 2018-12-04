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
    url: 'https://me.tbtestsite.com/wp-json/wp-api-menus/v2/menus/2',
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

$.ajax({
  method: 'GET',
  url: 'https://me.tbtestsite.com/wp-json/wp-api-menus/v2/menus/3',
  dataType: 'json',
  success: function(data) {

    var menu = menuBuilder(data.items, 'genLinks', 'footer-ul');
    $('#genLinks').replaceWith(menu);
    $('#genLinks li a').click(function(){
      getPage($(this).data("pgid"));
    });

  },
  error: function() {
    console.log('something went wrong with the general links menu');
  }
});

getPosts();


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
    url: 'https://me.tbtestsite.com/wp-json/wp/v2/pages/' + obj,
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
        $("#loaderDiv").fadeOut("slow");
      });
    },
    error: function() {
      console.log('bad');
    }
  });
}

function getPosts() {

  $.ajax({
    method: 'GET',
    url:'https://me.tbtestsite.com/wp-json/wp/v2/posts?orderby=date&order=desc&per_page=3',
    dataType: 'json',
    success: function (data) {
      $("#latestPosts").html('<p id="postLdr"><i class="fa fa-cogs"></i>Loading Posts</p>');
      data.forEach(function (item) {
        var myDate= new Date(item.date);
        $("#latestPosts").prepend('<p>' + item.title.rendered + '<span>' + myDate.getMonth() + '-' + myDate.getDay() + '-' + myDate.getFullYear () + '</span></p>');

      });
      $("postLdr").remove();
    },
    error: function() {
      console.log('something went wrong with post call');
    }
  });
}
