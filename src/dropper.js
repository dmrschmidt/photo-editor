+ function($) {
    'use strict';

    var dropZone = document.getElementById('drop-zone');
    var uploadForm = document.getElementById('js-upload-form');

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
              drag: function() {
                // return false here to prevent further movement
              },
              stop: function() {
                $('.dragging-preview').removeClass('dragging')
              }/*, containment: "#drop-target", scroll: false */});
              $('.drag-container').addClass('dragging')
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
