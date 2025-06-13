import Login from "./Components/Login.tsx";
import SaveAdminDetails from "./Utilis/Admin.ts";

SaveAdminDetails.SaveAdminDetails();

const App = () => {
  return (
    <>
      <Login />
    </>
  );
};

/*
 * Still need to impletent the following:
 * 1. Delete user functionality in AdminPage.tsx
 * 2. Password reset functionality in UserPage.tsx
 */

export default App;
