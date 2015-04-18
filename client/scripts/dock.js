(function ($) {
  'use strict';

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

}(jQuery));
