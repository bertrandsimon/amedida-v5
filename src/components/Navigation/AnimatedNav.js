import { Home, Video, Camera, Share2, Heart } from "lucide-react";
import "./AnimatedNav.css";

export default function AnimatedNav() {
  const navItems = [
    { icon: Home, title: "Home" },
    { icon: Video, title: "Video" },
    { icon: Camera, title: "Photo" },
    { icon: Share2, title: "Share" },
    { icon: Heart, title: "Like" },
  ];

  return (
    <ul className="animated-nav-list">
      {navItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <li key={index} className="animated-nav-item">
            <span className="animated-nav-icon">
              <Icon size={28} />
            </span>
            <span className="animated-nav-title">{item.title}</span>
          </li>
        );
      })}
    </ul>
  );
}
