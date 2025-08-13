import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPreviousTrees } from '../api'

export default function Previous() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    getPreviousTrees()
      .then(setItems)
      .catch((e) => setError(e.message || String(e)))
  }, [])

  return (
    <div className="container">
      <h1>Previous Trees</h1>
      <p><Link to="/">← Back</Link></p>

      {error && <div className="errorTxt">{error}</div>}
      {!error && items.length === 0 && <div>No records yet.</div>}

      <ul className="list">
        {items.map((t) => (
          <li key={t.id} className="card">
            <div><strong>Input:</strong> {t.input}</div>
            <div><strong>Created:</strong> {t.createdAt}</div>
            <details>
              <summary>Show JSON</summary>
              <pre className="code">{t.treeJson}</pre>
            </details>
          </li>
        ))}
      </ul>
    </div>
  )
}
