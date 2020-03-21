let categoryContainerSideMargin = 20;
let categoryContainerHeightPadding = 20;
let paginationHeight = 30;
let tileWidth = 100;
let tileHeight = 135;

let $content = $('#categorySlider .content');
let $pagination = $('#categorySlider .pagination');

let width = 0;
let active = 0;
let maxPage = 0;

function fit() {
    $content.empty();
    $pagination.empty();

    width = $($('.categories')[0]).width();
    let height = $($('.categories')[0]).height();

    let noHorizontal = Math.floor(width/tileWidth);
    let noVertical = Math.floor(height/tileHeight);

    let $elements = $('.categories > div');
    let $group;
    $pagination.append('<span class="active"/>');

    active = 0;
    maxPage = Math.floor(($elements.length-1)/(noHorizontal*noVertical));

    $elements.each(function (i) {
        let offset = i % (noHorizontal * noVertical);
        if (offset == 0) {
            $group = $('<div class="group"/>');
        }
        $group.append($(this).clone());
        if (offset == 0) {
            $group.css('left', (i / (noHorizontal * noVertical)) * (width + categoryContainerSideMargin) + 'px');
            $content.append($group);
            if (i != 0 && i <= $elements.length - 1) {
                $pagination.append('<span/>');
            }
        }
    });

    $('.categories').hide();
    $('#categorySlider').show();
}

function swipeLeft() {
    if (active < maxPage) {
        active++;
        $content.find(' > div').each(function(i) {
            $(this).animate({left: (parseInt($(this).css('left'))-width-categoryContainerSideMargin) + 'px'});
        });
    }
}

function swipeRight() {
    if (active) {
        active--;
        $content.find(' > div').each(function(i) {
            $(this).animate({left: (parseInt($(this).css('left'))+width+categoryContainerSideMargin) + 'px'})
        });
    }
}

function setActive() {
    $pagination.find('span').removeClass('active');
    $pagination.find('span:nth-child('+(active+1)+')').addClass('active');
}

$(function() {
    fit();
    $('body').on('resize', () => fit());
    $('#categorySlider').swipe({
        swipeLeft: () => {swipeLeft(); setActive();},
        swipeRight: () => {swipeRight(); setActive();}
    });
});