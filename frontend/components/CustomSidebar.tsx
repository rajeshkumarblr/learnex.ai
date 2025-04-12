"use client";
import React, { useEffect, useState } from "react";
import { Loader2, ChevronRight, ChevronDown } from "lucide-react";
import { Book, Category } from "@/types/books";
import { fetchCategories, fetchBooksByCategory } from "@/services/bookService";
import { cn } from "@/lib/utils";

interface CustomSidebarProps {
  onBookSelect: (book: Book) => void;
}

const CustomSidebar = ({ onBookSelect }: CustomSidebarProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryBooks, setCategoryBooks] = useState<Record<string, Book[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
      
      // Automatically expand all categories
      const allCategoryIds = new Set(fetchedCategories.map(cat => cat._id));
      setExpandedCategories(allCategoryIds);
      
      // Load books for all categories
      fetchedCategories.forEach(category => {
        loadBooksForCategory(category._id);
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      setError('Failed to load categories');
      setLoading(false);
    }
  };

  const loadBooksForCategory = async (categoryId: string) => {
    try {
      const books = await fetchBooksByCategory(categoryId);
      setCategoryBooks(prev => ({
        ...prev,
        [categoryId]: books
      }));
    } catch (error) {
      console.error(`Failed to fetch books for category ${categoryId}:`, error);
    }
  };

  const toggleCategory = async (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
        if (!categoryBooks[categoryId]) {
          loadBooksForCategory(categoryId);
        }
      }
      return newSet;
    });
  };

  const renderCategoryTree = (categories: Category[], parentId?: string, level: number = 0) => {
    const categoryItems = categories
      .filter(cat => cat.parent_id === parentId)
      .sort((a, b) => a.order - b.order);

    if (categoryItems.length === 0) return null;

    return categoryItems.map(category => {
      const isExpanded = expandedCategories.has(category._id);
      const hasChildren = categories.some(cat => cat.parent_id === category._id);
      const books = categoryBooks[category._id] || [];

      return (
        <div key={category._id} className="flex flex-col">
          <div
            className={cn(
              "flex items-center cursor-pointer hover:bg-gray-200 rounded p-2",
              { "ml-4": level > 0 }
            )}
            onClick={() => toggleCategory(category._id)}
          >
            {(hasChildren || books.length > 0) && (
              isExpanded ? <ChevronDown className="h-4 w-4 mr-1" /> : <ChevronRight className="h-4 w-4 mr-1" />
            )}
            <span className="font-medium">{category.name}</span>
          </div>

          {isExpanded && (
            <div className="ml-4">
              {renderCategoryTree(categories, category._id, level + 1)}
              {books.map(book => (
                <div
                  key={book._id}
                  className="p-2 rounded cursor-pointer hover:bg-gray-200"
                  onClick={() => onBookSelect(book)}
                >
                  <div className="font-medium">{book.title}</div>
                  <div className="text-sm text-gray-500 truncate">
                    {book.description}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="w-64 border-r bg-gray-50 overflow-hidden flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Books</h2>
      </div>
      
      <div className="overflow-y-auto flex-1 p-4">
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-red-500 text-sm">{error}</div>
        ) : (
          <div className="space-y-2">
            {renderCategoryTree(categories)}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSidebar;
