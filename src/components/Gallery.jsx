import React, { useState } from "react";
import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { CLOUDFRONT_URL } from "../config";
import "react-lazy-load-image-component/src/effects/blur.css";

const galleryImages = [
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
  "019.jpg",
];

const Gallery = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const openModal = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage("");
  };

  return (
    <div className="gallery-content">
      {/* Video Section */}
      <div className="gallery-video-container">
        <video
          src={`${CLOUDFRONT_URL}/fullComp.mp4`}
          type="video/mp4"
          controls
          className="gallery-video"
        />
      </div>

      {/* Photos Section */}
      <div className="photos-grid">
        {galleryImages.map((filename, index) => (
          <div
            key={index}
            className="photo-wrapper"
            onClick={() => openModal(`${CLOUDFRONT_URL}/${filename}`)}
          >
            <LazyLoadImage
              src={`${CLOUDFRONT_URL}/${filename}`}
              alt={`Gallery Photo ${index + 1}`}
              effect="blur"
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
