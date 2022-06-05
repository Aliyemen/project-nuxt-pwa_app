import { shallowMount, createLocalVue  } from '@vue/test-utils'
import offline from '@/page/offline'


const errorHandler = (err, vm, info) => {
    expect(err).toBeInstanceOf(Error)
  }
  
  const localVue = createLocalVue({
    errorHandler
  })

describe('offline', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(offline)
    expect(wrapper.vm).toBeTruthy()
  })
})
