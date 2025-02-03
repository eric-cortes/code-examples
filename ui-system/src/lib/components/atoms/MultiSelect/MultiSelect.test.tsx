import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MultiSelect } from './MultiSelect'

const onSelectionChange = () => {
  console.log('onMultiSelectionChange')
}

// The two tests marked with concurrent will be run in parallel
describe('MultiSelect', () => {
  it('should render', async () => {
    const label = 'test select'
    render(<MultiSelect onSelectionChange={onSelectionChange} />)
    expect(screen.getByText(label)).toBeDefined()
  })
})
