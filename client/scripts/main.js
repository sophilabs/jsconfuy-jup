(function ($) {
  'use strict';

  Deps.autorun(function () {
    Meteor.subscribe('pageIs', Session.get('pageIs'));
    Meteor.subscribe('levelIs', Session.get('levelIs'));
  });

  Template.main.helpers({
    pageIs: function () {
      return Session.get('pageIs');
    }
  });

  Template.main.events = {
    'click .start_game': function (event) {
      $('#player_email').val('');
      $('#player_name').val('');
      $('#interested').prop('checked', true);

      $.magnificPopup.open({
        items: {
          type: 'inline',
          src: '#signup'
        },
        fixedContentPos: false,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: false,
        preloader: false,
        midClick: true,
        removalDelay: 300
      });
      setTimeout(function () {
        $("#player_name").focus();
      }, 100);
      $('#signup-form').validate({
        submitHandler: function () {
          var email = $.trim($('#player_email').val());
          Session.set('email', email);
          Session.set('name', $.trim($('#player_name').val()));
          Session.set('interested', $('#interested').is(':checked'));
          var hash = CryptoJS.MD5(email);
          Session.set('image', 'http://www.gravatar.com/avatar/' + hash + '?s=58&d=monsterid');
          Session.set('small-image', 'http://www.gravatar.com/avatar/' + hash + '?s=24&d=monsterid');

          $.magnificPopup.close();
          window.main.startGame();
        }
      });
      $('#signup .yes-btn').click(function () {
        $('#signup-form').submit();
      });
      $('#signup .no-btn').click(function () {
        $.magnificPopup.close();
      });
    }
  };

  window.main = {
    goIndex: function () {
      Session.set('pageIs', 'index');
      Session.set('levelIs', undefined);
      $('h1').css('height', 'auto');
      Backbone.history.navigate('/', {trigger: true});
    },
    startGame: function () {
      Meteor.call('signup', Session.get('email'), Session.get('name'), Session.get('small-image'), Session.get('interested'), function (err, res) {
        if (err) {
          console.log(err);
        } else {
          console.log(res);
        }
      });
      Session.set('pageIs', 'level');
      Session.set('levelIs', 1);
      $('h1').css('height', '0');
      clock.start();
    }
  };

  $(document).on('ready', function () {
    if (Session.equals('pageIs', 'level')) {
      window.main.goIndex();
    }
    particlesJS('particles-js', {
      particles: {
        color: '#666',
        color_random: false,
        shape: 'circle', // "circle", "edge" or "triangle"
        opacity: {
          opacity: 1,
          anim: {
            enable: false,
            speed: 1.5,
            opacity_min: 0,
            sync: false
          }
        },
        size: 2.5,
        size_random: true,
        nb: 100,
        line_linked: {
          enable_auto: true,
          distance: 140,
          color: '#333',
          opacity: 1,
          width: 1,
          condensed_mode: {
            enable: false,
            rotateX: 600,
            rotateY: 600
          }
        },
        anim: {
          enable: true,
          speed: 1
        }
      },
      interactivity: {
        enable: true,
        mouse: {
          distance: 250
        },
        detect_on: 'canvas', // "canvas" or "window"
        mode: 'grab', // "grab" of false
        line_linked: {
          opacity: 0.5
        },
        events: {
          onclick: {
            enable: true,
            mode: 'push', // "push" or "remove"
            nb: 4
          },
          onresize: {
            enable: true,
            mode: 'out', // "out" or "bounce"
            density_auto: false,
            density_area: 800 // nb_particles = particles.nb * (canvas width *  canvas height / 1000) / density_area
          }
        }
      },
      /* Retina Display Support */
      retina_detect: true
    });
  });
}(jQuery));
