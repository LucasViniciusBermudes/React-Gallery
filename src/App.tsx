import { useState, useEffect } from "react";
import { ApiResponse, ImageData } from "./interfaces/types";
import Header from "./components/Header";
import "./App.css";

function App() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchImages = async () => {
    const response = await fetch(
      "https://api.nekosia.cat/api/v1/images/random?count=20"
    );
    const data: ApiResponse = await response.json();
    setImages((prev) => [...prev, ...data.images]);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const openModal = (imageUrl: string) => {
    setModalImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  return (
    <div className="app">
      <Header />
      <div className="gallery">
        {images.map((img, index) => (
          <div key={img.id || index} className="imageContainer">
            <img
              src={img.image.compressed.url}
              alt={`Imagem ${index + 1}`}
              onClick={() => openModal(img.image.original.url)}
            />
          </div>
        ))}
      </div>

      {isModalOpen && modalImage && (
        <div className="modalOverlay" onClick={closeModal}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <img src={modalImage} alt="Image Gallery" className="modalImage" />
            <button className="closeModalButton" onClick={closeModal}>
              X
            </button>
          </div>
        </div>
      )}

      <button className="loadImages" onClick={fetchImages}>
        Carregar mais imagens
      </button>
    </div>
  );
}

export default App;
