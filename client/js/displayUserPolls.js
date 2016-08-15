$(document).ready(function() {

    $.get('/api/fetchUserPolls', function(data) {

        data = JSON.parse(data);

        var html = "";

        if (data) {

            data.forEach(function(val, i) {

                var totalVotes = 0;

                val.options.forEach(function(val) {
                    totalVotes += val.votes;
                });

                html += "<div class='col-md-3'>" +
                    "<div class='block'>" +
                    "<a href='pollCtrl?id=" + val._id + "'>" +
                    "<p class='block-title'>" + val.question +
                    "</a>" +
                    "<p>" + totalVotes + " votes" +
                    "</p>" +
                    "<a href='pollCtrl?id=" + val._id + "'>" +
                    "<button type='button' class='btn btn-default'>View" +
                    "</button>" +
                    "</a>" +
                    "</div>" +
                    "</div>";

                if ((i + 1) % 4 === 0) {
                    console.log('here');
                    html += "<div class='clearfix'></div>";
                }
            });


        }


        // Add create new box
        html += "<div class='col-md-3'>" +
            "<div class='block new'>" +
            "<a href='creatPoll'>" +
            "<p class='block-title'>Create Poll" +
            "</a>" +
            "<p>&nbsp" +
            "</p>" +
            "<p>&nbsp" +
            "</p>" +
            "<a href='createPoll'>" +
            "<button type='button' class='btn btn-default'>Create Now" +
            "</button>" +
            "</a>" +
            "</div>" +
            "</div>";

        // Add dummy boxes to reach 8 total
        if (data.length + 1 < 8) {
            for (var i = data.length + 1 || 1; i < 8; i++) {
                html += "<div class='col-md-3'>" +
                    "<div class='block new'>" +
                    "<p class='block-title'>&nbsp;" +
                    "<br /><br /><br />" +
                    "</div>" +
                    "</div>";
                    
                if ((i + 1) % 4 === 0) {
                    html += "<div class='clearfix'></div>";
                }
            }
        }


        $('.poll-target').html(html);


    });

});