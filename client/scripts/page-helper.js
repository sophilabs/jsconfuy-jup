Template.pageHelper.helpers({
  pageSelected: function () {
    return Session.equals('pageIs', this.page);
  },
});
