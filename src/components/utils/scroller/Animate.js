class Animate {
    constructor () {
        let time = Date.now()
        let [desiredFrames, millisecondsPerSecond, running, counter] = [60, 1000, {}, 1]
    }
    /**
     * stop the given animation
     * 
     * @param {Integer} id unique the animation id
     * @return {Boolean} Whether this animation was stop
     */
    stop (id) {
        let clearId = this.running[id] !== null
        if (clearId) {
            this.running[id] = null
        }
        return clearId
    }
    /**
     * Whether this given animation is still runing
     * @param {Integer} id  Unique animation ID
     * @return {Boolean} Whether the animation is still running
     */
    isRunning (id) {
        return this.running[id] !== null
    }
    start (stepCb, verifyCb, completedCb, duration, easingMethod, root) {
        let lastFrame = start
        let percent = 0
        let dropCounter = 0
        let id = this.counter ++

        if (!root) {
            root = document.body
        }
        // 每隔几个新动画自动压缩运行数据库 Compacting running db automatically every few new animations
        if (id % 20 === 0) {
            let newRunning = {}
            for (let i in this.running) {
                newRunning[i] = true
            }
            this.running = newRunning
        }
        let step = (virtual) => {
            let render = virtual !== true
            
        }
    }

}