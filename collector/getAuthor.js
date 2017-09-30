var request = require('request').defaults({
    headers:{'User-Agent': "ua"}
});
var cheerio = require('cheerio');
var fs = require('fs');
var links = require("./data/arxiv2.json");
var i = 0;
var f = "data/authorCount.json";
var site = "https://arxiv.org";
var forEach = require('async-foreach').forEach;


if (fs.existsSync(f) && fs.statSync(f).size > 10) {
    var names = require("./data/authorCount.json");
} else {
    fs.appendFile(f, "[]");
    var names = [];
}

forEach(links, function (author, index, arr) {
    forEach(author.links, function(link, nth, array){
        request(link, function(error, response, page){
            var $ = cheerio.load(page);
            var all = $("#dlpage small");
            $(all).each(function(ii){
               if (ii == 1){
                   var a = $(this).find("a");
                   $(a).each(function(jj){
                       if(jj == 2){
                            var all_sLink = $(this).attr("href");
                            authorCount(all_sLink);
                                if(index == links.length - 1){
                                    fs.writeFile(f, JSON.stringify(names));
                                }
                        }
                   });
               }
            });
        });
    });


});

function authorCount(allpage){
    var sitelink = site + allpage;
    request(sitelink, function(error, res, pg){
        var $$ = cheerio.load(pg);
        var authorDivs = $$("#dlpage dl dd");
        $$(authorDivs).each(function(a){
            var namesA = $$(this).find("a");
            $$(namesA).each(function( d){
                name = $$(this).text();
                var TF = search(name, names);
                if(TF){
                    TF.count++;
                }else{
                    names.push({
                        "name" : name,
                        "count" : 1
                    });
                   
                }
                console.log(search(name, names));
            })
        })
    })
    //console.log(names);
   
}

function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
            return myArray[i];
        }
    }
    return false;
}



