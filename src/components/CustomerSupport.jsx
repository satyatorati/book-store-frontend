import React, { useState } from 'react';
import { FaComments, FaTimes } from 'react-icons/fa';
import axios from 'axios';

// Configure axios base URL
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

// Add request interceptor for better error handling
axios.interceptors.request.use(
    config => {
        console.log('Making request to:', config.url);
        return config;
    },
    error => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Add response interceptor for better error handling
axios.interceptors.response.use(
    response => {
        console.log('Response received:', response.config.url);
        return response;
    },
    async error => {
        console.error('Response error:', error.response || error);
        
        // If the error is a network error or timeout, retry the request
        if (error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED') {
            const config = error.config;
            if (!config._retry) {
                config._retry = true;
                try {
                    return await axios(config);
                } catch (retryError) {
                    return Promise.reject(retryError);
                }
            }
        }
        
        return Promise.reject(error);
    }
);

const CustomerSupport = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputMessage, setInputMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [threadId, setThreadId] = useState(null);
    const [error, setError] = useState(null);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        const userMessage = inputMessage.trim();
        setInputMessage('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);
        setError(null);

        try {
            console.log('Sending message to:', `${import.meta.env.VITE_API_URL}/api/chat`);
            const response = await axios.post('/api/chat', {
                message: userMessage,
                threadId
            }, {
                timeout: 30000 // 30 second timeout
            });

            setMessages(prev => [...prev, { role: 'assistant', content: response.data.message }]);
            setThreadId(response.data.threadId);
        } catch (error) {
            console.error('Error sending message:', error.response?.data || error.message);
            setError('Sorry, I encountered an error. Please try again later. If the problem persists, please contact support.');
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: 'Sorry, I encountered an error. Please try again later. If the problem persists, please contact support.' 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {!isOpen ? (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                >
                    <FaComments size={24} />
                </button>
            ) : (
                <div className="bg-white rounded-lg shadow-xl w-96 h-[600px] flex flex-col">
                    <div className="p-4 border-b flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Customer Support</h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <FaTimes size={20} />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-lg p-3 ${
                                        msg.role === 'user'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-800'
                                    }`}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-100 rounded-lg p-3 text-gray-800">
                                    Typing...
                                </div>
                            </div>
                        )}
                    </div>
                    <form onSubmit={handleSendMessage} className="p-4 border-t">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !inputMessage.trim()}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CustomerSupport; 