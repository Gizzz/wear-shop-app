/* global jasmine */

const { 
  Builder, 
  By, 
  promise,
} = require('selenium-webdriver')

// disable promise manager for web-driver
promise.USE_PROMISE_MANAGER = false

const oneHour = 1000 * 60 * 60 // eslint-disable-line no-unused-vars
const halfMinute = 30000 // eslint-disable-line no-unused-vars
jasmine.DEFAULT_TIMEOUT_INTERVAL = halfMinute

const baseUrl = 'http://localhost:3000'
const selectors = {
  header: {
    mensOutwearLink: 'div#root > div.app:nth-child(1) > header.page:nth-child(1) > div.nav:nth-child(2) > div:nth-child(1) > div:nth-child(1) > button:nth-child(1) > div:nth-child(1) > div:nth-child(1)',
  },
  listPage: {
    firstItemInList: '.app .content.list .items li:nth-child(1) a img',
  },
  detailPage: {
    addToCartBtn: '.app .content.detail .add_to_cart-btn',
    viewCart_dialogBtn: 'html > body > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > button:nth-child(1) > div:nth-child(1) > span:nth-child(1)',
  }
}

describe('app', () => {
  let driver
  
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    await driver.manage().window().setSize(1500, 900)
    await driver.navigate().to(baseUrl)
  })

  afterEach(async function() {
    await driver.quit()
  })

  test('add item to cart', async () => {
    await driver.navigate().to(baseUrl + '/cart')

    // cart should be empty
    await driver
      .findElement(By.css('.app .content.cart .empty-cart'))
      .isDisplayed()
      .then((result) => expect(result).toBe(true))

    await driver.navigate().to(baseUrl)

    // go to list page
    await driver
      .findElement(By.css(selectors.header.mensOutwearLink)).click()
      .then(() => driver.executeScript('return window.location.pathname'))
      .then((path) => expect(path).toBe('/list/mens_outerwear'))
    
    // go to item page
    await driver
      .findElement(By.css(selectors.listPage.firstItemInList)).click()
      .then(() => driver.executeScript('return window.location.pathname'))
      .then((path) => expect(path.startsWith('/detail/mens_outerwear')).toBe(true))

    // add item to cart, go to cart page
    await driver
      .findElement(By.css(selectors.detailPage.addToCartBtn)).click()
      .then(() => driver.findElement(By.css(selectors.detailPage.viewCart_dialogBtn)).click())
      .then(() => driver.executeScript('return window.location.pathname'))
      .then((path) => expect(path).toBe('/cart'))

    // cart should contain an item
    await driver
      .findElements(By.css('.app .content.cart .items li'))
      .then((elements) => expect(elements.length).toBe(1))
  })
})
