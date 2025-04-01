import React, { useEffect, useState } from 'react';
import BookCard from '../books/BookCard';
import axios from 'axios';

const AllBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                // Using the correct API URL with port 3000
                const response = await axios.get('http://localhost:3000/api/books');
                console.log('API Response:', response.data); // Debug log
                
                if (Array.isArray(response.data)) {
                    setBooks(response.data);
                } else {
                    console.error('Unexpected response format:', response.data);
                    setError('Failed to load books. Please try again later.');
                }
            } catch (error) {
                console.error('Error fetching books:', error);
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.error('Error response:', error.response.data);
                    console.error('Error status:', error.response.status);
                    setError(`Failed to load books: ${error.response.data.message || 'Server error'}`);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error('No response received:', error.request);
                    setError('No response from server. Please check if the server is running.');
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error('Error setting up request:', error.message);
                    setError('Failed to load books. Please try again later.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading books...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="text-center py-8">
                    <p className="text-red-500">{error}</p>
                    <p className="text-sm text-gray-500 mt-2">Please make sure the backend server is running on port 3000</p>
                </div>
            </div>
        );
    }

    if (!books.length) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="text-center py-8">
                    <p className="text-gray-600">No books available at the moment.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-8">All Available Books</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {books.map((book) => (
                    <div key={book._id} className="bg-white p-6 rounded-lg shadow-md">
                        <BookCard book={book} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllBooks; 