import { getCustomRepository } from 'typeorm';
import { mocked } from 'ts-jest/utils';
import UserRepository from './client.repository'
import UserController from '../../controllers/client.controller'
import {init} from '../../../main/app'

jest.mock('typeorm', () => ({ getCustomRepository: jest.fn() }));


describe('61693597', () => {
  it('should pass', async () => {
    const controller = new UserController(init);
    const actual = await controller.get();
    expect(actual).toBe('fake user');
    console.log(controller)
    expect('oi').toBe('oi');
  });
});

