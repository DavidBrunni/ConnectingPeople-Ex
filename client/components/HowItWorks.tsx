import { MapPin, Users, MessageCircle, LucideIcon } from "lucide-react";

const steps: {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}[] = [
    {
      icon: MapPin,
      title: "Create your trip",
      description:
        "Share your destination, dates, and travel style to find the perfect match.",
      color: "text-cyan-500",
      bgColor: "bg-cyan-50",
    },
    {
      icon: Users,
      title: "Get matched with travelers",
      description:
        "Our algorithm connects you with compatible travelers based on interests and preferences.",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      icon: MessageCircle,
      title: "Chat and meet up",
      description:
        "Use our secure messaging to plan activities and coordinate meetups at your destination.",
      color: "text-cyan-500",
      bgColor: "bg-cyan-50",
    },
  ];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#0a1628] mb-4">
            How it works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Getting started is simple. Just three steps to find your travel
            companions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gray-200 -z-10"
                  aria-hidden
                />
              )}

              <div className="flex flex-col items-center text-center space-y-4">
                <div
                  className={`${step.bgColor} w-24 h-24 rounded-2xl flex items-center justify-center`}
                >
                  <step.icon className={`w-12 h-12 ${step.color}`} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-[#0a1628]">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
