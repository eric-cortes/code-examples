import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Text } from './Text'

// The two tests marked with concurrent will be run in parallel
describe('Text', () => {
  it('should render', async () => {
    const label = 'test text'
    render(<Text text="test" />)
    expect(screen.getByText(label)).toBeDefined()
  })
})
