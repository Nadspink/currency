import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import UpdateButton from '../UpdateButton.vue'

describe('UpdateButton', () => {
  const wrapper = mount(UpdateButton)
  it('Get text', () => {
    expect(wrapper.text()).toContain('Update')
  })
  it('Button count', () => {
    expect(wrapper).not.toBeNull()
  })
})
