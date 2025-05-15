import { Route, Routes, Link } from 'react-router-dom';
import { UserList } from './components/UserList';

export function App() {
  return (
    <div className="container mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">React Monorepo Demo</h1>
      </header>

      <div role="navigation" className="mb-6">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-blue-500 hover:text-blue-700">Home</Link>
          </li>
          <li>
            <Link to="/users" className="text-blue-500 hover:text-blue-700">Users</Link>
          </li>
        </ul>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <div className="p-4 bg-gray-100 rounded">
              <h2 className="text-xl font-semibold mb-2">Welcome to the React Monorepo Demo</h2>
              <p className="mb-4">This application demonstrates fetching data from a backend API.</p>
              <Link to="/users" className="text-blue-500 hover:text-blue-700">
                View Users List
              </Link>
            </div>
          }
        />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </div>
  );
}

export default App;
