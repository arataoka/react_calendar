import React, { useEffect } from 'react';
import './App.scss';
import { Auth } from './features/auth/Auth';
import { auth } from './firebase';
import {
  login,
  logout,
  selectUid,
  selectDisplayName,
} from './features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const uid = useSelector(selectUid);
  const displayName = useSelector(selectDisplayName);
  useEffect(() => {
    const onSub = auth.onAuthStateChanged((authUser) => {
      console.log('call');
      if (authUser) {
        dispatch(
          login({ uid: authUser.uid, displayName: authUser.displayName })
        );
      } else {
        dispatch(logout());
        console.log('authuserはいません');
      }
    });
    return () => {
      onSub();
    };
  }, [dispatch]);
  return (
    <div className="App">
      {uid ? (
        <Button
          onClick={async () => {
            await auth.signOut();
          }}
        >
          {displayName} ログアウト
        </Button>
      ) : (
        <Auth />
      )}
    </div>
  );
};

export default App;
