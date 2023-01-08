const move = (target: string, offsetX: number, offsetY: number) => {
    return cy.get(target).then(el => {
        const { left: x, top: y } = el[0].getBoundingClientRect()

        cy.get(target)
            .trigger('mousedown', { button: 0 })
            .wait(500)
            .trigger('mousemove', {
                pageX: x && x + offsetX,
                pageY: y && y + offsetY
            })
            .wait(500)
            .trigger('mouseup', { force: true })
    })
}

export { move }
