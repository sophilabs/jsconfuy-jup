Scores = new Meteor.Collection('scores');
Meteor.subscribe('scores');

Deps.autorun(function () {
  Meteor.subscribe('pageIs', Session.get('pageIs'));
  Meteor.subscribe('levelIs', Session.get('levelIs'));
});

Template.dock.helpers({
  scores: function () {
    return Scores.find({
      createdAt: {$gt: new Date()}
    });
  }
});

Template.dock.rendered = function () {
  $('.notification').each(function (index) {
    $(this).css('bottom', (index * 50 + 10) + 'px').delay(2000).fadeOut(1000, function () {
      $(this).remove();
    });
  });
};

Template.main.helpers({
  pageIs: function () {
    return Session.get('pageIs');
  }
});

Template.main.events = {
  'click .start_game': function (event) {
    Session.set('pageIs', 'level');
    Session.set('levelIs', 1);
    $('h1').css('line-height', '32px');
    clock.start();
  }
};

Template.finish.helpers({
  time: function () {
    return Session.get('time') || '99:99';
  }
});

Template.finish.rendered = function () {
  !function (d,s,id) {
    var js,
        fjs = d.getElementsByTagName(s)[0],
        p = /^http:/.test(d.location) ? 'http' : 'https';
    if (!d.getElementById(id)) {
      js = d.createElement(s);
      js.id = id;
      js.src = p + '://platform.twitter.com/widgets.js';
      fjs.parentNode.insertBefore(js,fjs);
    }
  }(document, 'script', 'twitter-wjs');
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
    Meteor.call('postScore', $.trim($('#player_name').val()), Session.get('time') || '99:99', function (err) {
      if (err) {
        alert(err);
      } else {
        $('.finish_form').fadeOut(500);
      }
    });
  }
};

(function ($) {
  'use strict';

  $(document).on('ready', function () {
    if (Session.equals('pageIs', 'level')) {
      Session.set('pageIs', 'index');
      Session.set('levelIs', undefined);
      Backbone.history.navigate('/', {trigger: true});
    }
  });
}(jQuery));
