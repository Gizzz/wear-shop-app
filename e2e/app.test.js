const { 
  Builder, 
  By, 
  Key,
  promise,
  // until,
} = require('selenium-webdriver')

promise.USE_PROMISE_MANAGER = false

const oneHour = 1000 * 60 * 60 // eslint-disable-line no-unused-vars
const halfMinute = 30000 // eslint-disable-line no-unused-vars
jasmine.DEFAULT_TIMEOUT_INTERVAL = halfMinute // eslint-disable-line no-undef

const baseUrl = 'http://localhost:3000'
const selectors = {
  header: {
    mensOutwearLink: 'div#root > div.app:nth-child(1) > header.page:nth-child(1) > div.nav:nth-child(2) > div:nth-child(1) > div:nth-child(1) > button:nth-child(1) > div:nth-child(1) > div:nth-child(1)',
    cartBadge: '.app header.page .topline .cart .cart-badge',
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

    // cart should contain one entry
    await driver
      .findElements(By.css('.app .content.cart .items li'))
      .then((elements) => expect(elements.length).toBe(1))

    // overall quantity of items in cart-badge should be 1
    await driver
      .findElement(By.css(selectors.header.cartBadge))
      .getText()
      .then(text => expect(text).toBe('1'))
  })

  test('remove item from cart', async () => {
    await addItemToCart(driver)
    
    // click delete icon on cart item
    await driver
      .navigate().to(baseUrl + '/cart')
      .then(() => driver.findElement(By.css('.app .content.cart .items li')))
      .then((cartItem_element) => cartItem_element.findElement(By.css('.delete button')).click())
      
    // cart should be empty
    await driver
      .findElement(By.css('.app .content.cart .empty-cart'))
      .isDisplayed()
      .then((result) => expect(result).toBe(true))

    // cart-badge should not be visible
    await driver
      .findElement(By.css(selectors.header.cartBadge))
      .getCssValue('display')
      .then(value => expect(value).toBe('none'))
  })

  test('add item with custom size and quantity to cart', async () => {
    await addItemToCart(driver, { quantity: 5, size: 'XL' })
    await driver.navigate().to(baseUrl + '/cart')

    // cart-badge counter should be 5
    await driver
      .findElement(By.css(selectors.header.cartBadge))
      .getText()
      .then(text => expect(text).toBe('5'))

    // cart should contain one entry
    await driver
      .findElements(By.css('.app .content.cart .items li'))
      .then((elements) => expect(elements.length).toBe(1))

    // cart entry's size should be XL
    await driver
      .findElement(By.css('.app .content.cart .items li:nth-child(1) .size .value'))
      .getText()
      .then((text) => expect(text).toBe('XL'))

    // cart entry's quantity should be 5
    await driver
      .findElement(By.css('.app .content.cart .items li .quantity .hidden-value'))
      .getText()
      .then((text) => expect(text).toBe('5'))
  })

  test('add two same items of same size to cart', async () => {
    await addItemToCart(driver)
    await addItemToCart(driver)

    await driver.navigate().to(baseUrl + '/cart')

    // cart should contain 1 entry
    await driver
      .findElements(By.css('.app .content.cart .items li'))
      .then((cartItems) => expect(cartItems.length).toBe(1))

    // cart entry's quantity should be 2
    await driver
      .findElement(By.css('.app .content.cart .items li .quantity .hidden-value'))
      .getText()
      .then((text) => expect(text).toBe('2'))

    // overall quantity of items in cart-badge should be 2
    await driver
      .findElement(By.css(selectors.header.cartBadge))
      .getText()
      .then(text => expect(text).toBe('2'))
  })

  test('add two same items of diffirent size to cart', async () => {
    await addItemToCart(driver, { quantity: 1, size: 'S' })
    await addItemToCart(driver, { quantity: 1, size: 'L' })

    await driver.navigate().to(baseUrl + '/cart')

    // cart should contain two entries
    await driver
      .findElements(By.css('.app .content.cart .items li'))
      .then((elements) => expect(elements.length).toBe(2))

    // overall quantity of items in cart-badge should be 2
    await driver
      .findElement(By.css(selectors.header.cartBadge))
      .getText()
      .then(text => expect(text).toBe('2'))

    // first entry's size should be S
    await driver
      .findElement(By.css('.app .content.cart .items li:nth-child(1) .size .value'))
      .getText()
      .then((text) => expect(text).toBe('S'))

    // second entry's size should be L
    await driver
      .findElement(By.css('.app .content.cart .items li:nth-child(2) .size .value'))
      .getText()
      .then((text) => expect(text).toBe('L'))
  })

  test('cart page should change total price when adding item to cart', async () => {
    const itemName = 'Anvil+L+S+Crew+Neck+-+Grey'
    const itemPrice = await getItemPrice(driver, itemName)

    await addItemToCart(driver, { name: itemName })
    await driver.navigate().to(baseUrl + '/cart')

    await driver
      .findElement(By.css('.app .content.cart .subtotal'))
      .getText()
      .then(text => expect(text).toBe(itemPrice))
  })
})

// helpers

async function addItemToCart(driver, options = {}) {
  options.name = options.name || 'Men+s+Tech+Shell+Full-Zip'
  options.size = options.size || 'M'
  options.quantity = options.quantity || 1

  const sizeMap = {
    'XS': 1,
    'S': 2,
    'M': 3,
    'L': 4,
    'XL': 5,
  }
  
  await driver.navigate().to(`${baseUrl}/detail/mens_outerwear/${options.name}`)

  // set size value
  await driver
    .findElement(By.css('.app .content.detail .size .ui-control'))
    .click()
    .then(() => driver.sleep(100))
    .then(() => driver.findElement(By.css(`div[role=menu] > div:nth-child(${sizeMap[options.size]}) span[role=menuitem]`)))
    .then(element => element.click())
    .then(() => driver.sleep(500))

  // set quantity value
  await driver
    .findElement(By.css('.app .content.detail .quantity .ui-control'))
    .click()
    .then(() => driver.sleep(100))
    .then(() => driver.findElement(By.css(`div[role=menu] > div:nth-child(${options.quantity}) span[role=menuitem]`)))
    .then(element => element.click())
    .then(() => driver.sleep(500))
  
  // add item to cart    
  await driver
    .findElement(By.css(selectors.detailPage.addToCartBtn))
    .click()
    .then(() => driver.findElement(By.css('body')).sendKeys(Key.ESCAPE))

  await driver.navigate().to(baseUrl)
}

async function getItemPrice(driver, itemName) {
  await driver.navigate().to(`${baseUrl}/detail/mens_outerwear/${itemName}`)
  
  const itemPrice = await driver
    .findElement(By.css('.app .content.detail .price'))
    .getText()

  await driver.navigate().to(baseUrl)
  return itemPrice
}
