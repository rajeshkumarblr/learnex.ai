import { Book, Category } from '@/types/books';

export interface Book {
  _id: string;  // Changed from id to _id to match MongoDB
  title: string;
  description: string;
  pdf_url: string;
}

export interface Chapter {
  _id: string;  // Changed from id to _id to match MongoDB
  title: string;
  page_number: number;
  book_id: string;
  parent_id?: string;
}

const API_BASE_URL = 'http://localhost:8000/api';

export const fetchBooks = async (): Promise<Book[]> => {
  const response = await fetch(`${API_BASE_URL}/books`);
  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }
  const books = await response.json();
  return books;
};

export const fetchBook = async (bookId: string): Promise<Book> => {
  const response = await fetch(`${API_BASE_URL}/books/${bookId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch book');
  }
  return response.json();
};

export const downloadBook = async (bookId: string): Promise<Blob> => {
  const response = await fetch(`${API_BASE_URL}/books/${bookId}/download`);
  if (!response.ok) {
    throw new Error('Failed to download book');
  }
  return response.blob();
};

export const fetchChapters = async (bookId: string): Promise<Chapter[]> => {
  console.log('Fetching chapters with bookId:', bookId);
  const response = await fetch(`${API_BASE_URL}/books/${bookId}/chapters`);
  if (!response.ok) {
    throw new Error('Failed to fetch chapters');
  }
  return response.json();
};

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${API_BASE_URL}/categories`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
};

export const fetchBooksByCategory = async (categoryId: string): Promise<Book[]> => {
  const response = await fetch(`${API_BASE_URL}/categories/${categoryId}/books`);
  if (!response.ok) {
    throw new Error('Failed to fetch books for category');
  }
  return response.json();
};