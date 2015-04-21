(function ($) {
  'use strict';

  Template.dock.helpers({
    scores: function () {
      return Scores.find({}, {sort: {time: 1}, limit: 10});
    },
    playing: function () {
      var startDate = new Date(new Date() - 10 * 60000);
      return Scores.find({ updatedAt: { $gt: startDate }}, {sort: {time: 1}, limit: 10});
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
