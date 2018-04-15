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

        if (direction == "nw" || direction == "w") {
            dragger.css({'left': initialPosition.left + movementX})
            dragger.css({'width': initialSize.width - movementX})

            var divisor = direction == "w" ? 2 : 1
            dragger.css({'top': initialPosition.top + (movementX / aspectRatio) / divisor})
            dragger.css({'height': initialSize.height - (movementX / aspectRatio)})
        } else if (direction == "ne" || direction == "e") {
            dragger.css({'width': initialSize.width + movementX})

            var divisor = direction == "e" ? 2 : 1
            dragger.css({'top': initialPosition.top - (movementX / aspectRatio) / divisor})
            dragger.css({'height': initialSize.height + (movementX / aspectRatio)})
        } else if (direction == "se" || direction == "s") {
            dragger.css({'height': initialSize.height + movementY})

            var multiplier = direction == "s" ? 0.5 : 0
            dragger.css({'left': initialPosition.left - (movementY * aspectRatio) * multiplier})
            dragger.css({'width': initialSize.width + (movementY * aspectRatio)})
        } else if (direction == "sw") {
            dragger.css({'height': initialSize.height + movementY})

            dragger.css({'left': initialPosition.left - (movementY * aspectRatio)})
            dragger.css({'width': initialSize.width + (movementY * aspectRatio)})
        } else if (direction == "n") {
            dragger.css({'top': initialPosition.top + movementY})
            dragger.css({'height': initialSize.height - movementY})

            // aspect resize horizontal
            dragger.css({'left': initialPosition.left + (movementY * aspectRatio) / 2})
            dragger.css({'width': initialSize.width - (movementY * aspectRatio)})
        }
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
