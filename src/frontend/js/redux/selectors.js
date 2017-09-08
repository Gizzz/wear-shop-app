export function getShopItemsByCategory(state, category) {
  return state.shopItems.itemsByCategory[category]
}

export function getShopItem(state, category, name) {
  const itemsByCategory = state.shopItems.itemsByCategory[category]
  const item = itemsByCategory.find(item => item.name === name)
  return item
}
