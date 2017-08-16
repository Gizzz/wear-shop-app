/**
 * Save app state to and restore from window.localStorage
 */

const storageKey = 'wear-shop-app'

const storageHelper = {
  loadState() {
    try {
      const serializedState = localStorage.getItem(storageKey)

      if (serializedState === null) {
        return undefined
      }

      return JSON.parse(serializedState)
    } catch (err) {
      console.error(err)
      return undefined
    }
  },
  saveState(state) {
    try {
      const serializedState = JSON.stringify(state)
      localStorage.setItem(storageKey, serializedState)
    } catch (err) {
      console.error(err)
    }
  }
}

export default storageHelper
