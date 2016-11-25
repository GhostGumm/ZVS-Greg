
export const OrderBy = (array: any, field: string, reverse: boolean = false) => {
  const compare = (a, b) => {
    if (reverse) {
      if (a[field] < b[field]) {
        return -1
      }
      if (a[field] > b[field]) {
        return 1
      }
    } else {
      if (a[field] < b[field]) {
        return 1
      }
      if (a[field] > b[field]) {
        return -1
      }
    }
    return 0
  }
  array.sort(compare)
}
