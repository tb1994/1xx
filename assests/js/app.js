// javascript document
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
    url: 'assests/data/menu.json',
    dataType: 'json',
    success: function(data) {

      var menu = menuBuilder(data.menu);
      $('nav').append(menu);



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
      theMenu = theMenu + '<li><a href="#">' + item.MenuName + '</a>';
      console.log('item: ' + item.MenuName);
      console.log('item: ' + item.Menus);
      if (item.Menus.length > 0) {
        theMenu = theMenu + menuBuilder(item.Menus);

      }
      theMenu = theMenu + '<li>';
    });
    theMenu = theMenu + '</ul>';
  } else {
    console.log('no data');
  }
  return theMenu;

}
