import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>CodeVault</Link>
      <div>
        {user ? (
          <>
            <span style={styles.username}>Hey, {user.username}</span>
            <Link to="/new" style={styles.btn}>+ New Snippet</Link>
            <button onClick={handleLogout} style={styles.logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.btn}>Login</Link>
            <Link to="/register" style={styles.btn}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 24px',
    background: '#1e1e2e',
    color: 'white',
  },
  brand: {
    color: '#cba6f7',
    textDecoration: 'none',
    fontSize: '1.4rem',
    fontWeight: 'bold',
  },
  username: {
    marginRight: '16px',
    color: '#cdd6f4',
    fontSize: '0.9rem',
  },
  btn: {
    marginLeft: '12px',
    padding: '6px 14px',
    background: '#cba6f7',
    color: '#1e1e2e',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '0.85rem',
    fontWeight: 'bold',
  },
  logout: {
    marginLeft: '12px',
    padding: '6px 14px',
    background: 'transparent',
    color: '#f38ba8',
    border: '1px solid #f38ba8',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.85rem',
  }
};

export default Navbar;