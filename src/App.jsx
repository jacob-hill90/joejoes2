import { useState, useRef, useEffect } from "react";
import { CLOUDFRONT_URL } from "./config";
import Gallery from "./components/Gallery";
import About from "./components/About";
import Preview from "./components/Preview"
import "./App.css";


function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const navRef = useRef(null);

  
  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <div className="tab-content">Check back soon for 2025 details!</div>;
      case "about":
        return <About />;
      case "preview":
        return <Preview />;
      case "gallery":
        return <Gallery />;
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
