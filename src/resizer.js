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

    var handleBarMouseDown = function(e) {
        console.log('start resizing')
        document.isResizing = true
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
    }

    var handleMouseMove = function(e) {
        if (!document.isResizing) { return }
        var movement = e.pageX - initialOffset.left
        console.log('resizing by ' + movement + ' to new width: ' + (dragger.width() - movement))

        dragger.css({'left': initialPosition.left + movement})
        dragger.css({'width': initialSize.width - movement})
    }

    $('.jcrop-dragbar').on("mousedown touchstart", function(e) {
        handleBarMouseDown(e)
    })

    $(document).on("mouseup touchend", function(e) {
        handleBarMouseUp(e)
    })

    $(document).on("mousemove touchmove", function(e) {
        handleMouseMove(e)
    })

}(jQuery)
