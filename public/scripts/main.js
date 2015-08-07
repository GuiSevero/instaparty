$.get('/instagram/photos', function(data){
   var photos = $.map(data, function(item){
       return {
         src: item.url,
         fade: 1500
       }
   });
   $.vegas('slideshow',{backgrounds: photos});

});

var socket = io.connect('/');
socket.on('photo', function(data){

   console.log(data);

   var prevStep = $.vegas('get', 'step');

   $.vegas('slideshow',{backgrounds: [{src: data.url, fade: 1500}]});
   setTimeout(function(){
        $.get('/instagram/photos', function(data){
           var photos = $.map(data, function(item){
               return {
                 src: item.url,
                 fade: 1500
               }
           });
           $.vegas('slideshow',{backgrounds: photos});
           $.vegas('jump', prevStep);
        });
   }, 10000);

});
