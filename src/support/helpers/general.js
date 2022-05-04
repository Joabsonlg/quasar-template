export const addExtraColumn = (columns, newColumn) => {
  return columns.push({
    name: newColumn,
    label: newColumn,
    field: newColumn,
    sortable: true
  })
}

export const ordenaAZ = (array, comparador) => {
  return array.sort(function (a, b) {
    if (a[comparador] > b[comparador]) return 1
    if (a[comparador] < b[comparador]) return -1
    return 0
  })
}

export const ordenaZA = (array, comparador) => {
  return array.sort(function (a, b) {
    if (a[comparador] > b[comparador]) return -1
    if (a[comparador] < b[comparador]) return 1
    return 0
  })
}

export const copyArray = (array) => {
  const newArray = []
  array.forEach((v, i) => {
    const val = (typeof v === 'object') ? Object.assign({}, v) : v
    newArray.push(val)
  })
  return newArray
}
