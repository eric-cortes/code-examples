import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MultiSelect } from './MultiSelect'

const onSelectionChange = vi.fn()

describe('MultiSelect', () => {
  it('should render', async () => {
    const label = 'test select'
    render(<MultiSelect onSelectionChange={onSelectionChange} />)
    expect(screen.getByText(label)).toBeDefined()
  })
})
