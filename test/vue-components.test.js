// import { shallowMount } from '@vue/test-utils'
import globalMixin from "@/mixin/globalMixin"
import usersMixin from "@/mixin/usersMixin" 
import Users from '@/components/users/Users'
import User from '@/components/users/User'
import offline from '@/page/offline'

import helpers from '~/utils/GeneralHelpers'

export const addVuetify = (context) => {
  context.vuetify = require('vuetify')
  context.vue.use(context.vuetify)
  // eslint-disable-next-line new-cap
  context.vuetifyInstance = new context.vuetify()
}

export const addMixin = (context) => {
  context.mixin = [globalMixin,usersMixin]
}

export const addVuex = (context) => {
  context.vuex = require('vuex')
  context.vue.use(context.vuex)
}

export const addHelpers = () => {
  return (context) => {
    context.vue.prototype.$helpers = helpers
  }
}

export const addI18n = (options) => {
  return (context) => {
    context.i18n = require('vue-i18n')
    context.vue.use(context.i18n)
    // eslint-disable-next-line new-cap
    context.i18nInstance = new context.i18n(options)
  }
}

export const addFilter = (name, lambda) => {
  return context => context.vue.filter(name, lambda)
}

export const compositeConfiguration = (...configs) => {
  return context => configs.forEach(config => config(context))
}

export const bootstrapVueContext = (configureContext) => {
  const context = {}
  const teardownVueContext = () => {
    jest.unmock('vue')
    Object.keys(context).forEach(key => delete context[key])
    jest.resetModules()
  }

  jest.isolateModules(() => {
    context.vueTestUtils = require('@vue/test-utils')
    context.vue = context.vueTestUtils.createLocalVue()

    jest.doMock('vue', () => context.vue)

    configureContext && configureContext(context)
  })

  return {
    teardownVueContext,
    ...context
  }
}

// describe('Logo', () => {
//   test('is a Vue instance', () => {
//     const wrapper = shallowMount(Logo)
//     expect(wrapper.vm).toBeTruthy()
//   })
// })

describe('App', () => {
  let vueContext = null

  beforeEach(() => {
    vueContext = bootstrapVueContext(
      compositeConfiguration(addVuex, addVuetify, addMixin, addHelpers())
    )
  })

  afterEach(() => {
    vueContext.teardownVueContext()
  })

  test('Test offline Component', () => {
    const wrapper = vueContext.vueTestUtils.shallowMount(offline, {
      localVue: vueContext.vue,
      vuetify: vueContext.vuetifyInstance
    })

    expect(wrapper.text()).toMatch('offline')
  })

  test('Test Vuetify Users Component', () => {
    const wrapper = vueContext.vueTestUtils.shallowMount(Users, {
      localVue: vueContext.vue,
      vuetify: vueContext.vuetifyInstance
    })

    expect(wrapper.text()).toMatch('Users')
  })

  test('Test User', () => {
    const wrapper = vueContext.vueTestUtils.shallowMount(User, {
      localVue: vueContext.vue,
      vuetify: vueContext.vuetifyInstance
    })

    expect(wrapper.text()).toMatch('91')
  })
})