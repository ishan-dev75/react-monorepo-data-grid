import TaskManagement from '@pages/TaskMagement';
import UserManagement from '@pages/UserManagement';
import { Route, Routes, Link, Navigate } from 'react-router-dom';

export function App() {
  return (
    <div className="mx-auto p-4">
      <div role="navigation" className="mb-6">
        <ul className="flex space-x-4">
          <li>
            <Link to="/task-management-demo" className="text-blue-500 hover:text-blue-700">
              Task Management
            </Link>
          </li>
          <li>
            <Link to="/datagrid-demo" className="text-blue-500 hover:text-blue-700">
              User Management
            </Link>
          </li>
        </ul>
      </div>

      <Routes>
       <Route path="/" element={<Navigate to="/task-management-demo" replace />} />
        <Route path="/task-management-demo" element={<TaskManagement />} />
        <Route path="/datagrid-demo" element={<UserManagement />} />
      </Routes>
    </div>
  );
}

export default App;
