const getElementByIndex = (prefix: string, index = 0) => {
    return cy.get(prefix).eq(index)
}

export { getElementByIndex }
