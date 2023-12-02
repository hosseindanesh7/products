export const paramsGenerator = (params) => {
  return Object.keys(params)
    .map((key) => `${key}=${encodeURIComponent(params[key])}`)
    .join('&')
}

export const duplicateHandler = (array) => {
  return array.filter(
    (obj, index, self) => index === self.findIndex((item) => item.id === obj.id)
  )
}

export const scrollHandler = (callback) => {
  window.onscroll = () => {
    let bottomOfWindow =
      Math.max(document.documentElement.scrollTop, document.body.scrollTop) +
        window.innerHeight ===
      document.documentElement.offsetHeight

    if (bottomOfWindow) {
      callback()
    }
  }
}
