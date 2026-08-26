import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-grid relative antialiased min-h-screen overflow-x-clip">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="glow-circle glow-purple w-[600px] h-[600px] top-[-100px] left-[-200px]" />
        <div className="glow-circle glow-pink w-[500px] h-[500px] top-[40%] right-[-150px]" />
        <div className="glow-circle glow-purple w-[700px] h-[700px] bottom-[-200px] left-[-250px]" />
      </div>
      <Navbar />
      <main className="pt-32 px-8 md:px-24 max-w-7xl mx-auto flex flex-col gap-32">
        {children}
      </main>
      <Footer />
    </div>
  );
}
