import Image from "next/image";
import { notFound } from "next/navigation";
import { ObjectId } from "mongodb";
import DestinationGallery from "@/components/Destinations/DestinationGallery";
import Header from "@/components/Header/Header";
import SiteShell from "@/components/Layout/SiteShell";
import clientPromise from "@/lib/mongodb";

const testimonials = [
  "Nous avons fait appel à Amedida pour organiser notre voyage de noces en Afrique du Sud, et tout était parfait ! Lodges magnifiques, safaris inoubliables, et un suivi irréprochable. Merci pour cette expérience magique.",
  "Notre séjour au Japon était incroyablement bien pensé. Les hébergements étaient charmants et idéalement situés. On sent un vrai travail sur-mesure derrière chaque étape du voyage.",
  "Une organisation fluide, des conseils avisés et un accompagnement rassurant du début à la fin. Nous avons vécu un voyage authentique au Mexique, loin des circuits touristiques classiques.",
  "Un voyage en famille au Costa Rica parfaitement orchestré. Les enfants ont adoré les activités nature et nous avons pu profiter sereinement grâce à une logistique impeccable.",
  "L’équipe Amedida a su comprendre nos attentes et créer un itinéraire sur mesure en Indonésie. Chaque étape était une découverte incroyable.",
  "Une lune de miel à Bali absolument magique. Les petites attentions et les choix d’hébergements ont fait toute la différence.",
  "Un city break à Porto parfaitement organisé, avec des recommandations locales qui ont rendu le séjour unique.",
];

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

  return (
    <SiteShell showTopToolbar={false}>
      <div className="destination-page mx-auto max-w-[1200px] px-5 py-6 sm:py-10 text-[color:var(--dest-text)]">
        <section className="relative w-full min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] rounded-[10px] overflow-hidden">
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
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10">
            <p className="text-xs sm:text-sm text-[color:var(--dest-muted)]">
              {destination.zone}
            </p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
              {destination.country}
            </h1>
            <p className="text-sm sm:text-base text-[color:var(--dest-muted)] mt-1">
              {destination.duration} • {destination.transport_type}
            </p>
          </div>
        </section>

        <section className="mt-6 sm:mt-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-3">
            Autres images
          </h2>
          <DestinationGallery images={images} />
        </section>

        <section className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 rounded-2xl border border-[color:var(--dest-border)] bg-[color:var(--dest-panel)] p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-3">
              Ce qui vous attend
            </h2>
            <p className="text-sm sm:text-base text-[color:var(--dest-muted)] max-w-[900px]">
              {destination.description}
            </p>
            {Array.isArray(destination.activities) &&
              destination.activities.length > 0 && (
                <div className="mt-5">
                  <h3 className="text-sm sm:text-base font-semibold mb-2">
                    Activités proposées
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[color:var(--dest-muted)]">
                    {destination.activities.map((activity) => {
                      const label =
                        typeof activity === "string" && activity.length > 0
                          ? activity.charAt(0).toUpperCase() + activity.slice(1)
                          : activity;
                      return (
                        <li
                          key={activity}
                          className="rounded-lg border border-[color:var(--dest-border)] bg-[color:var(--dest-panel)] px-3 py-2"
                        >
                          {label}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
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

        <section className="mt-6 sm:mt-8 rounded-2xl border border-[color:var(--dest-border)] bg-[color:var(--dest-panel)] p-5 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            Témoignages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testimonials.map((text) => (
              <div
                key={text}
                className="rounded-xl border border-[color:var(--dest-border)] bg-[color:var(--dest-panel)] p-4"
              >
                <p className="text-sm sm:text-base text-[color:var(--dest-muted)]">
                  “{text}”
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
