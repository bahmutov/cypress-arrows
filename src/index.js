'use strict'

/* global Cypress, KeyboardEvent */
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

  const evt = new KeyboardEvent('keydown', {
    bubbles: true,
    cancelable: true,
    key: key
  })

  $el.dispatchEvent(evt)
  log.snapshot().end()
  return $el
}

Cypress.addChildCommand('keydown', keydownCommand)
Cypress.addChildCommand('left', $el => keydownCommand($el, 'ArrowLeft'))
Cypress.addChildCommand('right', $el => keydownCommand($el, 'ArrowRight'))
Cypress.addChildCommand('up', $el => keydownCommand($el, 'ArrowUp'))
Cypress.addChildCommand('down', $el => keydownCommand($el, 'ArrowDown'))
