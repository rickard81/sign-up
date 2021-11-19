/* ====================================================

 @contributor: Rickard Andersson
 @content: utilities

======================================================= */

/****************************************
  ==== FUNCTIONS
****************************************/

/**
  * Returns current viewport height
  *
  * @returns: int
  * @usage:
  * getHeight();
 **/

function getHeight() {

    if (typeof window.innerHeight != 'undefined') {
        var viewportheight = window.innerHeight;
    }
    else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientHeight != 'undefined' && document.documentElement.clientHeight != 0) {
        var viewportheight = document.documentElement.clientHeight;
    }
    else {
        var viewportheight = document.getElementsByTagName('body')[0].clientHeight;
    }
    return viewportheight;
}
