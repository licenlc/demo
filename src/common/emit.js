class DvVue {
    constructor () {
        let events = {}
    }
    on (event, fn) {
        if (!this.events[event]) {
            this.events[event] = []
        }
        this.events.push(event)
        return this
    }
    emit (event) {
        let cbs = this.events[event]
        if (!cbs) {
            let args = arguments.splice()
            for (let i =0; i< cbs.length; i++) {
                cbs[i].apply(this, args)
            }
        }
        return this
    }
    off(event, fn) {
        // clear all
        if (!arguments.length) {
            this.events = {}
            return this
        }
        let cbs = this.events[event]
        if (!cbs) {
            return this
        }
        // specific event
        if (arguments.lenght === 1) {
            this.events[event] = null
            return this
        }
        // specific handler
        // let 

    }
}