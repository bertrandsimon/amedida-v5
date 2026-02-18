import Image from "next/image";

export default function HeroTitle() {
  return (
    <div className="text-center sm:text-right md:pr-40">
      <h1
        className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-2 font-sans animate__animated animate__fadeInLeftSoft"
        style={{
          animationDelay: "0s",
          animationDuration: "1s",
          animationTimingFunction: "ease",
        }}
      >
        Voyages de récompense
      </h1>
      <h2
        className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[#df986c] font-sans animate__animated animate__fadeInRightSoft"
        style={{
          animationDelay: "0.35s",
          animationDuration: "1s",
          animationTimingFunction: "ease",
        }}
      >
        sur mesure
      </h2>
      <div className="flex items-center justify-center sm:justify-end">
        <p
          className="text-sm sm:text-base lg:text-xl text-white mb-8 sm:mb-12 mr-2 sm:mr-4 mt-4 animate__animated animate__fadeInUp"
          style={{
            animationDelay: "0.7s",
            animationDuration: "1s",
            animationTimingFunction: "ease",
          }}
        >
          votre expérience{" "}
          <span className="font-display italic">inoubliable</span>
          <br />
          commence ici
        </p>
        <div>
          <Image
            className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
            src="/images/arrow-right.png"
            alt="arrow-right"
            width={24}
            height={24}
          />
        </div>
      </div>
    </div>
  );
}
