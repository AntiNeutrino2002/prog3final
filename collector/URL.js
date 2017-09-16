var request = require('request').defaults({
    headers:{'User-Agent': "ua"}
});
var cheerio = require('cheerio');
var fs = require('fs');
var f = "data/arxiv.json";
var site = "https://arxiv.org";


if (fs.existsSync(f) && fs.statSync(f).size > 10) {
    var arxiv = require("./data/arxiv.json");
} else {
    fs.appendFile(f, "[]");
    var arxiv = [];
}

request.get(site, function(error, response, page) {
    var $ = cheerio.load(page);
    var list = $("#content ul:first-of-type li a:first-of-type");
 

    for (var i = 0; i < list.length; i++) {

        
        var fullUrl = site + $(list[i]).attr("href");
        if (arxiv.indexOf(fullUrl) < 0) {
            arxiv.push(fullUrl);
        }

    }

    fs.writeFile(f, JSON.stringify(arxiv));
    console.log(arxiv.length + " հատ հղում կա");
    
});



//process.exit();