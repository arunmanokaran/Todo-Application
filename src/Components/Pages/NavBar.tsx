import { useLocation, useNavigate } from "react-router-dom";
import { useFetchUser } from "../../Utilis/useFetchUser";

const NavBar = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const currentUser = useFetchUser(state.userId);

  const handleClick = () => {
    navigate("/userpage/:userId", {
        state,
      });
  };
  return (
    <div>
      <div className="text-black p-3 text-2xl inset-0 flex justify-between items-center">
        <h1 className="m-8 text-5xl">
          ToDo <span className="text-blue-500">List</span>
        </h1>
        <div
          className="mr-8 bg-blue-500 px-3 py-1 text-white rounded-full cursor-pointer text-center"
          onClick={() => handleClick()}
        >
          {currentUser?.firstName.charAt(0)}
        </div>
      </div>
    </div>
  );
};
export default NavBar;
