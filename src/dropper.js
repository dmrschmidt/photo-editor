+ function($) {
    'use strict';

    var dropZone = document.getElementById('drop-zone');
    var fileInput = document.getElementById('js-upload-files');

    var enclosure = {
      top: 40,
      right: 513,
      bottom: 373,
      left: 68
    }

    var originalDimension = {
      width: 640,
      height: 640
    }

    var mappedLocation = function(current) {
      var scale = $('.template-image').width() / originalDimension.width
      return current * scale
    }

    var constrainMovement = function(e) {
      var target = $(e.target)
      if (target.position().left > mappedLocation(enclosure.left)) {
        target.css({left: mappedLocation(enclosure.left)})
        return false
      }
      if (target.position().top > mappedLocation(enclosure.top)) {
        target.css({top: mappedLocation(enclosure.top)})
        return false
      }
      if (target.position().left + target.width() < mappedLocation(enclosure.right)) {
        target.css({left: mappedLocation(enclosure.right) - target.width()})
        return false
      }
      if (target.position().top + target.height() < mappedLocation(enclosure.bottom)) {
        target.css({top: mappedLocation(enclosure.bottom) - target.height()})
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
              var imageElement = ['<img class="" src="', e.target.result,
                                '" title="', escape(theFile.name), '" id="dropped"/>'].join('')
              document.getElementById('drop-content').innerHTML = imageElement
              document.getElementById('dragging-preview').innerHTML = imageElement
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

    fileInput.addEventListener('change', function(e) {
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
