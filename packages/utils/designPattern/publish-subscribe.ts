/* eslint-disable @typescript-eslint/no-explicit-any */
class EventEmitter<
    EventMap extends { [K: string]: (...arg: any[]) => any } = {
        [K: string]: (...arg: any[]) => any
    }
> {
    private subscribers: {
        [K in keyof EventMap]: EventMap[K][] | EventMap[K]
    } = {} as {
        [K in keyof EventMap]: EventMap[K][] | EventMap[K]
    }

    subscribe<K extends keyof EventMap>(event: K, callback: EventMap[K]) {
        const fn = this.subscribers[event]
        if (fn) {
            if (fn instanceof Array) {
                fn.push(callback)
            } else {
                this.subscribers[event] = [fn as EventMap[K], callback]
            }
        } else {
            this.subscribers[event] = callback
        }
    }

    unsubscribe<K extends keyof EventMap>(event: K, callback: EventMap[K]) {
        const fn = this.subscribers[event]
        if (fn) {
            if (fn instanceof Array) {
                const index = fn.findIndex(cb => cb === callback)
                if (index > -1) {
                    fn.splice(index, 1)
                }
            } else {
                delete this.subscribers[event]
            }
        }
    }

    emit<K extends keyof EventMap>(
        event: K,
        ...data: Parameters<EventMap[K]>
    ): ReturnType<EventMap[K]> | ReturnType<EventMap[K]>[] {
        const fn = this.subscribers[event]
        if (fn instanceof Array) {
            return fn.map(callback => callback(...data))
        }
        return fn?.(...data)
    }
}

export default EventEmitter
