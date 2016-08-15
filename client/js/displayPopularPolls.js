$(document).ready(function(){
    
    $.get('/api/fetchPopular?no=4', function(data) {
      
        data = JSON.parse(data);
        
        var html = "";
        
        data.forEach(function(obj, i){
            if (i % 2 === 0) {
                html += "<div class='row'>";
            }
            
            html += "<div class='col-md-6'>" +
                    "<div class='block'>" +
                    "<p class='block-title'>" + obj.question + "</p>" + 
                    "<p>" + obj.votes + " votes</p>" +
                    "<a href='poll?id=" + obj._id + "'>" +
                    "<button type='button' class='btn btn-default'>" +
                    "Vote Now" +
                    "</button>" +
                    "</a>" +
                    "</div>" +
                    "</div>";
                    
            if (i % 2 === 1) {
                html += "</div>" +
                        "<div class='clearfix'></div>";
            }
            
            
            
            
        });
        
        $('.polls-target').html(html);
        adjustHeight();
        
    });
    
    
    var adjustHeight = function(){
        var windowHeight = $(window).height();
        var navbarHeight = $('nav').outerHeight(true);
        var footerHeight = $('footer').outerHeight(true);
        
        var contentHeight = windowHeight - (navbarHeight + footerHeight);

        var frontRight = $('.front-right').outerHeight(true);
        $('.front-right').css('padding-top', (contentHeight - frontRight) / 2.5);
    }
    
});