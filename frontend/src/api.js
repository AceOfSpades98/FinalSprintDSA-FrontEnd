export async function postNumbers(numbers) {
  const body = new URLSearchParams({ numbers });
  const res = await fetch('/api/process-numbers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(text);
  return text;
}

export async function getPreviousTrees() {
  const res = await fetch('/api/previous-trees');
  if (!res.ok) throw new Error('Failed to fetch previous trees');
  return res.json();
}
