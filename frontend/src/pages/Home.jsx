import { useState } from 'react'
import { Link } from 'react-router-dom'
import { postNumbers } from '../api'

export default function Home() {
  const [numbers, setNumbers] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setOutput('')
    setError('')
    try {
      const jsonText = await postNumbers(numbers)
     
      try { setOutput(JSON.stringify(JSON.parse(jsonText), null, 2)) }
      catch { setOutput(jsonText) }
    } catch (err) {
      setError(err.message || String(err))
    }
  }

  return (
    <div className="container">
      <h1>Binary Tree Builder</h1>
      <p>Enter integers separated by commas, spaces, or semicolons.</p>

      <form aria-label="numbers-form" onSubmit={handleSubmit}>
        <label>
          Numbers
          <input
            placeholder="e.g. 5,3,7 2;9"
            value={numbers}
            onChange={(e) => setNumbers(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      <section className="panel">
        <h2>Returned JSON</h2>
        <pre data-testid="json-output" className="code">{output}</pre>
        {error && (
          <>
            <strong className="errLabel">Error</strong>
            <pre data-testid="json-error" className="code error">{error}</pre>
          </>
        )}
      </section>

      <p style={{ marginTop: 16 }}>
        <Link to="/previous">See previous trees →</Link>
      </p>
    </div>
  )
}
