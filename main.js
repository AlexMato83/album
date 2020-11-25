
//acquisizione del template handelbars
function handelbars(scriptTemplate) {
    
    var source = document.getElementById(scriptTemplate).innerHTML;
    var template = Handlebars.compile(source); 
    return template;
   
}

//chiamata ajax
function chiamataAjax(val) {

    $.ajax({
      
       url: 'api.php',
       success: function(data) {
        for (var i = 0; i< data.length; i++){
            
           
            var album = data[i];

            if (val == false) {
                console.log("VAL FALSE");
                var context = { 
                    title: album.title,
                    author: album.author ,
                    year: album.year,
                    src: album.poster
                
                };
                var html = handelbars("entry-template")(context);  
                $('.cds-container').append(html);
                
               
            } else {
                
               
                $.each(album, function(index,value){
                    value = value.toLowerCase();
                    val = val.toLowerCase();
                    if (index != 'poster' && value.includes(val)) {
    
                        var context = { 
                            title: album.title,
                            author: album.author ,
                            year: album.year,
                            src: album.poster
                        
                        };
                        var html = handelbars("entry-template")(context);  
                        
                        $('.cds-container').append(html);
                        return false;
                    }
                });
            }
        }
        
    
       },
       error: function(err) {

       }
   });
}   

function search() {
    $('.cds-container').html('');
    var searchVal = $('#searchInput').val();

    console.log(searchVal);
    if (searchVal != "") {
        chiamataAjax(searchVal);

    } 
}

//acquisizione ricerca dall'input
$('#searchInput').keypress(function (e) {
    var key = e.which;
    if(key == 13)  
     {
       search();
     }
});     

$( "#searchButton" ).on( "click", function() {
    
    $('.cds-container').html('');
    var searchVal = $('#searchInput').val();

    console.log(searchVal);
    if (searchVal != "") {
        chiamataAjax(searchVal);

    }
});
    


function GoToHomePage()
  {
    window.location.href="./index.html"  }

function init(){
    
    chiamataAjax(val = false);
  }
jQuery(function() { init() })
  