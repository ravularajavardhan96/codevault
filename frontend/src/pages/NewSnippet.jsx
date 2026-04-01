import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const languages = [
  'javascript', 'python', 'java', 'c', 'cpp',
  'typescript', 'html', 'css', 'bash', 'sql'
];

const NewSnippet = () => {
  const [form, setForm] = useState({ title: '', code: '', language: 'javascript', tags: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.code.trim()) return setError('Code cannot be empty');
    setLoading(true);
    try {
      await axios.post('https://codevault-k7wu.onrender.com/api/snippets', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.msg || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>New Snippet</h2>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            required
          />

          <select
            style={styles.input}
            value={form.language}
            onChange={e => setForm({ ...form, language: e.target.value })}
          >
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>

          <textarea
            style={{ ...styles.input, height: '200px', resize: 'vertical', fontFamily: 'monospace' }}
            placeholder="Paste your code here..."
            value={form.code}
            onChange={e => setForm({ ...form, code: e.target.value })}
            required
          />

          <input
            style={styles.input}
            type="text"
            placeholder="Tags (comma separated) e.g. react, hooks, api"
            value={form.tags}
            onChange={e => setForm({ ...form, tags: e.target.value })}
          />

          <div style={styles.actions}>
            <button
              type="button"
              onClick={() => navigate('/')}
              style={styles.cancel}
            >
              Cancel
            </button>
            <button type="submit" style={styles.btn} disabled={loading}>
              {loading ? 'Saving...' : 'Save Snippet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: '#181825',
    display: 'flex',
    justifyContent: 'center',
    padding: '40px 24px',
  },
  card: {
    background: '#1e1e2e',
    padding: '40px',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '600px',
    height: 'fit-content',
  },
  title: { color: '#cdd6f4', marginBottom: '24px' },
  error: { color: '#f38ba8', marginBottom: '12px', fontSize: '0.85rem' },
  input: {
    width: '100%',
    padding: '10px 14px',
    marginBottom: '14px',
    background: '#313244',
    border: '1px solid #45475a',
    borderRadius: '8px',
    color: '#cdd6f4',
    fontSize: '0.95rem',
    boxSizing: 'border-box',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '8px',
  },
  btn: {
    padding: '10px 24px',
    background: '#cba6f7',
    color: '#1e1e2e',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '0.95rem',
    cursor: 'pointer',
  },
  cancel: {
    padding: '10px 24px',
    background: 'transparent',
    color: '#6c7086',
    border: '1px solid #45475a',
    borderRadius: '8px',
    fontSize: '0.95rem',
    cursor: 'pointer',
  }
};

export default NewSnippet;