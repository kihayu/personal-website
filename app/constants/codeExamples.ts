export const codeExamples: Array<string> = [
  // 1. Original Greeter class
  `class Greeter {
  private greeting: string

  constructor(message: string) {
    this.greeting = message
  }

  public greet(): string {
    return this.greeting
  }
}`,

  `const add = (a: number, b: number): number => {
  return a + b
}

const sum = add(5, 3) // 8`,
  `type User = {
  id: number
  name: string
  email: string
}

const user: User = {
  id: 1,
  name: 'John',
  email: 'john@example.com'
}`,

  `async function getData() {
  const response = await fetch('/api/data')
  return response.json()
}

getData().then(console.log)`,
  `const fruits = ['apple', 'banana', 'orange']
const upperFruits = fruits
  .map(fruit => fruit.toUpperCase())

console.log(upperFruits)`,
] as Array<string>
