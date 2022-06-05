import { shallowMount, createLocalVue  } from '@vue/test-utils'
import Users from '@/components/users/Users'
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

describe('Users', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(Users,{
        localVue,
    })
    expect(wrapper.vm).toBeTruthy()
  })
})
