const path = require('path')
const page = path.join(__dirname, '../../test/index.html')
describe('Arrows', function(){
  beforeEach(() => {
    cy.visit(page)
  })

  it('sends Arrow left event to document', function(){
    cy.document().left()
    cy.get('#app').contains('ArrowLeft')
  })

  it('sends several events', function(){
    cy.document().left().right()
    cy.get('#app').contains('ArrowRight')
  })

  it('sends up and down events', function(){
    cy.document()
      .up()
      .wait(500)
      .down()
      .wait(500)
    cy.get('#app').contains('ArrowDown')
  })
})
