import React from 'react'
import { shallow } from 'enzyme'

import Heading from './Heading'

describe('<Heading />', () => {
  test('should render category text', () => {
    const wrapper = shallow(
      <Heading
        category="ladies_outerwear"
        itemsCount={0}
        isItemsLoading={false}
      />
    )

    const categoryText = wrapper.find('.heading h2').text()
    expect(categoryText).toBe('Ladies Outerwear')
  })

  describe('status bar', () => {
    test('should render items count', () => {
      const itemsCount = 12
      const wrapper = shallow(
        <Heading
          category="ladies_outerwear"
          itemsCount={itemsCount}
          isItemsLoading={false}
        />
      )

      const statusText = wrapper.find('.heading span').text()
      expect(statusText).toBe(`${itemsCount} items`)
    })

    test('should correctly choose between item or items', () => {
      let itemsCount
      let wrapper
      let statusText

      itemsCount = 0
      wrapper = shallow(
        <Heading
          category="ladies_outerwear"
          itemsCount={itemsCount}
          isItemsLoading={false}
        />
      )
      statusText = wrapper.find('.heading span').text()
      expect(statusText).toBe(`${itemsCount} items`)

      itemsCount = 1
      wrapper = shallow(
        <Heading
          category="ladies_outerwear"
          itemsCount={itemsCount}
          isItemsLoading={false}
        />
      )
      statusText = wrapper.find('.heading span').text()
      expect(statusText).toBe(`${itemsCount} item`)

      itemsCount = 2
      wrapper = shallow(
        <Heading
          category="ladies_outerwear"
          itemsCount={itemsCount}
          isItemsLoading={false}
        />
      )
      statusText = wrapper.find('.heading span').text()
      expect(statusText).toBe(`${itemsCount} items`)
    })

    test('should render error message', () => {
      const errorText = 'Network error.'
      const wrapper = shallow(
        <Heading
          category="ladies_outerwear"
          itemsCount={0}
          isItemsLoading={false}
          errorMessage={errorText}
        />
      )

      const statusText = wrapper.find('.heading span').text()
      expect(statusText).toBe('Error: ' + errorText)
    })

    test('should render loading text', () => {
      const wrapper = shallow(
        <Heading
          category="ladies_outerwear"
          itemsCount={0}
          isItemsLoading={true}
        />
      )

      const statusText = wrapper.find('.heading span').text()
      expect(statusText).toBe('Loading data...')
    })

    test('should favor error message to other props', () => {
      const errorText = 'Network error.'
      const wrapper = shallow(
        <Heading
          category="ladies_outerwear"
          itemsCount={10}
          isItemsLoading={true}
          errorMessage={errorText}
        />
      )

      const statusText = wrapper.find('.heading span').text()
      expect(statusText).toBe('Error: ' + errorText)
    })

    test('should favor isItemsLoading prop to itemsCount prop', () => {
      const wrapper = shallow(
        <Heading
          category="ladies_outerwear"
          itemsCount={10}
          isItemsLoading={true}
        />
      )

      const statusText = wrapper.find('.heading span').text()
      expect(statusText).toBe('Loading data...')
    })
  })
})
