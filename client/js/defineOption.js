$(document).ready(function(){
    
    $('#customOption, #defineCustomOption').on('click', function(){
        //uncheck any radio check
        $(":checked").prop('checked', false);
        
        //replace last radio with text input
        $('.custom-target').html("<input type='text' id='custom-option' name='customOption' class='form-control' value='Custom option'/>")
    });
    
});