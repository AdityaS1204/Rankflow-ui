"use client";

import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import * as Tabs from "@radix-ui/react-tabs";
import { motion, AnimatePresence } from "motion/react";
import { 
  Plus, 
  Minus, 
  Smile, 
  LayoutGrid, 
  CreditCard, 
  UserPlus, 
  CircleDollarSign,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  icon: React.ReactNode;
}

const CATEGORIES = [
  { id: "general", label: "General" },
  { id: "pricing", label: "Pricing" },
  { id: "dashboard", label: "Dashboard" },
  { id: "api", label: "API" },
];

const FAQS: Record<string, FAQItem[]> = {
  general: [
    {
      id: "gen-1",
      question: "Is there a free trial available?",
      answer: "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free 30-minute onboarding call to get you up and running. Book a call here.",
      icon: <Smile className="h-5 w-5" />,
    },
    {
      id: "gen-2",
      question: "Can I change my plan later?",
      answer: "Of course! You can upgrade or downgrade your plan at any time from your dashboard settings. Changes take effect at the start of your next billing cycle.",
      icon: <LayoutGrid className="h-5 w-5" />,
    },
    {
      id: "gen-3",
      question: "What is your cancellation policy?",
      answer: "We offer a flexible cancellation policy. You can cancel your subscription at any time, and you'll have access until the end of your billing period with no hidden fees.",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      id: "gen-4",
      question: "Do you offer customer support?",
      answer: "Yes! We offer 24/7 support via live chat and email. Priority support with a dedicated account manager is available on our Enterprise plan.",
      icon: <UserPlus className="h-5 w-5" />,
    },
    {
      id: "gen-5",
      question: "Is my data secure?",
      answer: "Absolutely. We use industry-standard AES-256 encryption at rest and TLS 1.3 in transit. We're SOC 2 Type II certified and GDPR compliant.",
      icon: <LayoutGrid className="h-5 w-5" />,
    },
  ],
  pricing: [
    {
      id: "pri-1",
      question: "How does billing work?",
      answer: "We bill monthly or annually. You can choose the plan that fits your budget and scale as you grow. Annual plans come with a 20% discount.",
      icon: <CircleDollarSign className="h-5 w-5" />,
    },
    {
      id: "pri-2",
      question: "Can other info be added to an invoice?",
      answer: "Yes, you can add your company details, VAT number, purchase order references, and other custom information to your invoices in the billing section.",
      icon: <UserPlus className="h-5 w-5" />,
    },
    {
      id: "pri-3",
      question: "Do you offer refunds?",
      answer: "We offer a 14-day money-back guarantee. If you're not satisfied within the first 14 days, contact us and we'll issue a full refund—no questions asked.",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      id: "pri-4",
      question: "Are there any hidden fees?",
      answer: "None. The price you see on our pricing page is what you pay. We never charge setup fees, overage fees, or any other hidden costs.",
      icon: <CircleDollarSign className="h-5 w-5" />,
    },
    {
      id: "pri-5",
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and bank transfers for annual enterprise plans.",
      icon: <CreditCard className="h-5 w-5" />,
    },
  ],
  dashboard: [
    {
      id: "dash-1",
      question: "How do I customize my dashboard?",
      answer: "You can drag and drop widgets, change color themes, and configure your data sources directly from the dashboard editor. Changes are saved automatically.",
      icon: <LayoutGrid className="h-5 w-5" />,
    },
    {
      id: "dash-2",
      question: "Can I share my dashboard with team members?",
      answer: "Yes! You can share dashboards with specific team members or your entire organization. You can set view-only or edit permissions for each collaborator.",
      icon: <UserPlus className="h-5 w-5" />,
    },
    {
      id: "dash-3",
      question: "How many dashboards can I create?",
      answer: "The number of dashboards depends on your plan. Starter allows up to 5, Pro allows unlimited dashboards, and Enterprise includes dedicated workspace environments.",
      icon: <LayoutGrid className="h-5 w-5" />,
    },
    {
      id: "dash-4",
      question: "Can I export dashboard data?",
      answer: "Yes. You can export data as CSV, Excel, or PDF. You can also schedule automated exports to be sent to your email on a daily, weekly, or monthly basis.",
      icon: <CircleDollarSign className="h-5 w-5" />,
    },
  ],
  api: [
    {
      id: "api-1",
      question: "Where can I find my API keys?",
      answer: "Your API keys are located in the 'Developer Settings' section of your account dashboard. You can create multiple keys and set different permission scopes for each.",
      icon: <LayoutGrid className="h-5 w-5" />,
    },
    {
      id: "api-2",
      question: "What rate limits apply to the API?",
      answer: "Rate limits vary by plan. The Starter plan allows 100 requests/minute, Pro allows 1,000 requests/minute, and Enterprise plans have custom limits with burst capacity.",
      icon: <CircleDollarSign className="h-5 w-5" />,
    },
    {
      id: "api-3",
      question: "Do you offer webhooks?",
      answer: "Yes, we support webhooks for real-time event notifications. You can configure webhook endpoints and select which events trigger a notification from the developer dashboard.",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      id: "api-4",
      question: "Is there an API sandbox for testing?",
      answer: "Yes, all accounts come with a sandbox environment. Sandbox API calls are free and don't affect your production data, so you can test integrations safely.",
      icon: <LayoutGrid className="h-5 w-5" />,
    },
    {
      id: "api-5",
      question: "Where can I find the API documentation?",
      answer: "Our full API reference, quickstart guides, code samples, and SDKs are available at docs.rankflow.io/api. We support REST and GraphQL endpoints.",
      icon: <UserPlus className="h-5 w-5" />,
    },
  ],
};


