$(document).ready(function(){
    
    $('[data-toggle="tooltip"]').tooltip();
    
    $('.fa-trash').on('click', function(){
        $('#confirm-delete').modal();
    });

    $('#archive').on('click', function(){
        window.location.replace($(this).attr('value'));
    });
    
    $('#delete').on('click', function(){
        window.location.replace($(this).attr('value'));
    });
    
    new Clipboard('.fa-clipboard');

    
});