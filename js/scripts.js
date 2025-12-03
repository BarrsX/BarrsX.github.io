(function ($) {
  // Remove no-js class
  $("html").removeClass("no-js");

  // Navigate to section immediately when nav is clicked - zero animations
  $("header a").click(function (e) {
    // Treat as normal link if no-scroll class
    if ($(this).hasClass("no-scroll")) return;

    e.preventDefault();
    var heading = $(this).attr("href");
    var scrollDistance = $(heading).offset().top;

    // Force disable all scroll animations
    $("html").css("scroll-behavior", "auto");

    // Use immediate scroll with no animation
    window.scrollTo(0, scrollDistance);

    // Ensure all content in the target section is fully visible immediately
    if (heading === "#projects") {
      $(".project").addClass("fadeIn");
    } else if (heading === "#skills") {
      $("#skills li").each(function () {
        $(this).addClass("fadeIn");
      });
    }

    // Hide the menu once clicked if mobile
    if ($("header").hasClass("active")) {
      $("header, body").removeClass("active");
    }
  });

  // Add fadeIn animation to project items on scroll
  $(window).on("scroll", function () {
    $(".project").each(function () {
      var position = $(this).offset().top;
      var scrollPosition = $(window).scrollTop() + $(window).height() - 200;

      if (position < scrollPosition) {
        $(this).addClass("fadeIn");
      }
    });

    // Speed up staggered animations (from 50ms to 20ms delay)
    $("#skills li").each(function (i) {
      var position = $(this).offset().top;
      var scrollPosition = $(window).scrollTop() + $(window).height() - 150;

      if (position < scrollPosition) {
        setTimeout(function () {
          $("#skills li").eq(i).addClass("fadeIn");
        }, i * 20);
      }
    });
  });

  // Scroll to top with faster animation
  $("#to-top").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      200
    );
  });

  // Add sticky header on scroll
  $(window).scroll(function () {
    if ($(window).scrollTop() > 100) {
      $("header").addClass("sticky-header");
    } else {
      $("header").removeClass("sticky-header");
    }
  });

  // Scroll to first element with faster animation
  $("#lead-down span").click(function () {
    var scrollDistance = $("#lead").next().offset().top;
    $("html, body").animate(
      {
        scrollTop: scrollDistance + "px",
      },
      200
    );
  });

  // Create timeline
  $("#experience-timeline").each(function () {
    $this = $(this); // Store reference to this
    $userContent = $this.children("div"); // user content

    // Create each timeline block
    $userContent.each(function () {
      $(this)
        .addClass("vtimeline-content")
        .wrap(
          '<div class="vtimeline-point"><div class="vtimeline-block"></div></div>'
        );
    });

    // Add icons to each block
    $this.find(".vtimeline-point").each(function () {
      $(this).prepend(
        '<div class="vtimeline-icon"><i class="fa fa-map-marker"></i></div>'
      );
    });

    // Add dates to the timeline if exists
    $this.find(".vtimeline-content").each(function () {
      var date = $(this).data("date");
      if (date) {
        // Prepend if exists
        $(this)
          .parent()
          .prepend('<span class="vtimeline-date">' + date + "</span>");
      }
    });
  });

  // Open mobile menu
  $("#mobile-menu-open").click(function () {
    $("header, body").addClass("active");
  });

  // Close mobile menu
  $("#mobile-menu-close").click(function () {
    $("header, body").removeClass("active");
  });

  // Load additional projects
  $("#view-more-projects").click(function (e) {
    e.preventDefault();
    $(this).fadeOut(300, function () {
      $("#more-projects").fadeIn(300);
    });
  });
})(jQuery);
