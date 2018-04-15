+ function($) {
    'use strict'

    var enclosure = { top: 40, right: 513, bottom: 373, left: 68 }
    var originalDimension = { width: 640, height: 640}

    var mappedLocation = function(current) {
        // TODO: should this be with the original aspect ratio?
        var scale = $('.template-image').width() / originalDimension.width
        return current * scale
    }

    var constrainBounds = function(bounds) {
        var constrainedBounds = { left: bounds.left, top: bounds.top,
                                  width: bounds.width, height: bounds.height}
        if (bounds.width < mappedLocation(enclosure.right - enclosure.left)) {
            constrainedBounds.width = mappedLocation(enclosure.right - enclosure.left)
        }
        if (bounds.height < mappedLocation(enclosure.bottom - enclosure.top)) {
            constrainedBounds.height = mappedLocation(enclosure.bottom - enclosure.top)
        }
        if (bounds.left > mappedLocation(enclosure.left)) {
            constrainedBounds.left = mappedLocation(enclosure.left)
        }
        if (bounds.top > mappedLocation(enclosure.top)) {
            constrainedBounds.top = mappedLocation(enclosure.top)
        }
        if (bounds.left + bounds.width < mappedLocation(enclosure.right)) {
            constrainedBounds.left = mappedLocation(enclosure.right) - constrainedBounds.width
        }
        if (bounds.top + bounds.height < mappedLocation(enclosure.bottom)) {
            constrainedBounds.top = mappedLocation(enclosure.bottom) - constrainedBounds.height
        }
        return constrainedBounds
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

        var newBounds = { left: initialPosition.left, top: initialPosition.top,
                          width: initialSize.width, height: initialSize.height}

        if (direction == "nw" || direction == "w") {
            newBounds.left = initialPosition.left + movementX
            newBounds.width = initialSize.width - movementX

            var divisor = direction == "w" ? 2 : 1
            newBounds.top = initialPosition.top + (movementX / aspectRatio) / divisor
            newBounds.height = initialSize.height - (movementX / aspectRatio)
        } else if (direction == "ne" || direction == "e") {
            newBounds.width = initialSize.width + movementX

            var divisor = direction == "e" ? 2 : 1
            newBounds.top = initialPosition.top - (movementX / aspectRatio) / divisor
            newBounds.height = initialSize.height + (movementX / aspectRatio)
        } else if (direction == "se" || direction == "s") {
            newBounds.height = initialSize.height + movementY

            var multiplier = direction == "s" ? 0.5 : 0
            newBounds.left = initialPosition.left - (movementY * aspectRatio) * multiplier
            newBounds.width = initialSize.width + (movementY * aspectRatio)
        } else if (direction == "sw") {
            newBounds.height = initialSize.height + movementY

            newBounds.left = initialPosition.left - (movementY * aspectRatio)
            newBounds.width = initialSize.width + (movementY * aspectRatio)
        } else if (direction == "n") {
            newBounds.top = initialPosition.top + movementY
            newBounds.height = initialSize.height - movementY

            // aspect resize horizontal
            newBounds.left = initialPosition.left + (movementY * aspectRatio) / 2
            newBounds.width = initialSize.width - (movementY * aspectRatio)
        }

        var constrainedBounds = constrainBounds(newBounds)

        dragger.css({
            'top': constrainedBounds.top,
            'left': constrainedBounds.left,
            'width': constrainedBounds.width,
            'height': constrainedBounds.height
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
