(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// let ScrollOver = require("./lib/ScrollOver.js")
// let animateScroll = require("./lib/animatescroll.js")
// let d3 = require("d3")

$(document).ready(function () {
  var months = { '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr', '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Aug', '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec' };
  let url = 'https://our.status.im/ghost/api/v0.1/posts/?order=published_at%20desc&limit=2&formats=plaintext&client_id=ghost-frontend&client_secret=2b055fcd57ba';
  var urlBase = [location.protocol, '//', location.host, location.pathname].join('');

  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

  $(window).on('resize', function (event) {
    w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    setMenu(w);
  });

  function setMenu(w) {
    if (w < 1199) {
      console.log("mobile");
      $('#general-menu nav ul').appendTo('#general-menu-mobile nav');
    } else {
      $('#general-menu-mobile nav ul').appendTo('#general-menu nav');
    };
  }

  setMenu(w);

  $.ajax({
    type: "get",
    url: url,
    success: function (response) {
      response.posts = response.posts.reverse();
      $.each(response.posts, function (index, val) {
        var excerpt = '';
        if (val.custom_excerpt != null) {
          excerpt = val.custom_excerpt;
        } else {
          excerpt = getWords(val.plaintext);
        }
        var newDate = new Date(val.published_at);
        var minutes = newDate.getMinutes();
        minutes = minutes + "";
        if (minutes.length == 1) {
          minutes = '0' + minutes;
        }
        $('.latest-posts').prepend(' \
        <div class="post"> \
          <time>' + newDate.getDate() + ' ' + months[newDate.getMonth() + 1] + ' at ' + newDate.getHours() + ':' + minutes + '</time> \
          <h4><a href="https://our.status.im/' + val.slug + '">' + val.title + '</a></h3> \
        </div> \
        ');
      });
    }
  });

  function getWords(str) {
    return str.split(/\s+/).slice(0, 25).join(" ");
  }
});

let heroImage = document.querySelectorAll(".hero-image")[0];

if (heroImage) {
  setTimeout(function () {
    addClassToElement(heroImage, "active");
  }, 200);
}

/* Popups */

let community = document.querySelectorAll(".item--dropdown-community")[0];
let projects = document.querySelectorAll(".item--dropdown-projects")[0];
let mobileMenu = document.querySelectorAll(".mobile-menu-trigger")[0];

let popups = document.querySelectorAll('.popup-wrap');
let overlays = document.querySelectorAll(".popup-overlay");
let popupMenu = document.querySelectorAll("#general-menu-mobile")[0];

let closeButtons = document.querySelectorAll(".popup__button--close,#general-menu-mobile .close");

let activePopup = null;
let activeOverlay = null;

community.addEventListener('click', function (event) {
  showPopup(popups[0]);
  event.preventDefault();
});

projects.addEventListener('click', function (event) {
  showPopup(popups[1]);
  event.preventDefault();
});

mobileMenu.addEventListener('click', function (event) {
  showPopup(popupMenu);
  event.preventDefault();
});

closeButtons.forEach(button => {
  button.addEventListener('click', closeActivePopup);
});

overlays.forEach(overlay => {
  overlay.addEventListener('click', closeActivePopup);
});

function showPopup(whichPopup) {
  activePopup = whichPopup;
  addClassToElement(whichPopup, "popup--shown");
}

function closeActivePopup() {
  console.log("test");
  removeClassFromElement(activePopup, "popup--shown");
  activePopup = null;
}

function closeMenu() {
  removeClassFromElement(activePopup, "");
}

/* Code highlighting */

function highlight() {
  $('pre code').each(function (i, block) {
    hljs.highlightBlock(block);
  });
}
$(document).ready(function () {
  try {
    highlight();
  } catch (err) {
    console.log("retrying...");
    setTimeout(function () {
      highlight();
    }, 2500);
  }

  var clipboard = new ClipboardJS(".btn");
  clipboard.on('success', function (e) {
    var id = $(e.trigger).attr("data-clipboard-target");
    $(id).toggleClass("flash");
    setTimeout(function () {
      $(id).toggleClass("flash");
    }, 200);
    e.clearSelection();
  });
});

/* Mobile Nav */
/*
let moreLink = document.querySelectorAll(".item--more")[0]

let nav = document.querySelectorAll(".mobile-nav-wrap")[0]
let navOverlay = document.querySelectorAll(".mobile-nav-overlay")[0]
let navCloseButton = document.querySelectorAll(".mobile-nav-close")[0]


moreLink.addEventListener('click', function(event){
    showNav()
    event.preventDefault()
})

navCloseButton.addEventListener('click', closeNav)
navOverlay.addEventListener('click', closeNav)


function showNav() {
  addClassToElement(nav, "mobile-nav--shown");
}

function closeNav() {
  removeClassFromElement(nav, "mobile-nav--shown");
}
*/

/*--- Utils ---*/
function addClassToElement(element, className) {
  element.classList ? element.classList.add(className) : element.className += ' ' + className;
  return element;
}

function removeClassFromElement(element, className) {
  if (element.classList) {
    element.classList.remove(className);
  } else {
    element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
  return element;
}

},{}]},{},[1])
//# sourceMappingURL=vendor.js.map
