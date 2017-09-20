var request = require('request').defaults({
    headers:{'User-Agent': "ua"}
});
var cheerio = require('cheerio');
var fs = require('fs');
var links = require("./data/arxiv1.json");
var i = 0;
var f = "data/arxiv2.json";
var site = "arxiv.org";
var forEach = require('async-foreach').forEach;


if (fs.existsSync(f) && fs.statSync(f).size > 10) {
    var arxiv = require("./data/arxiv2.json");
} else {
    fs.appendFile(f, "[]");
    var arxiv = [];
}

forEach(links, function (link, index, arr) {
    request(link, function(error, response, page){
        i++;
		var arxiv2 = getURL(page, link);

        arxiv.push(arxiv2)
        fs.writeFile(f, JSON.stringify(arxiv));
	});
});

function getURL (page, current){
	var data;
    
	var $ = cheerio.load(page);
	var title = $("#content h1").text();
	var articleList = $("#content ul li a:first-of-type");
     var outerLinks = [];
     var j;
	for (j = 0; j < articleList.length; j++) {
        
        var fullUrl = site + $(articleList[j]).attr("href") ;  
        outerLinks.push(fullUrl);

    }
            data = {
            "id" : i,
            "title" : title,
            "CurrentLink" : current,
            "links" : outerLinks,
            "countOflinks" : j
        }
        
        return data;
    
     

}