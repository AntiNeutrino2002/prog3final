var request = require('request').defaults({
    headers:{'User-Agent': "ua"}
});
var cheerio = require('cheerio');
var fs = require('fs');
var f = "data/arxiv1.json";
var site = "https://arxiv.org";
var date = "/17"


if (fs.existsSync(f) && fs.statSync(f).size > 10) {
    var arxiv = require("./data/arxiv1.json");
} else {
    fs.appendFile(f, "[]");
    var arxiv = [];
}

request.get(site, function(error, response, page) {
    var $ = cheerio.load(page);
    var list = $("#content ul:first-of-type li a:first-of-type");
 

    for (var i = 0; i < list.length; i++) {

        var linkPart = $(list[i]).attr("href").substr(8);

        var fullUrl = site + "/year" +linkPart + date;
        if (arxiv.indexOf(fullUrl) < 0) {
            arxiv.push(fullUrl);
        }

    }

    fs.writeFile(f, JSON.stringify(arxiv));
    console.log(arxiv.length + " categories exist");
    
});



//process.exit();