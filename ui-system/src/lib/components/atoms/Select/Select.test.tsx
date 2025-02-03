import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Select } from './Select'

const onSelectionChangeTest = () => {
  console.log('onSelectionChange')
}

// The two tests marked with concurrent will be run in parallel
describe('Select', () => {
  it('should render', async () => {
    const label = 'test select'
    render(<Select id="test" onSelectionChange={onSelectionChangeTest} />)
    expect(screen.getByText(label)).toBeDefined()
  })
})
