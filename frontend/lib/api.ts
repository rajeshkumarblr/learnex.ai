export async function getBooks() {
  const response = await fetch('http://localhost:8000/api/books');
  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }
  return response.json();
}

export async function getBook(bookId: string) {
  const response = await fetch(`http://localhost:8000/api/books/${bookId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch book');
  }
  return response.json();
}