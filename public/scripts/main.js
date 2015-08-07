 $.get('/instagram/photos', function(data) {
     var photos = $.map(data, function(item) {
         return {
             src: item.url,
             fade: 1500
         }
     });
     $('#insta-slider').vegas({
         slides: photos,
         cover: true,
         fade: 5000
     });

 });

 var socket = io.connect('/');
 socket.on('photo', function(data) {
    console.log("Chegou foto");
    console.log(data);

     var prevStep = $('#insta-slider').vegas('current');

     $('#insta-slider').vegas({
         slides: [{
             src: data.url,
             fade: 5000,
             cover: true
         }]
     });
     $.get('/instagram/photos', function(data) {
         var photos = $.map(data, function(item) {
             return {
                 src: item.url,
                 fade: 5000
             }
         });
         $('#insta-slider').vegas({
             slides: photos,
             cover: true,
             fade: 5000
         });
         $('#insta-slider').vegas('jump', prevStep);
     });

 });
