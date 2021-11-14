// import { getCustomRepository } from 'typeorm';
// import { mocked } from 'ts-jest/utils';
// import UserRepository from './client.repository'
// import UserController from '../../../controllers/client.controller'
import {init} from '../../../../main/app'

// jest.mock('typeorm', () => ({ getCustomRepository: jest.fn() }));

// describe('61693597', () => {
//   it('should pass', async () => {
//     const controller = new UserController(init);
//     const actual = await controller.get();
//     expect(actual).toBe('fake user');
//     console.log(controller)
//     expect('oi').toBe('oi');
//   });
// });

import { Repository } from 'typeorm';
import { mock } from 'jest-mock-extended';

const repoMock = mock<Repository>();
import ClientController from '../../../controllers/client.controller';

jest.mock('typeorm', () => {
  repoMock.find.mockResolvedValue(['ok']);

  return {
    getRepository: () => repoMock,
    PrimaryGeneratedColumn: () => {},
    Column: () => {},
    Entity: () => {},
  };
});

describe('Album', () => {
  it('Should work', async () => {
    const controller = new ClientController(init);
    const actual = await controller.get();

    expect(actual).toBe(1);
  });
});
