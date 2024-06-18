import { CssBaseline } from '@mui/material';
import { Route, Routes, Navigate } from 'react-router-dom';
import routes from '../routes';
import { useSelector } from 'react-redux';

function App() {
  const { user } = useSelector((state: any) => state.login);

  return (
    <div className="App">
      <CssBaseline />
      <Routes>
        {routes.map((route) =>
          route.private ? (
            user ? (
              <Route key={route.path} path={route.path} element={route.element} />
            ) : (
              <Route key={route.path} path={route.path} element={<Navigate to="/login" />} />
            )
          ) : (
            <Route key={route.path} path={route.path} element={route.element} />
          )
        )}
      </Routes>
    </div>
  );
}

export default App;
