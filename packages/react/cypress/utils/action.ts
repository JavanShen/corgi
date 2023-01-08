const move = (target: string, offsetX: number, offsetY: number) => {
    return cy.get(target).then(el => {
        const offset = el.offset()
        const x = offset?.left
        const y = offset?.top

        cy.get(target)
            .trigger('mousedown', { button: 0 })
            .trigger('mousemove', {
                pageX: x && x + offsetX,
                pageY: y && y + offsetY
            })
            .trigger('mouseup', { force: true })
    })
}

export { move }
