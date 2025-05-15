import TaskManagement from '@pages/TaskManagement';
import UserManagement from '@pages/UserManagement';
import { Route, Routes, Link, Navigate, NavLink } from 'react-router-dom';

export function App() {

  return (
    <div className="mx-auto">
      <div className="bg-white dark:bg-gray-800 shadow-sm mb-6">
        <div className="mx-auto px-4">
          <div className="flex space-x-4 py-3">
            <NavLink
              to="/task-management-demo"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${isActive
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`
              }
            >
              Task Management
            </NavLink>
            <NavLink
              to="/datagrid-demo"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${isActive
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`
              }
            >
              User Management
            </NavLink>
          </div>
        </div>
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
