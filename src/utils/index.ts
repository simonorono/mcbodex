import images from './images'
import stats from './stats'
import types from './types'
import { appName, homepage } from '../../package.json'

export const APP_NAME: string = appName

export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

export function title(caption?: string) {
  return `${(caption && `${caption} | `) || ''}${APP_NAME} | ${homepage}`
}

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function setCanonical(path?: string) {
  const currentCanonical = document.querySelector('link[rel=canonical]')

  if (currentCanonical) {
    currentCanonical.remove()
  }

  if (!path) {
    return
  }

  const newCanonical = document.createElement('link')

  newCanonical.setAttribute('rel', 'canonical')

  newCanonical.setAttribute(
    'href',
    `${location.protocol}//${location.host}${path}`
  )

  document.head.appendChild(newCanonical)
}

export { images, stats, types }
