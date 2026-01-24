import { ShieldCheck, Lock, CalendarDays } from "lucide-react";

export function CommunitySafety() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Verified travelers",
      description: "All users go through a verification process to ensure authenticity and safety.",
    },
    {
      icon: Lock,
      title: "Secure messaging",
      description: "Private, encrypted communication to protect your conversations and personal data.",
    },
    {
      icon: CalendarDays,
      title: "Meetup events",
      description: "Join organized group events and activities in cities around the world.",
    },
  ];

  return (
    <section id="community" className="py-20 md:py-32 bg-[#0a1628] text-white relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Community & Safety
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Your safety is our priority. We've built a trusted community with robust security features.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="bg-cyan-500/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
