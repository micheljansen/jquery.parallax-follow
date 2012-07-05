(function( $ ){
  var $window = $(window);
  var windowHeight = $window.height();

  $window.resize(function () {
    windowHeight = $window.height();
  });

  $.fn.parallaxFollow = function(referenceElement) {
    var $this = $(this);
    var $ref = $(referenceElement);

    // function to be called whenever the window is scrolled or resized
    function update(){
      var pos = $window.scrollTop();

      // the top of the reference element (assumed to be the same as the initial top of this, but stable)
      var reftop = $ref.offset().top;

      // the height of the reference element
      var refheight = $ref.height();

      // the bottom of the reference element, in pixels from the top of the page
      var refbottom = refheight + reftop;

      // the relative scroll position past the top of the element
      var rpos = Math.max(0, pos - reftop);


      $this.each(function(){
        var $element = $(this);
        var height = $element.height();

        // the number of pixels that fall outside of view
        var overflow = Math.max(0, height - windowHeight);

        // the total distance it takes to scroll from the top to the bottom of the reference element
        var scrollDistance = Math.max(1, refheight - windowHeight);

        // this is calculated so it will exactly line up the bottoms over the duration of scrollDistance
        var speedFactor = overflow / scrollDistance;

        // the new relative target offset for this element
        var targetpos = Math.round( rpos * speedFactor);

        // the new bottom of this element
        var bottom = height - targetpos + pos;

        if(height >= refheight) {
          // the reference element is shorter than the scrolling element
          // so there is nothing to scroll
          $this.css("position", '');
          $this.css("top", '');
          $this.removeClass("following above below parallax").addClass("noparallax");
        }
        else if(bottom >= refbottom) {
          // stop scrolling when the bottoms align
          $this.css("position", "absolute");
          $this.css("top", refheight - height );
          $this.removeClass("following noparallax above").addClass("parallax below");
        }
        else if(rpos > 0) {
          // start following when scrolled past the top of the element
          $this.css("position", "fixed");
          $this.css("top", -targetpos+"px");
          $this.removeClass("below noparallax above").addClass("parallax following");
        }
        else {
          // do nothing when above the top of the element
          $this.css("position", "absolute");
          $this.css("top", "0");
          $this.removeClass("following below noparallax").addClass("parallax above");
        }
      });
    }

    $window.bind('scroll', update).resize(update);
    update();
  };
})( jQuery );
