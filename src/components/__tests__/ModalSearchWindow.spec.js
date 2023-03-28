import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ModalSearchWindow from '../ModalSearchWindow.vue'

describe('ModalSearchWindow', () => {
  const wrapper = mount(ModalSearchWindow)
  it('Get text', () => {
    expect(wrapper.text()).toContain('Show Modal')
  })
  it('Get text button', () => {
    const closeButton = wrapper.find('button')
    expect(closeButton.text()).toContain('Show Modal')
  })
})
