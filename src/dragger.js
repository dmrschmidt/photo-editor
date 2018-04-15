+ function($) {
    'use strict'

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
        // TODO: should this be with the original aspect ratio?
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

    $('.drag-container').draggable({
        handle: '.dragger',
        start: function() {
            $('.dragging-preview').addClass('dragging')
        },
        drag: function(e) {
            return !document.isResizing && constrainMovement(e)
        },
        stop: function() {
            $('.dragging-preview').removeClass('dragging')
        }
    })

}(jQuery)
