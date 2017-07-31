import faker from 'faker'
import {mockUser} from './mock-user.js'
import Profile from '../../model/profile.js'

export const mockProfile = () => {
  return mockUser()
  .then((userData) => {
    return new Profile({
      owner: userData.user.id,
      email: userData.user.email,
      username: userData.user.username,
      bio: faker.lorem.words(10),
      avatar: faker.image.image(),
    }).save()
    .then(profile => ({userData, profile}))
  })
}

export const mockManyProfiles = (num=100) => {
  return mockUser()
  .then((userData) => {
    return Promise.all(new Array(num).fill(0).map(() => {
      return new Profile({
        owner: userData.user.id.toString(),
        email: userData.user.email,
        username: userData.user.username,
        bio: faker.lorem.words(10),
        avatar: faker.image.image(),
      }).save()
    }))
    .then(profiles => ({userData, profiles}))
  })
}
