$(document).ready(function(){
    var next = 'x';
    var other = 'o';
    var taken = [];

    $(".box").click(function(){
        var clicked_element_id = $(this).attr('id');
        if(taken.indexOf(clicked_element_id) == -1){
            taken.push(clicked_element_id);
            console.log(clicked_element_id);

            var imageUrl = "img/"+next+"_img.jpg";
            $(this).css('background-image', 'url(' + imageUrl + ')');
            var temp = next;
            next = other;
            other = temp;
        }
        else{
            console.log("Illegal click");
        }
    });
});