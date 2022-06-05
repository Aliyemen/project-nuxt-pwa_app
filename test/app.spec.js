import { createPage, get, setupTest } from '@nuxt/test-utils'

describe('ssr', () => {
  setupTest({ server: true })

  it('renders the index page', async () => {
    const { body } = await get('/')

    expect(body).toContain('<img>')
  })
})

describe('browser', () => {
    setupTest({ browser: true })
  
    it('renders the index page', async () => {
      const page = await createPage('/')
      const html = await page.innerHTML('body')
  
      expect(html).toContain('Pesquise por nome')
    })
  })