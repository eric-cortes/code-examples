import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Heading } from './Heading'

// The two tests marked with concurrent will be run in parallel
describe('Heading', () => {
  it('should render', async () => {
    const label = 'test Heading'
    render(<Heading label={label} />)
    expect(screen.getByText(label)).toBeDefined()
  })
})
