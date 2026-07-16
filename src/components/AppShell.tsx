import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { Footer } from "@/components/Footer";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    // live app keeps a fixed ≥md layout (scrollWidth 1464) and horizontal-scrolls
    // below it instead of squeezing — mirror that with a md min-width
    <div className="flex min-h-dvh bg-white md:min-w-[1440px]">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main className="flex-1">
          {children}
          <div className="px-8 max-md:px-[21px]">
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}
