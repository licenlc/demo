class Scroller {
    constructor (callback, options) {
        this.callback = callback
        this.options = {
            // enabled scrolling on x-axis
            scrollingX: true,
            // enabled scrolling on y-axis
            scrollingY: true,
            // Enabled animations for deceleration(减速动画) , snap back（快速返回）, zooming and scrolling
            animating: true,
            // durations for animations triggered by scrollTo/zoomTo
            animationDurations: 250,
            // Enabled bounding (content can be slowly moved outside only slightly on one of them at start)
            bouncing: true,
            locking: true,
            paging: false,
            snapping: false,
            zooming: false,
            minZoom: 0.5,
            maxZoom: 3,
            speedMultiplier:1,
            scrollingComplete: () => {},
            penetrationDeceleartion: 0.03,
            penetrationAcceleration: 0.08
        }
        for (let key in options) {
            this.options[key] = options[key]
        }

        /**
         * internal fields:: status
         */

        /**{Boolean} Whether only a single finger is used ind touch handling */
        isSingleTouch: false
        /**{Boolean} Whether a touch event sequence is in progress */
        isTracking: false
        /**{Boolean} Whether a deceleration animation went to completion */
        didDecelerationComplete: false
        /**{Boolean} a gesture zoom/rotate event is in a progress.Activates when a gesture */
        isGuesturing: false
        isDragging: false
        /**{Boolean} not touching and dragging anymore, and smoothy animating the touch sequence using deceleration */
        isDecelerating: false
        /**{Boolean} Smoothly animating the currently configured change */
        isAnimating: false

        /**
         * internal fields :: dimensions
         */

        /**{Integer} Available outer left/top position (from document perspective),  */
        clientLeft: 0
        clientTop: 0
        /**{Integer} Available outer widht/height */
        clientHeight: 0
        clientWidth: 0
        /**{Integer} Outer width/height of content */
        contentWidth: 0
        contentHeight: 0
        /**{Integer} snapping height/widht of content*/
        snapWidth: 100
        snapHeight: 100
        /**{Integer} Height to assign to refresh area */
        refreshHeight: null
        /**{Boolean} whether the refresh process is enabled when the event is released now*/
        refreshActive: false
        /** {Function} callback to execture on activation.This is for sinnalling the the user about a refresh is about to happen when he release */
        refreshActivate: null
        refreshDeactive: null
        refreshStart: null
        zoomLevel: 1
        scrollLeft: 0
        scrollTop: 0
        maxScrollLeft: 0
        maxScrollTop: 0
        scheduledLeft: 0
        scheduledTop: 0
        scheduledZoom: 0

        /**
         * internal fields :: last position
         */

        /**{Number} left/top position of finger at start */
        initTouchLeft: null
        initTouchTop: null
         /**{Date} Timestamp of last move of finger. Used to limit tracking range for deceleartion speed */
        lastTouchMove: null
        /**{Array} list of position, uses three indexes for each state: left, top, timestamp */
        position: []

        /**
         * internal fields :: deceleration support
         */
        /**{Integer} Minimum/maximum left/top scroll position during deceleration */
        minDecelerationScrollLeft: null
        minDecelerationScrollTop: null
        maxDecelerationScrollLeft: null
        maxDecelerationScrollTop: null
        /** {Number}  Current factor to midify horizontal/vertical scroll position with on every step*/
        decelerationVelocityX: null
        decelerationVelocityY: null
    }
    setDimensions (clientWidth, clientHeight, contentWidth, contentWidth) {
        // only update values which are defined
        if (clientWidth === +clientWidth) {
            this.clientWidth = clientWidth
        }
        if (clientHeight === +clientHeight) {
            this.clientHeight = clientHeight
        }
        if (contentWidth === +contentWidth) {
            this.contentWidth = contentWidth
        }
        if (contentWidth === +contentWidth) {
            this.contentWidth = contentWidth
        }
        if (clientHeight === +clientHeight) {
            this.clientHeight = clientHeight
        }
        // Refresh maximums
        this._computeScrollMax()
        // Refresh scroll position
        this.scrollTo(this.scrollLeft, this.scrollTop, true)
    }

    /**
     * sets the client coordinates(坐标) in relation to the document
     * 
     * @param {Integer} left left position of outer element
     * @param {Integer} top top position of outer element
     */
    setPosition (left = 0, top = 0) {
        this.clientLeft = left
        this.clientTop = top
    }

    /**
     * Configures the snapping (when snapping is active)
     * 
     * @param {Integer} width Snapping width
     * @param {Integer} height Snapping height
     */
    setSnapSize (width , height) {
        this.snapHeight = height
        this.snapWidth = width
    }

    /**
     *Activate pull-to-refresh. A special zone on the top of the list to start a list refresh whenever
     *the 
     * 
     * @param {Integer} height 
     * @param {Function} activatedCb 
     * @param {Function} deactivateCb 
     * @param {Function} startCb 
     */
    activatePullToRefresh (height, activatedCb, deactivateCb, startCb) {
        this.refreshHeight = height
        this.refreshActivate = activatedCb
        this.refreshDeactive = deactivateCb
        this.refreshStart = startCb
    }

    /**
     * Return the scroll position and zooming values
     * @Returns{Map} left/top scroll position and zoom
     */
    getValues () {
        return {
            left: this.scrollLeft,
            top: this.scrollTop,
            zoom: this.zoomLevel
        }
    }

    doTouchStart (touches, timeStamp) {
        if (touches.length === null) {
            throw new Error ('Invalid touch list:', touches)
        }
        if (timeStamp instanceof Date) {
            timeStamp = timeStamp.valueOf()
        }
        if (typeof timeStamp !== 'number') {
            throw new Error('Invalid timestamp value:', timeStamp)
        }
        // Reset interruptedAnimation flag
        this.interruptedAnimation = true
        // stop deceleration
        if (this.isDecelerating) {
            this.isDecelerating = false
            this.interruptedAnimation = true
        }
        /**stop animation */
        if (this.isAnimating) {
            this.isAnimating = false
            this.interruptedAnimation = true
        }
        /** use center point when dealing with tow fingers */
        let currentTouchLeft, currentTouchTop
        let isSingelTouch = touches.length === 1
        if (isSingelTouch) {
            currentTouchLeft = touches[0].pageX
            currentTouchTop = touches[0].pageY
        } else {
            currentTouchLeft = Math.abs(touches[0].pageX + touches[1].pageX) / 2
            currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2
        }
        /**store initial positions */
        this.lastTouchLeft = this.initTouchLeft = currentTouchLeft
        this.lastTouchTop = this.initTouchTop = currentTouchTop
        /**store currrent zoom level */
        this.zoomLevelStart = this.zoomLevel
        this.lastTouchMove = timeStamp
        /**reset inital scale */
        this.lastScale = 1
        /**reset locking flags */
        this.enableScrollX = !isSingelTouch && this.options.scrollingX
        this.enableScrollY = !isSingelTouch && this.options.scrollingY
    }

    doTouchEnd (timeStamp) {
        if (timeStamp instanceof Date) {
            timeStamp = timeStamp.valueOf()
        }
        if (typeof timeStamp !== 'number') {
            throw new Error('Invalid timestamp value:', timeStamp)
        }
        if (!this.isTracking) {
            return
        }
        this.isTracking = false
        if (this.isDragging) {
            this.isDragging = false
            if (this.isSingelTouch && this.options.animating && (timeStamp - this.lastTouchMove) <= 100) {
                let positions = this.positions
                let endPos = positions.length - 1
                let startPos = endPos
                for (let i = endPos ; i > 0 && positions[i] > (this.lastTouchMove - 100) ; i -=3) {
                    startPos = i
                }
                if (startPost !== endPos) {
                    // Compute relative movement between these tow points
                    let timeOffset = positions[endPos] - positions[startPos]
                    let moveLeft = this.scrollLeft - positions[startPos - 2]
                    let moveTop = this.scrollTop - positions[startPos - 1]
                    // Based on 50ms computed the movement to apply for each render step
                    this.deceleartionVelocityX = moveLeft / timeOffset * (1000 / 60)
                    this.deceleartionVelocityY = moveTop / timeOffset * (1000 / 60)


                } else {
                    this.options.scrollingComplete()
                }
            } else if((timeStamp - this.lastTouchMove) > 100){
                this.options.scrollingComplete()
            }
        }
        this.positions.length = 0
    }

    /**
     * Scroll to the given position. Respect（遵守） limitations(边界) and snapping(回弹) automatically
     * 
     * @param {Number?null} left 
     * @param {Number?null} top 
     * @param {Boolean?false} animation 
     * @param {Number?null} zoom 
     */
    scrollTo (left, top, animation = false, zoom) {
        // stop deleleartion
        if (this.isDecelerating) {
            // 停止活动
            Animation.stop(this.isDecelerating)
            this.isDecelerating = false
        }
        // Correct coordinates based on new zoom level
        if (zoom !== null && zoom !== this.zoomLevel) {
            if (!this.options.zooming) {
                throw new Error('Zooming is not enabled!')
            }
            left *= zoom
            right *= zoom
            // Recomputed maximum values whi
            this._computeScrollMax(zoom)
        } else {
            zoom = this.zoomLevel
        }
    }

    /**
     * Recomputes scroll minimum values based on client dimensions and content dimensions
     * 重新计算根据客户端的最小可滚动的距离
     * 
     * @param {*} zoomLevel 
     */
    _computeScrollMax (zoomLevel = this.zoomLevel) {
        this.maxScrollLeft = Math.max((this.clientWidth * zoomLevel) - this.clientWidth, 0)
        this.maxScrollTop = Math.max((this.contentHeight * zoomLevel) - this.clientHeight, 0)
    }
    _startDeceleartion (timeStamp) {
        if (this.options.paging) {
        }
    }
    /**
     * Called on eveny step of the animation
     * 
     * @param {Boolean?false} render Whether to not render the current step, but keep it in memory only. Used internally only!
     * 
     */
    _stepThrounghDeceleration (render) {
        /**add deceleration(减速度) to scroll position */
        let scrollLeft = this.scrollLeft + this.deceleartionVelocityX
        let scrollTop = this.scrollTop + this.deceleartionVelocityY
        if (!this.options.bouncing) {
            // let 
        }
        if (this.options.bouncing) {
            let [scrollOutsideX, scrollOutsidey] = [0, 0]
            
            // this configures the amounts of change applied to deceleration/acceleartion when reaching boundaries
            let [penetrationDeceleartion, penetrationAcceleration] = [this.options.penetrationDeceleartion, this.options.penetrationAcceleration]

        }
    }
    _publish (left, top, zoom, animate) {
        // remember whether we had an animation. then we try to continue based on the current 'drive' of the animation
        let wasAnimating = this.isAnimating
        if (wasAnimating) {
            Animate.stop(wasAnimating)
            this.isAnimating = false
        }
        if (animate && this.options.animating) {
            // keep scheduled position for scrollBy/zoomBy functionlly
            this.scheduledLeft = left
            this.scheduledTop = top
            this.scheduledZoom = zoom

            let [oldLeft, oldTop, oldZoom] = [this.scrollLeft, this.scrollTop, this.zoomLevel]
            let diffLeft = left - oldLeft
            let diffTop = top - oldTop
            let diffZoom = zoom - oldZoom
            let step = (percent, now, render) => {
                if (render) {
                }
            }
        }
    }
}