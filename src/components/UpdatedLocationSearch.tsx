// Updated LocationSearch component - Example of replacing mock data with TanStack Query
import React, { useState } from 'react';
import { MapPin, Search } from 'lucide-react';
import { useCitySuggestions } from '../hooks/useLocations';

interface LocationSearchProps {
    value: string;
    onChange: (location: string) => void;
    placeholder?: string;
}

const UpdatedLocationSearch = ({ value, onChange, placeholder = "Search location..." }: LocationSearchProps) => {
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Replace mock data with real API call
    const suggestions = useCitySuggestions(value);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        onChange(inputValue);
        setShowSuggestions(inputValue.length > 0);
    };

    const handleSuggestionClick = (suggestion: string) => {
        onChange(suggestion);
        setShowSuggestions(false);
    };

    return (
        <div className="relative">
            <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                    type="text"
                    value={value}
                    onChange={handleInputChange}
                    onFocus={() => setShowSuggestions(value.length > 0)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={placeholder}
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {suggestions.map((suggestion, index) => (
                        <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-b-0"
                        >
                            <div className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4 text-slate-400" />
                                <span className="text-slate-700">{suggestion}</span>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UpdatedLocationSearch;