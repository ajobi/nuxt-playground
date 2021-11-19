<template>
  <div>
    Hello {{ count }}
    <button @click="count++">
      Increment
    </button>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'

export default {
  setup () {
    const count = ref(0)

    return {
      count
    }
  }
}
</script>

<!--<template>-->
<!--  <swiper-->
<!--    :slides-per-view="3"-->
<!--    :space-between="50"-->
<!--  >-->
<!--    <swiper-slide>Slide 1</swiper-slide>-->
<!--    <swiper-slide>Slide 2</swiper-slide>-->
<!--    <swiper-slide>Slide 3</swiper-slide>-->
<!--  </swiper>-->
<!--</template>-->
<!--<script>-->
<!--// Import Swiper Vue.js components-->
<!--import { Swiper, SwiperSlide } from 'swiper/vue'-->

<!--// Import Swiper styles-->
<!--import 'swiper/css'-->

<!--export default {-->
<!--  components: {-->
<!--    Swiper,-->
<!--    SwiperSlide-->
<!--  }-->
<!--}-->
<!--</script>-->
