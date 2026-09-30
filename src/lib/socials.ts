export interface WorldSocials {
  engineer: {
    github: string;
    linkedin: string;
    instagram: string;
    email: string;
  };
  studio: {
    instagram: string;
    email: string;
  };
  shared: {
    whatsapp: string;
  };
}

export const socials: WorldSocials = {
  engineer: {
    github: "github.com/Chz07yon",
    linkedin: "linkedin.com/in/chris-zeyon-pinto-21329a397",
    instagram: "instagram.com/z__chris_",
    email: "chz07yon@gmail.com",
  },
  studio: {
    instagram: "instagram.com/rdx._.red",
    email: "ddxredx0703@gmail.com",
  },
  shared: {
    whatsapp: "https://wa.me/917676218729", // Click-to-chat only. Never render the raw phone number in UI.
  },
} as const;

export const engineerLinks = [
  { label: "GitHub", href: `https://${socials.engineer.github}`, handle: "@Chz07yon" },
  { label: "LinkedIn", href: `https://${socials.engineer.linkedin}`, handle: "chris-zeyon-pinto" },
  { label: "Instagram", href: `https://${socials.engineer.instagram}`, handle: "@z__chris_" },
  { label: "Email", href: `mailto:${socials.engineer.email}`, handle: socials.engineer.email },
];

export const studioLinks = [
  { label: "Instagram", href: `https://${socials.studio.instagram}`, handle: "@rdx._.red" },
  { label: "Email", href: `mailto:${socials.studio.email}`, handle: socials.studio.email },
];
