import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Textarea } from './Textarea'

// The two tests marked with concurrent will be run in parallel
describe('Textarea', () => {
  it('should render', async () => {
    const placeholder = 'test textarea'
    render(<Textarea id="test-id" value={''} placeholder={placeholder} />)
    expect(screen.getByText(placeholder)).toBeDefined()
  })
})
