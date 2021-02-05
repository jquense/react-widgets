import faker from 'faker'

faker.seed(420)

export interface Person {
  id: number
  firstName: string
  lastName: string
  fullName: string
}
export default (limit = 100) => {
  let arr: Person[] = new Array(limit)

  for (var i = 0; i < arr.length; i++) {
    let firstName = faker.name.firstName()
    let lastName = faker.name.lastName()

    arr[i] = {
      id: i + 1,
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
    }
  }

  return arr
}
