import { TEST_DISPATCH } from './types';
// Register
export const registeruser = (userData) => {
  return {
    type: TEST_DISPATCH,
    payload: userData
  }
};