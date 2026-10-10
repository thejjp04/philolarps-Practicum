import assert from "node:assert/strict";

import { buildDeck, optionOrder, requeue, RETRY_GAP } from "../src/components/quiz/deck.ts";

const item = (id, options = 4) => ({
  key: `logic/beginner/x#${id}`,
  article: "logic/beginner/x",
  question: id,
  options: Array.from({ length: options }, (_, i) => `o${i}`),
  answer: 0,
  explanation: "",
});

const now = 1_000_000;
const items = ["a", "b", "c", "d", "e", "f"].map((id) => item(id));
const progress = {
  "logic/beginner/x#a": { box: 3, due: now + 5 },
  "logic/beginner/x#b": { box: 0, due: now - 5 },
  "logic/beginner/x#c": { box: 4, due: now + 1 },
};

const deck = buildDeck(items, progress, 4, now);
const keys = deck.map((c) => c.item.question).sort();
assert.deepEqual(keys, ["b", "d", "e", "f"], "due first, then unseen, before not-yet-due");

const two = buildDeck(items, progress, 5, now).map((c) => c.item.question);
assert.ok(two.includes("c") && !two.includes("a"), "not-yet-due ordered by soonest due");

assert.equal(buildDeck(items, {}, 0, now).length, 6, "size 0 means all");

for (let i = 0; i < 50; i++) {
  assert.deepEqual([...optionOrder(item("t")) ].sort(), [0, 1, 2, 3]);
}
assert.deepEqual(optionOrder(item("tf", 2)), [0, 1], "true/false keeps order");

const queue = buildDeck(items, {}, 0, now);
const again = requeue(queue, 1);
assert.equal(again.length, queue.length + 1);
assert.equal(again[1 + 1 + RETRY_GAP].item, queue[1].item, "missed card returns after the gap");
assert.equal(again[1 + 1 + RETRY_GAP].retry, true);
const atEnd = requeue(queue, queue.length - 1);
assert.equal(atEnd[atEnd.length - 1].item, queue[queue.length - 1].item, "last card retries straight away");

console.log("Quiz deck checks passed.");
