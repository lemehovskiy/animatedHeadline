require("./sass/style.scss");
require("jquery");


require('../build/animatedHeadline.js');

$(document).ready(function () {

    $('.section-intro .animated-headline').animatedHeadline({
        slideSettings: {
            center_mode: true
        }
    });
    // $('.feature-item .animated-headline').animatedHeadline();
});

    