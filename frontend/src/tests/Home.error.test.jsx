import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from '../pages/Home'

global.fetch = vi.fn()
afterEach(() => fetch.mockReset())

test('shows error when backend returns 400', async () => {
  fetch.mockResolvedValueOnce({
    ok: false,
    text: async () => '{"error":"Please enter at least one valid integer."}',
  })

  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  )

  fireEvent.change(screen.getByPlaceholderText(/e\.g\./i), {
    target: { value: '; , ' },
  })
  fireEvent.submit(screen.getByRole('form', { name: 'numbers-form' }))

  await waitFor(() =>
    expect(screen.getByTestId('json-error'))
      .toHaveTextContent('{"error":"Please enter at least one valid integer."}')
  )
})
