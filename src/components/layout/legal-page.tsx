import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main
        className="min-h-screen pt-32 pb-24 px-6"
        style={{ background: "#120D0A" }}
      >
        <article className="max-w-2xl mx-auto">
          <header className="mb-12">
            <h1
              className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-medium mb-3"
              style={{ color: "#F9F6F4" }}
            >
              {title}
            </h1>
            <p
              className="font-[family-name:var(--font-body)] text-sm"
              style={{ color: "#6B6460" }}
            >
              Corki &middot; Last updated: {updated}
            </p>
          </header>

          <div className="legal-prose font-[family-name:var(--font-body)] text-base leading-relaxed space-y-8">
            {children}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

export function Section({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2
        className="font-[family-name:var(--font-heading)] text-xl font-medium"
        style={{ color: "#F9F6F4" }}
      >
        {heading}
      </h2>
      <div className="space-y-3" style={{ color: "#A39B95" }}>
        {children}
      </div>
    </section>
  );
}

export function SubSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <h3
        className="font-[family-name:var(--font-body)] text-base font-semibold"
        style={{ color: "#D4C8C0" }}
      >
        {heading}
      </h3>
      <div className="space-y-2" style={{ color: "#A39B95" }}>
        {children}
      </div>
    </div>
  );
}
