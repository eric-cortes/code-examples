import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Checkbox } from './Checkbox'

// The two tests marked with concurrent will be run in parallel
describe('Checkbox', () => {
  it('should render', async () => {
    const placeholder = 'test checkbox'
    render(<Checkbox placeholder={placeholder} id="testId" />)
    expect(screen.getByText(placeholder)).toBeDefined()
  })
})
