import { observable } from 'mobx'

class AppStore {
  @observable price = 2
  @observable amount = 3

  constructor() {
    this.price = 12
  }

  get total() {
    return this.price * this.amount
  }
}

export default new AppStore()
