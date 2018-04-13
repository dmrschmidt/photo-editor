+ function($) {
    'use strict';

    var dropZone = document.getElementById('drop-zone');
    var uploadForm = document.getElementById('js-upload-form');

    var constrainMovement = function(e) {
      var target = $(e.target)
      if (target.position().left < 0) {
        target.css({left: 0})
        return false
      }
      if (target.position().top < 0) {
        target.css({top: 0})
        return false
      }
      // console.log(target.position().left)
      // console.log(target.width())
      // console.log($('.dragger').position().left)
      // console.log($('.dragger').width())
      // console.log("end")
      console.log($('.dragger').position().left + target.width())
      if ($('.dragger').position().left + $('.dragger').width() > $('#creator').position().left + $('#creator').width()) {
        target.css({left: 0})
        return false
      }
      return true
    }

    var startUpload = function(files) {
        // Loop through the FileList and render image files as thumbnails.
        for (var i = 0, f; f = files[i]; i++) {

          // Only process image files.
          if (!f.type.match('image.*')) {
            continue;
          }

          var reader = new FileReader();

          reader.onload = (function(theFile) {
            return function(e) {
              document.getElementById('drop-content').innerHTML = ['<img class="" src="', e.target.result,
                                '" title="', escape(theFile.name), '" id="dropped"/>'].join('');
              $('.drag-container').draggable({handle: '.dragger',
              start: function() {
                $('.dragging-preview').addClass('dragging')
              },
              drag: function(e) {
                return constrainMovement(e)
              },
              stop: function() {
                $('.dragging-preview').removeClass('dragging')
              }});
              $('.drag-container').addClass('draggable')
            };
          })(f);

          reader.readAsDataURL(f);
        }
      }

    uploadForm.addEventListener('submit', function(e) {
        e.preventDefault()
        startUpload(e.target.files)
    })

    dropZone.ondrop = function(e) {
        e.preventDefault();
        this.className = 'upload-drop-zone';
        startUpload(e.dataTransfer.files)
    }

    dropZone.ondragover = function() {
        this.className = 'upload-drop-zone drop';
        return false;
    }

    dropZone.ondragleave = function() {
        this.className = 'upload-drop-zone';
        return false;
    }

}(jQuery);
