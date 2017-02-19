var express = require('express');
var morgan = require('morgan');
var path = require('path');

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
                </div>
            </body>
        </html>
        `;
    return htmlTemplate;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName', function(req, res){
    var articleName = req.param.articleName;
    res.send(createTemplate(articleName));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
