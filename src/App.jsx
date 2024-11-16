import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const navRef = useRef(null);

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <div className="tab-content">Welcome to JoeJoe's 2025</div>;
      case "about":
        return <div className="tab-content">This is the About section.</div>;
      case "preview":
        return <div className="tab-content">This is the preview section.</div>;
      case "gallery":
        return <div className="tab-content">Here’s the Gallery.</div>;
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
        <div className="video-container">
          <video
            src="/trim.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="landing-video"
          />
          {/* <div className="video-overlay">Explore the Media</div> */}
        </div>
        <section>{renderContent()}</section>
      </main>
    </>
  );
}

export default App;
