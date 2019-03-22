
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

window.makeEmail = function(target)
{
    $(target).each(function(){

        $(this).attr({
            width: 15,
            height: 20
        })
        .css({
            display: 'inline-block',
            position: 'relative',
            top: '5px'
        });

        var canvas = $(this).get(0).getContext('2d');
        canvas.font = "16px Nunito, sans-serif";
        canvas.fillText("@", 0, 15);
        //canvas.fillStyle = '#212529';
    });

}

$(document).ready(function(){
    makeEmail('.js-email-at');
});
