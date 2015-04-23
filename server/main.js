var Sandbox = Meteor.npmRequire("sandbox");

Scores = new Meteor.Collection('scores');

Scores.allow({
  insert: function () {
    return false;
  },
  update: function () {
    return false;
  },
  remove: function () {
    return false;
  }
});

Meteor.publish('scores', function () {
  return Scores.find();
});

function runCode(code, done) {
  var s = new Sandbox();
  s.run(code, function (output) {
    done(null, output);
  });
}
//wrapping
var runCodeSync = Async.wrap(runCode);

Meteor.methods({

  startCode: function (level) {
    check(level, Number);
    if (level > 5)
      throw new Meteor.Error(505, 'Level not found');

    var text = '';
    switch (level) {
      case 1:
        text += 'function doubleInt (i) {\n';
        text += '\t// i will be an integer. Double it and return it.\n';
        text += '\treturn i;\n';
        text += '}';
      break;
      case 2:
        text += 'function isEvenNumber (i) {\n';
        text += '\t// i will be an integer. Return true if it\'s even, and false if it isn\'t.\n\t';
        text += '\n}';
      break;
      case 3:
        text += 'function endsWith (a, b) {\n';
        text += '\t// a will be String. Find out if a ends with b\n\t';
        text += '\n}';
      break;
      case 4:
        text += 'function sumArray (i) {\n';
        text += '\t// i will be an array. Every element can be a number or another array.\n';
        text += '\t// if it\'s an array, sum it as well.\n\t';
        text += '\n}';
      break;
      case 5:
        text += 'function isPrime (i) {\n';
        text += '\t// i will be an integer. Return true if it\'s even, and false if it isn\'t.\n\t';
        text += '\n}';
      break;
    }
    return text;
  },

  runTests: function (email, code, level, time) {
    var status = true,
        response = [];

    check(email, String);
    check(code, String);
    check(level, Number);
    check(time, String);

    if (level > 5) {
      throw new Meteor.Error(505, 'Level not found');
    }

    for (var index = 0; index < tests[level].length; index++) {
      var output = runCodeSync(code + '\n' + tests[level][index].i);
      try {
        if (output.result === '' + tests[level][index].o) {
          response.push([tests[level][index].i + ' passed!', 'ok']);
        } else {
          response.push([tests[level][index].i + ' failed!', 'err']);
          status = false;
          break;
        }
      } catch (ex) {
        response.push([tests[level][index].i + ' failed!', 'err']);
        status = false;
        break;
      }
    }
    if (status) {
      Scores.update(
        { email: email },
        {
          $push: { completions: { level: level, code: code, time: time }},
          $set: {
            completed: level === 5,
            time: time,
            level: level + 1,
            updatedAt: new Date()
          }
        }
      );
    }
    return {
      status: status,
      output: response
    };
  },

  signup: function (email, name, image, interested) {
    check(email, String);
    check(name, String);
    check(image, String);
    check(interested, Boolean);

    Scores.remove({ email: email });

    Scores.insert({
      email: email,
      name: name,
      image: image,
      interested: interested,
      completions: [],
      completed: false,
      time: '00:00',
      level: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

});
