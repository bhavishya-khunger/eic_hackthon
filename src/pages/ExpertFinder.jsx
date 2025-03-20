import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Search } from "lucide-react";

const ExpertFinder = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [aiSuggestion, setAiSuggestion] = useState(null);

    const handleSearch = async () => {
        if (!query) return;

        // Simulating API call for results
        const dummyResults = [
            { name: "Dr. John Doe", platform: "LinkedIn", link: "https://linkedin.com/in/johndoe" },
            { name: "Jane AI", platform: "GitHub", link: "https://github.com/janeai" },
            { name: "AI Robotics Hub", platform: "Twitter", link: "https://twitter.com/airobotics" }
        ];

        // Simulating AI-generated suggestion
        const dummyAISuggestion = `Based on your query '${query}', Dr. John Doe is a top expert on LinkedIn.`;

        setResults(dummyResults);
        setAiSuggestion(dummyAISuggestion);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center gap-6">
            {/* Search Bar */}
            <div className="w-full max-w-lg flex items-center gap-2">
                <input
                    type="text"
                    className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Find an expert for..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                    <Search size={20} />
                </button>
            </div>

            {/* AI Suggestion */}
            {aiSuggestion && (
                <div className="p-4 bg-gray-800 rounded-lg text-center text-sm max-w-lg">
                    {aiSuggestion}
                </div>
            )}

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
                {results.map((expert, index) => (
                    <div key={index} className="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold">{expert.name}</h3>
                        <p className="text-sm text-gray-400">Platform: {expert.platform}</p>
                        <a
                            href={expert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline block mt-2"
                        >
                            View Profile
                        </a>
                        <div className="flex justify-center mt-2">
                            <QRCodeCanvas value={expert.link} size={50} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ExpertFinder;