import Car from './car'

const car = new Car()
car.startHook.tap('startPlugin', () => console.log('我系一下安全带'))
car.start()

const App = () => {
  return <div>12</div>
}

export default App
