import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { auth } from '../../firebase';

export interface authState {
  user: {
    uid: string;
    displayName: string;
  };
  Email: string;
  password: string;
  isLoginMode: boolean;
}

const initialState: authState = {
  user: {
    uid: '',
    displayName: '',
  },
  Email: '',
  password: '',
  isLoginMode: false,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const asyncCreateUser = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  const authUser = await auth.createUserWithEmailAndPassword(email, password);
  const displayName = `${firstName} ${lastName}`;
  // database
  authUser.user?.updateProfile({
    displayName,
  });
};

export const asyncSignIn = async (email: string, password: string) => {
  const authUser = await auth.signInWithEmailAndPassword(email, password);
  console.log(authUser);
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.user = {
        uid: action.payload.uid,
        displayName: action.payload.displayName,
      };
    },
    logout(state) {
      console.log('logout');
      state.user = {
        uid: '',
        displayName: '',
      };
    },
    toggleAuthMode(state) {
      state.isLoginMode = !state.isLoginMode;
    },
  },
});

export const { toggleAuthMode, login, logout } = authSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectIsLoginMode = (state: RootState) => state.auth.isLoginMode;
export const selectUid = (state: RootState) => state.auth.user.uid;
export const selectDisplayName = (state: RootState) =>
  state.auth.user.displayName;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default authSlice.reducer;
