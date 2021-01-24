'use strict'

window.addEventListener('DOMContentLoaded', () => {

    // burger & mobile menu

    const menuBurger = document.querySelector('.burger'),
        mobile = document.querySelector('.mobile'),
        mobileLinks = mobile.querySelectorAll('a'),
        mobileItems = document.querySelectorAll('.mobile__item'),
        box = document.querySelector('.gift__box');


    function openMenu() {

        window.addEventListener('resize', () => {
            if (window.screen.availWidth < 767 && mobile.style.display === 'none') {
                menuBurger.style.display = 'block';
            }
        });

        menuBurger.addEventListener('click', (e) => {
            mobile.style.display = 'block';
            mobile.classList.add('animated', 'fadeIn');
            menuBurger.style.display = 'none';

            mobileItems.forEach(item => {
                item.classList.add('animated', 'fadeInDown');
            });
        });
    }

    function closeMenu(trigger) {
        trigger.addEventListener('click', () => {
            if (mobile.style.display === 'block') {
                mobile.style.display = 'none';
                menuBurger.style.display = 'block';
                menuBurger.classList.add('animated', 'fadeInUp');
            }
        });

        mobileLinks.forEach(item => {
            item.addEventListener('click', () => {
                if (mobile.style.display === 'block') {
                    mobile.style.display = 'none';
                    menuBurger.style.display = 'block';
                    menuBurger.classList.add('animated', 'fadeInUp');
                }
            });
        });

        window.addEventListener('resize', () => {
            if (window.screen.availWidth > 767) {
                mobile.style.display = 'none';
                menuBurger.style.display = 'none';
            }
        });
    }

    openMenu();
    closeMenu(mobile);


    // wow animation

    new WOW().init();


    // pageup & smooth scroll

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href=#promo]").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    $('a[href^="#"]').on('click', function() {
        let href = $(this).attr('href');

        $('html, body').animate({
            scrollTop: $(href).offset().top
        }, 400);
        return false;
    });


    // form validation

    function validateForms(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: "required",
                code: "required"
            },
            messages: {
                name: {
                    required: "Please enter your name",
                    minlength: jQuery.validator.format("Please enter at least {0} symbols")
                },
                email: "Please enter your email",
                code:"Please enter the code"
            }
        });
    }
    validateForms('#box-form');


    // posting form

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            box.classList.add('animated', 'fadeInUp');
            box.style.display = 'block';
            setTimeout(() => {
                box.classList.add('fadeOutUp');
            }, 2000);
            setTimeout(() => {
                box.style.display = "none";
                box.classList.remove('fadeOutUp')
            }, 5000);
            $('form').trigger('reset');
        });
        return false;
    });


    // animations

    const logo = document.querySelector('.promo__logo'),
          woman = document.querySelector('.promo__woman');


    function animateElem(trigger, className) {
        trigger.addEventListener('click', () => {
           if (!trigger.classList.contains(className)) {
               trigger.classList.add('animate__animated', className);
           }
            setTimeout(() => {
                trigger.classList.remove('animate__animated', className);
            }, 2000);
        });
    }
    animateElem(logo, 'animate__rubberBand');
    animateElem(woman, 'animate__pulse');


    function heartbeat() {
        const heart = document.querySelector('.gift__heart');

        heart.addEventListener('click', () => {
            if (heart.style.animationPlayState === 'paused') {
                heart.style.animation = 'heartbeat 1s ease infinite';
            } else {
                heart.style.animationPlayState = 'paused';
            }
        });
    }

    heartbeat();


    //image change size

    const macaroni = document.querySelector('.promo__macaroni');

    function changeSize() {
        if (window.screen.availWidth < 767) {
            macaroni.src = "img/promo_macaroni_s-min.png";
        } else {
            macaroni.src = "img/promo_macaroni.png";
        }
    }

    changeSize();

    window.addEventListener('resize', () => {
        changeSize();
    });
});

