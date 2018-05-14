class EasyScroller {
    constructor (content, options) {
        this.content = content
        this.options = options
        this.container = this.content.parentNode
        this.scroller = new Scroller((left, top, zoom) => {
            this.render(left, top, zoom)
        }, options)
    }
    init () {
        // bind event
        this.bindEvent()
        // reflow for the first time
        this.reflow()
    }
    bindEvent () {
        let container = this.container
        if ('touchstart' in window) {
            container.addEventListener('touchstart', (e) => {
                if (e.touches[0] && e.touches[0].target && e.touches[0].targer.tagName.match((/input|textarea|select/i))) {
                    return
                }
                this.reflow()
                this.scroller.doTouchStart(e.touches, e.timeStamp)
            }, false)
            container.addEventListener('touchmove', (e) => {
                e.preventDefault()
                this.scroller.doTouchMove(e.touches, e.timeStamp, e.scale)
            }, false)
            container.addEventListener('touchend', (e) => {
                e.preventDefault()
                this.scroller.doTouchEnd(e.timeStamp)
            }, false)
            container.addEventListener('touchcancel', (e) => {
                e.preventDefault()
                this.scroller.doTouchEnd(e.timeStamp)
            }, false)
        }
    }
    reflow () {
        // set the right scroller dimensions(规模)
        let c = this.container
        this.scroller.setDimension(c.clientWidth, c.clientHeight, c.offsetWidth, c.offsetHeight)
        // refresh ths position for zooming purposes(为缩放刷新位置)
        let rect = c.getBoundingClientRect()
        this.scroller.setPosition(rect.left + c.clientLeft, rect.top + c.clientTop)
    }
    render () {
        let docStyle = document.documentElement.style
        
    }
}
document.addEventListener('DOMContentLoaded', () => {

})