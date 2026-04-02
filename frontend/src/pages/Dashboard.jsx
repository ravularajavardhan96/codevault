import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import SnippetCard from '../components/SnippetCard';

const Dashboard = () => {
  const [snippets, setSnippets] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const fetchSnippets = async (q = '') => {
    try {
      // const res = await axios.get(`https://codevault-k7wu.onrender.com/api/snippets${q ? `?q=${q}` : ''}`, {  headers: { Authorization: `Bearer ${token}` });
      const res = await axios.get(`https://codevault-k7wu.onrender.com/api/snippets${q ? `?q=${q}` : ''}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSnippets(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSnippets();
  }, []);

  // debounce search so we dont hit backend on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSnippets(search);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://codevault-k7wu.onrender.com/api/snippets/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSnippets(snippets.filter(s => s._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.top}>
        <h2 style={styles.title}>Your Snippets</h2>
        <input
          style={styles.search}
          type="text"
          placeholder="Search by title or tag..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {loading && <p style={styles.msg}>Loading...</p>}
      {!loading && snippets.length === 0 && (
        <p style={styles.msg}>No snippets yet. Add your first one!</p>
      )}

      <div style={styles.grid}>
        {snippets.map(snippet => (
          <SnippetCard
            key={snippet._id}
            snippet={snippet}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '32px 24px',
    background: '#181825',
    minHeight: '100vh',
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '12px',
  },
  title: { color: '#cdd6f4', margin: 0 },
  search: {
    padding: '8px 14px',
    background: '#313244',
    border: '1px solid #45475a',
    borderRadius: '8px',
    color: '#cdd6f4',
    fontSize: '0.9rem',
    width: '260px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
    gap: '20px',
  },
  msg: { color: '#6c7086', textAlign: 'center', marginTop: '60px' }
};

export default Dashboard;