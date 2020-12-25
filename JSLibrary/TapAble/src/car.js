import { SyncHook } from 'tapable'

export default class Car {
  constructor() {
    this.startHook = new SyncHook()
  }

  start() {
    this.startHook.call()
  }
}
