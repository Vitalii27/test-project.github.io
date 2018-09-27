var detectModule = (function ($) {
	// prived block

	function isMobile() {
		if (device.mobile() || $('html').hasClass("tablet") || $('html').hasClass("detect-mobile")) {
			return true;
		}
	}
	function isMicrosoft() {
		if (navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Edge\/12\./)) {
			$('html').addClass("detect-microsoft");
			return true;
		}
	}
	function isIE() {
		if (navigator.userAgent.match(/MSIE/i) || navigator.userAgent.match(/Trident\/7\./)) {
			$('html').addClass("detect-ie");
			return true;
		}
	}
	function isEdge() {
		if (navigator.userAgent.match(/Edge\//)) {
			$('html').addClass("detect-edge");
			return true;
		}
	}

	function getScrollBarWidth() {
		var $outer = $('<div>').css({
					visibility: 'hidden',
					width: 100,
					overflow: 'scroll'
				}).appendTo('body'),
				widthWithScroll = $('<div>').css({
					width: '100%'
				}).appendTo($outer).outerWidth();
		$outer.remove();
		return 100 - widthWithScroll;
	}

	return {
		// public methods
		scrollBarWidth: getScrollBarWidth(),
		isMobile: isMobile(),
		isMicrosoft: isMicrosoft(),
		isIE: isIE(),
		isEdge: isEdge()
	}
}(jQuery));
jQuery(function($) {

}); // ready
var seacrhBtn = document.querySelectorAll('.js-search');
var contactBtn = document.querySelectorAll('.js-form');
var seacrhPopup = document.getElementById('search-popup');
var contactForm = document.getElementById('form-popup');
var active = 'popup-visible';


var close = document.querySelectorAll('.search-cross');
var html = document.getElementsByTagName('html')[0];
var body = document.getElementsByTagName('body')[0];

var openSeacrhPopup = function () {
    seacrhPopup.classList.add(active)
};

var closeSeacrhPopup = function () {
    seacrhPopup.classList.remove(active)
};

var openFormPopup = function () {
    contactForm.classList.add(active);
    body.classList.add('full-width');
}

var closeFormPopup = function () {
    contactForm.classList.remove(active);
    body.classList.remove('full-width');
}

Array.prototype.forEach.call(seacrhBtn, function (el) {
    el.addEventListener('click', function (el) {
        if (seacrhPopup.classList.contains(active)) {
            closeSeacrhPopup();
        } else {
            openSeacrhPopup();
        }
    })
});
Array.prototype.forEach.call(contactBtn, function (el) {
    el.addEventListener('click', function (el) {
        el.preventDefault();
        if (contactForm.classList.contains(active)) {
            closeFormPopup();
        } else {
            openFormPopup();
        }
    })
});
//
Array.prototype.forEach.call(close, function (el) {
    el.addEventListener('click', function () {
        closeSeacrhPopup();
        closeFormPopup();

    })
});

