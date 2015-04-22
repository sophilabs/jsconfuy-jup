(function ($) {
  'use strict';

  window.level = {
    current: 1,

    resume: function () {
      window.clock.start();
      window.editor.setReadOnly(false);
      window.editor.focus();
      $('#code_submit').attr('disabled', false);
    },

    next: function () {
      if (level.current < 5) {
        level.current += 1;
        Session.set('levelIs', level.current);
        level.resume();
      } else {
        Session.set('pageIs', 'finish');
      }
      level.updateEditor();
    },

    updateEditor: function () {
      if (Session.get('levelIs') === 1) {
        window.editor = ace.edit('editor');
        editor.setTheme('ace/theme/monokai');
        editor.getSession().setMode('ace/mode/javascript');
        editor.setFontSize('16px');
        editor.getSession().setUseWorker(false);
        editor.resize();
        editor.focus();
        editor.moveCursorTo(2, 8);
        editor.commands.addCommand({
          name: 'runTest',
          bindKey: { win: 'Ctrl-Enter', mac: 'Command-Enter' },
          exec: function (editor) {
            $('#code_submit').click();
          },
          readonly: true
        });
      } else {
        Meteor.call('startCode', Session.get('levelIs'), function (err, res) {
          editor.getSession().setValue(res);
          editor.focus();
          switch (Session.get('levelIs')) {
            case 1: editor.moveCursorTo(2, 8); break;
            case 2: editor.moveCursorTo(2, 1); break;
            case 3: editor.moveCursorTo(2, 1); break;
            case 4: editor.moveCursorTo(2, 1); break;
            case 5: editor.moveCursorTo(2, 1); break;
          }
        });
      }
    }

  };


  Template.level.helpers({
    number: function () {
      return Session.get('levelIs');
    },
    startCode: function () {
      var text = '';
      text += 'function doubleInt(i) {\n';
      text += '\t// I will be an integer. Double it and return it.\n';
      text += '\treturn i;\n';
      text += '}';
      return text;
    },
    image: function () {
      return Session.get('image');
    },
    name: function () {
      return Session.get('name');
    }
  });

  Template.level.rendered = function () {
    window.level.updateEditor();
  };

  Template.level.events = {
    'click #code_submit': function (event) {
      event.preventDefault();
      if ($('#code_submit').hasClass('to_next_level')) {
        $('#code_submit').val('Go!').removeClass('to_next_level');
        window.level.next();
      } else {
        window.runCode();
      }
    }
  };

}(jQuery));
