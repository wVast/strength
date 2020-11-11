import { observable, action, autorun, runInAction, flow } from 'mobx'

class AppStore {
  @observable number = 3333
  @observable obj = { num: +new Date() }

  constructor() {
    autorun(() => {
      console.log('a?')
    })
    autorun(() => {
      console.log(this.number)
    })
  }

  @action changeNumber = (number) => {
    this.number = number
    // this.obj.num = number
    setTimeout(() => {
      runInAction(() => {
        this.obj.num = number
      })
    }, 200)
  }

  changeNumberTwo = flow(function* () {
    this.number = +new Date()

    try {
      const res = yield this.createNumber()

      this.number = res // 正常
    } catch (e) {
      console.log(e)
    }
  })

  createNumber = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(+new Date())
      }, 100)
    })
  }

  get showNumber() {
    return this.number + 3
  }
}

export default AppStore
