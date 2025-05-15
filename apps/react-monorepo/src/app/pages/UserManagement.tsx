import { userMockData } from '@modules/shared/data/data';
import { ColumnRef, DataGrid, Row } from '@modules/shared/dataGrid';
import { AssigneeCell, AssigneeEditor, StarRatingCell, StarRatingEditor } from '@modules/shared/dataGridExtensions';
import { useGetUser } from '@services/useGetUser';
import { useState } from 'react';

export default function UserManagement() {
  // Initialize state with the data
  const [demoRows, setDemoRows] = useState<Row[]>(userMockData);
  const {userList} = useGetUser()

  // Handle cell value changes
  const handleCellValueChange = (rowId: any, field: string, value: any) => {
    console.log(`Cell value changed: rowId=${rowId}, field=${field}, value=${value}`);
    setDemoRows(prevRows =>
      prevRows.map(row =>
        row.id === rowId ? { ...row, [field]: value } : row
      )
    );
  };

  const columns: ColumnRef[] = [
    {
      field: 'id',
      headerName: 'ID',
      minWidth: 50,
      type: 'number',
      align: 'left'
    },
    {
      field: 'firstName',
      headerName: 'First name',
      type: 'string',
      editable: true, // Make this column editable
      valueValidator: (value) => value !== null && value !== '' // Validate that the value is not empty
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      type: 'string',
      align: 'center',
      editable: true
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      minWidth: 50,
      editable: true, // Make this column editable
      // Example of custom cell rendering with conditional styling
      renderCell: (value) => (
        <div className={`px-4 py-2 text-center ${value < 18 ? 'text-red-500 font-bold' : value > 60 ? 'text-blue-500 font-bold' : ''}`}>
          {value !== null && value !== undefined ? value : ''}
        </div>
      ),
      // Validate that the value is a positive number or null
      valueValidator: (value) => value === null || (typeof value === 'number' && value >= 0)
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      // Example of a custom cell that combines multiple fields
      renderCell: (_, row) => (
        <div className="px-4 py-2 flex items-center">
          <span className="font-medium">{row.firstName || ''} {row.lastName || ''}</span>
          {row.age && <span className="ml-2 text-xs text-gray-500">({row.age} years old)</span>}
        </div>
      ),
      // Example of a realistic multi-criteria sort: first by age, then by name
      sortComparator: (a: Row, b: Row, _field: string, isAscending: boolean) => {
        // First, handle special cases (null ages)
        if (a.age === null && b.age !== null) return isAscending ? 1 : -1;
        if (a.age !== null && b.age === null) return isAscending ? -1 : 1;
        if (a.age === null && b.age === null) {
          // If both ages are null, sort by name
          return isAscending
            ? a.fullName.localeCompare(b.fullName)
            : b.fullName.localeCompare(a.fullName);
        }

        // Sort by age first (group by age)
        const ageCompare = isAscending
          ? a.age - b.age
          : b.age - a.age;

        // If ages are different, return the age comparison result
        if (ageCompare !== 0) {
          return ageCompare;
        }

        // If ages are the same, sort by full name
        return isAscending
          ? a.fullName.localeCompare(b.fullName)
          : b.fullName.localeCompare(a.fullName);
      }
    },
    {
      field: 'status',
      headerName: 'Status',
      align: 'center',
      // Example of a custom cell with a computed value
      valueGetter: (row: Row) => {
        if (row.age === null) return 'Unknown';
        return row.age < 18 ? 'Minor' : row.age > 60 ? 'Senior' : 'Adult';
      },
      // Custom sorting for status - we want a specific order: Minor, Adult, Senior, Unknown
      sortComparator: (a: Row, b: Row, _field: string, isAscending: boolean) => {
        // Get the status values using the same logic as valueGetter
        const getStatus = (row: Row) => {
          if (row.age === null) return 'Unknown';
          return row.age < 18 ? 'Minor' : row.age > 60 ? 'Senior' : 'Adult';
        };

        const statusA = getStatus(a);
        const statusB = getStatus(b);

        // Define the custom order
        const statusOrder = ['Minor', 'Adult', 'Senior', 'Unknown'];

        // Get the index of each status in our custom order
        const indexA = statusOrder.indexOf(statusA);
        const indexB = statusOrder.indexOf(statusB);

        // Sort by the index in our custom order
        return isAscending ? indexA - indexB : indexB - indexA;
      },
      renderCell: (value) => {
        let bgColor = 'bg-gray-200';
        let textColor = 'text-gray-800';

        if (value === 'Minor') {
          bgColor = 'bg-yellow-100';
          textColor = 'text-yellow-800';
        } else if (value === 'Adult') {
          bgColor = 'bg-green-100';
          textColor = 'text-green-800';
        } else if (value === 'Senior') {
          bgColor = 'bg-blue-100';
          textColor = 'text-blue-800';
        }

        return (
          <div className="px-4 py-2 flex justify-center">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
              {value}
            </span>
          </div>
        );
      }
    },
    {
      field: 'assignee',
      headerName: 'Assignees',
      minWidth: 300,
      // Custom cell renderer to display assignees with compact view
      renderCell: (value) => (
        <AssigneeCell users={value || []} compactLimit={1} />
      ),
      // Custom sorting by number of assignees
      sortComparator: (a: Row, b: Row, _field: string, isAscending: boolean) => {
        const aLength = a.assignee?.length || 0;
        const bLength = b.assignee?.length || 0;

        return isAscending ? aLength - bLength : bLength - aLength;
      },
      editable: true, // Make this column editable
      editableCell: ({ value, onSave, onCancel }) => (
        <AssigneeEditor
          singleSelect={true}
          value={value || []}
          availableUsers={userList || []}
          onSave={onSave}
          onCancel={onCancel}
        />
      )
    },
    {
      field: 'birthDate',
      headerName: 'Birth Date',
      type: 'date',
      align: 'right',
      editable: true, // Make this column editable
      valueValidator: (value) => {
        if (!value) return true;
        const date = new Date(value);
        return !isNaN(date.getTime()) && date <= new Date();
      }
    },
    {
      field: 'rating',
      headerName: 'Rating',
      align: 'center',
      minWidth: 180,
      editable: true, // Make this column editable
      // Custom cell renderer to display stars
      renderCell: (value) => (
        <StarRatingCell value={value || 0} maxRating={5} />
      ),
      // Custom cell editor using the editableCell prop
      editableCell: ({ value, onSave, onCancel }) => (
        <StarRatingEditor
          config={{
            value: value || 0,
            maxRating: 5,
            onSave: onSave,
            onCancel: onCancel // Pass the onCancel function from the DataGrid
          }}
        />
      ),
      // Validate that the rating is between 0 and 5
      valueValidator: (value) => value >= 0 && value <= 5
    },
  ];

  return (
    <>
      <div className="mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">DataGrid Demo with Editable Cells</h1>
        <p className="mb-4 text-gray-600 dark:text-gray-400">Double-click on a cell to edit its value. Press Enter to save or Escape to cancel.</p>
        <DataGrid
          columns={columns}
          rows={demoRows}
          onCellValueChange={handleCellValueChange}
          height="calc(100vh - 14rem)"
        />
      </div>
    </>
  );
}
