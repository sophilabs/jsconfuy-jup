(function ($) {
  'use strict';

  Template.root.helpers({
    showClock: function () {
      var page = Session.get('pageIs');
      return page != 'index';
    }
  });

  Template.root.events = {
    'click .logo': function (event) {
      $('#player_email').val('');
      $('#player_name').val('');
      $('#interested').prop('checked', true);

      $.magnificPopup.open({
        items: {
          type: 'inline',
          src: '#are-you-sure'
        },
        fixedContentPos: false,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: false,
        preloader: false,
        midClick: true,
        removalDelay: 300
      });
      $('#are-you-sure .yes-btn').click(function () {
        $.magnificPopup.close();
        window.main.goIndex();
      });
      $('#are-you-sure .no-btn').click(function () {
        $.magnificPopup.close();
      });
    }
  };

}(jQuery));
