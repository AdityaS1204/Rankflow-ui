"use client";

import { SpringAccordion } from "./spring-accordion";

const items = [
  {
    id: "llms",
    title: "Large Language Models",
    content:
      "Understanding how language models process tokens, learn patterns from datasets, and generate human-like responses using transformer architectures and probabilistic prediction.",
  },
  {
    id: "rag",
    title: "Retrieval-Augmented Generation",
    content:
      "Combining language models with external knowledge sources to retrieve relevant information, reduce hallucinations, and generate accurate, context-aware responses.",
  },
  {
    id: "agents",
    title: "AI Agents",
    content:
      "Designing autonomous systems that reason through tasks, select tools, maintain context, and execute actions to achieve specific goals.",
  },
  {
    id: "fine-tuning",
    title: "Fine-Tuning Models",
    content:
      "Adapting pre-trained models for specialized tasks by training them on domain-specific datasets, improving accuracy, tone, and performance.",
  },
];

export default function SpringAccordionDemo() {
  return (
    <div className="w-full flex justify-center items-start p-8 min-h-[500px]">
      <div className="w-full max-w-xl mt-12">
        <SpringAccordion items={items} />
      </div>
    </div>
  );
}
