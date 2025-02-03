import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Modal } from './Modal'

// The two tests marked with concurrent will be run in parallel
describe('Modal', () => {
  it('should render', async () => {
    const label = 'test button'
    render(<Modal />)
    expect(screen.getByText(label)).toBeDefined()
  })
})
