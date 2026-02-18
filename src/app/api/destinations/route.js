import clientPromise from "@/lib/mongodb";

export async function GET(request) {
  if (!process.env.MONGODB_URI) {
    return Response.json({ error: "MONGODB_URI is not set." }, { status: 500 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const flightTypeSlug = searchParams.get("flight_type");
    const seasonSlug = searchParams.get("season");
    const favoriteParam = searchParams.get("favorite");
    const tagParam = searchParams.get("tag");
    const allParam = searchParams.get("all");
    const limitParam = searchParams.get("limit");
    const limit = Number.parseInt(limitParam || "3", 10);

    const filter = {};
    if (flightTypeSlug) {
      filter.flight_type = flightTypeSlug;
    }
    if (seasonSlug) {
      filter.seasons = { $in: [seasonSlug] };
    }
    if (favoriteParam === "true") {
      filter.favorite = true;
    }
    if (tagParam) {
      filter.tags = { $in: [tagParam] };
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "amedida");
    let destinations;
    if (allParam === "true") {
      destinations = await db.collection("destinations").find(filter).toArray();
    } else {
      destinations = await db
        .collection("destinations")
        .aggregate([
          { $match: filter },
          { $sample: { size: Number.isNaN(limit) ? 3 : limit } },
        ])
        .toArray();
    }

    const normalized = destinations.map((doc) => ({
      ...doc,
      _id: doc._id?.toString(),
    }));

    return Response.json(normalized);
  } catch {
    return Response.json(
      { error: "Failed to fetch destinations." },
      { status: 500 },
    );
  }
}
