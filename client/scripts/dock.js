(function ($) {
  'use strict';

  Template.dock.helpers({
    scores: function () {
      return Scores.find({ level: 6 }, {sort: {time: 1}, limit: 100});
    }
  });

}(jQuery));
