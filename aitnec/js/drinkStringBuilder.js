

$(function () {
    
    $('.radioWrapper input, .fa-minus, .fa-plus').on('click', (e) => {
        var url = new URL(window.location.href);
        var c = url.searchParams.get("categoryId");
        console.log(c);

        var order = "Drink?";
        order += "categoryId=" + c + "&order=";

        order += $("#amount")[0].value;
        order += " ";
        

        //Get Name
        $.each($('.drinkID'), (i, el) => {
                order += el.id;
        });

        order += " ALS ";

        //Get Size
        $.each($('.active'), (i, el) => {
            if (el.classList.contains("vario")) {
                order += el.id + " MIT ";
            }
        });

        //Get Extras 
        $.each($('.active'), (i, el) => {
            if (!el.classList.contains("vario")) {
                order += el.id + ";;";
            }
        });


        


        
        window.history.replaceState("sth", "Title", order);
        //console.log(order);
    });


});

