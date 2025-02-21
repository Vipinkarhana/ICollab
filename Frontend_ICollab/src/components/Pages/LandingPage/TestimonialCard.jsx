import React, { useState, useEffect } from "react";
import TestimonialImg1 from "/TestimonialImg1.jpeg";
import TestimonialImg2 from "/TestimonialImg2.jpeg";
import TestimonialImg3 from "/TestimonialImg3.jpeg";

export const testimonials = [
  {
    name: "Ribi Adeshoken",
    role: "At world vision project United kingdom",
    image: TestimonialImg1,
    text: "Highly impressed by the use case of the research collab platform. Especially for developing and promoting intellectual property based startups. Looking forward for collaboration ",
  },
  {
    name: "Ashish D.Thombre",
    role: "Udhyam Vidhya Prasad foundation UVPF",
    image: TestimonialImg2,
    text: "The idea behind the platform can be a game changer in generating and developing a startup ecosystem inside campuses",
  },
  {
    name: "Siddhart Prithvi singh",
    role: "Sidpik PVT LTD Working from Dubai",
    image: TestimonialImg3,
    text: "It is great to see a platform for the student innovators. The entrepreneurial development mindset about college projects and more emphasis on the research part",
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
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 3); // Cycle through 3 slides
    }, 10000); // 10 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Function to get the slice of 3 testimonials for current index
  const getCurrentTestimonials = () => {
    const start = (currentIndex % 3) * 3; // Ensure that the start index cycles between 0, 3, 6, ...
    return testimonials.slice(start, start + 3);
  };

  // Handle dot click to change slide manually
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="flex justify-center items-center min-h-screen mt-12">
      <div className="w-full max-w-6xl px-4">
        <div className="overflow-hidden">
          <div className="flex transition-all duration-500 ease-in-out">
            {getCurrentTestimonials().map((testimonial, index) => (
              <div
                key={index}
                className="bg-white w-[40%] h-64 p-6 rounded-lg shadow-lg text-center mx-4 border border-gray-300"
              >
                <div>
                  <p className="text-gray-700 italic mb-4">"{testimonial.text}"</p>
                </div>
                <div className="flex justify-start items-center gap-3">
                  <div className="flex justify-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full border border-gray-400 object-cover" 
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
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full cursor-pointer ${index === currentIndex ? "bg-blue-500" : "bg-gray-300"}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
