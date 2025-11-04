import { useContext, useState, useEffect } from "react";
import { LogOut, LogIn, MessageSquare } from "lucide-react";
import LogoutButton from "../../components/logout/LogoutButton.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import { SocketContext } from "../../context/SocketContext.jsx";
const Navbar = ({
  title,
  onButtonClick,
  collapsed = false,
  action,
  actionColor,
  gradient = "from-pink-500 via-red-500 to-yellow-500",
}) => {
  const getIcon = () => {
    switch (action) {
      case "logout":
        return <LogOut size={20} />;
      case "login":
        return <LogIn size={20} />;
      case "chat":
        return <MessageSquare size={20} />;
    }
  };
  const { authUser } = useContext(AuthContext);

  const { onlineUsers } = useContext(SocketContext);
  const [isOnline, setIsOnline] = useState(false);

  // Set isOnline true if authUser.username is in onlineUsers
  useEffect(() => {
    if (authUser) setIsOnline(onlineUsers.includes(authUser.username)); // <-- CHANGED
  }, [onlineUsers, authUser]); // <-- CHANGED

  return (
    <div
      className={`flex ${
        collapsed
          ? "flex-col items-center space-y-2"
          : "flex-row justify-between items-center"
      } py-2 px-3 border-b border-base-300 bg-base-200`}
    >
      <div
        className={`flex ${
          collapsed
            ? "flex-col items-center space-y-4 py-3"
            : "flex-row items-center justify-between flex-grow"
        }`}
      >
        <div className="flex gap-3 items-center">
          <div
            className={`bg-white rounded-3xl p-[2px] avatar ${
              isOnline ? "avatar-online" : "avatar-offline"
            }`}
          >
            <button className={`btn btn-circle btn-${actionColor} h-11 w-11`}>
              <img
                src={authUser.profilePic}
                alt="ProfilePic"
                className="w-10 h-10 rounded-full bg-base-100"
              />
            </button>
          </div>
          {!collapsed && (
            <h2
              className={`font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r ${gradient}`}
            >
              {title}
            </h2>
          )}
        </div>
        <div className="flex gap-[6px] items-center">
          <button
            className={`btn btn-sm btn-circle btn-${actionColor} mt-${
              collapsed ? "2" : "0"
            }`}
            onClick={onButtonClick}
            title={action}
          >
            {getIcon()}
          </button>
          {!collapsed && <LogoutButton inputColor={actionColor} />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;