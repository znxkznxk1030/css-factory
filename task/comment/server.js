var fs = require('fs');
var path = require('path');
var Q = require('q');

var express = require('express');
var bodyParser = require('body-parser');

var port = 9999;
var commentsPerPage = 5 + Math.round(Math.random() * 5);

var commentFile = path.join(__dirname, 'comments.json');

var app = express();

app.use('/', express.static(path.join(__dirname, 'src')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var readData = function () {
  var defer = Q.defer();

  fs.readFile(commentFile, function (error, data) {
    if (error) {
      return defer.reject(error);
    }

    return defer.resolve(JSON.parse(data));
  });

  return defer.promise;
};

var writeData = function (data) {
  var defer = Q.defer();

  fs.writeFile(commentFile, JSON.stringify(data, null, 2), function (error) {
    if (error) {
      return defer.reject(error);
    }

    return defer.resolve();
  });

  return defer.promise;
};

var getCommentsPage = function (page) {
  page = page ? page - 1 : 0;

  return readData().then(function (data) {
    return extractDataByPage(data, page);
  });
};

var extractDataByPage = function (data, page) {
  var startIndex = page * commentsPerPage;
  return Q.resolve(data.slice(startIndex, startIndex + commentsPerPage));
};

app.use(function (req, res, next) {
  res.setHeader('Cache-Control', 'no-cache');
  // /**
  //  * - allow cors for test
  //  * @todo to restrict domains
  //  */
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// list
app.get('/api/comments', function (req, res) {
  getCommentsPage()
    .then(function (data) {
      res.json(data);
    })
    .fail(function (error) {
      console.error(error);
      res.sendStatus(500);
    });
});

// write
app.post('/api/comments', function (req, res) {
  readData().then(function (data) {
    var newComment = {
      id: Date.now(),
      author: req.body.author,
      comment: req.body.comment,
    };

    data.unshift(newComment);

    return writeData(data)
      .then(function () {
        res.json(data);
      })
      .fail(function (error) {
        console.error(error);
        res.sendStatus(500);
      });
  });
});

// paging
app.get('/api/comments/page/:page', function (req, res) {
  var page = req.params.page;

  getCommentsPage(page)
    .then(function (data) {
      res.json(data);
    })
    .fail(function (error) {
      console.error(error);
      res.sendStatus(500);
    });
});

app.listen(port, function () {
  console.log('Server started: http://localhost:' + port + '/');
});
