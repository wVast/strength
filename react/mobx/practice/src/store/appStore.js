import { observable, action, autorun } from 'mobx'

class AppStore {
  @observable number = 3333

  constructor() {
    autorun(() => {
      console.log('a?')
    })
    autorun(() => {
      console.log(this.number)
    })
    autorun(
      () => {
        console.log(this.number)
        try {
          throw Error('aaa')
        } catch (e) {
          console.log('catch', e)
        }
      },
      {
        onError: (err) => {
          console.log(err)
        },
      }
    )
  }

  @action changeNumber = (number) => {
    this.number = number
  }

  get showNumber() {
    return this.number + 3
  }
}

export default AppStore
