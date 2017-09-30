google.charts.load('45', { packages: ['corechart', 'table',  "orgchart", 'bar'] });


google.charts.setOnLoadCallback(drawTable);
google.charts.setOnLoadCallback(drawChart);

function drawChart(){
    $.ajax({
        url: "/authors",
        dataType: "json",
        success: function (jsonData) {


        var data = new google.visualization.DataTable();
              data.addColumn('string', 'author');
              data.addColumn('number', 'count');
            for (var i = 0; i < jsonData.length; i++) {
                console.log(jsonData[i].count);
                data.addRow([
                    jsonData[i].name,
                    jsonData[i].count
                ]);
            }
var options = {'title':'Author count',
                     'width':'100%',
                     "hAxis":{"title":"Names"},
                     "vAxis":{"title":"Count"},
                     textStyle: {
            fontSize: 8,
            color: '#000',
            auraColor: 'none'
                     },
                     'height':700};


      var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
      chart.draw(data, options);
            
            }

 
        
    });
}

function drawTable() {
    $.ajax({
        url: "/articles",
        dataType: "json",
        success: function (jsonData) {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'name');
            data.addColumn('string', 'link');
            data.addColumn("string", "articles count")

            for (var i = 0; i < jsonData.length; i++) {
                data.addRow([
                    jsonData[i].title,
                    jsonData[i].CurrentLink,
                    jsonData[i].articleCount
                ]);
            }

            var options = {
                allowHtml: true,
                showRowNumber: true,
                width: '100%',
                height: '100%'
            };

            var table = new google.visualization.Table(document.getElementById('barformat_div'));
            table.draw(data, options);
        }
    });
}


$(window).resize(function () {
    drawChart();
    drawTable();
});
