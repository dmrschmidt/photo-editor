+ function($) {
    'use strict'

    var enclosure = { top: 40, right: 513, bottom: 373, left: 68 }
    var originalDimension = { width: 640, height: 640}

    var mappedLocation = function(current) {
        var scale = $('.template-image').width() / originalDimension.width
        return current * scale
    }

    document.isResizing = false

    var dragger = $('.dragger')
    var initialOffset
    var initialSize
    var initialPosition
    var dragTarget

    var handleBarMouseDown = function(e) {
        console.log('start resizing')
        document.isResizing = true
        dragTarget = $(e.target)
        initialOffset = { left: e.pageX, top: e.pageY }
        initialSize = {
            width:  dragger.width(),
            height: dragger.height()
        }
        initialPosition = {
            left: dragger.position().left,
            top: dragger.position().top
        }
    }

    var handleBarMouseUp = function(e) {
        document.isResizing = false
        console.log('end resizing')
        initialOffset = undefined
        initialSize = undefined
        initialPosition = undefined
        dragTarget = undefined
    }

    var handleMouseMove = function(e) {
        if (!document.isResizing) { return }

        var movementX = e.pageX - initialOffset.left
        var movementY = e.pageY - initialOffset.top
        var aspectRatio = document.uploadedImage.width / document.uploadedImage.height

        console.log('aspect ratio: ' + aspectRatio)

        var ord = dragTarget.attr('class').split(" ").filter(function(c) { return c.startsWith("ord-") })[0]
        var direction = ord.split("-")[1]

        var newPosition = {'left': initialPosition.left, 'top': initialPosition.top}
        var newSize = {'width': initialSize.width, 'height': initialSize.height}

        if (direction == "nw" || direction == "w") {
            newPosition['left'] = initialPosition.left + movementX
            newSize['width'] = initialSize.width - movementX

            var divisor = direction == "w" ? 2 : 1
            newPosition['top'] = initialPosition.top + (movementX / aspectRatio) / divisor
            newSize['height'] = initialSize.height - (movementX / aspectRatio)
        } else if (direction == "ne" || direction == "e") {
            newSize['width'] = initialSize.width + movementX

            var divisor = direction == "e" ? 2 : 1
            newPosition['top'] = initialPosition.top - (movementX / aspectRatio) / divisor
            newSize['height'] = initialSize.height + (movementX / aspectRatio)
        } else if (direction == "se" || direction == "s") {
            newSize['height'] = initialSize.height + movementY

            var multiplier = direction == "s" ? 0.5 : 0
            newPosition['left'] = initialPosition.left - (movementY * aspectRatio) * multiplier
            newSize['width'] = initialSize.width + (movementY * aspectRatio)
        } else if (direction == "sw") {
            newSize['height'] = initialSize.height + movementY

            newPosition['left'] = initialPosition.left - (movementY * aspectRatio)
            newSize['width'] = initialSize.width + (movementY * aspectRatio)
        } else if (direction == "n") {
            newPosition['top'] = initialPosition.top + movementY
            newSize['height'] = initialSize.height - movementY

            // aspect resize horizontal
            newPosition['left'] = initialPosition.left + (movementY * aspectRatio) / 2
            newSize['width'] = initialSize.width - (movementY * aspectRatio)
        }

        // TODO: apply constrainMovement logic here; unify the code to apply
        //       for both parts that need it
        dragger.css({
            'top': newPosition['top'],
            'left': newPosition['left'],
            'width': newSize['width'],
            'height': newSize['height']
        })
    }

    $('.jcrop-resizer').on("mousedown touchstart", function(e) {
        handleBarMouseDown(e)
    })

    $(document).on("mouseup touchend", function(e) {
        handleBarMouseUp(e)
    })

    $(document).on("mousemove touchmove", function(e) {
        handleMouseMove(e)
    })

}(jQuery)
