import { useState } from "react";
import { FileText, FolderOpen, Users, Bookmark, Menu } from "lucide-react";

export default function FloatingButtonMenu() {
  const [open, setOpen] = useState(false);

  const buttons = [
    { icon: <FileText size={24} className="text-orange-500" />, label: "Posts", angle: -125 },
    { icon: <FolderOpen size={24} className="text-yellow-500" />, label: "Projects", angle: -435 },
    { icon: <Users size={24} className="text-purple-600" />, label: "Collaborators", angle: -385 },
    { icon: <Bookmark size={24} className="text-violet-600" />, label: "Saved", angle: -335 },
  ];

  const radius = 85; // Increased to give proper space

  return (
    <div className="hidden z-50 lg:block fixed bottom-5 left-5">
      <div className="relative w-40 h-40">
        
        {/* Floating Buttons */}
        {buttons.map((btn, index) => {
          const x = radius * Math.cos((btn.angle * Math.PI) / 180);
          const y = radius * Math.sin((btn.angle * Math.PI) / 180);
          return (
            <button
              key={index}
              title={btn.label}
              className={`absolute bg-white p-4 rounded-full shadow-lg border border-gray-300 hover:p-5 transition-all duration-500 ${
                open ? "opacity-100 scale-100" : "opacity-0 scale-0 pointer-events-none"
              }`}
              style={{
                left: "30%",
                top: "40%",
                transform: open
                  ? `translate(${x}px, ${y}px)`
                  : "translate(-50%, -50%)",
                transition: "transform 0.5s, opacity 0.5s, scale 0.5s",
              }}
            >
              {btn.icon}
            </button>
          );
        })}

        {/* Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          title="Menu"
          className={`absolute bg-blue-600 text-white p-6 rounded-full hover:bg-blue-700 transition-all duration-500 z-30 ${
            open ? "translate-x-20 -translate-y-20" : ""
          }`}
          style={{
            left: "10%",
            top: "50%",
            transform: open
              ? "translate(30px, -30px)"
              : "translate(-4%, -5%)",
            transition: "transform 0.5s",
          }}
        >
          <Menu size={24} />
        </button>
      </div>
    </div>
  );
}
