+ function($) {
    'use strict';

    var dropZone
    var fileInput

    var addImageToCanvas = function(image) {
        var reader = new FileReader()
        reader.onload = (function(theFile) {
            return function(e) {
                var imageElement = ['<img class="" src="', e.target.result,
                '" title="', escape(theFile.name), '" id="dropped"/>'].join('')
                document.getElementById('drop-content').innerHTML = imageElement
                document.getElementById('dragging-preview').innerHTML = imageElement
                $('.drag-container').addClass('draggable')
            }
        })(image)
        reader.readAsDataURL(image)
    }

    var readImageDimensions = function(image) {
        var reader = new FileReader()
        reader.onload = function() {
            var img = new Image()
            img.onload = function() {
                document.uploadedImage = img
                document.createDraggable()
            }
            img.src = reader.result
        }
        reader.readAsDataURL(image)
    }

    var setupCanvasWithImage = function(file) {
        if (!file.type.match('image.*')) {
            return
        }
        addImageToCanvas(file)
        readImageDimensions(file)
    }

    $(document).ready(function() {
        dropZone = document.getElementById('drop-zone')
        fileInput = document.getElementById('js-upload-files')

        fileInput.addEventListener('change', function(e) {
            e.preventDefault()
            setupCanvasWithImage(e.target.files[0])
        })

        dropZone.ondrop = function(e) {
            e.preventDefault();
            this.className = 'upload-drop-zone';
            setupCanvasWithImage(e.dataTransfer.files[0])
        }

        dropZone.ondragover = function() {
            this.className = 'upload-drop-zone drop';
            return false;
        }

        dropZone.ondragleave = function() {
            this.className = 'upload-drop-zone';
            return false;
        }
    })

}(jQuery);
