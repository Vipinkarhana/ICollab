import React, { useState, useEffect } from "react";

export const testimonials = [
  {
    name: "Stella Smith",
    role: "Eventor Live Max",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Thank you for running the event so smoothly - I had a great time, not only presenting, but also watching other sessions and interacting with attendees.",
   
  },
  {
    name: "John Doe",
    role: "Speaker",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
    text: "The experience was fantastic, and I learned a lot. Great networking opportunities as well.",
   
  },
  {
    name: "Jane Doe",
    role: "Organizer",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    text: "Wonderful event. Everything was organized perfectly, and the feedback from attendees was positive.",
   
  },
  {
    name: "James Johnson",
    role: "Participant",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    text: "An amazing experience. The sessions were informative and the event was well organized.",
   
  },
  {
    name: "Mary Lee",
    role: "Sponsor",
    image: "https://randomuser.me/api/portraits/women/47.jpg",
    text: "We had a great experience being a sponsor at this event. Looking forward to the next one.",
    rating: 4,
  },
  {
    name: "Chris Green",
    role: "Organizer",
    image: "https://randomuser.me/api/portraits/men/48.jpg",
    text: "It was a pleasure to be part of the event. Excellent organization and great feedback from participants.",
    
  },
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // This effect will auto slide every 10 seconds (10000ms)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(testimonials.length / 3));
    }, 10000); // 10 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Function to get the slice of 3 testimonials
  const getCurrentTestimonials = () => {
    const start = currentIndex * 3;
    return testimonials.slice(start, start + 3);
  };

  // Handle dot click to change slide manually
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-6xl px-4">
        <div className="overflow-hidden">
          <div className="flex transition-all duration-500 ease-in-out">
            {getCurrentTestimonials().map((testimonial, index) => (
              <div
                key={index}
                className="bg-white w-[30%] h-60  p-6 rounded-lg shadow-lg text-center mx-4 border border-gray-300"
              >
                <div>
                  <p className="text-gray-700 italic mb-4">"{testimonial.text}"</p>
                </div>
                <div className="flex justify-start items-center gap-3">
                  <div className="flex justify-center ">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full border-2 border-gray-300"
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots for navigation */}
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                index === currentIndex ? "bg-blue-500" : "bg-gray-300"
              }`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
