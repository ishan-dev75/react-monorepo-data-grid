import { useState } from 'react';
import { DataGrid, ColumnRef, Row } from '@modules/shared/dataGrid';
import { AssigneeCell, LinkCell, AssigneeEditor, } from '@modules/shared/dataGridExtensions/cells';
import { initialMockTasks } from '@modules/shared/data/data';
import { Task, TaskPriority, TaskStatus } from '@modules/shared/data/type';
import { useGetUser } from '@services/useGetUser';

// Define the Task interface

export default function TaskManagement() {
  // Initialize state with the data
  const [tasks, setTasks] = useState<Task[]>(initialMockTasks);
  const {userList} = useGetUser()

  // Handle cell value changes
  const handleCellValueChange = (taskId: number, field: string, value: any) => {
    console.log(`Task updated: taskId=${taskId}, field=${field}, value=${value}`);
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, [field]: value, updatedAt: new Date().toISOString() } : task
      )
    );
  };

  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Calculate if a task is overdue
  const isOverdue = (task: Task) => {
    if (!task.dueDate || task.status === 'Done') return false;
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dueDate < today;
  };

  // Define columns for the task management grid
  const columns: ColumnRef[] = [
    {
      field: 'id',
      headerName: 'ID',
      minWidth: 60,
      type: 'number',
      align: 'left'
    },
    {
      field: 'title',
      headerName: 'Task Title',
      minWidth: 250,
      editable: true,
      renderCell: (value, row) => (
        <div className="px-4 py-2">
          <div className="font-medium">{value}</div>
          <div className="text-xs text-gray-500 truncate max-w-xs">{(row as Task).description}</div>
        </div>
      )
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 120,
      editable: true,
      renderCell: (value) => {
        let bgColor = 'bg-gray-100 dark:bg-gray-700';
        let textColor = 'text-gray-800 dark:text-gray-200';

        switch (value) {
          case 'To Do':
            bgColor = 'bg-blue-100 dark:bg-blue-900';
            textColor = 'text-blue-800 dark:text-blue-200';
            break;
          case 'In Progress':
            bgColor = 'bg-yellow-100 dark:bg-yellow-900';
            textColor = 'text-yellow-800 dark:text-yellow-200';
            break;
          case 'Done':
            bgColor = 'bg-green-100 dark:bg-green-900';
            textColor = 'text-green-800 dark:text-green-200';
            break;
          case 'Blocked':
            bgColor = 'bg-red-100 dark:bg-red-900';
            textColor = 'text-red-800 dark:text-red-200';
            break;
        }

        return (
          <div className="px-4 py-2 flex justify-center">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
              {value}
            </span>
          </div>
        );
      },
      // Custom sorting for status - we want a specific order
      sortComparator: (a: Row, b: Row, _field: string, isAscending: boolean) => {
        const statusOrder = ['To Do', 'In Progress', 'Blocked', 'Done'];
        const statusA = a.status as TaskStatus;
        const statusB = b.status as TaskStatus;

        const indexA = statusOrder.indexOf(statusA);
        const indexB = statusOrder.indexOf(statusB);

        return isAscending ? indexA - indexB : indexB - indexA;
      }
    },
    {
      field: 'priority',
      headerName: 'Priority',
      minWidth: 100,
      editable: true,
      renderCell: (value) => {
        let bgColor = 'bg-gray-100 dark:bg-gray-700';
        let textColor = 'text-gray-800 dark:text-gray-200';

        switch (value) {
          case 'Low':
            bgColor = 'bg-green-100 dark:bg-green-900';
            textColor = 'text-green-800 dark:text-green-200';
            break;
          case 'Medium':
            bgColor = 'bg-blue-100 dark:bg-blue-900';
            textColor = 'text-blue-800 dark:text-blue-200';
            break;
          case 'High':
            bgColor = 'bg-orange-100 dark:bg-orange-900';
            textColor = 'text-orange-800 dark:text-orange-200';
            break;
          case 'Critical':
            bgColor = 'bg-red-100 dark:bg-red-900';
            textColor = 'text-red-800 dark:text-red-200';
            break;
        }

        return (
          <div className="px-4 py-2 flex justify-center">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
              {value}
            </span>
          </div>
        );
      },
      // Custom sorting for priority - we want a specific order
      sortComparator: (a: Row, b: Row, _field: string, isAscending: boolean) => {
        const priorityOrder = ['Low', 'Medium', 'High', 'Critical'];
        const priorityA = a.priority as TaskPriority;
        const priorityB = b.priority as TaskPriority;

        const indexA = priorityOrder.indexOf(priorityA);
        const indexB = priorityOrder.indexOf(priorityB);

        return isAscending ? indexA - indexB : indexB - indexA;
      }
    },
    {
      field: 'progress',
      headerName: 'Progress',
      minWidth: 150,
      type: 'number',
      editable: true,
      renderCell: (value) => {
        const progress = Number(value) || 0;
        let barColor = 'bg-blue-500';

        if (progress >= 100) {
          barColor = 'bg-green-500';
        } else if (progress >= 70) {
          barColor = 'bg-blue-500';
        } else if (progress >= 30) {
          barColor = 'bg-yellow-500';
        } else {
          barColor = 'bg-gray-300 dark:bg-gray-600';
        }

        return (
          <div className="px-4 py-2 w-full">
            <div className="flex items-center">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mr-2">
                <div
                  className={`h-2.5 rounded-full ${barColor}`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">{progress}%</span>
            </div>
          </div>
        );
      },
      valueValidator: (value) => {
        // First check if the value contains any non-numeric characters
        if (typeof value === 'string' && /[^0-9.]/.test(value)) {
          return false;
        }

        const numValue = Number(value);
        return !isNaN(numValue) && numValue >= 0 && numValue <= 100;
      }
    },
    {
      field: 'dueDate',
      headerName: 'Due Date',
      type: 'date',
      editable: true,
      renderCell: (value, row) => {
        const formattedDate = formatDate(value as string);
        const overdue = isOverdue(row as Task);

        return (
          <div className="px-4 py-2">
            <span className={overdue ? 'text-red-600 dark:text-red-400 font-medium' : 'dark:text-gray-300'}>
              {formattedDate}
            </span>
          </div>
        );
      },
    },
    {
      field: 'assignee',
      headerName: 'Assignees',
      minWidth: 200,
      editable: true,
      renderCell: (value) => (
        <AssigneeCell users={value || []} compactLimit={1} />
      ),
      // Custom editor for selecting assignees
      editableCell: ({ value, onSave, onCancel }) => (
        <AssigneeEditor
          value={value || []}
          availableUsers={userList || []}
          onSave={onSave}
          onCancel={onCancel}
        />
      ),
      sortComparator: (a: Row, b: Row, _field: string, isAscending: boolean) => {
        const aLength = a.assignee?.length || 0;
        const bLength = b.assignee?.length || 0;

        return isAscending ? aLength - bLength : bLength - aLength;
      }
    },
    {
      field: 'tags',
      headerName: 'Tags',
      minWidth: 200,
      sortable: false,
      renderCell: (value) => {
        const tags = value as string[];
        if (!tags || tags.length === 0) return <div className="px-4 py-2 text-gray-400 dark:text-gray-500">No tags</div>;

        return (
          <div className="px-4 py-2 flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        );
      }
    },
    {
      field: 'storyPoints',
      headerName: 'Points',
      minWidth: 80,
      type: 'number',
      align: 'center',
      editable: true,
      renderCell: (value) => {
        return (
          <div className="px-4 py-2 flex justify-center">
            <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 flex items-center justify-center text-xs font-medium">
              {value}
            </span>
          </div>
        );
      },
      valueValidator: (value) => {
        const numValue = Number(value);
        return !isNaN(numValue) && numValue >= 0 && Number.isInteger(numValue);
      }
    },
    {
      field: 'documentationLink',
      headerName: 'Documentation',
      renderCell: (value) => {
        if (!value) return <div className="px-4 py-2 text-gray-400">No documentation</div>;

        // Extract the last part of the URL for display text
        const displayText = value.toString().split('/').pop() || 'Documentation';

        return (
          <LinkCell
            href={value.toString()}
            text={displayText}
            tooltip="Open documentation in new tab"
            openInNewTab={true}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
          />
        );
      }
    },
    {
      field: 'updatedAt',
      headerName: 'Last Updated',
      minWidth: 150,
      renderCell: (value) => {
        const date = new Date(value as string);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        let formattedDate;
        if (diffDays < 1) {
          // Today - show time
          formattedDate = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
          formattedDate = `Today at ${formattedDate}`;
        } else if (diffDays === 1) {
          // Yesterday
          formattedDate = 'Yesterday';
        } else {
          // Show date
          formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }

        return (
          <div className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
            {formattedDate}
          </div>
        );
      }
    }
  ];

  return (
    <>
      <div className="mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">Task Management</h1>
        <p className="mb-4 text-gray-600 dark:text-gray-400">Track and manage project tasks with assignees, status, and priorities.</p>
        <DataGrid
          columns={columns}
          rows={tasks}
          onCellValueChange={handleCellValueChange}
          height="calc(100vh - 14rem)"
        />
      </div>
    </>
  );
}
