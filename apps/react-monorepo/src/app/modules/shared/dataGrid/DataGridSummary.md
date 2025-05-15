- Data Grid have Default cell (Number, String, Date)    
 - But still you can render any cell from JSON (renderCell)

- Data Grid have default editable cell (Number, string, Date) (pen icon on header indicate that cell are editable)
 - You can render any custom editable cell (editableCell)

- Data Grid have default sorting (Number, String, Date)  (sort icon on header indicate that cell are sortable)
  - Sort icon will show it felid have sorting enable
  - active sorting will show high light sort icon

- Field Alignment
    - You can align any cell (left, right, center) 
        - The editable filed also align content based on the your alignment
    
Editable Cell 
- The Edit Icon indicate that cell are editable
- Normally you can edit that cell by double click
- Default Behavior of every editable cell
    - If you in edit mode and press Esc will revert change and exit the edit mode
    - If you in edit mode and press Enter then change save and exit the edit mode
    - If you in edit mode apply some changes and click outside or Enter key press will save your changes


- Assignee tab feature
    - Show Assigned user with name and img
    - Compact feature
     - Show Dynamic user from API
    - You can edit the assignees tab
        - Double click on it
        - Cell covert into Editable cell
        - You can select multiple user
        - You can search user
        - You can remove user
        - You can add user
        - You can save your changes by press Enter key
        - You can cancel your changes by press Esc key
        - You can save your changes by click outside
    - If have allow single user then show only one user to select (User management page)

 Detail Explanation in : 
    - Example of Data Grid How to use : apps\react-monorepo\src\app\modules\shared\dataGrid\EXAMPLES.md
    - DataGrid Folder Structure : apps\react-monorepo\src\app\modules\shared\dataGrid\README.md
    - DataGrid Props Details : apps\react-monorepo\src\app\modules\shared\dataGrid\types\type.ts
    - DataGrid Example
        - 1) apps\react-monorepo\src\app\pages\UserManagement.tsx
        - 2) apps\react-monorepo\src\app\pages\TaskManagement.tsx


For Run Project
    - npm i
    - npm run dev (will run both backed and frontend)


## Backed
- Create simple API which fetch the user data from static data (api/users) 
