'use strict'

/* global Cypress */
const codes = {
  ArrowLeft: 37,
  ArrowUp: 38,
  ArrowRight: 39,
  ArrowDown: 40
}

function keydownCommand ($el, key) {
  const message = `sending the "${key}" keydown event`
  const log = Cypress.Log.command({
    name: `keydown: ${key}`,
    message: message,
    onConsole: function () {
      return {
        Subject: $el
      }
    }
  })

  const e = $el.createEvent('KeyboardEvent')

  Object.defineProperty(e, 'key', {
    get: function () {
      return key
    }
  })

  Object.defineProperty(e, 'keyCode', {
    get: function () {
      return this.keyCodeVal
    }
  })
  Object.defineProperty(e, 'which', {
    get: function () {
      return this.keyCodeVal
    }
  })
  var metaKey = false

  Object.defineProperty(e, 'metaKey', {
    get: function () {
      return metaKey
    }
  })

  Object.defineProperty(e, 'shiftKey', {
    get: function () {
      return false
    }
  })
  e.keyCodeVal = codes[key]

  e.initKeyboardEvent('keydown', true, true,
    $el.defaultView, false, false, false, false, e.keyCodeVal, e.keyCodeVal)

  $el.dispatchEvent(e)
  log.snapshot().end()
  return $el
}

Cypress.addChildCommand('keydown', keydownCommand)
Cypress.addChildCommand('left', $el => keydownCommand($el, 'ArrowLeft'))
Cypress.addChildCommand('right', $el => keydownCommand($el, 'ArrowRight'))
Cypress.addChildCommand('up', $el => keydownCommand($el, 'ArrowUp'))
Cypress.addChildCommand('down', $el => keydownCommand($el, 'ArrowDown'))
