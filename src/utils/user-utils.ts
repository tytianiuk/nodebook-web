export const getNameAbbreviation = (name: string): string => {
  return name
    .split(' ')
    .filter((word) => word !== '')
    .map((word) => word[0].toUpperCase())
    .join('')
}
