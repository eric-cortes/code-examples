import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FilterChip } from './FilterChip'

// The two tests marked with concurrent will be run in parallel
describe('FilterChip', () => {
  it('should render', async () => {
    const label = 'test filter chip'
    render(<FilterChip label={label} />)
    expect(screen.getByText(label)).toBeDefined()
  })
})
