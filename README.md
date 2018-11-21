# 1xx

<https://1xx.tbtestsite.com>

inside out project version 100.0
  -added header resize functionality

  inside out project version 100.1
    -added footer resize functionality
    -added jQuery, tether, and popper

    inside out project version 100.2
    -fixed the footer by adjusting the bootstrap column widths wrapping them inside a bootstrap row

    inside out project version 101.0
    -added first level of navigation
    -created assets/js/app.js
    -created assets/data/menu.json
    -moved header resize js to app.js

    inside out project version 102.0
    -completed menuBuilder function in app.js
    -completed nav through menuBuilder function with recursion

    inside out project version 102.1
    -completed css for navigation

    inside out project version 103.0
    -fixed enlarging navigation on header shrink .
    -added loader to application with beevis and butthead
    -added some sick colors

inside out project version 104.0
-modifed the ajax call to get the json for the menu from the me.tbtestsite.com tbtestsite
-modified the menubuilder function to accept the json data from word press rest api
-removed data/menu.json from file system considering it is no longer needed

inside out App Site Changes

-   index.html
    -   code changes <https://www.diffchecker.com/4k9vqfca>
    -   removed comments and cleaned code
    -   added the click event to the logo - calls the getPage function
    -   removed both main content sections
    -   added the circle loading div and content
-   style.css
    -   code changes <https://www.diffchecker.com/jCetXEtM>
    -   added the logo & logo:hover classes for the logo in the header - no inked
    -   added the section class to keep the page from closing all the way when there is no content
    -   added the following classes for the loader circle
        -   circle, wave, wave:before, wave:after
        -   add keyframes for animation animate
-   app.js
    -   code changes <https://www.diffchecker.com/qS2xXeDk>
    -   removed comments and cleaned code
    -   added the getPage function to capture link clicks and get page content
    -   added getPage function call to the ajax call for the menus on page load to get the homepage
    -   modified the forEach loop in the menuBuilder to include the page id as a data attribute
