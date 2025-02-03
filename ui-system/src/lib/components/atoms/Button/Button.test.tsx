import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

// The two tests marked with concurrent will be run in parallel
describe('Button', () => {
  it('should render', async () => {
    const label = 'test button'
    render(<Button type="button" />)
    expect(screen.getByText(label)).toBeDefined()
  })
})