jQuery(function($) {
    // arrow icons
    var arrowLeft = '<i class="demo-icon icon-arrow"></i>';
    var arrowRight = '<i class="demo-icon icon-arrow"></i>';

    // preset options
    var heroSlider = $('.js-hero-slider');
    var heroOption = {
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 5000,
        autoplay: true,
        arrows: false,
        dots: false,
        fade: true,
        swipeToSlide: true,
        //accessibility: false // prevent page scroll up on autoplay
    };


    // init slider
    heroSlider.slick(heroOption);


}); // ready
/* smooth scrolling */
jQuery(function($) {
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            // prevent conflict with tabs and other script used hash
            if ($(this).data("ignore-scroll")) return;

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 50
                }, 600);
                return false;
            }
        }
    });
});
/* smooth scrolling end*/
jQuery(function($) {
    // on canvas menu
    var $touch = $('.js-toggle-menu');
    var activeClass = "is-swipe-menu-shown";
    var $menu = $('.swipe-menu');
    var $close = $('.js-menu-close');
    var $wrapper = $("body");
    var startBreakpoint = "48em";

    // show/hide menu functions
    function showMenu() {
        $wrapper.addClass(activeClass);
        // ios scroll fix
        $("html, body").css({
            height: "100%",
            "overflow-y": "hidden"
        });

    }

    function hideMenu() {
        $wrapper.removeClass(activeClass);
        // ios scroll fix
        $("html, body").css({
            // height: "auto",
            "overflow-y": "auto"
        });
    }

    // event listeners
    $touch.on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if ($wrapper.hasClass(activeClass)) {
            hideMenu();
        } else {
            showMenu();
        }
    });

    $close.on('click', function(e) {
        e.stopPropagation();
        hideMenu();
    });

    $wrapper.on('click', function(e) {
        if (e.target.className !== "swipe-menu") {
            hideMenu();
        }
    });

    $menu.on('click', function(e) {
        e.stopPropagation();
    });

    // close menu if target is an anchor link
    $menu.find('a[href*="#"]:not([href="#"])').on('click', function(e) {
        setTimeout(hideMenu, 1000);
    });

    $(window).resize(function() {
        var media = window.matchMedia("only screen and (max-width: " + startBreakpoint + ")").matches;
        if (!media) {
            hideMenu();
        }
    });
    // on canvas menu end
});
var validateOption = {
    debug: true, // debug mode
    ignore: ".ignore",
    onclick: false, //Validate checkboxes and radio buttons on click
    errorClass: "invalid",
    errorElement: "span",
    onfocusout: false,
    messages: {
        name: {
            required: "Введите имя"
        },
        email: {
            required: "Введите E-mail адрес"
        },
        phone: {
            required: "Введите телефон"
        },
        data: {
            required: "Введите дату"
        },
        number: {
            required: "Введите номер домика"
        }
    },
    highlight: function (element, errorClass, validClass) {
        $(element).addClass(errorClass).removeClass(validClass);
        setTimeout(function () {
            $(element).removeClass(errorClass);
            $(element).next("span[class=" + errorClass + "]").fadeOut(500);
        }, 2000);
    },
    unhighlight: function (element, errorClass, validClass) {
        $(element).removeClass(errorClass).addClass(validClass);
    },
    submitHandler: function (form) {
        ajaxSubmit.call(form);
    }

};
if (typeof ajaxSubmit !== "function") {
    function ajaxSubmit() {
        var $form = $(this);
        $.ajax({
            url: $form.attr('action'),
            type: $form.attr('method'),
            data: $form.serialize(),
            success: function (data) {
                //alert('Сообщение успешно отправленно!');
                $form[0].reset();
                //showPopUp (data);
            },
            error: function (e) {
                alert('Возникла ошибка, нет связи с сервером. Попробуйте еще раз.');
                console.log(e);
            }
        });
    }
}
$(function () {

    var $form = $(".js-validate");
    // custom error messages
    jQuery.extend(jQuery.validator.messages, {
        required: "Поле не может быть пустым.",
        remote: "Поле заполнено неверно.",
        // email: "Введите корректный E-mail адрес, например energoclub@gmail.com",

    });

    $form.each(function () { // <- selects every <form> on set
        // init validation plugin
        $(this).validate(validateOption);

        // prevent default form submitted
        $(this).on("submit", function (e) {
            e.preventDefault();
        });
    });

}); //ready
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGVjdC5qcyIsIm1haW4uanMiLCJwb3AtdXAuanMiLCJzbGlkZXJzLmpzIiwic21vb3RoLXNjcm9sbC5qcyIsInN3aXBlLW1lbnUuanMiLCJ2YWxpZGF0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hEQTtBQUNBO0FBQ0E7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZGV0ZWN0TW9kdWxlID0gKGZ1bmN0aW9uICgkKSB7XHJcblx0Ly8gcHJpdmVkIGJsb2NrXHJcblxyXG5cdGZ1bmN0aW9uIGlzTW9iaWxlKCkge1xyXG5cdFx0aWYgKGRldmljZS5tb2JpbGUoKSB8fCAkKCdodG1sJykuaGFzQ2xhc3MoXCJ0YWJsZXRcIikgfHwgJCgnaHRtbCcpLmhhc0NsYXNzKFwiZGV0ZWN0LW1vYmlsZVwiKSkge1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHR9XHJcblx0ZnVuY3Rpb24gaXNNaWNyb3NvZnQoKSB7XHJcblx0XHRpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvTVNJRSAxMC9pKSB8fCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9UcmlkZW50XFwvN1xcLi8pIHx8IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0VkZ2VcXC8xMlxcLi8pKSB7XHJcblx0XHRcdCQoJ2h0bWwnKS5hZGRDbGFzcyhcImRldGVjdC1taWNyb3NvZnRcIik7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRmdW5jdGlvbiBpc0lFKCkge1xyXG5cdFx0aWYgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL01TSUUvaSkgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvVHJpZGVudFxcLzdcXC4vKSkge1xyXG5cdFx0XHQkKCdodG1sJykuYWRkQ2xhc3MoXCJkZXRlY3QtaWVcIik7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRmdW5jdGlvbiBpc0VkZ2UoKSB7XHJcblx0XHRpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvRWRnZVxcLy8pKSB7XHJcblx0XHRcdCQoJ2h0bWwnKS5hZGRDbGFzcyhcImRldGVjdC1lZGdlXCIpO1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGdldFNjcm9sbEJhcldpZHRoKCkge1xyXG5cdFx0dmFyICRvdXRlciA9ICQoJzxkaXY+JykuY3NzKHtcclxuXHRcdFx0XHRcdHZpc2liaWxpdHk6ICdoaWRkZW4nLFxyXG5cdFx0XHRcdFx0d2lkdGg6IDEwMCxcclxuXHRcdFx0XHRcdG92ZXJmbG93OiAnc2Nyb2xsJ1xyXG5cdFx0XHRcdH0pLmFwcGVuZFRvKCdib2R5JyksXHJcblx0XHRcdFx0d2lkdGhXaXRoU2Nyb2xsID0gJCgnPGRpdj4nKS5jc3Moe1xyXG5cdFx0XHRcdFx0d2lkdGg6ICcxMDAlJ1xyXG5cdFx0XHRcdH0pLmFwcGVuZFRvKCRvdXRlcikub3V0ZXJXaWR0aCgpO1xyXG5cdFx0JG91dGVyLnJlbW92ZSgpO1xyXG5cdFx0cmV0dXJuIDEwMCAtIHdpZHRoV2l0aFNjcm9sbDtcclxuXHR9XHJcblxyXG5cdHJldHVybiB7XHJcblx0XHQvLyBwdWJsaWMgbWV0aG9kc1xyXG5cdFx0c2Nyb2xsQmFyV2lkdGg6IGdldFNjcm9sbEJhcldpZHRoKCksXHJcblx0XHRpc01vYmlsZTogaXNNb2JpbGUoKSxcclxuXHRcdGlzTWljcm9zb2Z0OiBpc01pY3Jvc29mdCgpLFxyXG5cdFx0aXNJRTogaXNJRSgpLFxyXG5cdFx0aXNFZGdlOiBpc0VkZ2UoKVxyXG5cdH1cclxufShqUXVlcnkpKTsiLCJqUXVlcnkoZnVuY3Rpb24oJCkge1xyXG5cclxufSk7IC8vIHJlYWR5IiwidmFyIHNlYWNyaEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1zZWFyY2gnKTtcclxudmFyIGNvbnRhY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtZm9ybScpO1xyXG52YXIgc2VhY3JoUG9wdXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoLXBvcHVwJyk7XHJcbnZhciBjb250YWN0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb3JtLXBvcHVwJyk7XHJcbnZhciBhY3RpdmUgPSAncG9wdXAtdmlzaWJsZSc7XHJcblxyXG5cclxudmFyIGNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNlYXJjaC1jcm9zcycpO1xyXG52YXIgaHRtbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdodG1sJylbMF07XHJcbnZhciBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXTtcclxuXHJcbnZhciBvcGVuU2VhY3JoUG9wdXAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBzZWFjcmhQb3B1cC5jbGFzc0xpc3QuYWRkKGFjdGl2ZSlcclxufTtcclxuXHJcbnZhciBjbG9zZVNlYWNyaFBvcHVwID0gZnVuY3Rpb24gKCkge1xyXG4gICAgc2VhY3JoUG9wdXAuY2xhc3NMaXN0LnJlbW92ZShhY3RpdmUpXHJcbn07XHJcblxyXG52YXIgb3BlbkZvcm1Qb3B1cCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnRhY3RGb3JtLmNsYXNzTGlzdC5hZGQoYWN0aXZlKTtcclxuICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgnZnVsbC13aWR0aCcpO1xyXG59XHJcblxyXG52YXIgY2xvc2VGb3JtUG9wdXAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb250YWN0Rm9ybS5jbGFzc0xpc3QucmVtb3ZlKGFjdGl2ZSk7XHJcbiAgICBib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2Z1bGwtd2lkdGgnKTtcclxufVxyXG5cclxuQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChzZWFjcmhCdG4sIGZ1bmN0aW9uIChlbCkge1xyXG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICBpZiAoc2VhY3JoUG9wdXAuY2xhc3NMaXN0LmNvbnRhaW5zKGFjdGl2ZSkpIHtcclxuICAgICAgICAgICAgY2xvc2VTZWFjcmhQb3B1cCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG9wZW5TZWFjcmhQb3B1cCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn0pO1xyXG5BcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGNvbnRhY3RCdG4sIGZ1bmN0aW9uIChlbCkge1xyXG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICBlbC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGlmIChjb250YWN0Rm9ybS5jbGFzc0xpc3QuY29udGFpbnMoYWN0aXZlKSkge1xyXG4gICAgICAgICAgICBjbG9zZUZvcm1Qb3B1cCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG9wZW5Gb3JtUG9wdXAoKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59KTtcclxuLy9cclxuQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChjbG9zZSwgZnVuY3Rpb24gKGVsKSB7XHJcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjbG9zZVNlYWNyaFBvcHVwKCk7XHJcbiAgICAgICAgY2xvc2VGb3JtUG9wdXAoKTtcclxuXHJcbiAgICB9KVxyXG59KTtcclxuIiwialF1ZXJ5KGZ1bmN0aW9uKCQpIHtcclxuICAgIC8vIGFycm93IGljb25zXHJcbiAgICB2YXIgYXJyb3dMZWZ0ID0gJzxpIGNsYXNzPVwiZGVtby1pY29uIGljb24tYXJyb3dcIj48L2k+JztcclxuICAgIHZhciBhcnJvd1JpZ2h0ID0gJzxpIGNsYXNzPVwiZGVtby1pY29uIGljb24tYXJyb3dcIj48L2k+JztcclxuXHJcbiAgICAvLyBwcmVzZXQgb3B0aW9uc1xyXG4gICAgdmFyIGhlcm9TbGlkZXIgPSAkKCcuanMtaGVyby1zbGlkZXInKTtcclxuICAgIHZhciBoZXJvT3B0aW9uID0ge1xyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICBhdXRvcGxheVNwZWVkOiA1MDAwLFxyXG4gICAgICAgIGF1dG9wbGF5OiB0cnVlLFxyXG4gICAgICAgIGFycm93czogZmFsc2UsXHJcbiAgICAgICAgZG90czogZmFsc2UsXHJcbiAgICAgICAgZmFkZTogdHJ1ZSxcclxuICAgICAgICBzd2lwZVRvU2xpZGU6IHRydWUsXHJcbiAgICAgICAgLy9hY2Nlc3NpYmlsaXR5OiBmYWxzZSAvLyBwcmV2ZW50IHBhZ2Ugc2Nyb2xsIHVwIG9uIGF1dG9wbGF5XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvLyBpbml0IHNsaWRlclxyXG4gICAgaGVyb1NsaWRlci5zbGljayhoZXJvT3B0aW9uKTtcclxuXHJcblxyXG59KTsgLy8gcmVhZHkiLCIvKiBzbW9vdGggc2Nyb2xsaW5nICovXHJcbmpRdWVyeShmdW5jdGlvbigkKSB7XHJcbiAgICAkKCdhW2hyZWYqPVwiI1wiXTpub3QoW2hyZWY9XCIjXCJdKScpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmIChsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywgJycpID09IHRoaXMucGF0aG5hbWUucmVwbGFjZSgvXlxcLy8sICcnKSAmJiBsb2NhdGlvbi5ob3N0bmFtZSA9PSB0aGlzLmhvc3RuYW1lKSB7XHJcbiAgICAgICAgICAgIC8vIHByZXZlbnQgY29uZmxpY3Qgd2l0aCB0YWJzIGFuZCBvdGhlciBzY3JpcHQgdXNlZCBoYXNoXHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmRhdGEoXCJpZ25vcmUtc2Nyb2xsXCIpKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gJCh0aGlzLmhhc2gpO1xyXG4gICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXQubGVuZ3RoID8gdGFyZ2V0IDogJCgnW25hbWU9JyArIHRoaXMuaGFzaC5zbGljZSgxKSArICddJyk7XHJcbiAgICAgICAgICAgIGlmICh0YXJnZXQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiB0YXJnZXQub2Zmc2V0KCkudG9wIC0gNTBcclxuICAgICAgICAgICAgICAgIH0sIDYwMCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSk7XHJcbi8qIHNtb290aCBzY3JvbGxpbmcgZW5kKi8iLCJqUXVlcnkoZnVuY3Rpb24oJCkge1xyXG4gICAgLy8gb24gY2FudmFzIG1lbnVcclxuICAgIHZhciAkdG91Y2ggPSAkKCcuanMtdG9nZ2xlLW1lbnUnKTtcclxuICAgIHZhciBhY3RpdmVDbGFzcyA9IFwiaXMtc3dpcGUtbWVudS1zaG93blwiO1xyXG4gICAgdmFyICRtZW51ID0gJCgnLnN3aXBlLW1lbnUnKTtcclxuICAgIHZhciAkY2xvc2UgPSAkKCcuanMtbWVudS1jbG9zZScpO1xyXG4gICAgdmFyICR3cmFwcGVyID0gJChcImJvZHlcIik7XHJcbiAgICB2YXIgc3RhcnRCcmVha3BvaW50ID0gXCI0OGVtXCI7XHJcblxyXG4gICAgLy8gc2hvdy9oaWRlIG1lbnUgZnVuY3Rpb25zXHJcbiAgICBmdW5jdGlvbiBzaG93TWVudSgpIHtcclxuICAgICAgICAkd3JhcHBlci5hZGRDbGFzcyhhY3RpdmVDbGFzcyk7XHJcbiAgICAgICAgLy8gaW9zIHNjcm9sbCBmaXhcclxuICAgICAgICAkKFwiaHRtbCwgYm9keVwiKS5jc3Moe1xyXG4gICAgICAgICAgICBoZWlnaHQ6IFwiMTAwJVwiLFxyXG4gICAgICAgICAgICBcIm92ZXJmbG93LXlcIjogXCJoaWRkZW5cIlxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoaWRlTWVudSgpIHtcclxuICAgICAgICAkd3JhcHBlci5yZW1vdmVDbGFzcyhhY3RpdmVDbGFzcyk7XHJcbiAgICAgICAgLy8gaW9zIHNjcm9sbCBmaXhcclxuICAgICAgICAkKFwiaHRtbCwgYm9keVwiKS5jc3Moe1xyXG4gICAgICAgICAgICAvLyBoZWlnaHQ6IFwiYXV0b1wiLFxyXG4gICAgICAgICAgICBcIm92ZXJmbG93LXlcIjogXCJhdXRvXCJcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBldmVudCBsaXN0ZW5lcnNcclxuICAgICR0b3VjaC5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgaWYgKCR3cmFwcGVyLmhhc0NsYXNzKGFjdGl2ZUNsYXNzKSkge1xyXG4gICAgICAgICAgICBoaWRlTWVudSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNob3dNZW51KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJGNsb3NlLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIGhpZGVNZW51KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkd3JhcHBlci5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTmFtZSAhPT0gXCJzd2lwZS1tZW51XCIpIHtcclxuICAgICAgICAgICAgaGlkZU1lbnUoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkbWVudS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIGNsb3NlIG1lbnUgaWYgdGFyZ2V0IGlzIGFuIGFuY2hvciBsaW5rXHJcbiAgICAkbWVudS5maW5kKCdhW2hyZWYqPVwiI1wiXTpub3QoW2hyZWY9XCIjXCJdKScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KGhpZGVNZW51LCAxMDAwKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIG1lZGlhID0gd2luZG93Lm1hdGNoTWVkaWEoXCJvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogXCIgKyBzdGFydEJyZWFrcG9pbnQgKyBcIilcIikubWF0Y2hlcztcclxuICAgICAgICBpZiAoIW1lZGlhKSB7XHJcbiAgICAgICAgICAgIGhpZGVNZW51KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAvLyBvbiBjYW52YXMgbWVudSBlbmRcclxufSk7IiwidmFyIHZhbGlkYXRlT3B0aW9uID0ge1xyXG4gICAgZGVidWc6IHRydWUsIC8vIGRlYnVnIG1vZGVcclxuICAgIGlnbm9yZTogXCIuaWdub3JlXCIsXHJcbiAgICBvbmNsaWNrOiBmYWxzZSwgLy9WYWxpZGF0ZSBjaGVja2JveGVzIGFuZCByYWRpbyBidXR0b25zIG9uIGNsaWNrXHJcbiAgICBlcnJvckNsYXNzOiBcImludmFsaWRcIixcclxuICAgIGVycm9yRWxlbWVudDogXCJzcGFuXCIsXHJcbiAgICBvbmZvY3Vzb3V0OiBmYWxzZSxcclxuICAgIG1lc3NhZ2VzOiB7XHJcbiAgICAgICAgbmFtZToge1xyXG4gICAgICAgICAgICByZXF1aXJlZDogXCLQktCy0LXQtNC40YLQtSDQuNC80Y9cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW1haWw6IHtcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IFwi0JLQstC10LTQuNGC0LUgRS1tYWlsINCw0LTRgNC10YFcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGhvbmU6IHtcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IFwi0JLQstC10LTQuNGC0LUg0YLQtdC70LXRhNC+0L1cIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICByZXF1aXJlZDogXCLQktCy0LXQtNC40YLQtSDQtNCw0YLRg1wiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBudW1iZXI6IHtcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IFwi0JLQstC10LTQuNGC0LUg0L3QvtC80LXRgCDQtNC+0LzQuNC60LBcIlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBoaWdobGlnaHQ6IGZ1bmN0aW9uIChlbGVtZW50LCBlcnJvckNsYXNzLCB2YWxpZENsYXNzKSB7XHJcbiAgICAgICAgJChlbGVtZW50KS5hZGRDbGFzcyhlcnJvckNsYXNzKS5yZW1vdmVDbGFzcyh2YWxpZENsYXNzKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJChlbGVtZW50KS5yZW1vdmVDbGFzcyhlcnJvckNsYXNzKTtcclxuICAgICAgICAgICAgJChlbGVtZW50KS5uZXh0KFwic3BhbltjbGFzcz1cIiArIGVycm9yQ2xhc3MgKyBcIl1cIikuZmFkZU91dCg1MDApO1xyXG4gICAgICAgIH0sIDIwMDApO1xyXG4gICAgfSxcclxuICAgIHVuaGlnaGxpZ2h0OiBmdW5jdGlvbiAoZWxlbWVudCwgZXJyb3JDbGFzcywgdmFsaWRDbGFzcykge1xyXG4gICAgICAgICQoZWxlbWVudCkucmVtb3ZlQ2xhc3MoZXJyb3JDbGFzcykuYWRkQ2xhc3ModmFsaWRDbGFzcyk7XHJcbiAgICB9LFxyXG4gICAgc3VibWl0SGFuZGxlcjogZnVuY3Rpb24gKGZvcm0pIHtcclxuICAgICAgICBhamF4U3VibWl0LmNhbGwoZm9ybSk7XHJcbiAgICB9XHJcblxyXG59O1xyXG5pZiAodHlwZW9mIGFqYXhTdWJtaXQgIT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgZnVuY3Rpb24gYWpheFN1Ym1pdCgpIHtcclxuICAgICAgICB2YXIgJGZvcm0gPSAkKHRoaXMpO1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogJGZvcm0uYXR0cignYWN0aW9uJyksXHJcbiAgICAgICAgICAgIHR5cGU6ICRmb3JtLmF0dHIoJ21ldGhvZCcpLFxyXG4gICAgICAgICAgICBkYXRhOiAkZm9ybS5zZXJpYWxpemUoKSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIC8vYWxlcnQoJ9Ch0L7QvtCx0YnQtdC90LjQtSDRg9GB0L/QtdGI0L3QviDQvtGC0L/RgNCw0LLQu9C10L3QvdC+IScpO1xyXG4gICAgICAgICAgICAgICAgJGZvcm1bMF0ucmVzZXQoKTtcclxuICAgICAgICAgICAgICAgIC8vc2hvd1BvcFVwIChkYXRhKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydCgn0JLQvtC30L3QuNC60LvQsCDQvtGI0LjQsdC60LAsINC90LXRgiDRgdCy0Y/Qt9C4INGBINGB0LXRgNCy0LXRgNC+0LwuINCf0L7Qv9GA0L7QsdGD0LnRgtC1INC10YnQtSDRgNCw0LcuJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiQoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciAkZm9ybSA9ICQoXCIuanMtdmFsaWRhdGVcIik7XHJcbiAgICAvLyBjdXN0b20gZXJyb3IgbWVzc2FnZXNcclxuICAgIGpRdWVyeS5leHRlbmQoalF1ZXJ5LnZhbGlkYXRvci5tZXNzYWdlcywge1xyXG4gICAgICAgIHJlcXVpcmVkOiBcItCf0L7Qu9C1INC90LUg0LzQvtC20LXRgiDQsdGL0YLRjCDQv9GD0YHRgtGL0LwuXCIsXHJcbiAgICAgICAgcmVtb3RlOiBcItCf0L7Qu9C1INC30LDQv9C+0LvQvdC10L3QviDQvdC10LLQtdGA0L3Qvi5cIixcclxuICAgICAgICAvLyBlbWFpbDogXCLQktCy0LXQtNC40YLQtSDQutC+0YDRgNC10LrRgtC90YvQuSBFLW1haWwg0LDQtNGA0LXRgSwg0L3QsNC/0YDQuNC80LXRgCBlbmVyZ29jbHViQGdtYWlsLmNvbVwiLFxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgICRmb3JtLmVhY2goZnVuY3Rpb24gKCkgeyAvLyA8LSBzZWxlY3RzIGV2ZXJ5IDxmb3JtPiBvbiBzZXRcclxuICAgICAgICAvLyBpbml0IHZhbGlkYXRpb24gcGx1Z2luXHJcbiAgICAgICAgJCh0aGlzKS52YWxpZGF0ZSh2YWxpZGF0ZU9wdGlvbik7XHJcblxyXG4gICAgICAgIC8vIHByZXZlbnQgZGVmYXVsdCBmb3JtIHN1Ym1pdHRlZFxyXG4gICAgICAgICQodGhpcykub24oXCJzdWJtaXRcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG59KTsgLy9yZWFkeSJdfQ==
