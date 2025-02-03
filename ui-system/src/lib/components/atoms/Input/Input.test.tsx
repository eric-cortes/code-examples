import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Input } from './Input'

// The two tests marked with concurrent will be run in parallel
describe('Input', () => {
  it('should render', async () => {
    const placeholder = 'test input'
    render(<Input id="test" value={''} placeholder={placeholder} />)
    expect(screen.getByText(placeholder)).toBeDefined()
  })
})
