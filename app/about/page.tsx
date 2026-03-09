import { SiteLayout } from "@/components/site-layout";
import { Award, Users, Target, Heart } from "lucide-react";

const stats = [
  { value: "15+", label: "Years of Excellence" },
  { value: "50K+", label: "Happy Customers" },
  { value: "100+", label: "Product Varieties" },
  { value: "500+", label: "Corporate Clients" },
];

const values = [
  {
    icon: Award,
    title: "Quality First",
    description:
      "We never compromise on quality. Every envelope is crafted with precision using premium materials.",
  },
  {
    icon: Users,
    title: "Customer Focus",
    description:
      "Your satisfaction is our priority. We go above and beyond to meet your expectations.",
  },
  {
    icon: Target,
    title: "Innovation",
    description:
      "We continuously evolve our products and processes to bring you the best in stationery.",
  },
  {
    icon: Heart,
    title: "Sustainability",
    description:
      "Committed to eco-friendly practices and sustainable materials for a greener tomorrow.",
  },
];

const timeline = [
  {
    year: "2010",
    title: "The Beginning",
    description:
      "Started as a small family business with a passion for quality stationery.",
  },
  {
    year: "2013",
    title: "First Corporate Client",
    description:
      "Landed our first major corporate account, marking our entry into B2B.",
  },
  {
    year: "2016",
    title: "National Expansion",
    description:
      "Expanded operations to serve customers across all major Indian cities.",
  },
  {
    year: "2019",
    title: "Custom Printing Launch",
    description:
      "Introduced custom printing services for personalized business stationery.",
  },
  {
    year: "2022",
    title: "Eco Initiative",
    description:
      "Launched our sustainable product line with 100% recycled materials.",
  },
  {
    year: "2025",
    title: "Digital Transformation",
    description:
      "Launched our online platform to serve customers nationwide with ease.",
  },
];

export default function AboutPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="bg-secondary py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground">
              About Envelop
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
              For over 15 years, we've been crafting premium envelopes that help
              businesses and individuals make lasting impressions. Every
              envelope tells a story, and we're here to help you tell yours.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl md:text-5xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="mt-2 text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary font-semibold tracking-wider uppercase text-sm">
                Our Story
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-serif font-bold text-foreground">
                From Humble Beginnings to Industry Leaders
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Envelop started in 2010 as a small family business in Mumbai,
                  driven by a simple belief: every message deserves a worthy
                  vessel. What began as a modest operation has grown into one of
                  India's most trusted envelope manufacturers.
                </p>
                <p>
                  Our founder, with decades of experience in the paper industry,
                  recognized the gap between mass-produced, generic envelopes
                  and the quality that businesses truly needed. This vision led
                  to the creation of Envelop - where quality meets
                  affordability.
                </p>
                <p>
                  Today, we serve thousands of customers across India, from
                  small businesses to Fortune 500 companies. Our commitment to
                  quality, innovation, and customer satisfaction remains
                  unchanged since day one.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-muted rounded-3xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 border-8 border-dashed border-muted-foreground/30 rounded-2xl flex items-center justify-center">
                    <span className="text-muted-foreground/50">
                      Our Journey
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">
              Our Values
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-serif font-bold text-foreground">
              What Drives Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">
              Our Journey
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-serif font-bold text-foreground">
              Milestones Along the Way
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

              {/* Timeline Items */}
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <div
                    key={item.year}
                    className={`relative flex flex-col md:flex-row gap-8 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Content */}
                    <div
                      className={`flex-1 pl-8 md:pl-0 ${
                        index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                      }`}
                    >
                      <div className="bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
                        <span className="text-2xl font-bold text-primary">
                          {item.year}
                        </span>
                        <h3 className="text-lg font-semibold text-foreground mt-2">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mt-2">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Dot */}
                    <div className="absolute left-0 md:left-1/2 top-6 w-4 h-4 rounded-full bg-primary border-4 border-background md:-translate-x-1/2 shadow-md" />

                    {/* Spacer for alternating layout */}
                    <div className="hidden md:block flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-foreground text-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-background/80 max-w-2xl mx-auto">
            Whether you need envelopes for your business or a special occasion,
            we're here to help you find the perfect solution.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/products"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Browse Products
            </a>
            <a
              href="/contact"
              className="px-8 py-4 bg-background/10 text-background rounded-lg font-semibold hover:bg-background/20 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
