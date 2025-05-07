import React, { useState, useEffect } from "react";

const ImageSearch = () => {
    const [query, setQuery] = useState(""); // The search query
    const [images, setImages] = useState([]); // List of images returned by the API
    const [error, setError] = useState(null); // Any error message
    const [filter, setFilter] = useState({
        type: "", // Filter by image type (e.g., photo, illustration)
        sort: "relevance", // Sort by relevance or date
        size: "", // Filter by image size (e.g., small, medium, large)
        dateRange: "", // Filter by date range (e.g., last week, last month)
    });
    const [searchHistory, setSearchHistory] = useState([]); // Recent search history
    const [isHistoryVisible, setIsHistoryVisible] = useState(false); // Toggle history visibility

    useEffect(() => {
        // Load search history from localStorage when the component mounts
        const storedHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
        setSearchHistory(storedHistory);
    }, []);

    const handleSearch = async () => {
        try {
            const filterParams = new URLSearchParams({
                q: query,
            });

            if (filter.type) filterParams.append("type", filter.type);
            if (filter.sort) filterParams.append("sort", filter.sort);
            if (filter.size) filterParams.append("size", filter.size);
            if (filter.dateRange) filterParams.append("dateRange", filter.dateRange);

            console.log(`Fetching from: http://localhost:5000/search_images?${filterParams.toString()}`);

            const response = await fetch(`http://localhost:5000/search_images?${filterParams.toString()}`);

            if (!response.ok) {
                const errorDetails = await response.text();
                console.error("Server Error Details:", errorDetails);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.results && data.results.length > 0) {
                setImages(data.results.map(img => ({
                    url: img.thumbnail || img.url,
                    title: img.title || 'Untitled Image',
                })));
                setError(null);
            } else {
                setImages([]);
                setError("No images found for your search.");
            }

            // Add the current search to history, ensuring it's unique and within a limit of 10
            if (query.trim() !== "") {
                const newHistory = [query, ...searchHistory.filter((search) => search !== query)].slice(0, 10);
                setSearchHistory(newHistory);
                localStorage.setItem("searchHistory", JSON.stringify(newHistory));
            }
        } catch (e) {
            console.error("Error fetching images:", e);
            setError("Error fetching images. Please try again.");
            setImages([]);
        }
    };

    const handleSelectHistoryItem = (item) => {
        setQuery(item);
        handleSearch(); // Perform search again with the selected history item
    };

    const handleClearHistory = () => {
        setSearchHistory([]);
        localStorage.removeItem("searchHistory");
    };

    const handleClearHistoryItem = (item) => {
        const updatedHistory = searchHistory.filter(search => search !== item);
        setSearchHistory(updatedHistory);
        localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    };

    const toggleHistoryVisibility = () => {
        setIsHistoryVisible((prev) => !prev); // Toggle visibility of history list
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h2>Advanced Image Search</h2>
            <div style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for images..."
                    style={{
                        padding: "10px",
                        fontSize: "16px",
                        width: "300px",
                        borderRadius: "5px",
                        border: "1px solid #ccc"
                    }}
                />
                <button
                    onClick={handleSearch}
                    style={{
                        padding: "10px 15px",
                        fontSize: "16px",
                        marginLeft: "10px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}
                >
                    Search
                </button>
            </div>

            {/* Show History Button */}
            <button
                onClick={toggleHistoryVisibility}
                style={{
                    padding: "10px 15px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginBottom: "20px",
                }}
            >
                {isHistoryVisible ? "Hide Search History" : "Show Search History"}
            </button>

            {/* Search History List */}
            {isHistoryVisible && searchHistory.length > 0 && (
                <div style={{ marginBottom: "20px" }}>
                    <h3>Search History</h3>
                    <ul style={{ paddingLeft: "20px" }}>
                        {searchHistory.map((historyItem, index) => (
                            <li key={index} style={{ cursor: "pointer", color: "#007bff" }} onClick={() => handleSelectHistoryItem(historyItem)}>
                                {historyItem}
                                <button 
                                    onClick={(e) => { e.stopPropagation(); handleClearHistoryItem(historyItem); }} 
                                    style={{ marginLeft: "10px", color: "red", cursor: "pointer", background: "none", border: "none" }}>
                                    X
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleClearHistory} style={{ padding: "10px 15px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                        Clear History
                    </button>
                </div>
            )}

            {/* Filter Options */}
            <div style={{ marginBottom: "20px" }}>
                <select
                    value={filter.type}
                    onChange={(e) => setFilter({ ...filter, type: e.target.value })}
                    style={{ padding: "10px", marginRight: "10px" }}
                >
                    <option value="">All Types</option>
                    <option value="photo">Photo</option>
                    <option value="illustration">Illustration</option>
                    <option value="icon">Icon</option>
                </select>

                <select
                    value={filter.sort}
                    onChange={(e) => setFilter({ ...filter, sort: e.target.value })}
                    style={{ padding: "10px", marginRight: "10px" }}
                >
                    <option value="relevance">Sort by Relevance</option>
                    <option value="date">Sort by Date</option>
                </select>

                <select
                    value={filter.size}
                    onChange={(e) => setFilter({ ...filter, size: e.target.value })}
                    style={{ padding: "10px", marginRight: "10px" }}
                >
                    <option value="">Any Size</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </select>

                <select
                    value={filter.dateRange}
                    onChange={(e) => setFilter({ ...filter, dateRange: e.target.value })}
                    style={{ padding: "10px" }}
                >
                    <option value="">Any Date</option>
                    <option value="last_week">Last Week</option>
                    <option value="last_month">Last Month</option>
                    <option value="last_year">Last Year</option>
                </select>
            </div>

            {/* Error Message */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Images Grid */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "15px",
                marginTop: "20px"
            }}>
                {images.length > 0 ? (
                    images.map((image, index) => (
                        <div key={index} style={{
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            padding: "10px",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                            textAlign: "center",
                            backgroundColor: "#fff"
                        }}>
                            <img
                                src={image.url}
                                alt={image.title}
                                style={{
                                    width: "100%",
                                    borderRadius: "8px",
                                    objectFit: "cover",
                                    height: "200px"
                                }}
                            />
                            <p style={{
                                marginTop: "10px",
                                fontWeight: "bold",
                                color: "#333"
                            }}>{image.title}</p>
                        </div>
                    ))
                ) : (
                    <p>No images to display. Try searching for something!</p>
                )}
            </div>
        </div>
    );
};

export default ImageSearch;
