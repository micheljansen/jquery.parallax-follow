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

  $.fn.parallax = function(adjuster, speedFactor, outerHeight) {
    var $this = $(this);
    var getHeight;

    var top = $this.offset().top;
    console.log("init", top);

    if (outerHeight) {
      getHeight = function(jqo) {
        return jqo.outerHeight(true);
      };
    } else {
      getHeight = function(jqo) {
        return jqo.height();
      };
    }
      
    // setup defaults if arguments aren't specified
    if (arguments.length < 1 || adjuster === null) adjuster = 0;
    if (arguments.length < 2 || speedFactor === null) speedFactor = 0.1;
    
    // function to be called whenever the window is scrolled or resized
    function update(){
      var pos = $window.scrollTop();
      var rpos = Math.max(0, pos - top);

      $this.each(function(){
        var $element = $(this);
        var height = getHeight($element);
        var lcolbottom = $("#lcol").height() + $("#lcol").offset().top;

        var rcolOverflow = Math.max(0, height - windowHeight);
        var scrollDistance = Math.max(1,$("#lcol").height() - windowHeight);

        var speedFactor = rcolOverflow / scrollDistance;

        var targetpos = Math.round( rpos * speedFactor);
        var rcolbottom = getHeight($element)-targetpos + pos;

        console.log(pos, top, windowHeight, height, rcolOverflow, scrollDistance, speedFactor, rpos, targetpos);

        if(rcolbottom >= lcolbottom) {
          console.log("unstick");
          $this.css("position", "absolute");
          $this.css("top", $("#lcol").height() - $element.height() );
        }
        else if(rpos > 0) {
          $this.css("position", "fixed");
          $this.css("top", -targetpos+"px");
        }
        else {
          $this.css("position", "absolute");
          $this.css("top", "0");
        }
        // $this.css('position', "relative");
        // $this.css('top', newpos + "px");
      });
    }    

    $window.bind('scroll', update).resize(update);
    update();
  };
})( jQuery );
