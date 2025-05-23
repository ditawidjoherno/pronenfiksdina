import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { AiFillPicture } from "react-icons/ai";

const images = [
  "/images/tessting.jpg",
  "/images/maengket1.jpg",
  "/images/maengket3.jpg",
  "/images/maengket3.jpg",
  "/images/maengket1.jpg",
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleBack = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleClick = (event) => {
    const { clientX } = event;
    const middle = window.innerWidth / 2;
    if (clientX < middle) {
      handleBack();
    } else {
      handleNext();
    }
  };

  const positions = ["center", "left1", "left", "right", "right1"];

  const imageVariants = {
    center: { x: "0%", scale: 0.9, zIndex: 5, filter: "blur(0px)", boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.4)" },
    left1: { x: "-50%", scale: 0.6, zIndex: 3, filter: "blur(2px)", opacity: 0.8 },
    left: { x: "-90%", scale: 0.4, zIndex: 2, filter: "blur(4px)", opacity: 0.6 },
    right: { x: "90%", scale: 0.4, zIndex: 2, filter: "blur(4px)", opacity: 0.6 },
    right1: { x: "50%", scale: 0.6, zIndex: 3, filter: "blur(2px)", opacity: 0.8 },
  };

  return (
    <div
      className="flex items-center flex-col justify-center relative w-full h-[300px] overflow-hidden cursor-pointer -mb-36"
      onClick={handleClick}
    >
      {images.map((image, index) => {
        const positionIndex = (index - currentIndex + images.length) % images.length;
        const position = positions[positionIndex];

        return (
          <motion.div
            key={index}
            initial="center"
            animate={position}
            variants={imageVariants}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute w-1/3 drop-shadow-xl"
          >
            <Image
              src={image}
              alt={`Image ${index}`}
              width={400}
              height={240}
              className="rounded-xl shadow-lg"
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default ImageSlider;
