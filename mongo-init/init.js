print('Start MongoDB initialization');

db = db.getSiblingDB('learnex');
print('Connected to learnex database');

// Create categories collection
try {
    db.createCollection('categories');
    print('Created categories collection');
} catch (e) {
    print('Categories collection may already exist: ' + e.message);
}

// Insert categories
db.categories.deleteMany({});  // Clear existing data
print('Cleared existing categories');

db.categories.insertMany([
    { 
        _id: 'python', 
        name: 'Python', 
        order: 1 
    },
    { 
        _id: 'python_basic', 
        name: 'Basic', 
        parent_id: 'python', 
        order: 1 
    },
    { 
        _id: 'python_advanced', 
        name: 'Advanced', 
        parent_id: 'python', 
        order: 2 
    }
]);
print('Inserted categories');

// Create books collection
try {
    db.createCollection('books');
    print('Created books collection');
} catch (e) {
    print('Books collection may already exist: ' + e.message);
}

// Insert books
db.books.deleteMany({});  // Clear existing data
print('Cleared existing books');

db.books.insertMany([
    {
        _id: '1',
        title: 'Introduction to Python Programming',
        description: 'A comprehensive introduction to Python programming covering fundamentals, data structures, algorithms, and applications.',
        pdf_url: '/pdfs/python_intro.pdf',
        category_id: 'python_basic'
    },
    {
        _id: '2',
        title: 'Problem Solving with Algorithms and Data Structures',
        description: 'A comprehensive guide to data structures and algorithms in Python, covering advanced programming concepts, algorithm analysis, and problem-solving techniques.',
        pdf_url: '/pdfs/python_advanced.pdf',
        category_id: 'python_advanced'
    }
]);
print('Inserted books');

print('MongoDB initialization completed');