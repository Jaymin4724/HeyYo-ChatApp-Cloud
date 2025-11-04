import { useState } from "react";
import { Power } from "lucide-react";
import useLogout from "../../hooks/useLogout.js";
const LogoutButton = ({ inputColor }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { loading, logout } = useLogout();
  const handleLogout = async () => {
    await logout();
  };
  return (
    <>
      <button
        className={`btn btn-dash btn-circle btn-${inputColor} btn-sm pb-0.5`}
        onClick={() => setShowConfirm(true)}
      >
        <Power size={20}></Power>
      </button>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-base-100 p-10 rounded-xl shadow-lg space-y-6 text-center">
            <p className="text-2xl font-semibold">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-center gap-3">
              <button
                className={`btn btn-${inputColor} btn-md text-xl`}
                onClick={handleLogout}
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Yes"
                )}
              </button>
              <button
                className="btn btn-outline btn-md text-xl"
                onClick={() => setShowConfirm(false)}
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Cancel"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutButton;
