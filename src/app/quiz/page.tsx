import { Suspense } from "react";

import { Container } from "@/components/ui";
import { QuizApp } from "@/components/quiz/QuizApp";
import { getQuizCatalogue } from "@/lib/quiz";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Philosophy Quiz: Test Yourself Article by Article",
  description:
    "Free philosophy quizzes built from every article on the site. Choose what to be tested on, retry what you miss, and let spaced review bring questions back before you forget them.",
  path: "/quiz",
});

export default function QuizPage() {
  return (
    <Container>
      <Suspense>
        <QuizApp catalogue={getQuizCatalogue()} />
      </Suspense>
    </Container>
  );
}
