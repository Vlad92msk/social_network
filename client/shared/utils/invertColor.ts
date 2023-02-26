const colors = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']

export const invertColor = (col: string) => {
  if (!col) return null
  // eslint-disable-next-line no-param-reassign
  col = col.toLowerCase()
  let inverseColor = '#'
  col.replace('#', '').split('').forEach((i) => {
    const index = colors.indexOf(i)
    inverseColor += colors.reverse()[index]
  })
  return inverseColor
}
