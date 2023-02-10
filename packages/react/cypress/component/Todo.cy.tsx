import { getElementByIndex } from '@corgwn/utils/cypress/get'
import { todoSelector } from '../data/selector'
import Todo from '../../src/components/Todo'
import type { TodoList } from '../../src/components/Todo'

const {
    addBtnSelector,
    addInputSelector,
    addConfirmBtnSelector,
    todoSelector: todoItemSelector,
    todoLabelSelector,
    strikethroughSelector,
    removeBtnSelector
} = todoSelector

const todoList: TodoList = [
    {
        name: 'one',
        label: 'one',
        done: false
    },
    {
        name: 'two',
        label: 'two',
        done: false
    }
]

const rotateBefore = ['transform', 'matrix(1, 0, 0, 1, 0, 0)']
const rotateAfter = [
    'transform',
    'matrix(0.707107, -0.707107, 0.707107, 0.707107, 0, 0)'
]

const TodoWithBasicProps = () => <Todo todoList={todoList} />
const TodoWithLoad = () => (
    <Todo
        todoList={todoList}
        update={async () => {
            await new Promise(res => {
                setTimeout(() => {
                    res(true)
                }, 1000)
            })
        }}
    />
)
const TodoWithLongText = () => (
    <Todo
        todoList={[
            ...todoList,
            { name: 'three', label: 'a'.repeat(20), done: false }
        ]}
    />
)

