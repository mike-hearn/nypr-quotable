$(document).ready(function($) {

    function updateCanvas() {
        html2canvas($('.quote-sizing-box'), {
            logging: true,
            background: undefined,
            allowTaint: true,
            onrendered: function(canvas) {
                var img = canvas.toDataURL("image/png");
                var filename = $("#select_brand").val() + '-' + $('.editable-quote').text().trim().replace(/[^A-z]/g, "").toLowerCase().substring(0, 15);
                $('.save-button')
                    .attr({
                        href: img,
                        download: filename + '.png',
                        disabled: false
                    })
                    .text('Save Image');
            }
        });
    }

    var editable = new MediumEditor('.editable', {
        buttons: ['bold', 'italic', 'underline'],
        placeholder: '',
        disableDoubleReturn: true
    });

    // Cache selectors
    var $size_toggle = $('.settings-size .btn'),
        $alignment_toggle = $('.settings-alignment .btn'),
        $font_slider = $('#fontslider'),
        $source = $('#source'),
        $select_font = $('#select_font');

    // Font control
    $font_slider.change(function() {
        var quote_font_size = $(this).val() + 'px';
        var attrib_font_size = ($(this).val() * 0.5) + 'px';

        $(".editable-quote").css('font-size', quote_font_size);
        $(".editable-attrib").css('font-size', attrib_font_size);
    });


    // Todo: force added quotes to be fancy curved ones

    // Size toggle
    $size_toggle.click(function() {

        var value = $(this).find('input').val();

        if (value == "twitter") {
            $('.quote-sizing-box').css('padding-bottom', '50%');
        } else if (value == "facebook") {
            $('.quote-sizing-box').css('padding-bottom', '100%');
        }

    });

    // Change font upon selection change
    $select_font.on('change', function() {
        var font_value = $(this).val();

        var changeFont = function(fontName) {
            $('.editable').css('font-family', fontName);
        };

        switch (font_value) {
            case 'gotham':
                changeFont('Gotham-Web');
                break;
            case 'din':
                changeFont('DIN');
                break;
            case 'helvetica':
                changeFont('Helneue');
                break;
        }

    });

    // Alignment buttons action
    $alignment_toggle.click(function() {

        var value = $(this).find('input').val();

        if (value == "left") {
            $('.editable > p').css('text-align', 'left');
        } else if (value == "center") {
            $('.editable > p').css('text-align', 'center');
        } else if (value == "right") {
            $('.editable > p').css('text-align', 'right');
        }

    });


    //Create new canvas for image saving
    $('.save-button').hover(function() {
        $('.save-button')
            .text("Please wait...")
            .attr('disabled', 'true');
        updateCanvas();
    });

    //$('.setting, #fileupload').on('change', function() {
    //    updateCanvas();
    //});

    $('#select_theme, #select_brand').change(function() {
        //.quote-sizing-box
        function changeTheme(background_color, text_color, image_theme_suffix) {
            var logo = $('#select_brand').val();

            $('.quote-sizing-box').css({
                'background-color': background_color,
                'color': text_color
            });

            $('.quote-logo').attr({
                'src': 'assets/img/logos/' + logo + '-' + image_theme_suffix + '.png'
            });
        }

        themeTable = {
            white: function() {
                changeTheme('#fff', '#333', 'white');
            },
            gray: function() {
                changeTheme('#444', '#fff', 'gray');
            },
            black: function() {
                changeTheme('#000', '#fff', 'black');
            },
            brand: function() {
                var brand = $("#select_brand").val();
                if (brand === "wnyc") {
                    changeTheme('#cc0033', '#fff', 'brand');
                } else if (brand === "wqxr") {
                    changeTheme('#00aeef', '#fff', 'brand');
                } else if (brand === "radiolab") {
                    changeTheme('#d9602d', '#fff', 'brand');
                } else if (brand === "onthemedia") {
                    changeTheme('#ec5a24', '#fff', 'brand');
                } else {
                    changeTheme('#fff', '#333', 'white');
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
        var backgroundColor = $('.quote-sizing-box').css('background-color');
        if (input.files && input.files[0]) {
            var FR = new FileReader();
            FR.onload = function(e) {
                $('.quote-sizing-box').css({
                    'background': 'url(' + e.target.result + ') no-repeat center center fixed',
                    'background-attachment': 'initial',
                    '-webkit-background-size': 'cover',
                    '-moz-background-size': 'cover',
                    '-o-background-size': 'cover',
                    'background-size': 'cover'
                });
            };
            FR.readAsDataURL(input.files[0]);
            $('.settings-image-upload')
                .append('<button class="btn btn-xs btn-danger" id="remove_image">Remove Image</button>')
                .click(function() {
                    console.log("asodif");
                    $("#fileupload").val("");
                    $('.quote-sizing-box').css({
                        'background-image': 'none',
                        'background-color': backgroundColor
                    });
                    $("#remove_image").remove();
                });
        }
    }

    $("#fileupload").change(function() {
        readImage(this);
    });


});