import manager from './manager'
import context from './context'
import {on, off} from '../../utils/event'

export default {
  props: {
    value: Boolean,
    overlay: Boolean,
    overlayStyle: Object,
    overlayClass: String,
    closeOnClickOverlay: Boolean,
    zIndex: [String, Number],
    getContainer: Function,
    lockScroll: {
      type: Boolean,
      default: true
    }
  },

  watch: {
    value (val) {
      this[val ? 'open' : 'close']()
    },
    getContainer () {
      this.move()
    },
    overlay () {
      this.renderOverlay()
    }
  },
  created () {
    this._popupId = 'popup-' + context.plugKey('id')
    this.pos = {
      x: 0,
      y: 0
    }
  },
  mounted () {
    if (this.getContainer) {
      this.move()
    }
    if (this.value) {
      this.open()
    }
  },
  beforeDestory () {
    this.close()
  },
  methods: {
    open () {
      if (this.$isServer) {
        return
      }
      if (this.zIndex !== undefined) {
        context.zIndex = this.zIndex
      }
      if (this.lockScroll) {
        document.body.classList.add('dv-overflow-hidden')
        on(document, 'touchmove', this.onTouchMove)
        on(document, 'touchstart', this.onTouchStart)
      }
      this.renderOverlay()
      this.$emit('input', true)
    },
    close () {
      console.log('index.close')
      if (this.lockScroll) {
        document.body.classList.remove('dv-overflow-hidden')
        off(document, 'touchmove', this.onTouchMove)
        off(document, 'touchstart', this.onTouchStart)
      }
      manager.close(this._popupId)
      this.$emit('input', false)
    },
    move () {
    },
    onTouchStart (e) {
      this.pos = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      }
    },
    onTouchMove (e) {
    },
    renderOverlay () {
      if (this.overlay) {
        manager.open(this, {
          zIndex: context.plugKey('zIndex'),
          className: this.overlayClass,
          customStyle: this.overlayStyle
        })
      } else {
        manager.close(this._popupId)
      }
      this.$el.style.zIndex = context.plugKey('zIndex')
    }
  }
}
