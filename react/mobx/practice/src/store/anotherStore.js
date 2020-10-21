import { observable, action } from 'mobx'

class AnotherStore {
  @observable test = 'test'

  @action
  setValue = (key, value) => {
    this[key] = value
    console.log(this[key])
  }
}

export default new AnotherStore()
