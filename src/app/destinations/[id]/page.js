import Image from "next/image";
import { notFound } from "next/navigation";
import { ObjectId } from "mongodb";
import DestinationImageStrip from "@/components/Destinations/DestinationImageStrip";
import Header from "@/components/Header/Header";
import SiteShell from "@/components/Layout/SiteShell";
import clientPromise from "@/lib/mongodb";

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "amedida");
    const query = ObjectId.isValid(id)
      ? { $or: [{ _id: new ObjectId(id) }, { _id: id }] }
      : { _id: id };
    const destination = await db.collection("destinations").findOne(query);
    if (!destination) {
      return {
        title: "Destination | AMEDIDA",
        description: "Découvrez les destinations AMEDIDA.",
      };
    }
    return {
      title: `${destination.country} | AMEDIDA`,
      description: destination.description || "Découvrez cette destination.",
    };
  } catch {
    return {
      title: "Destination | AMEDIDA",
      description: "Découvrez les destinations AMEDIDA.",
    };
  }
}

export default async function DestinationPage({ params }) {
  const { id } = await params;

  let destination = null;
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "amedida");
    const query = ObjectId.isValid(id)
      ? { $or: [{ _id: new ObjectId(id) }, { _id: id }] }
      : { _id: id };
    destination = await db.collection("destinations").findOne(query);
  } catch {
    destination = null;
  }

  if (!destination) {
    notFound();
  }

  const mainImage = destination.main_image
    ? `/images/destinations/${destination.main_image}`
    : "";
  const activityImage = destination.activity_image
    ? `/images/destinations/${destination.activity_image}`
    : "";
  const images = Array.isArray(destination.images)
    ? destination.images.map((image) => `/images/destinations/${image}`)
    : [];

  const formatDuration = (value) => {
    if (!value || typeof value !== "string") {
      return "";
    }
    return value.replace(/h/i, " h ").replace(/\s+/g, " ").trim();
  };
  const durationLabel = destination.duration
    ? `${formatDuration(destination.duration)} de vol`
    : "";

  return (
    <SiteShell showTopToolbar={false}>
      <div className="destination-page mx-auto max-w-[1200px] px-5 py-6 sm:py-10 text-[color:var(--dest-text)]">
        <section className="relative w-full min-h-[520px] sm:min-h-[640px] lg:min-h-[740px] rounded-[10px] overflow-hidden pb-24 sm:pb-28">
          <Header forceSticky />
          <div className="absolute inset-0 z-0 rounded-[10px] overflow-hidden">
            {mainImage ? (
              <Image
                src={mainImage}
                alt={destination.country || "Destination"}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="h-full w-full bg-white/5" />
            )}
          </div>
          <div className="absolute bottom-24 left-4 sm:bottom-28 sm:left-6 z-10">
            <p className="text-xs sm:text-sm text-[color:var(--dest-muted)]">
              {destination.zone}
            </p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
              {destination.country}
            </h1>
            {durationLabel && (
              <p className="text-sm sm:text-base text-[color:var(--dest-muted)] mt-1">
                {durationLabel}
              </p>
            )}
          </div>

          {images.length > 0 && (
            <div className="absolute left-0 right-0 bottom-4 sm:bottom-6 z-20 px-4 sm:px-6">
              <DestinationImageStrip images={images} />
            </div>
          )}
        </section>

        <section className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 rounded-2xl border border-[color:var(--dest-border)] bg-[color:var(--dest-panel)] p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-3">
              Ce qui vous attend
            </h2>
            <p className="text-sm sm:text-base text-[color:var(--dest-muted)] max-w-[900px]">
              {destination.description}
            </p>
          </div>
          <div className="rounded-2xl border border-[color:var(--dest-border)] bg-[color:var(--dest-panel)] p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-3">
              Infos pratiques
            </h2>
            <div className="space-y-3 text-sm text-[color:var(--dest-muted)]">
              {destination.duration && (
                <div>
                  <p className="text-xs uppercase tracking-wide text-[color:var(--dest-soft)]">
                    Durée
                  </p>
                  <p>{destination.duration}</p>
                </div>
              )}
              {destination.transport_type && (
                <div>
                  <p className="text-xs uppercase tracking-wide text-[color:var(--dest-soft)]">
                    Transport
                  </p>
                  <p>{destination.transport_type}</p>
                </div>
              )}
              {typeof destination.direct_flight === "boolean" && (
                <div>
                  <p className="text-xs uppercase tracking-wide text-[color:var(--dest-soft)]">
                    Vol direct
                  </p>
                  <p>{destination.direct_flight ? "Oui" : "Non"}</p>
                </div>
              )}
              {destination.time_difference && (
                <div>
                  <p className="text-xs uppercase tracking-wide text-[color:var(--dest-soft)]">
                    Décalage horaire
                  </p>
                  <p>{destination.time_difference}</p>
                </div>
              )}
              {destination.budget && (
                <div>
                  <p className="text-xs uppercase tracking-wide text-[color:var(--dest-soft)]">
                    Budget indicatif
                  </p>
                  <p>{destination.budget}</p>
                </div>
              )}
              {destination.period && (
                <div>
                  <p className="text-xs uppercase tracking-wide text-[color:var(--dest-soft)]">
                    Période conseillée
                  </p>
                  <p>{destination.period}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {(Array.isArray(destination.tags) ||
          Array.isArray(destination.seasons)) && (
          <section className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.isArray(destination.tags) &&
              destination.tags.length > 0 && (
                <div className="rounded-2xl border border-[color:var(--dest-border)] bg-[color:var(--dest-panel)] p-5 sm:p-6">
                  <h3 className="text-sm sm:text-base font-semibold mb-2">
                    Thématiques
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {destination.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[color:var(--dest-chip-border)] bg-[color:var(--dest-chip)] px-3 py-1 text-xs text-[color:var(--dest-muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            {Array.isArray(destination.seasons) &&
              destination.seasons.length > 0 && (
                <div className="rounded-2xl border border-[color:var(--dest-border)] bg-[color:var(--dest-panel)] p-5 sm:p-6">
                  <h3 className="text-sm sm:text-base font-semibold mb-2">
                    Saisons idéales
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {destination.seasons.map((season) => {
                      const label =
                        typeof season === "string" && season.length > 0
                          ? season.charAt(0).toUpperCase() + season.slice(1)
                          : season;
                      return (
                        <span
                          key={season}
                          className="rounded-full border border-[color:var(--dest-chip-border)] bg-[color:var(--dest-chip)] px-3 py-1 text-xs text-[color:var(--dest-muted)]"
                        >
                          {label}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
          </section>
        )}

        {activityImage && (
          <section className="mt-6 sm:mt-8">
            <h2 className="text-lg sm:text-xl font-semibold mb-3">
              Activité mise en avant
            </h2>
            <div className="relative w-full h-[200px] sm:h-[260px] rounded-xl overflow-hidden border border-[color:var(--dest-border)]">
              <Image
                src={activityImage}
                alt="Activity"
                fill
                className="object-cover"
              />
              {destination.activities?.[0] && (
                <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
                  <p className="text-lg sm:text-2xl font-semibold italic text-white drop-shadow">
                    “{destination.activities[0]}”
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {destination.testimonial && (
          <section className="mt-6 sm:mt-8 rounded-2xl border border-[color:var(--dest-border)] bg-[color:var(--dest-panel)] p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-2">
              Témoignage
            </h2>
            <p className="text-sm sm:text-base text-[color:var(--dest-muted)]">
              “{destination.testimonial}”
            </p>
          </section>
        )}
      </div>
    </SiteShell>
  );
}
