const getElementByIndex = (prefix: string, index = 0) => {
    return cy.get(`${prefix}${index < 0 ? ':last' : `:nth(${index})`}`)
}

export { getElementByIndex }