describe('<Todo>', () => {
    describe('新增待办', () => {
        const addTodoByClick = (label: string) =>
            cy
                .get(addInputSelector)
                .type(label)
                .get(addConfirmBtnSelector)
                .click()

        const addTodoByEnter = (label: string) =>
            cy.get(addInputSelector).type(`${label}{enter}`)

        const checkNewTodo = (len: number, label: string) => {
            cy.get(addInputSelector).should('have.value', '')

            cy.get(todoItemSelector)
                .should('have.length', len)
                .eq(-1)
                .as('last')
                .find(todoLabelSelector)
                .find('span')
                .should('have.text', label)
                .get('@last')
                .find('input[type="checkbox"]')
                .should('not.be.checked')
        }

        it('控制新增输入框显隐', () => {
            cy.mount(<TodoWithBasicProps />)

            cy.get(addBtnSelector)
                .click()
                .should('have.css', ...rotateAfter)

            cy.get(addInputSelector).should('be.visible').and('be.focused')

            cy.get(addBtnSelector)
                .click()
                .should('have.css', ...rotateBefore)

            cy.get(addInputSelector).should('not.exist')
        })

        it('新增框输入按钮转换', () => {
            cy.mount(<TodoWithBasicProps />)

            cy.get(addBtnSelector).click()

            cy.get(addInputSelector).type('more')

            cy.get(addBtnSelector)
                .should('not.exist')
                .get(addConfirmBtnSelector)
                .should('be.visible')

            cy.get(addInputSelector).clear()

            cy.get(addConfirmBtnSelector)
                .should('not.exist')
                .get(addBtnSelector)
                .should('have.css', rotateAfter)
        })

        it('确认新增', () => {
            cy.mount(<TodoWithBasicProps />)

            cy.get(addBtnSelector).click()

            addTodoByClick('more')

            checkNewTodo(3, 'more')

            addTodoByEnter('all')

            checkNewTodo(4, 'all')
        })

        it('重复新增', () => {
            cy.mount(<TodoWithBasicProps />)

            cy.get(addBtnSelector).click()

            addTodoByClick('more')
            addTodoByClick('more')

            cy.get(todoItemSelector).should('have.length', 3)
        })

        it('加载状态', () => {
            cy.mount(<TodoWithLoad />)

            cy.get(addBtnSelector).click()

            addTodoByClick('more')

            cy.get(addConfirmBtnSelector)
                .find('[aria-label="loading"]')
                .should('be.visible')

            cy.get(todoItemSelector).should('have.length', 2)

            cy.wait(1500)

            cy.get(addConfirmBtnSelector)
                .should('not.exist')
                .get(addBtnSelector)
                .should('have.css', ...rotateAfter)

            checkNewTodo(3, 'more')
        })
    })

    describe('完成和取消待办', () => {
        const getTodoCheckbox = (index = 0) =>
            getElementByIndex(todoItemSelector, index).find(
                'input[type="checkbox"]'
            )

        const checkTodo = (index = 0) => getTodoCheckbox(index).check()
        const uncheckTodo = (index = 0) => getTodoCheckbox(index).uncheck()

        const checkCompleteStyle = () => {
            getElementByIndex(todoItemSelector).should(
                'have.css',
                'opacity',
                '0.6'
            )

            getElementByIndex(todoLabelSelector)
                .find('span')
                .then($label => {
                    const width = $label.width() || 0

                    getElementByIndex(todoLabelSelector)
                        .find(strikethroughSelector)
                        .parent()
                        .should('have.css', 'width', `${width}px`)
                })
        }

        const checkUncompleteStyle = () => {
            getElementByIndex(todoItemSelector).should(
                'have.css',
                'opacity',
                '1'
            )

            getElementByIndex(todoLabelSelector)
                .find(strikethroughSelector)
                .parent()
                .should('have.css', 'width', '0px')
        }

        const checkPrepareUncompleteStyle = () => {
            getElementByIndex(todoItemSelector).should(
                'have.css',
                'opacity',
                '1'
            )

            getElementByIndex(todoLabelSelector)
                .find('span')
                .then($label => {
                    const width = $label.width() || 0

                    getElementByIndex(todoLabelSelector)
                        .find(strikethroughSelector)
                        .parent()
                        .should('have.css', 'width', `${width}px`)
                })
        }

        it('确认完成', () => {
            cy.mount(<TodoWithBasicProps />)

            checkTodo().should('be.checked')

            checkCompleteStyle()

            uncheckTodo().should('not.be.checked')

            checkUncompleteStyle()
        })

        it('加载状态', () => {
            cy.mount(<TodoWithLoad />)

            checkTodo().should('not.be.checked').and('be.disabled')

            checkUncompleteStyle()

            cy.wait(1500)

            getTodoCheckbox().should('be.checked').and('not.be.disabled')

            checkCompleteStyle()

            uncheckTodo().should('be.checked').and('be.disabled')

            checkPrepareUncompleteStyle()

            cy.wait(1500)

            getTodoCheckbox().should('not.be.checked').and('not.be.disabled')

            checkUncompleteStyle()
        })
    })

    describe('移除待办', () => {
        const getRemoveBtn = (index = 0) =>
            getElementByIndex(todoItemSelector, index).find(removeBtnSelector)

        const checkRemoved = () => {
            cy.get(todoItemSelector).should('have.length', 1)
            getElementByIndex(todoItemSelector)
                .find(todoLabelSelector)
                .find('span')
                .should('have.text', 'two')
        }

        const checkRemoving = () => {
            cy.get(todoItemSelector).should('have.length', 2)
            getElementByIndex(todoItemSelector)
                .find(removeBtnSelector)
                .find('[aria-label="loading"]')
                .should('be.visible')
        }

        it('确认移除', () => {
            cy.mount(<TodoWithBasicProps />)

            getRemoveBtn().click()

            checkRemoved()
        })

        it('加载状态', () => {
            cy.mount(<TodoWithLoad />)

            getRemoveBtn().click()

            checkRemoving()

            cy.wait(1500)

            checkRemoved()
        })
    })

    describe('文本溢出显示tooltip', () => {
        const checkTooltip = () => {
            getElementByIndex(todoItemSelector)
                .trigger('mouseover')
                .get('.ant-tooltip')
                .should('not.exist')

            getElementByIndex(todoItemSelector, -1)
                .trigger('mouseover')
                .get('.ant-tooltip')
                .should('have.length', 1)
                .and('have.class', 'ant-tooltip-placement-top')
                .find('.ant-tooltip-inner')
                .should('have.text', 'a'.repeat(20))
        }

        it('默认状态', () => {
            cy.mount(<TodoWithLongText />)

            checkTooltip()
        })

        it('新增后状态', () => {
            cy.mount(<TodoWithBasicProps />)

            cy.get(addBtnSelector)
                .click()
                .get(addInputSelector)
                .type(`${'a'.repeat(20)}{enter}`)

            checkTooltip()
        })
    })
})
