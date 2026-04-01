import { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

const SnippetCard = ({ snippet, onDelete }) => {
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [snippet.code]);

  return (
    <div style={styles.card}>
      <div style={styles.top}>
        <div>
          <h3 style={styles.title}>{snippet.title}</h3>
          <span style={styles.lang}>{snippet.language}</span>
        </div>
        <button onClick={() => onDelete(snippet._id)} style={styles.delete}>✕</button>
      </div>

      <pre style={styles.pre}>
        <code ref={codeRef} className={`language-${snippet.language}`}>
          {snippet.code}
        </code>
      </pre>

      {snippet.tags.length > 0 && (
        <div style={styles.tags}>
          {snippet.tags.map((tag, i) => (
            <span key={i} style={styles.tag}>#{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  card: {
    background: '#1e1e2e',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid #313244',
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px',
  },
  title: { color: '#cdd6f4', margin: '0 0 4px 0', fontSize: '1rem' },
  lang: {
    fontSize: '0.75rem',
    background: '#313244',
    color: '#89b4fa',
    padding: '2px 8px',
    borderRadius: '4px',
  },
  delete: {
    background: 'transparent',
    border: 'none',
    color: '#f38ba8',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  pre: {
    margin: '0 0 12px 0',
    borderRadius: '8px',
    overflow: 'auto',
    maxHeight: '200px',
    fontSize: '0.85rem',
  },
  tags: { display: 'flex', flexWrap: 'wrap', gap: '6px' },
  tag: {
    fontSize: '0.75rem',
    color: '#a6e3a1',
    background: '#1e1e2e',
    border: '1px solid #a6e3a1',
    padding: '2px 8px',
    borderRadius: '20px',
  }
};

export default SnippetCard;