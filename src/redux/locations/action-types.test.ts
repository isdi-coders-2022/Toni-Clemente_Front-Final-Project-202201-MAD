import { actionTypes } from './action-types';

describe('Given the constant actionTypes', () => {
    describe('When importing it', () => {
        test('Then it should be defined', () => {
            expect(actionTypes).toBeDefined();
        });
    });
});
