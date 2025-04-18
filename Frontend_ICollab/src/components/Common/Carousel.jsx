import React, { useRef, useState, useEffect } from "react";
2
const Carousel = ({ children }) => {
  const scrollRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);

  const scrollBy = (offset) => {
    scrollRef.current?.scrollBy({ left: offset, behavior: "smooth" });
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setIsScrolled(scrollLeft > 0);
    setIsScrolledToEnd(scrollLeft + clientWidth >= scrollWidth - 5);
  };

  useEffect(() => {
    handleScroll();
  }, []);

  return (
    <div className="relative w-full h-full border-2">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-2 py-4 snap-x snap-mandatory"
      >
        {React.Children.map(children, (child, idx) => (
          <div key={idx} className={`shrink-0 snap-start`}>
            {child}
          </div>
        ))}
      </div>

      {isScrolled && (
        <button
          onClick={() => scrollBy(-300)}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white px-2 py-1 rounded-full z-10"
        >
          &#10094;
        </button>
      )}

      {!isScrolledToEnd && (
        <button
          onClick={() => scrollBy(300)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white px-2 py-1 rounded-full z-10"
        >
          &#10095;
        </button>
      )}
    </div>
  );
};

export default Carousel;
