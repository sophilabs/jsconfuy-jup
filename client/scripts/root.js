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
      $.magnificPopup.open({
        items: {
          type: 'inline',
          src: '<div id="are-you-sure" class="popup-content">' +
            '<h2 class="general popup-title">Quit game?</h2>' +
            '<div class="actions">' +
              '<button class="yes-btn">Yes</button>' +
              '<button class="no-btn">No</button>' +
            '</div>' +
          '</div>'
        },
        fixedContentPos: false,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: false,
        preloader: false,
        midClick: true,
        removalDelay: 300
      });
      $('.yes-btn').click(function () {
        $.magnificPopup.close();
        window.main.goIndex();
      });
      $('.no-btn').click(function () {
        $.magnificPopup.close();
      });
    }
  };

}(jQuery));
