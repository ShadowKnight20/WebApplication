import React, { useState } from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

const ImageSearch = () => {
    const [query, setQuery] = useState("");
    const [images, setImages] = useState([]);  // Initialize as an empty array instead of undefined
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        try {
            // Changed from query to q to match the backend expectation
            const response = await fetch(`http://localhost:5000/search_images?q=${query}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            // The API returns results in a nested structure, so we need to extract the actual images
            if (data.results) {
                setImages(data.results.map(img => ({
                    url: img.thumbnail || img.url,
                    title: img.title || 'Untitled Image'
                })));
            } else {
                setImages([]);
            }
            setError(null);
        } catch (e) {
            console.error("Error fetching images:", e);
            setError("Error fetching images. Please try again.");
            setImages([]);  // Set as empty array on error
        }
    };

    return (
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
        <div>
            <h2>Image Search</h2>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for images..."
            />
            <button onClick={handleSearch}>Search</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                {images.length > 0 ? (
                    images.map((image, index) => (
                        <div key={index}>
                            <img src={image.url} alt={image.title} style={{ maxWidth: "100%" }} />
                            <p>{image.title}</p>
>>>>>>> parent of 39cb64d (Update Image)
=======
        <div>
            <h2>Image Search</h2>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for images..."
            />
            <button onClick={handleSearch}>Search</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                {images.length > 0 ? (
                    images.map((image, index) => (
                        <div key={index}>
                            <img src={image.url} alt={image.title} style={{ maxWidth: "100%" }} />
                            <p>{image.title}</p>
>>>>>>> parent of 39cb64d (Update Image)
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