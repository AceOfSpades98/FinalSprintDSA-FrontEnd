import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Previous from '../pages/Previous'

global.fetch = vi.fn()
afterEach(() => fetch.mockReset())

test('loads and renders previous trees', async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [
      { id: 1, input: '1,2,3', treeJson: '{"root":1}', createdAt: '2025-01-01' },
      { id: 2, input: '7 4 9', treeJson: '{"root":7}', createdAt: '2025-01-02' },
    ],
  })

  render(
    <MemoryRouter>
      <Previous />
    </MemoryRouter>
  )

  const items = await screen.findAllByRole('listitem')
  expect(items).toHaveLength(2)
  expect(items[0]).toHaveTextContent(/Input:\s*1,2,3/)
  expect(items[0]).toHaveTextContent(/Created:\s*2025-01-01/)
  expect(items[1]).toHaveTextContent(/Input:\s*7 4 9/)
  expect(items[1]).toHaveTextContent(/Created:\s*2025-01-02/)
})
