describe('template spec', () => {
  beforeEach('passes', () => {
    cy.visit('/')
  })

  it('Select item 1',() => {
    cy.xpath("//a[normalize-space()='Samsung galaxy s6']").click()
  })
})