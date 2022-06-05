import { shallowMount, createLocalVue  } from '@vue/test-utils'
import User from '@/components/users/User'
import globalMixin from "@/mixin/globalMixin"
import usersMixin from "@/mixin/usersMixin" 

const errorHandler = (err, vm, info) => {
    expect(err).toBeInstanceOf(Error)
  }
  
  const localVue = createLocalVue({
    errorHandler
  })
  localVue.mixin(globalMixin)
  localVue.mixin(usersMixin)

describe('User', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(User,{
        localVue,
    })
    expect(wrapper.vm).toBeTruthy()
  })
})
