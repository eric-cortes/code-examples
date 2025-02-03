import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Icon } from './Icon'

describe('Icon', () => {
  it('should render', async () => {
    const name = 'WarningAmber'
    render(<Icon name={name} />)
    expect(screen.getByText(name)).toBeDefined()
  })
})
