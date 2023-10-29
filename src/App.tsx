import { useState, useEffect } from 'react';
import axios from 'axios';

import { api } from './api/api';
import { User } from './types/user';

function App() {
  const [user, setUser] = useState<User[]>(
    JSON.parse(localStorage.getItem('user') || '[]')
  );

  const fetchData = async () => {
    const {
      data: { results },
    } = await axios.get(api);
    setUser(results);
    localStorage.setItem('user', JSON.stringify(results));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <main className='flex flex-col justify-center items-center h-screen'>
      {user.length > 0 && (
        <div className='flex flex-col gap-2 bg-[#79A7D3] p-4 rounded-md text-[#303030] shadow-2xl'>
          <p>{`${user[0]?.name.first} ${user[0]?.name.last}`}</p>
          <p>{user[0]?.email}</p>
          <button
            className='bg-[#6883BC] p-2 rounded-lg'
            onClick={handleRefresh}
          >
            Get User
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
