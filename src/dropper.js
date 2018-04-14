+ function($) {
    'use strict';

    var dropZone = document.getElementById('drop-zone');
    var fileInput = document.getElementById('js-upload-files');

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
                    $('.drag-container').addClass('draggable')
                }
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
