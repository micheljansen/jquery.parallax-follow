/*
Plugin: jQuery Parallax
Version 1.1.2
Author: Ian Lunn
Author URL: http://www.ianlunn.co.uk/
Plugin URL: http://www.ianlunn.co.uk/plugins/jquery-parallax/

Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html
*/

(function( $ ){
  var $window = $(window);
  var windowHeight = $window.height();

  $window.resize(function () {
    windowHeight = $window.height();
    console.log("Window Height:", windowHeight);
  });

  $.fn.parallax = function(referenceElement, speedFactor, outerHeight) {
    var $this = $(this);
    var $ref = $(referenceElement);

    // function to be called whenever the window is scrolled or resized
    function update(){
      var pos = $window.scrollTop();

      // the top of the reference element (assumed to be the same as the initial top of this, but stable)
      var top = $ref.offset().top;

      // the relative scroll position past the top of the element
      var rpos = Math.max(0, pos - top);


      $this.each(function(){
        var $element = $(this);
        var height = $element.height();

        // the bottom of the reference element, in pixels from the top of the page
        var refbottom = $ref.height() + $ref.offset().top;

        // the number of pixels that fall outside of view
        var overflow = Math.max(0, height - windowHeight);

        // the total distance it takes to scroll from the top to the bottom of the reference element
        var scrollDistance = Math.max(1,$ref.height() - windowHeight);

        // this is calculated so it will exactly line up the bottoms over the duration of scrollDistance
        var speedFactor = overflow / scrollDistance;

        // the new relative target offset for this element
        var targetpos = Math.round( rpos * speedFactor);

        // the new bottom of this element
        var bottom = height - targetpos + pos;

        if(bottom >= refbottom) {
          // stop scrolling when the bottoms align
          console.log("unstick");
          $this.css("position", "absolute");
          $this.css("top", $ref.height() - $element.height() );
        }
        else if(rpos > 0) {
          // start following when scrolled past the top of the element
          $this.css("position", "fixed");
          $this.css("top", -targetpos+"px");
        }
        else {
          // do nothing when above the top of the element
          $this.css("position", "absolute");
          $this.css("top", "0");
        }
      });
    }

    $window.bind('scroll', update).resize(update);
    update();
  };
})( jQuery );
