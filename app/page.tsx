"use client";

import Link from '@/node_modules/next/link';
import { useState } from 'react';

export default function Home() {
	const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
	const [itemCount, setItemCount] = useState(0);

    const handleSearch = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        setLoading(true);  // Start loading state
		setResults([]);    // Clear previous results
		setItemCount(0);   // Reset item count


        try {
            // Fetch data from the external API
            const response = await fetch(`https://businessautomata.com/ip-cores/api/search/ips?q=${encodeURIComponent(query)}`);
            const data = await response.json();

            // Extract relevant information (e.g., title and author)
            const formattedResults = data.payload.map((ip: { slug: string; name: string; overview: string; short_desc: string; }) => ({
                slug: ip.slug,
                name: ip.name,
                short_desc: ip.overview ? ip.overview : ip.short_desc,
            }));

            setResults(formattedResults);  // Update results state
			setItemCount(formattedResults.length);  // Update item count
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);  // End loading state
        }
    };
  	return (
    	<div className="min-h-screen bg-gradient-to-br from-teal-200 to-blue-300 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">IP Core 2.0</h1>
                
                <form onSubmit={handleSearch} className="flex space-x-3 mb-8">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Type to search IP Core..."
                        className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-400"
                    />
                    <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600">
                        Search
                    </button>
                </form>
                
                {loading ? (
                    <p className="text-gray-500 text-center">Loading...</p>
                ) : (
					<div>
						<p className="text-gray-700 text-center mb-4">
                            {itemCount > 0 ? `${itemCount} IP(s) Found` : "No IP Found!"}
                        </p>
						<div className="space-y-3">
							{results.map((result, index) => (
								<div key={index} className="bg-slate-50 p-4 mb-4 rounded-lg shadow-md">
									<h3 className="text-xl font-semibold text-gray-800">{result['name']}</h3>
									<p className="text-gray-600">{result['short_desc']}</p>
                                    <p className="text-blue-600 mt-3 text-right text-sm"><Link href={"ip-details/" + result['slug']}>Get Details</Link></p>
								</div>
							))}
                    	</div>
					</div>
                    
                )}
            </div>
        </div>
  	);
}
