(function ($) {
  'use strict';

  Template.players.helpers({
    playing: function () {
      var startDate = new Date(new Date() - 5 * 60000);
      return Scores.find({ updatedAt: { $gt: startDate }, level: { $lt: 5 }}, {sort: {level: -1}, limit: 100});
    }
  });

}(jQuery));
