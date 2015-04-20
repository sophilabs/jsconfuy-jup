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
    'keyup input': function (event) {
      var name = $.trim($('#player_name').val());
      if (name !== '') {
        $('#finish_submit').addClass('ready');
        if(event.which === 13) {
          event.preventDefault();
          Meteor.call('postScore', name, Session.get('time') || '99:99', function (err) {
            if (err) {
              alert(err);
            } else {
              $('.finish_form').fadeOut(500);
            }
          });
        }
      } else {
        $('#finish_submit').removeClass('ready');
      }
    },

    'click #finish_submit': function (event) {
      event.preventDefault();
      Meteor.call('postScore', $.trim($('#player_name').val()), $('#receive_offers').is(':checked'), Session.get('time') || '99:99', function (err) {
        if (err) {
          alert(err);
        } else {
          $('.finish_form').fadeOut(500);
        }
      });
    }
  };

}(jQuery));
