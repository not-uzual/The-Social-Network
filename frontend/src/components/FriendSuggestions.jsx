import React, { useState, useEffect } from 'react';
import FriendSuggestionCard from './FriendSuggestionCard';
import { getAllUsers } from '../apicalls/userCalls';

function FriendSuggestions() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data.users || []);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

  return (
    <div className="bg-gray-50 border-2 border-black p-3 sm:p-4 mb-4 sm:mb-6 font-mono">
      <h2 className="text-sm sm:text-base font-bold uppercase border-b-2 border-black pb-2 mb-3 sm:mb-4">People You May Know</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3 sm:gap-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          users.map(user => (
            <FriendSuggestionCard key={user._id} user={user}/>
          ))
        )}
      </div>
      
      <div className="mt-3 sm:mt-4 pt-2 border-t border-black">
        <button className="w-full text-xs py-1 sm:py-2 border-2 border-dashed border-black bg-gray-50 hover:bg-gray-200">
          SHOW MORE
        </button>
      </div>
    </div>
  );
}

export default FriendSuggestions;