<template>
  <div class="flex justify-center h-screen items-center bg-blue-300">
    <div ref="box" class="bg-white shadow-2xl p-24 rounded-3xl cursor-pointer" :style="boxStyle" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      translateX: 0,
      translateY: 0,
      transitionDuration: 0
    }
  },
  computed: {
    boxStyle () {
      return `
        transform: translate(${this.translateX}px, ${this.translateY}px);
        transition: all ${this.transitionDuration}s;
      `
    }
  },
  mounted () {
    this.setupDragging()
  },
  methods: {
    setupDragging () {
      const { box } = this.$refs
      let startClientX = null
      let startClientY = null

      const onDragStart = (e) => {
        startClientX = e.touches ? e.touches[0].clientX : e.clientX
        startClientY = e.touches ? e.touches[0].clientY : e.clientY
        this.transitionDuration = 0.1

        box.addEventListener('touchmove', onDrag, { passive: true })
        box.addEventListener('touchend', onDragEnd)

        document.body.addEventListener('mousemove', onDrag)
        document.body.addEventListener('mouseup', onDragEnd)
      }

      const onDrag = (e) => {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX
        const clientY = e.touches ? e.touches[0].clientY : e.clientY

        requestAnimationFrame(() => {
          this.updateTranslate(clientX - startClientX, clientY - startClientY)
        })
      }

      const onDragEnd = () => {
        box.removeEventListener('touchmove', onDrag)
        box.removeEventListener('touchend', onDragEnd)
        document.body.removeEventListener('mousemove', onDrag)
        document.body.removeEventListener('mouseup', onDragEnd)

        requestAnimationFrame(() => {
          this.updateTranslate(0, 0, 1)
        })
      }

      box.addEventListener('touchstart', onDragStart, { passive: true })
      box.addEventListener('mousedown', onDragStart)
    },
    updateTranslate (translateX, translateY, transitionDuration = this.transitionDuration) {
      this.translateX = translateX
      this.translateY = translateY
      this.transitionDuration = transitionDuration
    }
  }
}
</script>

<style>
body {
  touch-action: none;
}
</style>
