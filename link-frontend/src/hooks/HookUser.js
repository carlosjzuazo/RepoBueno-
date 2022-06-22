import { useEffect, useState } from 'react';
import { getUserPostsRequest } from '../requests';

export const HookUser = (id) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);

        const data = await getUserPostsRequest(id);
        console.log(data, setUser);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [id]);

  return { user, loading, error };
};

export default HookUser;
