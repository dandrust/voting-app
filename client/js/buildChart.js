$(document).ready(function() {

    var id = window.location.search.split('=')[1];
    console.log(id);
    
    var adjustHeight = function(){
        
    var windowHeight = $(window).height();
    var navbarHeight = $('nav').outerHeight(true);
    var footerHeight = $('footer').outerHeight(true);
    
    var vcenter = $('#my-chart').outerHeight(true) + 60;

    var contentHeight = windowHeight - (navbarHeight + footerHeight);
    
    console.log(vcenter);
    
    $('.vcenter').css('padding-top', (contentHeight - vcenter) / 2.5);

        
    };
    
    $.get('/api/fetchPoll?id=' + id, function(data) {
    
        console.log(data);
        
        data = JSON.parse(data);
        
        console.log(data.options);

        var labels = [];
        var votes = [];

        
        data.options.forEach(function(option){
            labels.push(option.label);
            votes.push(option.votes);
        });

         var triggerHighlight = function(){
            var box = this.active[0]._index;
            
        };

        Chart.defaults.global.defaultFontColor = '#fff';
        Chart.defaults.global.defaultFontFamily = "'Righteous', cursive";


        var ctx = $('#my-chart');

        var chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Votes',
                    data: votes,
                    backgroundColor: 'rgba(255,255,255,.8)',
                }],
                
            },
            options: {
                hover: {
                    onHover: null
                },
                legend: false,
                scales: {
                    yAxes: [{
                        gridLines: {
                            color: '#fff'
                        },
                        afterUpdate: adjustHeight,
                        ticks: {
                            beginAtZero: true,
                        },
                    }],
                    xAxes: [{
                        display: true,
                        gridLines: {
                            color: '#fff'
                        },
                        
                    }]
                }
            }

        });
        
        console.log(chart);
        
       

    });



});
