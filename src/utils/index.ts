import images from './images'
import types from './types'
import { homepage } from "../../package.json"

export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

export function title(caption?: string) {
  return `${caption && `${caption} | ` || ''}RDex | ${homepage}`
}

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export { images, types }
