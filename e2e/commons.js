const { 
  By, 
  Key,
} = require('selenium-webdriver')

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
  },
}

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

// returns item's price as text prefixed with $: "$44.30"
async function getItemPriceText(driver, itemName) {
  await driver.navigate().to(`${baseUrl}/detail/mens_outerwear/${itemName}`)
  
  const itemPrice = await driver
    .findElement(By.css('.app .content.detail .price'))
    .getText()

  await driver.navigate().to(baseUrl)
  return itemPrice
}

exports.baseUrl = baseUrl
exports.selectors = selectors
exports.addItemToCart = addItemToCart
exports.getItemPriceText = getItemPriceText
