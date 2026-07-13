import { describe, test, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import WeeklyNutritionSummary from '../WeeklyNutritionSummary'

function todayKey() {
  return new Date().toISOString().split('T')[0]
}

describe('WeeklyNutritionSummary', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('renders 7 day tabs', () => {
    render(<WeeklyNutritionSummary />)
    ;['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].forEach(day => {
      expect(screen.getByText(day)).toBeInTheDocument()
    })
  })

  test('shows "No meals logged" when selected day has no data', () => {
    localStorage.clear()
    render(<WeeklyNutritionSummary />)
    expect(screen.getByText('No meals logged this day.')).toBeInTheDocument()
  })

  test('shows correct totals for a day with logs', () => {
    const key = todayKey()
    localStorage.setItem('nutritionLogs', JSON.stringify([
      { id: '1', date: key, protein: 50, carbs: 80, fats: 15, calories: 655 },
    ]))
    render(<WeeklyNutritionSummary />)
    expect(screen.getByText('655 kcal')).toBeInTheDocument()
    expect(screen.getByText('50/125g')).toBeInTheDocument()
  })

  test('shows check mark when macro meets target', () => {
    const key = todayKey()
    localStorage.setItem('nutritionLogs', JSON.stringify([
      { id: '1', date: key, protein: 130, carbs: 250, fats: 75, calories: 2515 },
    ]))
    render(<WeeklyNutritionSummary />)
    // protein target is 125g, 130 >= 125 → ✓ appears
    expect(screen.getAllByText(/✓/).length).toBeGreaterThan(0)
  })

  test('avg row excluded when no days have logs', () => {
    render(<WeeklyNutritionSummary />)
    expect(screen.queryByText('Avg')).not.toBeInTheDocument()
  })

  test('avg row appears when at least one day has logs', () => {
    const key = todayKey()
    localStorage.setItem('nutritionLogs', JSON.stringify([
      { id: '1', date: key, protein: 100, carbs: 200, fats: 60, calories: 1740 },
    ]))
    render(<WeeklyNutritionSummary />)
    expect(screen.getByText('Avg')).toBeInTheDocument()
  })

  test('clicking a day tab changes selected day card', () => {
    render(<WeeklyNutritionSummary />)
    const tabs = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    // Click a different tab and verify the card date label changes
    fireEvent.click(screen.getByText(tabs[0]))
    expect(screen.getByText(/Mon ·/)).toBeInTheDocument()
  })
})
