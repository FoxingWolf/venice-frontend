import React, { useState } from "react";
import Chat from "./components/Chat";
import Images from "./components/Images";
import Embeddings from "./components/Embeddings";
import TTS from "./components/TTS";
import Characters from "./components/Characters";
import Models from "./components/Models";
import Stats from "./components/Stats";

type Tab = "chat" | "images" | "embeddings" | "tts" | "characters" | "models";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("chat");

  return (
    <div className="app">
      <header className="header">
        <h1>Venice Studio</h1>
        <p className="subtitle">Private AI Assistant</p>
      </header>

      <nav className="nav">
        <button
          className={activeTab === "chat" ? "active" : ""}
          onClick={() => setActiveTab("chat")}
        >
          Chat
        </button>
        <button
          className={activeTab === "images" ? "active" : ""}
          onClick={() => setActiveTab("images")}
        >
          Images
        </button>
        <button
          className={activeTab === "embeddings" ? "active" : ""}
          onClick={() => setActiveTab("embeddings")}
        >
          Embeddings
        </button>
        <button
          className={activeTab === "tts" ? "active" : ""}
          onClick={() => setActiveTab("tts")}
        >
          TTS
        </button>
        <button
          className={activeTab === "characters" ? "active" : ""}
          onClick={() => setActiveTab("characters")}
        >
          Characters
        </button>
        <button
          className={activeTab === "models" ? "active" : ""}
          onClick={() => setActiveTab("models")}
        >
          Models
        </button>
      </nav>

      <main className="main">
        {activeTab === "chat" && <Chat />}
        {activeTab === "images" && <Images />}
        {activeTab === "embeddings" && <Embeddings />}
        {activeTab === "tts" && <TTS />}
        {activeTab === "characters" && <Characters />}
        {activeTab === "models" && <Models />}
      </main>

      <Stats />
    </div>
  );
};

export default App;
