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

        var direction = dragTarget.attr('class').split(" ").filter(function(c) { return c.startsWith("ord-") })[0]
        switch (direction) {
            case "ord-w": {
                console.log("direction west")
                var movement = e.pageX - initialOffset.left
                dragger.css({'left': initialPosition.left + movement})
                dragger.css({'width': initialSize.width - movement})
                break
            }
            case "ord-e": {
                console.log("direction east")
                var movement = e.pageX - initialOffset.left
                dragger.css({'width': initialSize.width + movement})
                break
            }
            case "ord-n": {
                console.log("direction north")
                var movement = e.pageY - initialOffset.top
                dragger.css({'top': initialPosition.top + movement})
                dragger.css({'height': initialSize.height - movement})
                break
            }
            case "ord-s": {
                console.log("direction south")
                var movement = e.pageY - initialOffset.top
                dragger.css({'height': initialSize.height + movement})
                break
            }
            default:{
                console.log("other direction:" + direction + ":")
                break
            }
        }
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
