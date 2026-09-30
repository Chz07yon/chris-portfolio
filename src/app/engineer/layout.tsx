import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chris — ECE Systems Engineer & Hardware Architect",
  description:
    "Electronics & Communication Engineering portfolio of Chris Zeyon Pinto. High-speed PCB design, embedded systems, RTOS, and physical computing.",
  openGraph: {
    title: "Chris — ECE Systems Engineer & Hardware Architect",
    description:
      "High-speed PCB design, embedded firmware, signal integrity, and physical computing architecture.",
    images: [
      {
        url: "/assets/engineer/engineer-og.png",
        width: 1200,
        height: 630,
        alt: "Chris — ECE Systems Engineer",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chris — ECE Systems Engineer & Hardware Architect",
    description:
      "High-speed PCB design, embedded firmware, signal integrity, and physical computing architecture.",
    images: ["/assets/engineer/engineer-og.png"],
  },
};

export default function EngineerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
