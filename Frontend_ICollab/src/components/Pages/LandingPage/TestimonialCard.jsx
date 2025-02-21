import React, { useState, useEffect } from "react";
import TestimonialImg1 from "/TestimonialImg1.jpeg";
import TestimonialImg2 from "/TestimonialImg2.jpeg";
import TestimonialImg3 from "/TestimonialImg3.jpeg";

export const testimonials = [
  {
    name: "Ribi Adeshoken",
    role: "Director at World Vision Project, United Kingdom",
    image: TestimonialImg1,
    text: "Highly impressed by the use case of the research collab platform. Especially for developing and promoting intellectual property-based startups. Looking forward to collaboration.",
  },
  {
    name: "Ashish D.Thombre",
    role: "Director at Udhyam Vidhya Prasad foundation",
    image: TestimonialImg2,
    text: "The idea behind the platform can be a game changer in generating and developing a startup ecosystem inside campuses.",
  },
  {
    name: "Siddhart Prithvi Singh",
    role: "Director at Sidpik PVT LTD ",
    image: TestimonialImg3,
    text: "It is great to see a platform for student innovators. The entrepreneurial development mindset about college projects and more emphasis on the research part.",
  },
  // Additional testimonials can be added here if needed.
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialsPerSlide = 3;

  // This effect will auto slide every 10 seconds (10000ms)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides); // Cycle through the slides
    }, 10000); // 10 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Calculate the total number of slides
  const totalSlides = Math.ceil(testimonials.length / testimonialsPerSlide);

  // Function to get the current set of testimonials
  const getCurrentTestimonials = () => {
    const start = currentIndex * testimonialsPerSlide;
    return testimonials.slice(start, start + testimonialsPerSlide);
  };

  // Handle dot click to change slide manually
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="flex justify-center items-center min-h-screen mt-14">
      <div className="w-full max-w-6xl px-4">
        <div className="overflow-hidden">
          <div className="flex transition-all duration-500 ease-in-out">
            {getCurrentTestimonials().map((testimonial, index) => (
              <div
                key={index}
                className="bg-white w-[40%] h-64 p-6 rounded-lg shadow-lg text-center mx-4 border border-gray-300"
              >
                <div className="h-[65%]">
                  <p className="text-gray-700 italic mb-4">"{testimonial.text}"</p>
                </div>
                <div className="flex justify-evenly items-center gap-2">
                  <div className="h-16 w-16 rounded-full overflow-hidden border border-gray-300">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="flex flex-col items-center w-[75%]">
                    <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">
                      <span>{testimonial.role.split(" at ")[0]}</span>
                      <br />
                      <span>{testimonial.role.split(" at ")[1]}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots for navigation */}
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
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
