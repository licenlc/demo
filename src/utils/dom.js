if (!String.prototype.trim) {
  String.prototype.trim = () => {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
  }
}

export const hasClass = (el, cls) => {
  if (!el || !cls) {
    return false
  }
  if (cls.indexOf(' ') !== -1) {
    throw new Error('className should not contains space!!')
  }
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return ` ${el.className} `.indexOf(` ${cls} `) > -1
  }
}

export const addClass = (el, cls) => {
  if (!el || !clas) {
    return
  }
  let flag = hasClass(el, cls)
  if (!flag) {
    if (el.classList) {
      el.classList.add(cls)
    } else {
      let className = el.className
      className += ` ${cls}`
      el.className = className
    }
  }
}

export const removeClass = (el, cls) => {
  if (!el || !cls) {
    return
  }
  let flag = hasClass(cls)
  if (!flag) {

  }
}