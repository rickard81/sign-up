/*====================================================

 @contributor: Rickard Andersson
 @content: dialogs

=======================================================*/

var $dialogTrigger;

$(document).on('ready',function(){

/****************************************
  ==== OPEN DIALOG
****************************************/

  $('.open-dialog').on('click',function(e){

    e.preventDefault();
    e.stopPropagation();

    $dialogTrigger = $(this);

    var $dialog = $('#'+ $dialogTrigger.attr('data-dialog')),
        type = $dialogTrigger.attr('data-type') != undefined ? $dialogTrigger.attr('data-type') : '';

    if($dialogTrigger.hasClass('disabled')){
      return false;
    }

    openDialog($dialog,type);

  });

});

 /**
   * Open dialog
   *
   * @usage:
   * openDialog($dialog,type,delay);
  **/

  function openDialog($dialog,type){

    var $overlay = $('.overlay'),
        focusableElementsString = "a[href], area[href], input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[contenteditable]";

    $('body').addClass('oh');
    $('main.main').css('z-index',11);
    $overlay.addClass('open');
    $('.spinner',$overlay).removeClass('hide');
    (type != 'confirm') ? $overlay.addClass('close-dialog') : '';
    

    setTimeout(function(){
      dialogPosition($dialog);
    },1);

    setTimeout(function(){
      
      $dialog.addClass('open');
      $('.spinner',$overlay).addClass('hide');

      // Wait for css animations to finish
      setTimeout(function(){
        $('main').attr('tab-index',-1);
        $('.content',$dialog).focus();
      },200);

      $('html').on('click.dialog','.close-dialog',function(e){
        e.preventDefault();
        closedialog();
      });

      $(document).on('keydown.dialog',function(e){

        if(e.keyCode === 27 && $overlay.hasClass('close-dialog')){
          closedialog();
          e.preventDefault();
        }

        if(e.keyCode === 9){
          
          var children = $dialog.find('*'),
              focusableItems = children.filter(focusableElementsString).filter(':visible'),
              focusedItem = $(document.activeElement),
              numberOfFocusableItems = focusableItems.length,
              focusedItemIndex = focusableItems.index(focusedItem);

          if(!e.shiftKey && (focusedItemIndex == numberOfFocusableItems - 1)){
            focusableItems.get(0).focus();
            e.preventDefault();
          }
          if(e.shiftKey && focusedItemIndex == 0){
            focusableItems.get(numberOfFocusableItems - 1).focus();
            e.preventDefault();
          }
        }

      });

      $(window).on('resize.dialog',function(){

        clearTimeout(window.resizedFinished);

        window.resizedFinished = setTimeout(function(){
          dialogPosition($dialog);
        },250);

      });

    },2);

  }

 /**
   * Calculate position and max-height of a dialog
   *
   * @usage:
   * dialogPosition($dialog);
  **/

  function dialogPosition($dialog){

    $('.content',$dialog).removeAttr('style');

    var $content = $('.content',$dialog),
        height = $dialog.outerHeight(true),
        top = (getHeight() - height) / 2,
        maxHeight = ($dialog.hasClass('nofoot')) ? getHeight() - (top * 2) : getHeight() - (top * 2) - $('.foot',$dialog).outerHeight(true);

    if(top < 20){
      top = 20;
      maxHeight = ($dialog.hasClass('nofoot')) ? getHeight() - 40 : maxHeight - 40;
    }

    $dialog.css({'top': top});
    $content.css({'max-height': maxHeight});
  }

 /**
   * Close open dialog, unbind events and return focus to trigger element
   *
   * @usage:
   * closedialog();
  **/

  function closedialog(){

    $('body').removeClass('oh');
    $('main.main').css('z-index',6);
    $('.overlay').removeClass('open close-dialog');
    $('.dialog').removeClass('open');

    $(document).off('keydown.dialog');
    $(document).off('resize.dialog');
    $('html').off('click.dialog');

    ($dialogTrigger != undefined) ? $dialogTrigger.focus() : $('main').focus();
  }
