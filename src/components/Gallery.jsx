import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { CLOUDFRONT_URL } from "../config";
import "react-lazy-load-image-component/src/effects/blur.css";

const galleryData = {
  2024: [
    "001.jpg",
    "002.jpg",
    "003.jpg",
    "004.jpg",
    "005.jpg",
    "006.jpg",
    "007.jpg",
    "008.jpg",
    "009.jpg",
    "010.jpg",
    "011.jpg",
    "012.jpg",
    "013.jpg",
    "014.jpg",
    "015.jpg",
    "016.jpg",
    "017.jpg",
    "018.jpg",
  ],
  2023: ["2023_01.jpg", "2023_02.jpg", "2023_03.jpg", "2023_04.jpg"],
};

const Gallery = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedYear, setSelectedYear] = useState("2024");

  const openModal = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage("");
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div className="gallery-content">
      <div className="gallery-video-container">
        <video
          src={`${CLOUDFRONT_URL}/fullComp.mp4`}
          type="video/mp4"
          controls
          className="gallery-video"
        />
        <h1 id="videoHeader">2024 Highlight Reel</h1>
      </div>

      <div className="year-selector">
        <label htmlFor="yearDropdown">Select Year: </label>
        <select
          id="yearDropdown"
          value={selectedYear}
          onChange={handleYearChange}
          className="year-dropdown"
        >
          {Object.keys(galleryData).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <h1 id="photoHeader">Photos: {selectedYear}</h1>

      <div className="photos-grid">
        {galleryData[selectedYear].map((filename, index) => (
          <div
            key={index}
            className="photo-wrapper"
            onClick={() => openModal(`/${filename}`)}
          >
            <LazyLoadImage
              src={`/${filename}`}
              alt={`Gallery Photo ${index + 1}`}
              effect="blur"
              placeholderSrc="/placeholder.jpg" // Optional placeholder
              className="photo"
            />
          </div>
        ))}
      </div>

      {/* Modal for Viewing Larger Images */}
      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Full View" className="modal-image" />
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
