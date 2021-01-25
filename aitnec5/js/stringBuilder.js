

$(function () {
/*yi modified in Jan. 2021 food also supports multi portions*/
    $('.radioWrapper input, .fa-minus, .fa-plus').on('click', (e) => {
        var url = new URL(window.location.href);
        var c = url.searchParams.get("categoryId");
        console.log(c);

        var order = "Food?";
        order += "categoryId=" + c + "&order=";

        
        order += $("#amount")[0].value;
        order += " ";

        $.each($('.foodID'), (i, el) => {
                order += el.id;
        });

        order += " ALS ";
        //Get Variation
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

        
        window.history.replaceState("", "Title", order);
        //console.log(order);
    });


});

