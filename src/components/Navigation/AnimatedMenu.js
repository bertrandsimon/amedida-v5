import "./AnimatedMenu.css";

export default function AnimatedMenu() {
  const menuItems = [
    { initial: "Présentation", hover: "Qui sommes nous" },
    { initial: "Evènements", hover: "ils sont uniques" },
    { initial: "Destinations", hover: "Expériences inoubliables" },
    { initial: "Créer votre voyage", hover: "Du sur mesure" },
  ];

  return (
    <ul className="animated-menu-list">
      {menuItems.map((item, index) => (
        <li key={index} className="animated-menu-item">
          <span className="animated-menu-text">{item.initial}</span>
          <span className="animated-menu-title">{item.hover}</span>
        </li>
      ))}
    </ul>
  );
}
