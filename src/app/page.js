"use client";

import { useRef, useState } from "react";
import Editorial from "@/components/Editorial/Editorial";
import Favorites from "@/components/Favorites/Favorites";
import Selection from "@/components/Favorites/Selection";
import HeroSection from "@/components/Hero/HeroSection";
import SiteShell from "@/components/Layout/SiteShell";
// import AnimatedNav from "@/components/Navigation/AnimatedNav";
import PhotoNav from "@/components/PhotoNav/PhotoNav";
import TestimonialCarousel from "@/components/Testimonials/TestimonialCarousel";
import ThematicSection from "@/components/Thematics/ThematicSection";

export default function Home() {
  const [selection, setSelection] = useState([]);
  const [selectionFilters, setSelectionFilters] = useState({
    flightType: "",
    season: "",
  });
  const [animateSelection, setAnimateSelection] = useState(false);
  const selectionRef = useRef(null);
  const photoNavRef = useRef(null);
  const [activeTag, setActiveTag] = useState("");

  return (
    <SiteShell>
      <HeroSection
        onSelection={(items, filters) => {
          setSelection(items);
          setSelectionFilters(filters);
          setAnimateSelection(false);
          if (selectionRef.current) {
            const top =
              selectionRef.current.getBoundingClientRect().top +
              window.scrollY -
              220;
            window.scrollTo({ top, behavior: "smooth" });
            window.setTimeout(() => {
              setAnimateSelection(true);
            }, 900);
          } else {
            setAnimateSelection(true);
          }
        }}
      />
      <div className="-mt-20 sm:-mt-40">
        <ThematicSection
          onSelectTag={(tag) => {
            setActiveTag(tag);
            if (photoNavRef.current) {
              const top =
                photoNavRef.current.getBoundingClientRect().top +
                window.scrollY -
                180;
              window.scrollTo({ top, behavior: "smooth" });
            }
          }}
        />
      </div>
      <div ref={selectionRef}>
        <Selection
          destinations={selection}
          flightType={selectionFilters.flightType}
          season={selectionFilters.season}
          animate={animateSelection}
        />
      </div>
      <div ref={photoNavRef}>
        <PhotoNav tag={activeTag} />
      </div>
      <TestimonialCarousel />
      <Favorites />
      <Editorial />
    </SiteShell>
  );
}
