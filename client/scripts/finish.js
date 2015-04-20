(function ($) {
  'use strict';

  Template.finish.helpers({
    time: function () {
      return Session.get('time') || '99:99';
    }
  });

  Template.finish.rendered = function () {
    (function (d,s,id) {
      var js,
          fjs = d.getElementsByTagName(s)[0],
          p = /^http:/.test(d.location) ? 'http' : 'https';
      if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = p + '://platform.twitter.com/widgets.js';
        fjs.parentNode.insertBefore(js,fjs);
      }
    }(document, 'script', 'twitter-wjs'));
  };


  Template.finish.events = {
  };

}(jQuery));
