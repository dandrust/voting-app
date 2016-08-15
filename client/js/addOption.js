$(window).ready(function(){
    
    var option = 4
    
    var addOption = function(){
        
        $('.options').append('<div class="form-group"><input class="form-control" type="text" name="option' + option + '" id="option' + option + '"></div>');
        
        option ++;
        
    };
    
    $('#add-option').on('click', addOption);
});