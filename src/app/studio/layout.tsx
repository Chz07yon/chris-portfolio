import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "THE RED STUDIOS — Creative Direction, Cinematography & Visual Identity",
  description:
    "Creative studio and portfolio of Chris Zeyon Pinto. RED (Cinematography & Motion) and CYAN (Brand Design & Visual Architecture).",
  openGraph: {
    title: "THE RED STUDIOS — Creative Direction & Visual Architecture",
    description:
      "RED motion picture, live documentary, and CYAN brand architecture by Chris Zeyon Pinto.",
    images: [
      {
        url: "/assets/studio/studio-og.png",
        width: 1200,
        height: 630,
        alt: "THE RED STUDIOS — Creative Direction",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "THE RED STUDIOS — Creative Direction & Visual Architecture",
    description:
      "RED motion picture, live documentary, and CYAN brand architecture by Chris Zeyon Pinto.",
    images: ["/assets/studio/studio-og.png"],
  },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
