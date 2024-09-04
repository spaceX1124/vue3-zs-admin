/**
 * 发布订阅
 */
type EventCallback = (...args: any[]) => void
class EventEmitter {
  private _events: Map<string, EventCallback[]> = new Map()
  // 订阅事件
  on (name: string, cb: EventCallback) {
    if (!this._events.has(name)) {
      this._events.set(name, [])
    }
    this._events.get(name)?.push(cb)
  }
  // 发布事件
  emit (name: string, ...args: any[]) {
    const listeners = this._events.get(name)
    if (listeners) {
      for (const listener of listeners) {
        listener.call(this, ...args)
      }
    }
  }
  // 移除某个事件
  removeListener (name: string, cb: EventCallback) {
    if (this._events.has(name)) {
      const listeners = this._events.get(name)
      if (listeners) {
        this._events.set(
          name,
          listeners?.filter((listener) => listener !== cb)
        )
      }
    }
  }
  // 移除所有事件
  removeAllListener () {
    this._events.clear()
  }
}

export default new EventEmitter()
