$(function(){
    $('.navbar-burger.burger').on('click', () => {
        $('.navbar-burger.burger, .navbar-menu').toggleClass('is-active');
    });

    $.each($('.categoryGroup-left-rot'), (i, el) => {
        let $el = $(el);
        $el.css('width', $el.parent().height()+'px');
    });

    $('.radioWrapper, .checkboxWrapper')
        .on('click', (e) => $(e.target).find('input').click());
    $('.radioWrapper, .checkboxWrapper').find('em, p, .price')
        .on('click', (e) => $(e.target).parent().find('input').click());
<<<<<<< HEAD
mbbkhlkljljl
=======

>>>>>>> updatewwwroot
    $('.radioWrapper input').on('click', (e) => {
        let $target = $(e.target);
        let $wrapper = $target.closest('.radioWrapper');
        let $group = $wrapper.closest('.radioGroup');
        if ($group.hasClass('multiple')) {
            if ($wrapper.hasClass('active'))
                $wrapper.removeClass('active')
            else
                $wrapper.addClass('active');
        } else {
            $group.find('.radioWrapper').removeClass('active');
            $wrapper.addClass('active');
        }


    });
    $('.checkboxWrapper input').on('click', (e) => { 
        let $target = $(e.target);
        let $wrapper = $target.closest('.checkboxWrapper');
        $wrapper.toggleClass('active');
    });
    $('.quantity .fa-plus').on('click', () => $('.quantity input').val(parseInt($('.quantity input').val())+1));
    $('.quantity .fa-minus').on('click', () => {
        let val = parseInt($('.quantity input').val());
        if (val > 1) {
            $('.quantity input').val(val-1)
        }
    });

    if ($('button.buy').length) {
        parseSum();
        $('input, select').on('change', () => setTimeout(() => parseSum(), 10));
        $('.quantity em').on('click', () => setTimeout(() => parseSum(), 10));
    }
});

function parseSum() {
    let sum = $('form > .price').length ? parsePrice($($('form > .price')[0]).text()) : 0;
    $.each($('.checkboxWrapper.active, .radioWrapper.active').find('.price'), (i, el) => {
        sum += parsePrice($(el).text());
    });
    let quantity = $('input[name=quantity]').length ? $('input[name=quantity]').val() : 1;
    $('#summe').text((sum*quantity/100).toLocaleString('de-DE', { minimumFractionDigits: 2 }))
}

function parsePrice(string) {
    let match = /\d+,\d+/.exec(string);
    return match ? parseInt(match[0].replace(',','')) : 0;
}