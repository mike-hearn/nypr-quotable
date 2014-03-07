$(document).ready(function($) {

    var editable = new MediumEditor('.editable',{
            buttons: ['bold', 'italic', 'underline'],
            placeholder: ''
    });

    // Cache selectors
    var $quotation_toggle = $('.settings-quotations .btn'),
        $font_slider = $('#fontslider'),
        $source = $('#source');

    // Font control
    $font_slider.change(function() {
        var quote_font_size = $(this).val() + 'px';
        var attrib_font_size = ($(this).val() * 0.5) + 'px';
        var source_font_size = ($(this).val() * 0.39) + 'px';

        $(".editable-quote").css('font-size',quote_font_size);
        $(".editable-attrib").css('font-size',attrib_font_size);
        $(".editable-source").css('font-size',source_font_size);
    });


    // Quotations toggle code
    $quotation_toggle.click(function() {

        var toggleQuotes = function (val) {
            switch(val) {
                case 'on':
                    $('.quote-open, .quote-close').remove();
                    $('.editable-quote p')
                        .first()
                        .prepend('<span class="quote-open" contenteditable=false>&#8220;</span>');
                    $('.editable-quote p')
                        .last()
                        .append('<span class="quote-close" contenteditable=false>&#8221;</span>');
                    break;
                case 'off':
                    $('.quote-open, .quote-close').remove();
                    break;
            }
        };

        toggleQuotes($(this).find('input').val());

    });

    // Attribution
    $source.on('keyup keydown change', function() {
        var v = $(this).val();
        $('.editable-source > p').text(v);
    });

    $('.save-button').hover(function () {
        html2canvas($('.quote-sizing-box'), {
            logging: true,
            onrendered: function(canvas) {
                var img = canvas.toDataURL("image/png");
                $('.save-button').attr({
                    href: img,
                    download: "download.png"
                });
            }
        });
    });

    $('#select_brand').change(function() {
        var theme = $('#select_theme').val();
        var logo = $('#select_brand').val();
        $('.quote-logo').attr({
            'src': 'assets/img/logos/' + logo + '-' + theme + '.png'
        });

    });

    $('#select_theme').change(function() {
        //.quote-sizing-box
        function changeTheme(background_color, text_color) {
            var theme = $('#select_theme').val();
            var logo = $('#select_brand').val();

            $('.quote-sizing-box').css({
                'background-color' : background_color,
                'color' : text_color
            });

            $('.quote-logo').attr({
                'src': 'assets/img/logos/' + logo + '-' + theme + '.png'
            });
        }

        themeTable = {
            white : function(){ changeTheme('#fff', '#333'); },
            gray : function(){ changeTheme('#444', '#fff'); },
            black : function(){ changeTheme('#000', '#fff'); },
        };

        var value = $(this).val();
        themeTable[value]();
    });

    //Initial Settings
    var height = $(window).height();
    $('body').height(height + 1);

});
