import { Link, useNavigate } from "react-router-dom";
import { logout } from "../apicalls/authCalls";

function ProfilePage({userData}) {
  const navigate = useNavigate();
  const user = userData.user;
  
  const handleLogout = async () => {
    await logout()
    navigate('/');
    window.location.reload();
  };
  
  if (!user) {
    return (
      <div className="max-w-lg mx-auto my-8 p-6 bg-gray-50 border-2 border-black font-mono">
        <div className="border-b-2 border-black pb-3 mb-5">
          <h2 className="text-2xl uppercase tracking-wider text-center">
            Not Logged In
          </h2>
        </div>
        <p className="text-center mb-5 text-lg">Please sign in to view your profile.</p>
        <div className="text-center">
          <Link
            to="/signin"
            className="inline-block px-4 py-2 border-2 border-black hover:bg-gray-200 no-underline text-black text-base font-bold"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }


  return (
    <div className="max-w-lg mx-auto my-8 p-6 bg-gray-50 border-2 border-black font-mono">
      <div className="border-b-2 border-black pb-3 mb-5">
        <h2 className="text-2xl uppercase tracking-wider text-center">
          User Profile
        </h2>
      </div>

      <div className="flex items-center mb-6 pb-5 border-b border-dashed border-black">
        <div className="mr-5 w-24 h-24 border-2 border-black bg-gray-200 flex items-center justify-center">
          <span className="text-3xl font-bold">{user.name.charAt(0)}</span>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">{user.name}</h3>
          <p className="text-base italic mb-2">Member since 2025</p>
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-xl font-bold">42</div>
              <div className="text-sm">Friends</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">12</div>
              <div className="text-sm">Posts</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="mb-3 pb-2 border-b border-dashed border-black">
          <span className="inline-block w-32 font-bold text-base">Username:</span>
          <span className="text-base">{user.userName}</span>
        </div>
        <div className="mb-3 pb-2 border-b border-dashed border-black">
          <span className="inline-block w-32 font-bold text-base">Email:</span>
          <span className="text-base">{user.email}</span>
        </div>
        <div className="mb-3">
          <span className="inline-block w-32 font-bold text-base">Location:</span>
          <span className="text-base">San Francisco, CA</span>
        </div>
      </div>
      
      <div className="mb-5 border-2 border-black p-4">
        <h3 className="text-base font-bold mb-3 border-b border-black pb-2">FRIEND SPOTLIGHT</h3>
        <div className="flex flex-wrap gap-3">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 border-2 border-black bg-gray-300 flex items-center justify-center">
                <span className="text-base font-bold">{String.fromCharCode(65 + index)}</span>
              </div>
              <p className="text-xs mt-1">Friend {index + 1}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center border-t-2 border-black pt-4 mt-4 flex justify-between">
        <button className="px-4 py-2 border-2 border-black hover:bg-gray-200 text-sm font-bold">
          EDIT PROFILE
        </button>
        <button 
          onClick={handleLogout}
          className="px-4 py-2 border-2 border-black bg-gray-200 hover:bg-gray-300 text-sm font-bold text-black"
        >
          LOGOUT
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
