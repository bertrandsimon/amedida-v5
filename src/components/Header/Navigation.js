export default function Navigation({ isSticky = false, theme = "dark" }) {
  const navItems = [
    { label: "Présentation", href: "#presentation" },
    { label: "Evènements", href: "#evenements" },
    { label: "Destinations", href: "#destinations" },
    { label: "Créer votre voyage", href: "#creer-voyage" },
  ];

  return (
    <nav>
      {isSticky ? (
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-8 flex-wrap justify-center">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-xs sm:text-sm font-poppins hover:text-[#df986c] transition-colors whitespace-nowrap ${
                theme === "light" ? "text-black" : "text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      ) : (
        <div className="backdrop-blur-[20px] backdrop-filter rounded-[500px] px-4 sm:px-6 lg:px-8 py-2 sm:py-3 relative">
          {/* Glass effect shadow overlay - exact Figma values */}
          <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_22px_0px_rgba(242,242,242,0.5),inset_0px_0px_0px_1px_#999,inset_2px_2px_1px_-2px_#b3b3b3,inset_-2px_-2px_1px_-2px_#b3b3b3,inset_3px_3px_0px_-3px_rgba(0,0,0,0.5)]" />
          {/* Sharp border overlay - rendered after blur for crisp edge */}
          <div
            className="absolute inset-0 pointer-events-none rounded-[inherit] border border-[#999] opacity-100"
            style={{ borderWidth: "1px" }}
          />
          {/* Navigation items */}
          <div className="relative flex items-center gap-3 sm:gap-4 lg:gap-8 z-10 flex-wrap justify-center">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xs sm:text-sm text-white font-poppins hover:text-[#df986c] transition-colors whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
