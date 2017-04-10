$(document).ready(function() {
  "use strict";

    var toggles = document.querySelectorAll(".c-hamburger");

    for (var i = toggles.length - 1; i >= 0; i--) {
      var toggle = toggles[i];
      toggleHandler(toggle);
    };

    function toggleHandler(toggle) {
      toggle.addEventListener( "click", function(e) {
        e.preventDefault();
        (this.classList.contains("is-active") === true) ? this.classList.remove("is-active") : this.classList.add("is-active");
      });
    }

    $(".c-hamburger").click(function(event) {
        $(".menu").slideToggle();
        return false;
    });

    function resize() {
      if ($(window).width() < 1036) {
        $('header nav').addClass('mobile').removeClass('desktop');

        

        $(".mobile .dropdown >a").click(function(event) {
          $(this).toggleClass('active');
          $(".submenu").stop().slideToggle();
          return false;
        });

          $('.menu .dropdown').off('mouseover mouseout');
          
          $('header nav.mobile .menu').hide();
          $(".c-hamburger").removeClass("is-active");
      }
      else {
        $('header nav').removeClass('mobile').addClass('desktop').show();
        
        $('header nav.desktop .menu').show();

        //Quando passar o mouse aparece o submenu
        $('.menu .dropdown').on('mouseover', function() {
             $(this).find('>a').addClass('hover');
            $(">.submenu", this).css({
                display: 'block'
            });
        });

        //Quando retirar o mouse some o submenu
        $('.menu .dropdown').on('mouseout', function() {
            $(this).find('>a').removeClass('hover');
            $(">.submenu", this).css({
                display: 'none'
            });
        });
      }
    }



    
    $(window).resize(resize);
    resize();

    function socials(){
        var redes = $('.social-share');

        $(window).scroll(function(){
            if ($(this).scrollTop() > 45) {
                redes.addClass('social-active');
            } else {
                redes.removeClass('social-active');
            }
        });
    }

    socials();


    //Modal General
    $(".open-modal").click(function(event) {
      var id_modal = $(this).attr('href');
      var id_video = $(this).attr('data-idmodal');
      $(id_modal).fadeIn();
      $(id_modal+" iframe").attr("src", "https://player.vimeo.com/video/" + id_video + '?color=ff9933&title=0&byline=0&portrait=0&badge=0');      
      return false;
    });

    $(".close-modal").click(function(event) {
      $(".modal-general").fadeOut();
      $(".modal-general iframe").attr("");
      return false;
    });

}); 



  

     

  


