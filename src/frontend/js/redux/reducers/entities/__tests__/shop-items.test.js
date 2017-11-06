import deepFreeze from 'deep-freeze'
import shopItems from '../shop-items'

describe('shopItems reducer', () => {
  it('should return the initial state', () => {
    const newState = shopItems(undefined, {})
    expect(newState).toEqual({
      byId: {},
      allIds: [],
    })
  })

  it('should handle LOAD_SHOP_ITEMS__SUCCESS', () => {
    const state = {
      byId: {},
      allIds: [],
    }
    const action = {
      type: 'LOAD_SHOP_ITEMS__SUCCESS',
      category: 'mens_outerwear',
      items: [
        {
          'id': 'd1c7a15b-b21a-44e6-993c-36a3aa502a9a',
          'name': 'Men+s+Tech+Shell+Full-Zip',
        },
        {
          'id': 'a951e43a-a258-4b36-bc8a-e3d7a48fa0f3',
          'name': 'Anvil+L+S+Crew+Neck+-+Grey',
        },
      ]
    }

    deepFreeze(state)
    deepFreeze(action)
    const newState = shopItems(state, action)

    expect(Object.keys(newState.byId).length).toBe(2)
    expect(newState.byId[action.items[0].id]).toEqual(action.items[0])
    expect(newState.byId[action.items[1].id]).toEqual(action.items[1])

    expect(newState.allIds.length).toBe(2)
    expect(newState.allIds).toContain(action.items[0].id)
    expect(newState.allIds).toContain(action.items[1].id)
  })
})
