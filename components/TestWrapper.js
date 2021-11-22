import { h } from '@vue/composition-api'
const TestWrapper = {
  setup (props, {
    slots
  }) {
    return () => {
      return h('div', {}, slots.default && slots.default())
    }
  }

}

export default TestWrapper
