import { buildSearchIndex } from "@/lib/content";

/** The index is derived from the corpus at build time, so it can be static. */
export const dynamic = "force-static";

export function GET() {
  return Response.json(buildSearchIndex());
}
