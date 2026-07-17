import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ObjectId } from "mongodb";
import DestinationHero from "@/components/Destinations/DestinationHero";
import SiteShell from "@/components/Layout/SiteShell";
import clientPromise from "@/lib/mongodb";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const canonical = `/destinations/${id}`;
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
        alternates: {
          canonical,
        },
        openGraph: {
          title: "Destination | AMEDIDA",
          description: "Découvrez les destinations AMEDIDA.",
          url: canonical,
          type: "article",
        },
        twitter: {
          title: "Destination | AMEDIDA",
          description: "Découvrez les destinations AMEDIDA.",
        },
      };
    }
    const title = `${destination.country} | AMEDIDA`;
    const description =
      destination.description || "Découvrez cette destination.";
    const image =
      destination.main_image
        ? `/images/destinations/${destination.main_image}`
        : null;
    return {
      title,
      description,
      alternates: {
        canonical,
      },
      openGraph: {
        title,
        description,
        url: canonical,
        type: "article",
        images: image ? [{ url: image }] : undefined,
      },
      twitter: {
        title,
        description,
        images: image ? [image] : undefined,
      },
    };
  } catch {
    return {
      title: "Destination | AMEDIDA",
      description: "Découvrez les destinations AMEDIDA.",
      alternates: {
        canonical,
      },
      openGraph: {
        title: "Destination | AMEDIDA",
        description: "Découvrez les destinations AMEDIDA.",
        url: canonical,
        type: "article",
      },
      twitter: {
        title: "Destination | AMEDIDA",
        description: "Découvrez les destinations AMEDIDA.",
      },
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
  const formatTransportType = (type) => {
    if (type === "Flight") return "Avion";
    return type;
  };
  const isTrainTransport = destination.transport_type === "Train";
  const durationLabel = destination.duration
    ? `${formatDuration(destination.duration)} ${isTrainTransport ? "de train" : "de vol"}`
    : "";
  const hideDirectFlight = id === "697c6c05ee7d4a8a13b56e0b";

  return (
    <SiteShell showTopToolbar={false}>
      <div className="destination-page mx-auto max-w-[1200px] px-5 py-6 sm:py-10 text-[color:var(--dest-text)]">
        <DestinationHero
          zone={destination.zone}
          country={destination.country}
          mainImage={mainImage}
          images={images}
          durationLabel={durationLabel}
        />

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
                  <p>{formatTransportType(destination.transport_type)}</p>
                </div>
              )}
              {typeof destination.direct_flight === "boolean" &&
                !hideDirectFlight &&
                !isTrainTransport && (
                <div>
                  <p className="text-xs uppercase tracking-wide text-[color:var(--dest-soft)]">
                    Vol direct
                  </p>
                  <p>{destination.direct_flight ? "Oui" : "Non"}</p>
                </div>
              )}
              {destination.time_difference && !isTrainTransport && (
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
                      <Link
                        key={tag}
                        href={{ pathname: "/destinations", query: { tag } }}
                        className="rounded-full border border-[color:var(--dest-chip-border)] bg-[color:var(--dest-chip)] px-3 py-1 text-xs text-[color:var(--dest-muted)] cursor-pointer transition-colors hover:border-[#df986c] hover:text-[#df986c]"
                      >
                        {tag}
                      </Link>
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
