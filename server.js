var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var config = {
    user: 'kjjiffy', 
    database: 'kjjiffy',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password: 'db-kjjiffy-12922'
};
var app = express();
app.use(morgan('combined'));
var article = {
    'article_one': {
      title: 'Article One | Jiffy Joseph',  
      heading: 'Article One',
      date: 'February 11 2017',
      content: `<p>
                        This is the content of my first article. I'm really sorry this article has nothing important for anybody, because it is just a trial of my server. Don't get angry, I will publish some valuable content on this page.
                    </p>
                    <p>
                        This is the content of my first article. I'm really sorry this article has nothing important for anybody, because it is just a trial of my server. Don't get angry, I will publish some valuable content on this page.
                    </p>
                    <p>
                        This is the content of my first article. I'm really sorry this article has nothing important for anybody, because it is just a trial of my server. Don't get angry, I will publish some valuable content on this page.
                    </p>`
    },
    'article_two': {
      title: 'Article Two | Jiffy Joseph',  
      heading: 'Article Two',
      date: 'February 12 2017',
      content: `<p>
                        This is the content of my 2nd article. I'm really sorry this article has nothing important for anybody, because it is just a trial of my server. Don't get angry, I will publish some valuable content on this page.
                    </p>
                    <p>
                        This is the content of my 2nd article. I'm really sorry this article has nothing important for anybody, because it is just a trial of my server. Don't get angry, I will publish some valuable content on this page.
                    </p>
                    <p>
                        This is the content of my 2nd article. I'm really sorry this article has nothing important for anybody, because it is just a trial of my server. Don't get angry, I will publish some valuable content on this page.
                    </p>`
    },
    'article_three': {
      title: 'Article Three | Jiffy Joseph',  
      heading: 'Article Three',
      date: 'February 13 2017',
      content: `<p>
                        This is the content of my 3rd article. I'm really sorry this article has nothing important for anybody, because it is just a trial of my server. Don't get angry, I will publish some valuable content on this page.
                    </p>
                    <p>
                        This is the content of my 3rd article. I'm really sorry this article has nothing important for anybody, because it is just a trial of my server. Don't get angry, I will publish some valuable content on this page.
                    </p>
                    <p>
                        This is the content of my 3rd article. I'm really sorry this article has nothing important for anybody, because it is just a trial of my server. Don't get angry, I will publish some valuable content on this page.
                    </p>`
    }
};
function createTemplate (data) {
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    var htmlTemplate = `
        <html>
            <head>
                <title>
                    ${title}
                </title>
                <meta name = "vimport" content = "width = di=evice-width, initial-scale = 1" />
                <link href="/ui/style.css" rel="stylesheet" />
            </head>
            <body>
                <div class = 'container'>
                    <div>
                        <a href='/'>Home</a>
                    </div>
                    <hr/>
                    <h3>    ${heading} </h3>
                    <div>
                        ${date}
                    </div>
                    <div>
                        ${content}
                    </div>
                    <hr/>
                    <div class = 'footer'>
                        <input type = 'text' id = 'comment' placeholder = 'comment'></input>
                        <input type = 'submit' value = 'submit' id = 'submit-comment'></input>
                        <hr/>
                        <ul id = 'commentlist'>
                        
                        </ul>
                    </div>
                </div>
                <script type="text/javascript" src="/ui/discussions.js">
                </script>
            </body>
        </html>
        `;
    return htmlTemplate;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);    
app.get('/test-db', function(req, res){
   pool.query('SELECT * FROM test', function(err,result) {
       if(err) {
           res.status(500).send(err.toString());
       } else {
           res.send(JSON.stringify(result.rows));
       }
   }) ;
});

var counter = 0;
app.get('/counter', function(req, res){
    counter = counter + 1;
    res.send(counter.toString());
});


var names = [];
app.get('/submit-name', function (req, res) {
    var name = req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
    
});

var comments = [];
app.get('/submit-comments', function (req, res) {
    var comment = req.query.comment;
    comments.push(comment);
    res.send(JSON.stringify(comments));
    
});

app.get('/articles/:articleName', function(req, res){
    var articleName = req.params.articleName;
    pool.query("SELECT * FROM test WHERE title = " + req.params.articleName, function(err, result) {
       if(err) {
           res.status(500).send(err.toString());
       } else {
           if(result.rows.length === 0){
               res.status(500).send('article not found');
           } else {
               var articleData = result.rows[0];
               res.send(createTemplate.articleData);
           }
           
       }
    });
    res.send(createTemplate(article[articleName]));
});



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/discussions.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'discussions.js'));
});



var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
