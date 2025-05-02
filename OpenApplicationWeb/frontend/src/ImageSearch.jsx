import React, { useState } from "react";

const ImageSearch = () => {
    const [query, setQuery] = useState("");
    const [images, setImages] = useState([]);  // Initialize as an empty array
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        try {
            // Log the query for debugging
            console.log("Searching for:", query);

            // Fetch images based on the search query
            const response = await fetch(`http://localhost:5000/search_images?q=${query}`);

            // Check if the response is successful
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Log the response data for debugging
            const data = await response.json();
            console.log("API Response Data:", data);

            // Check if the API returns images
            if (data.results && data.results.length > 0) {
                setImages(data.results.map(img => ({
                    url: img.thumbnail || img.url,
                    title: img.title || 'Untitled Image'
                })));
                setError(null);  // Clear any previous errors
            } else {
                setImages([]);
                setError("No images found for your search.");
            }
        } catch (e) {
            // Log the error and set the error message
            console.error("Error fetching images:", e);
            setError("Error fetching images. Please try again.");
            setImages([]);  // Set to an empty array on error
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h2>Image Search</h2>
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
            {error && <p style={{ color: "red" }}>{error}</p>}
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
                            backgroundColor: "#fff",
                            transition: "transform 0.3s ease, box-shadow 0.3s ease"
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
