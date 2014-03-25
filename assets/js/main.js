$(document).ready(function($) {

    var editable = new MediumEditor('.editable',{
            buttons: ['bold', 'italic', 'underline'],
            placeholder: ''
    });

    // Cache selectors
    var $quotation_toggle = $('.settings-quotations .btn'),
        $size_toggle = $('.settings-size .btn'),
        $font_slider = $('#fontslider'),
        $source = $('#source');

    // Font control
    $font_slider.change(function() {
        var quote_font_size = $(this).val() + 'px';
        var attrib_font_size = ($(this).val() * 0.5) + 'px';

        $(".editable-quote").css('font-size',quote_font_size);
        $(".editable-attrib").css('font-size',attrib_font_size);
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

    // Size toggle
    $size_toggle.click(function() {

        var value = $(this).find('input').val();

        if (value == "twitter") {
            $('.quote-sizing-box').css('padding-bottom','50%');
            console.log(value);
        }
        else if (value == "facebook") {
            $('.quote-sizing-box').css('padding-bottom','100%');
        }

    });

    //Save button functionality
    $('.save-button').hover(function () {
        html2canvas($('.quote-sizing-box'), {
            logging: true,
            background: undefined,
            allowTaint: true,
            onrendered: function(canvas) {
                var img = canvas.toDataURL("image/png");
                var filename = $("#select_brand").val() + '-' + $('.editable-quote').text().trim().replace(/[^A-z]/g, "").toLowerCase().substring(0,15);
                $('.save-button').attr({
                    href: img,
                    download: filename + '.png'
                });
            }
        });
    });

    $('#select_theme, #select_brand').change(function() {
        //.quote-sizing-box
        function changeTheme(background_color, text_color, image_theme_suffix) {
            var logo = $('#select_brand').val();

            $('.quote-sizing-box').css({
                'background-color' : background_color,
                'color' : text_color
            });

            $('.quote-logo').attr({
                'src': 'assets/img/logos/' + logo + '-' + image_theme_suffix + '.png'
            });
        }

        themeTable = {
            white : function(){ changeTheme('#fff', '#333', 'white'); },
            gray : function(){ changeTheme('#444', '#fff', 'gray'); },
            black : function(){ changeTheme('#000', '#fff', 'black'); },
            brand : function(){
                var brand = $("#select_brand").val();
                if (brand === "wnyc") {
                    changeTheme('#cc0033','#fff','brand');
                }
                else if (brand === "wqxr") {
                    changeTheme('#00aeef','#fff','brand');
                }
                else if (brand === "radiolab") {
                    changeTheme('#d9602d','#fff','brand');
                }
                else if (brand === "onthemedia") {
                    changeTheme('#ec5a24','#fff','brand');
                }
                else {
                    changeTheme('#fff','#333', 'white');
                }
            }
        };

        var value = $('#select_theme').val();
        themeTable[value]();
    });

    //Initial Settings
    var height = $(window).height();
    $('body').height(height + 1);


    function readImage(input) {
        if ( input.files && input.files[0] ) {
            var FR= new FileReader();
            FR.onload = function(e) {
                 $('.quote-sizing-box').css({
                    'background': 'url(' + e.target.result + ') no-repeat center center fixed',
                    'background-attachment' : 'initial',
                    '-webkit-background-size' : 'cover',
                    '-moz-background-size' : 'cover',
                    '-o-background-size' : 'cover',
                    'background-size' : 'cover'
                });
            };
            FR.readAsDataURL( input.files[0] );
        }
    }

    $("#asd").change(function(){
        readImage( this );
});

});
