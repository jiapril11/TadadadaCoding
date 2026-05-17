import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pt-20">
      <Header />
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
}
