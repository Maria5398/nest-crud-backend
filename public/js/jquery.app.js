/* Theme Name: Uplon - Responsive Admin Dashboard & Frontend
   Author: Coderthemes
   Author e-mail: coderthemes@gmail.com
   File Description: Main JS file of the template
*/


!function($) {
    "use strict";

    var Page = function() {
        this.$topSection = $('#home-fullscreen'),
        this.$topNavbar = $("#navbar-menu"),
        this.$backToTop = $('#back-to-top'),
        this.$contactForm = $("#contact-form")
    };

    //
    Page.prototype.init = function () {
        var $this = this;
        //window related event

        //Handling load event
        $(window).on('load', function() {
            var windowHeight = $(window).height();
            // adding height attr to top section
            $this.$topSection.css('height', windowHeight);
        });

        //Handling the resize event
        $(window).on('resize', function() {
            var windowHeight = $(window).height();
            $this.$topSection.css('height', windowHeight);
        });

        //Handling the scroll event
        $(window).scroll(function(){
            if ($(this).scrollTop() > 100) {
                $this.$backToTop.fadeIn();
            } else {
                $this.$backToTop.fadeOut();
            }
        }); 

        //back-to-top button
        $this.$backToTop.click(function(){
            $("html, body").animate({ scrollTop: 0 }, 1000);
            return false;
        });


        //init contact app if contact form added in a page
        if(this.$contactForm.length>0)
            $.ContactForm.init();

    },
    //init
    $.Page = new Page, $.Page.Constructor = Page
}(window.jQuery),

//initializing
function($) {
    "use strict";
    $.Page.init()
}(window.jQuery);