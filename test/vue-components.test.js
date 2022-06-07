// import { shallowMount } from '@vue/test-utils'
import globalMixin from "@/mixin/globalMixin"
import usersMixin from "@/mixin/usersMixin" 
import UsersTemplate from '@/components/template/UsersTemplate'
import UserTemplate from '@/components/template/UserTemplate'
import offlineTemplate from '@/components/template/offlineTemplate'

import helpers from '~/utils/GeneralHelpers'


const errorHandler = (err, vm, info) => {
  expect(err).toBeInstanceOf(Error)
}

export const addVuetify = (context) => {
  context.vuetify = require('vuetify')
  context.vue.use(context.vuetify)
  // eslint-disable-next-line new-cap
  context.vuetifyInstance = new context.vuetify()
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
    context.vue = context.vueTestUtils.createLocalVue({
      errorHandler
    })
    context.vue.mixin([globalMixin,usersMixin])

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
      compositeConfiguration(addVuex, addVuetify, addHelpers())
    )
  })

  afterEach(() => {
    vueContext.teardownVueContext()
  })

  test('Test offline Component', () => {
    const wrapper = vueContext.vueTestUtils.shallowMount(offlineTemplate, {
      localVue: vueContext.vue,
      vuetify: vueContext.vuetifyInstance
    })

    expect(wrapper.text()).toMatch('offline')
  })

  test('Test Vuetify Users Component', () => {
    const wrapper = vueContext.vueTestUtils.shallowMount(UsersTemplate, {
      localVue: vueContext.vue,
      vuetify: vueContext.vuetifyInstance
    })

    expect(wrapper.text()).toMatch('Users')
  })

  test('Test User', () => {
    const wrapper = vueContext.vueTestUtils.shallowMount(UserTemplate, {
      localVue: vueContext.vue,
      vuetify: vueContext.vuetifyInstance
    })

    expect(wrapper.text()).toMatch('91')
  })
})