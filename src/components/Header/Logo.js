import Image from "next/image";

export default function Logo() {
  return (
    <div
      className="h-[69px] w-[148px] relative flex-shrink-0"
      data-name="Amedia logo"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ overflow: "hidden" }}
      >
        <Image
          src="/images/amedida-logo.png"
          alt="AMEDIDA Logo"
          fill
          className="object-contain"
          style={{
            position: "absolute",
            height: "299.4%",
            left: "-21.94%",
            top: "-85.03%",
          }}
        />
      </div>
    </div>
  );
}
