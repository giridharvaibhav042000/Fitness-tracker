import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RestTimer from '../RestTimer'

describe('RestTimer', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  test('displays initial time', () => {
    render(<RestTimer seconds={90} onDone={vi.fn()} />)
    expect(screen.getByText('1:30')).toBeInTheDocument()
  })

  test('counts down each second', () => {
    render(<RestTimer seconds={5} onDone={vi.fn()} />)
    act(() => { vi.advanceTimersByTime(1000) })
    expect(screen.getByText('0:04')).toBeInTheDocument()
  })

  test('calls onDone when reaches zero', () => {
    const onDone = vi.fn()
    render(<RestTimer seconds={2} onDone={onDone} />)
    act(() => { vi.advanceTimersByTime(2000) })
    expect(onDone).toHaveBeenCalledOnce()
  })

  test('skip button calls onDone immediately', () => {
    const onDone = vi.fn()
    render(<RestTimer seconds={60} onDone={onDone} />)
    act(() => { fireEvent.click(screen.getByText('Skip')) })
    expect(onDone).toHaveBeenCalledOnce()
  })
})