const AccordionItem = React.forwardRef<
  HTMLDivElement,
  Accordion.AccordionItemProps & { icon: React.ReactNode; question: string; answer: string }
>(({ children, icon, question, answer, className, ...props }, forwardedRef) => (
  <Accordion.Item
    {...props}
    ref={forwardedRef}
    className={cn(
      "group border-b border-zinc-200 dark:border-zinc-800 last:border-0",
      className
    )}
  >
    <Accordion.Header className="flex">
      <Accordion.Trigger
        className="flex w-full min-w-0 flex-1 items-start justify-between gap-3 py-4 text-left focus:outline-none sm:items-center sm:gap-4 sm:py-6"
      >
        <div className="flex min-w-0 flex-1 items-start gap-3 sm:items-center sm:gap-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white shadow-sm sm:h-10 sm:w-10 dark:border-zinc-800 dark:bg-zinc-900">
            {icon}
          </div>
          <span className="min-w-0 flex-1 break-words text-sm font-semibold leading-snug text-zinc-900 sm:text-base dark:text-zinc-100 md:text-lg">
            {question}
          </span>
        </div>
        <div className="ml-1 shrink-0 text-zinc-400 group-data-[state=open]:text-zinc-900 sm:ml-4 dark:group-data-[state=open]:text-zinc-100">
          <ChevronDown className="h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-180 sm:h-5 sm:w-5" />
        </div>
      </Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content className="overflow-hidden data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down">
      <div className="pb-4 pl-[3.25rem] pr-3 sm:pb-6 sm:pl-14 sm:pr-4">
        <p className="text-sm leading-relaxed text-zinc-500 sm:text-base dark:text-zinc-400">
          {answer}
        </p>
      </div>
    </Accordion.Content>
  </Accordion.Item>
));

AccordionItem.displayName = "AccordionItem";

export function FAQ002() {
  return (
    <section className="w-full bg-white px-4 py-12 sm:px-6 sm:py-20 lg:py-24 dark:bg-zinc-950">
      <div className="mx-auto w-full min-w-0 max-w-4xl">
        <div className="mb-10 text-center sm:mb-16">
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-zinc-900 sm:mb-4 sm:text-3xl dark:text-zinc-100 md:text-4xl lg:text-5xl">
            Frequently asked questions
          </h2>
          <p className="mx-auto max-w-2xl px-2 text-sm text-zinc-500 sm:px-0 sm:text-base md:text-lg dark:text-zinc-400">
            These are the most commonly asked questions about Rankflow UI. Can't find what you're looking for?{" "}
            <a href="#" className="font-semibold text-zinc-900 underline underline-offset-4 hover:text-zinc-700 dark:text-zinc-100 dark:hover:text-zinc-300">
              Chat to our friendly team!
            </a>
          </p>
        </div>

        <Tabs.Root defaultValue="general" className="w-full">
          <Tabs.List className="mb-8 flex w-full gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:mb-12 sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden">
            {CATEGORIES.map((cat) => (
              <Tabs.Trigger
                key={cat.id}
                value={cat.id}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-all focus:outline-none sm:px-6 sm:py-2.5 sm:text-sm",
                  "data-[state=active]:bg-zinc-900 data-[state=active]:text-white dark:data-[state=active]:bg-zinc-100 dark:data-[state=active]:text-zinc-900",
                  "data-[state=inactive]:border data-[state=inactive]:border-zinc-200 data-[state=inactive]:text-zinc-500 hover:data-[state=inactive]:bg-zinc-50 dark:data-[state=inactive]:border-zinc-800 dark:hover:data-[state=inactive]:bg-zinc-900"
                )}
              >
                {cat.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {CATEGORIES.map((cat) => (
            <Tabs.Content key={cat.id} value={cat.id} className="focus:outline-none">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Accordion.Root type="single" collapsible className="w-full">
                  {FAQS[cat.id]?.map((item) => (
                    <AccordionItem
                      key={item.id}
                      value={item.id}
                      icon={item.icon}
                      question={item.question}
                      answer={item.answer}
                    />
                  ))}
                </Accordion.Root>
              </motion.div>
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </div>

      <style jsx global>{`
        @keyframes slide-down {
          from { height: 0; opacity: 0; }
          to { height: var(--radix-accordion-content-height); opacity: 1; }
        }
        @keyframes slide-up {
          from { height: var(--radix-accordion-content-height); opacity: 1; }
          to { height: 0; opacity: 0; }
        }
        .animate-slide-down {
          animation: slide-down 300ms cubic-bezier(0.87, 0, 0.13, 1);
        }
        .animate-slide-up {
          animation: slide-up 300ms cubic-bezier(0.87, 0, 0.13, 1);
        }
      `}</style>
    </section>
  );
}
