import { observable, autorun, action } from 'mobx'

export const observableObj = () => {
  const person = observable(
    {
      name: 'zonglian',
      age: 27,
      showAage: false,
      home: { oldHome: 'taiyuan' },
      get labelText() {
        return [this.name, this.age, this.home]
      },
      setAge(age) {
        this.age = age
      },
    },
    {
      setAge: action,
    }
  )

  autorun(() => console.log(person.labelText))

  person.name = 'zonglian2'

  person.setAge(28)

  person.home.newHome = 'shagnhai'
}

export const observableArr = () => {
  const todos = observable([
    { title: 'test1', completed: true },
    { title: 'test2', completed: false },
  ])

  autorun(() => {
    console.log(
      todos
        .filter((todo) => !todo.completed)
        .map((todo) => todo.title)
        .join(', ')
    )
  })

  todos[0].completed = false

  todos[2] = { title: 'test3', completed: false }

  todos.replace([
    { title: 'replace1', completed: false },
    { title: 'replace2', completed: false },
  ])
}
