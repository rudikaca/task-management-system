import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Login, Signup} from "./pages/auth";
import {paths} from "./constants/paths.ts";
import {Dashboard, TasksList} from "./pages/home";
import {AuthRoute, PrivateRoute} from "./containers";
import NotFound from "./components/NotFound.tsx";

function App() {

  return (
      <Router>
          <Routes>
              <Route
                  exact
                  path={paths.dashboard}
                  element={
                      <PrivateRoute>
                          <Dashboard />
                      </PrivateRoute>
                  } />
              <Route
                  path={paths.tasks}
                  element={
                      <PrivateRoute>
                          <TasksList />
                      </PrivateRoute>
                  }
              />
              <Route
                  path={paths.login}
                  element={
                      <AuthRoute>
                          <Login />
                      </AuthRoute>
                  } />
              <Route
                  path={paths.signup}
                  element={
                  <AuthRoute>
                      <Signup />
                  </AuthRoute>
              }
              />
              <Route path="*" element={<NotFound />} />
          </Routes>
      </Router>
  )
}

export default App
