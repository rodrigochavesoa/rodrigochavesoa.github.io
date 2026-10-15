export type SocialLink = {
  label: string;
  href: string;
  icon: "youtube" | "linkedin" | "substack" | "behance" | "github" | "instagram";
};

export const socialLinks: SocialLink[] = [
  {
    label: "YouTube",
    href: "https://www.youtube.com/@colabdeveloper",
    icon: "youtube",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rodrigochavesoa",
    icon: "linkedin",
  },
  {
    label: "Substack",
    href: "https://substack.com/@rodrigocoa",
    icon: "substack",
  },
  {
    label: "Behance",
    href: "https://behance.net/rodrigochavesoa",
    icon: "behance",
  },
  {
    label: "GitHub",
    href: "https://github.com/rodrigochavesoa",
    icon: "github",
  },
  {
    label: "Instagram STAFF",
    href: "https://www.instagram.com/staff.app/",
    icon: "instagram",
  },
  {
    label: "Instagram RC STORE",
    href: "https://www.instagram.com/rcstoreloja/",
    icon: "instagram",
  },
  {
    label: "Instagram Ponto Chave Design",
    href: "https://www.instagram.com/pontochavedesign/",
    icon: "instagram",
  },
];
