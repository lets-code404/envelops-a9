"use client"

import { Package, BadgeCheck, Truck, Headphones } from "lucide-react"

const indicators = [
  {
    icon: Package,
    title: "Bulk Orders",
    description: "Special pricing for corporate & wholesale buyers",
    color: "bg-amber-100 text-amber-700",
  },
  {
    icon: BadgeCheck,
    title: "Quality Paper",
    description: "Premium grade materials for lasting impressions",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: Truck,
    title: "PAN India Delivery",
    description: "Fast shipping to every corner of the country",
    color: "bg-sky-100 text-sky-700",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated assistance for all your queries",
    color: "bg-rose-100 text-rose-700",
  },
]

export function TrustIndicators() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {indicators.map((item, index) => (
            <div
              key={item.title}
              className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
              >
                <item.icon className="h-7 w-7" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>

              {/* Hover Decoration */}
              <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-primary/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
