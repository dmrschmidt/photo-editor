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
        var constrainedBounds = {
            left: bounds.left,
            top: bounds.top,
            width: bounds.width,
            height: bounds.height
        }
        var mappedEnclosure = {
            left: mappedLocation(enclosure.left),
            top: mappedLocation(enclosure.top),
            right: mappedLocation(enclosure.right),
            bottom: mappedLocation(enclosure.bottom)
        }

        if (bounds.left > mappedEnclosure.left) {
            return false
        }
        if (bounds.top > mappedEnclosure.top) {
            return false
        }
        if (bounds.left + bounds.width < mappedEnclosure.right) {
            return false
        }
        if (bounds.top + bounds.height < mappedEnclosure.bottom) {
            return false
        }
        return true
    }

    document.isResizing = false

    var dragContainer = $('.drag-container')
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
            width:  dragContainer.width(),
            height: dragContainer.height()
        }
        initialPosition = {
            left: dragContainer.position().left,
            top: dragContainer.position().top
        }
    }

    var handleBarMouseUp = function(e) {
        document.isResizing = false
        console.log('end resizing')
        initialOffset = undefined
        initialSize = undefined
        initialPosition = undefined
        dragTarget = undefined

        // console.log('width was: ' + document.originalWidth)
        // document.originalWidth = $('.drag-container').width()
        document.originalRatio = $('.drop-frame').width() / $('.drag-container').width()
        document.createDraggable()
        // console.log('width is: ' + document.originalWidth)
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

        if (!constrainBounds(newBounds)) { return }

        dragContainer.css({
            'top': newBounds.top,
            'left': newBounds.left,
            'width': newBounds.width,
            'height': newBounds.height
        })
    }

    $(document).ready(function() {
        dragContainer = $('.drag-container')

        $('.jcrop-resizer').on("mousedown touchstart", function(e) {
            handleBarMouseDown(e)
        })

        $(document).on("mouseup touchend", function(e) {
            handleBarMouseUp(e)
        })

        $(document).on("mousemove touchmove", function(e) {
            handleMouseMove(e)
        })

        $(window).on('resize', function () {
            let ratio = $('#creator').outerWidth() / originalDimension.width
            $('#creator').css({
                'height': originalDimension.height * ratio
            })
            dragContainer.css({
                'top': ratio * document.originalPosition.top,
                'left': ratio * document.originalPosition.left,
                'width': $('.drop-frame').width() / document.originalRatio,
                // 'height': $('.drag-frame').height() * document.originalRatio
            })
        })
    })

}(jQuery)
