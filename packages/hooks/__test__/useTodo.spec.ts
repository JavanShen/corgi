import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react-hooks'
import type { TodoList, TodoListWithLoad, LoadMap } from '@corgwn/types'
import useTodo from '../todo/useTodo'

/* eslint-disable @typescript-eslint/no-empty-function */

const initTodoList = () =>
    [
        { label: 'one', name: 'one', done: false },
        { label: 'two', name: 'two', done: true }
    ] as TodoList

const initLoadMap = () =>
    ({
        remove: false,
        change: false,
        complete: false,
        uncomplete: false
    }) as LoadMap

const renderHookWithTodoList = () =>
    renderHook(({ todoList }) => useTodo(todoList), {
        initialProps: {
            todoList: initTodoList()
        }
    })

describe('useTodo', () => {
    it('初始化待办列表', () => {
        const { result } = renderHookWithTodoList()

        expect(result.current.todos).toStrictEqual(<TodoListWithLoad>[
            {
                label: 'one',
                name: 'one',
                done: false,
                loadMap: initLoadMap()
            },
            {
                label: 'two',
                name: 'two',
                done: true,
                loadMap: initLoadMap()
            }
        ])
    })

    describe('新增待办', () => {
        it('新增', async () => {
            const { result, waitForNextUpdate } = renderHookWithTodoList()

            result.current.add({ label: 'three', name: 'three', done: true })

            await waitForNextUpdate()

            expect(result.current.todos).toStrictEqual(<TodoListWithLoad>[
                {
                    label: 'one',
                    name: 'one',
                    done: false,
                    loadMap: initLoadMap()
                },
                {
                    label: 'two',
                    name: 'two',
                    done: true,
                    loadMap: initLoadMap()
                },
                {
                    label: 'three',
                    name: 'three',
                    done: true,
                    loadMap: initLoadMap()
                }
            ])
        })

        it('重复新增', async () => {
            const { result, waitForNextUpdate } = renderHookWithTodoList()

            result.current.add({ label: 'three', name: 'three', done: true })
            await waitForNextUpdate()
            result.current.add({ label: 'four', name: 'three', done: false })
            await waitForNextUpdate()

            expect(result.current.todos).toStrictEqual(<TodoListWithLoad>[
                {
                    label: 'one',
                    name: 'one',
                    done: false,
                    loadMap: initLoadMap()
                },
                {
                    label: 'two',
                    name: 'two',
                    done: true,
                    loadMap: initLoadMap()
                },
                {
                    label: 'three',
                    name: 'three',
                    done: true,
                    loadMap: initLoadMap()
                }
            ])
        })
    })

    it('删除待办', async () => {
        const { result, waitForNextUpdate } = renderHookWithTodoList()

        result.current.remove('two')

        await waitForNextUpdate()

        expect(result.current.todos).toStrictEqual(<TodoListWithLoad>[
            {
                label: 'one',
                name: 'one',
                done: false,
                loadMap: initLoadMap()
            }
        ])
    })

    it('修改待办', async () => {
        const { result, waitForNextUpdate } = renderHookWithTodoList()

        result.current.change('one', 'changed')

        await waitForNextUpdate()

        expect(result.current.todos).toStrictEqual(<TodoListWithLoad>[
            {
                label: 'changed',
                name: 'one',
                done: false,
                loadMap: initLoadMap()
            },
            {
                label: 'two',
                name: 'two',
                done: true,
                loadMap: initLoadMap()
            }
        ])
    })

    it('完成待办', async () => {
        const { result, waitForNextUpdate } = renderHookWithTodoList()

        result.current.complete('one')

        await waitForNextUpdate()

        expect(result.current.todos).toStrictEqual(<TodoListWithLoad>[
            {
                label: 'one',
                name: 'one',
                done: true,
                loadMap: initLoadMap()
            },
            {
                label: 'two',
                name: 'two',
                done: true,
                loadMap: initLoadMap()
            }
        ])
    })

    it('取消已完成待办', async () => {
        const { result, waitForNextUpdate } = renderHookWithTodoList()

        result.current.uncomplete('two')

        await waitForNextUpdate()

        expect(result.current.todos).toStrictEqual(<TodoListWithLoad>[
            {
                label: 'one',
                name: 'one',
                done: false,
                loadMap: initLoadMap()
            },
            {
                label: 'two',
                name: 'two',
                done: false,
                loadMap: initLoadMap()
            }
        ])
    })

    describe('更新回调', () => {
        it('单个回调', async () => {
            const { result, waitForNextUpdate } = renderHookWithTodoList()
            const fn = vi.fn(() => {})

            act(() => {
                result.current.event('update', fn)
            })
            result.current.add({ name: 'more', label: 'more', done: false })

            await waitForNextUpdate()

            expect(fn).toHaveBeenCalledWith('add', {
                newTodo: {
                    name: 'more',
                    label: 'more',
                    done: false
                }
            })

            result.current.remove('two')

            await waitForNextUpdate()

            expect(fn).toHaveBeenCalledWith('remove', { name: 'two' })
        })

        it('多个回调', async () => {
            const { result, waitForNextUpdate } = renderHookWithTodoList()
            const fn1 = vi.fn(() => {})
            const fn2 = vi.fn(() => {})

            act(() => {
                result.current.event('update', fn1)
                result.current.event('update', fn2)
            })
            result.current.complete('one')

            await waitForNextUpdate()

            expect(fn1).toHaveBeenCalledWith('complete', { name: 'one' })
            expect(fn2).toHaveBeenCalledWith('complete', { name: 'one' })
        })

        it('拒绝操作', async () => {
            const { result, waitForNextUpdate } = renderHookWithTodoList()
            const fn = vi.fn(() => false)

            act(() => {
                result.current.event('update', fn)
            })
            result.current.add({ name: 'more', label: 'more', done: false })
            result.current.remove('one')
            result.current.complete('one')
            result.current.uncomplete('two')
            result.current.change('two', 'changed')

            await waitForNextUpdate()

            expect(result.current.todos).toStrictEqual(<TodoListWithLoad>[
                {
                    label: 'one',
                    name: 'one',
                    done: false,
                    loadMap: initLoadMap()
                },
                {
                    label: 'two',
                    name: 'two',
                    done: true,
                    loadMap: initLoadMap()
                }
            ])
        })

        it('回调抛出错误', async () => {
            const { result, waitForNextUpdate } = renderHookWithTodoList()
            const fn = vi.fn(() => {
                throw Error('fail')
            })

            act(() => {
                result.current.event('update', fn)
            })

            result.current.add({ name: 'more', label: 'more', done: false })

            await waitForNextUpdate()

            expect(result.current.todos).toStrictEqual(<TodoListWithLoad>[
                {
                    label: 'one',
                    name: 'one',
                    done: false,
                    loadMap: initLoadMap()
                },
                {
                    label: 'two',
                    name: 'two',
                    done: true,
                    loadMap: initLoadMap()
                }
            ])
        })
    })

    it('更新完成回调', async () => {
        const { result, waitForNextUpdate } = renderHookWithTodoList()
        const fn = vi.fn(() => {})

        act(() => {
            result.current.event('updated', fn)
        })

        result.current.add({ name: 'more', label: 'more', done: false })
        result.current.remove('two')
        result.current.complete('one')

        await waitForNextUpdate()

        expect(fn).toHaveBeenCalledTimes(3)
        expect(fn).toHaveBeenLastCalledWith('complete', <TodoList>[
            {
                label: 'one',
                name: 'one',
                done: true
            },
            {
                label: 'more',
                name: 'more',
                done: false
            }
        ])
    })

    it('移除回调', async () => {
        const { result, waitForNextUpdate } = renderHookWithTodoList()
        const fn1 = vi.fn(() => {})
        const fn2 = vi.fn(() => {})

        act(() => {
            result.current.event('update', fn1)
            result.current.event('updated', fn2)
        })

        result.current.complete('one')

        await waitForNextUpdate()

        expect(fn1).toHaveBeenCalledOnce()
        expect(fn2).toHaveBeenCalledOnce()

        act(() => {
            result.current.unevent('update', fn1)
        })

        result.current.uncomplete('one')

        await waitForNextUpdate()

        expect(fn1).toHaveBeenCalledOnce()
        expect(fn2).toHaveBeenCalledTimes(2)
    })

    it('加载中状态', async () => {
        const { result, waitForNextUpdate } = renderHookWithTodoList()

        result.current.add({ name: 'more', label: 'more', done: false })

        expect(result.current.addLoading).toBe(true)

        await waitForNextUpdate()

        expect(result.current.addLoading).toBe(false)

        result.current.remove('two')
        result.current.complete('one')

        expect(result.current.todos).toStrictEqual(<TodoListWithLoad>[
            {
                label: 'one',
                name: 'one',
                done: false,
                loadMap: {
                    complete: true,
                    remove: false,
                    uncomplete: false,
                    change: false
                }
            },
            {
                label: 'two',
                name: 'two',
                done: true,
                loadMap: {
                    complete: false,
                    uncomplete: false,
                    remove: true,
                    change: false
                }
            },
            {
                label: 'more',
                name: 'more',
                done: false,
                loadMap: initLoadMap()
            }
        ])

        await waitForNextUpdate()

        expect(result.current.todos).toStrictEqual(<TodoListWithLoad>[
            {
                label: 'one',
                name: 'one',
                done: true,
                loadMap: initLoadMap()
            },
            {
                label: 'more',
                name: 'more',
                done: false,
                loadMap: initLoadMap()
            }
        ])
    })
})
