import { useState, useRef, useEffect } from "react";
import { CLOUDFRONT_URL } from "./config";
import "./App.css";

// About Component
function About() {
  return (
    <div className="tab-content about-section">
      <h1>Thank you for coming</h1>
      <p>Check back soon for 2025 details</p>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const navRef = useRef(null);

  const galleryImages = [
    "_H3A5809.jpg",
    "_H3A5821.jpg",
    "_H3A5822.jpg",
    "_H3A5824.jpg",
    "_H3A5836.jpg",
    "_H3A5838.jpg",
    "_H3A5839.jpg",
    "_H3A5840.jpg",
    "_H3A5846.jpg",
    "_H3A5847.jpg",
    "_H3A5855.jpg",
    "_H3A5879.jpg",
    "_H3A5880.jpg",
    "_MG_6809.jpg",
    "_MG_6810.jpg",
    "_MG_6811.jpg",
    "_MG_6812.jpg",
    "_MG_6813.jpg",
    "_MG_6817.jpg",
    "_MG_6820.jpg",
    "_MG_6823.jpg",
    "_MG_6826.jpg",
    "_MG_6828.jpg",
  ];
  
  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <div className="tab-content">Welcome to JoeJoe's 2025</div>;
      case "about":
        return <About />;
      case "preview":
        return <div className="tab-content">This is the preview section.</div>;
      case "gallery":
        return (
          <div className="gallery-content">
            <div className="gallery-video-container">
              <video
                src={`${CLOUDFRONT_URL}/full24.MP4`} // Replace with gallery video URL
                type="video/mp4"
                controls
                className="gallery-video"
              />
            </div>
            <div className="photos-grid">
              {galleryImages.map((filename, index) => (
                <div key={index} className="photo-wrapper">
                  <img
                    src={`${CLOUDFRONT_URL}/${filename}`} // Replace with actual path
                    alt={`Gallery Photo ${index + 1}`}
                    className="photo"
                  />
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <div className="tab-content">Select a tab to view content.</div>;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="header">
        <div className="logo-container">
          <img src="/joejoelogo.png" alt="JoeJoe's Logo" className="logo" />
        </div>
        <nav ref={navRef} className={`nav ${menuOpen ? "open" : ""}`}>
          <button
            className={activeTab === "home" ? "active" : ""}
            onClick={() => setActiveTab("home")}
          >
            Home
          </button>
          <button
            className={activeTab === "about" ? "active" : ""}
            onClick={() => setActiveTab("about")}
          >
            About
          </button>
          <button
            className={activeTab === "preview" ? "active" : ""}
            onClick={() => setActiveTab("preview")}
          >
            Preview
          </button>
          <button
            className={activeTab === "gallery" ? "active" : ""}
            onClick={() => setActiveTab("gallery")}
          >
            Gallery
          </button>
        </nav>
        <div className="menu-icon" onClick={() => setMenuOpen((prev) => !prev)}>
          ☰
        </div>
      </header>

      <main>
        {activeTab === "home" && (
          <div className="video-container">
            <video
              src={`${CLOUDFRONT_URL}/trim.mp4`}
              type="video/mp4"
              autoPlay
              loop
              muted
              playsInline
              className="landing-video"
            />
          </div>
        )}
        <section>{renderContent()}</section>
      </main>
    </>
  );
}

export default App;
