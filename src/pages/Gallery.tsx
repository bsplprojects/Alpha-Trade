import React from "react";
import img69 from "../../assets/img69.jpg";
import img70 from "../../assets/img70.jpg";
import img71 from "../../assets/img71.jpg";
import img72 from "../../assets/img72.jpg";
import img73 from "../../assets/img73.jpg";
import img74 from "../../assets/img74.jpg";
import img75 from "../../assets/img75.jpg";
import img76 from "../../assets/img76.jpg";
import img77 from "../../assets/img77.jpg";
import img78 from "../../assets/img78.jpg";
import img79 from "../../assets/img79.jpg";
import img80 from "../../assets/img80.jpg";
import img81 from "../../assets/img81.jpg";
import img82 from "../../assets/img82.jpg";
import img83 from "../../assets/img83.jpg";
import img84 from "../../assets/img84.jpg";
import img85 from "../../assets/img85.jpg";
import img86 from "../../assets/img86.jpg";
import img87 from "../../assets/img87.jpg";
import img88 from "../../assets/img88.jpg";
import img89 from "../../assets/img89.jpg";

const images = [
  img69,
  img70,
  img71,
  img72,
  img73,
  img74,
  img75,
  img76,
  img77,
  img78,
  img79,
  img80,
  img81,
  img82,
  img83,
  img84,
  img85,
  img86,
  img87,
  img88,
  img89,
];

const styles = {
  container: {
    padding: "20px",
  },

  title: {
    fontSize: "20px",
    marginBottom: "12px",
  },

  scrollContainer: {
    height: "80vh", // 👈 vertical scroll area
    overflowY: "auto",
    paddingRight: "6px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "12px",
  },

  card: {
    borderRadius: "12px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  },

  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    display: "block",
  },
};

const Gallery = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Gallery</h2>

      <div style={styles.scrollContainer}>
        <div style={styles.grid}>
          {images.map((img, index) => (
            <div key={index} style={styles.card}>
              <img src={img} alt={`gallery-${index}`} style={styles.image} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
