import { describe, it, expect } from '@jest/globals'

import { getNameAbbreviation } from '@/utils/user-utils'

describe('User Utils - Unit tests', () => {
  it('should return correct abbreviation for a single name', () => {
    const name = 'John'
    const abbreviation = getNameAbbreviation(name)
    expect(abbreviation).toBe('J')
  })

  it('should return correct abbreviation for a full name', () => {
    const name = 'John Doe'
    const abbreviation = getNameAbbreviation(name)
    expect(abbreviation).toBe('JD')
  })

  it('should return correct abbreviation for a name with multiple words', () => {
    const name = 'John Michael Doe'
    const abbreviation = getNameAbbreviation(name)
    expect(abbreviation).toBe('JMD')
  })

  it('should handle names with extra spaces correctly', () => {
    const name = '  John   Doe  '
    const abbreviation = getNameAbbreviation(name.trim())
    expect(abbreviation).toBe('JD')
  })

  it('should handle empty string correctly', () => {
    const name = ''
    const abbreviation = getNameAbbreviation(name)
    expect(abbreviation).toBe('')
  })

  it('should handle names with special characters correctly', () => {
    const name = 'John-Doe'
    const abbreviation = getNameAbbreviation(name)
    expect(abbreviation).toBe('J')
  })
})
