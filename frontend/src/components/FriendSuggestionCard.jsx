import React from "react";

function FriendSuggestionCard({user}) {
  return (
    <div className="pb-3 border-b border-dashed border-black">
      <div className="flex items-center mb-2">
        <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-black mr-2 sm:mr-3 bg-gray-200 shrink-0 flex items-center justify-center">
          <span className="text-sm sm:text-base font-bold">{user.name[0]}</span>
        </div>
        <span className="text-sm sm:text-base font-bold truncate">
          {user.name}
        </span>
      </div>
      <div className="flex justify-between mt-2 gap-2">
        <button className="flex-1 text-xs px-2 sm:px-3 py-1 sm:py-2 border border-black bg-gray-50 hover:bg-gray-200">
          ADD FRIEND
        </button>
        <button className="flex-1 text-xs px-2 sm:px-3 py-1 sm:py-2 border border-black bg-gray-50 hover:bg-gray-200">
          MESSAGE
        </button>
      </div>
    </div>
  );
}

export default FriendSuggestionCard;
