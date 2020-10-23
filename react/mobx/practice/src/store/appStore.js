import { observable, action } from 'mobx'

class AppStore {
  @observable price = 3333

  @action modifyNumber = (price) => {
    this.price = price
  }

  get total() {
    return this.price + 3
  }
}

export default AppStore
