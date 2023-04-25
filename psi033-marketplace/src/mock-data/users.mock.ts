import { User } from '../app/user'

export const MOCK_USERS: User[] = [
  {
    id: 1,
    username: 'Brutalismus3000',
    password: 'Password12'
  },
  {
    id: 2,
    username: 'Catlover00',
    password: '1234Abcd'
  },
];


export function updateMockUsers(users: User[]) {
  console.log(users);
}
