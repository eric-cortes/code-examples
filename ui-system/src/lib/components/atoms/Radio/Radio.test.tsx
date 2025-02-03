import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Radio } from './Radio'

// The two tests marked with concurrent will be run in parallel
describe('Radio', () => {
  it('should render', async () => {
    const placeholder = 'test radio'
    render(<Radio placeholder={placeholder} />)
    expect(screen.getByText(placeholder)).toBeDefined()
  })
})
