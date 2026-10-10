import { getSubjectQuiz } from "@/lib/quiz";
import { SUBJECTS } from "@/lib/subjects";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return SUBJECTS.map((s) => ({ subject: s.slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ subject: string }> },
) {
  const { subject } = await params;
  return Response.json(getSubjectQuiz(subject));
}
