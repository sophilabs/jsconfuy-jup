(function ($) {
  'use strict';

  window.Scores = new Meteor.Collection('scores');
  Meteor.subscribe('scores');

}());
