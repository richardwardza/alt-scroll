$(document).ready(function () {

    var left_block = ['block1', 'block2', 'block3', 'block4', 'block5', 'block6', 'block7', 'block8'];
    var right_block = ['block9', 'block10', 'block11', 'block12', 'block13', 'block14', 'block15', 'block16'];
    var items_left = left_block.length - 1;
    var items_right = right_block.length - 1;
    var current_left = 0;
    var current_right = 0;
    var next_left = 0;
    var next_right = 0;

    function initialize() {
        getDimensions();
        $('.left-block .' + left_block[0]).addClass('block-visible').animate({'top': '0px', 'z-index': '10', height: winHeight}, "fast");
        $('.right-block .' + right_block[0]).addClass('block-visible').animate({'top': '0px', 'z-index': '10', height: winHeight}, "fast");
    }

    function getDimensions() {
        winHeight = window.innerHeight || document.documentElement.clientHeight;
        winWidth = window.innerWidth || document.documentElement.clientWidth;
        console.log("Height: " + winHeight + " Width: " + winWidth);
    }

    function setItem(destination, direction) {

        direction = (direction * -1);

        if (destination === 'left' || destination === 'both') {
            var do_transitions = true;
            next_left = next_left + direction;
            if (next_left > items_left) {
                next_left = items_left;
                do_transitions = false;
            }
            if (next_left < 0) {
                next_left = 0;
                do_transitions = false;
            }
            if (do_transitions) {
                var current_left_block = $('.left-block .block-visible');
                $('.left-block .' + left_block[next_left]).addClass('block-visible');
                $('.left-block .' + left_block[next_left]).animate({'top': '0px', 'z-index': '10', height: winHeight}, "slow", function () {
                    $('.left-block .block').not('.' + left_block[next_left]).removeClass('block-visible');
                    current_left_block.animate({'top': '-560px', 'z-index': '1', position: 'absolute'}, "slow");
                });
            }
            console.log("Left - " + next_left);
        }

        if (destination === 'right' || destination === 'both') {
            var do_transitions = true;
            next_right = next_right + direction;
            if (next_right > items_right) {
                next_right = items_right;
                do_transitions = false;
            }
            if (next_right < 0) {
                next_right = 0;
                do_transitions = false;
            }

            if (do_transitions) {
                var current_right_block = $('.right-block .block-visible');
                $('.right-block .' + right_block[next_right]).addClass('block-visible');
                $('.right-block .' + right_block[next_right]).animate({'top': '0px', 'z-index': '10', height: winHeight}, "slow", function () {
                    $('.right-block .block').not('.' + right_block[next_right]).removeClass('block-visible');
                    current_right_block.animate({'top': '560px', 'z-index': '1', position: 'absolute'}, "slow");
                });
            }
            console.log("Right " + next_right);

        }
    }

    function mouseOn(event) {
        console.log(event.deltaX, event.deltaY, event.deltaFactor);
        setItem('both', event.deltaY);
        $('.frame').unmousewheel();
        setTimeout(function () {
            $('.frame').mousewheel(mouseOn);
        }, 750);
    }

    $(window).resize(function () {
        getDimensions();
    });

    $('.frame').mousewheel(mouseOn);

    $(document).keydown(function (e) {
        switch (e.which) {
            case 37: // left
            case 38: // up
                setItem('both', 1);
                break;

            case 39: // right
            case 40: // down
                setItem('both', -1);
                break;

            default:
                return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });

    var winHeight;
    var winWidth;

    initialize();


});
