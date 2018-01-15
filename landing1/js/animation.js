
$(document).ready(function(){
	    //Initialization
	//text();
	//lexus();
	grils();
	});
	//function text(){
	//	  var slideCount = $('#slideshow').children().length;
    //var currentID = 1;
    //$('.slides').css('display','none');
    //$('#slide' + currentID).fadeIn(500);
    ////Processing
    //setInterval(function(){
     //   var nextID = currentID + 1;
     //   if (nextID > slideCount) {
     //       nextID = 1;
     //   }
     //   $('#slide' + currentID).fadeOut(500);
     //   $('#slide' + nextID).fadeIn(500);
     //   currentID = nextID;
    //},200);
	//}

	function grils(){
	var slideCount = $('#grils').children().length;
    var currentID = 1;
    $('.grils').css('display','none');
    $('#grils' + currentID).fadeIn(2000);
    //Processing
    setInterval(function(){
        var nextID = currentID + 1;
        if (nextID > slideCount) {
            nextID = 1;
        }
        $('#grils' + currentID).fadeOut(2000);
        $('#grils' + nextID).fadeIn(2000);
        currentID = nextID;
    },3000)
	}