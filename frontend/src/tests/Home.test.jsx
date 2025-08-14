import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from '../pages/Home'

global.fetch = vi.fn()
afterEach(() => fetch.mockReset())

test('submits numbers and displays returned JSON', async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    text: async () => '{"root":5}',
  })

  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  )

  fireEvent.change(screen.getByPlaceholderText(/e\.g\./i), {
    target: { value: '5,3,7' },
  })
  fireEvent.submit(screen.getByRole('form', { name: 'numbers-form' }))

  await waitFor(() =>
    expect(screen.getByTestId('json-output')).toHaveTextContent(/"root": 5/)
  )

  expect(fetch).toHaveBeenCalledWith('/api/process-numbers', expect.any(Object))
})
