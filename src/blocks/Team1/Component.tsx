import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { BiLogoDribbble, BiLogoLinkedinSquare } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";
import RichText from "@/components/RichText";
import { Media } from "@/components/Media";
import { CMSLink } from "@/components/Link";
import type { SerializedEditorState } from "lexical";

type SocialLink = {
  platform: string;
  url: string;
};

type TeamMember = {
  image: {
    media: any;
    alt: string;
  };
  name: string;
  jobTitle: string;
  description: string;
  socialLinks: SocialLink[];
};

type Props = {
  content: SerializedEditorState;
  teamMembers: TeamMember[];
  footerContent: SerializedEditorState;
  button: {
    title: string;
    variant: ButtonProps["variant"];
    size: ButtonProps["size"];
    link: {
      type: "reference" | "custom";
      reference?: any;
      url?: string;
      newTab?: boolean;
    };
  };
};

export type Team1BlockType = {
  blockType: "team1";
} & Props;

export const Team1 = (props: Team1BlockType) => {
  const { content, teamMembers, footerContent, button } = {
    ...Team1Defaults,
    ...props,
  };

  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <RichText data={content} />
        </div>
        <div className="grid grid-cols-1 items-start justify-center gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} member={member} />
          ))}
        </div>
        <div className="mx-auto mt-14 w-full max-w-md text-center md:mt-20 lg:mt-24">
          <RichText data={footerContent} />
          <div className="mt-6 flex items-center justify-center gap-x-4 text-center md:mt-8">
            <CMSLink {...button.link}>
              <Button variant={button.variant} size={button.size}>
                {button.title}
              </Button>
            </CMSLink>
          </div>
        </div>
      </div>
    </section>
  );
};

const TeamMember = ({ member }: { member: TeamMember }) => {
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return <BiLogoLinkedinSquare className="size-6" />;
      case 'twitter':
        return <FaXTwitter className="size-6 p-0.5" />;
      case 'dribbble':
        return <BiLogoDribbble className="size-6" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col text-center">
      <div className="rb-5 mb-5 flex w-full items-center justify-center md:mb-6">
        <Media
          resource={member.image.media}
          alt={member.image.alt}
          className="size-20 min-h-20 min-w-20 rounded-full object-cover"
        />
      </div>
      <div className="mb-3 md:mb-4">
        <h5 className="text-md font-semibold md:text-lg">{member.name}</h5>
        <h6 className="md:text-md">{member.jobTitle}</h6>
      </div>
      <p>{member.description}</p>
      <div className="mt-6 grid grid-flow-col grid-cols-[max-content] gap-3.5 self-center">
        {member.socialLinks.map((link, index) => (
          <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
            {getSocialIcon(link.platform)}
          </a>
        ))}
      </div>
    </div>
  );
};

export const Team1Defaults: Props = {
  content: {} as SerializedEditorState,
  teamMembers: [
    {
      image: {
        media: null,
        alt: "Relume placeholder image 1",
      },
      name: "Full name",
      jobTitle: "Job title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
      socialLinks: [
        { platform: "linkedin", url: "#" },
        { platform: "twitter", url: "#" },
        { platform: "dribbble", url: "#" },
      ],
    },
    {
      image: {
        media: null,
        alt: "Relume placeholder image 2",
      },
      name: "Full name",
      jobTitle: "Job title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
      socialLinks: [
        { platform: "linkedin", url: "#" },
        { platform: "twitter", url: "#" },
        { platform: "dribbble", url: "#" },
      ],
    },
    {
      image: {
        media: null,
        alt: "Relume placeholder image 3",
      },
      name: "Full name",
      jobTitle: "Job title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
      socialLinks: [
        { platform: "linkedin", url: "#" },
        { platform: "twitter", url: "#" },
        { platform: "dribbble", url: "#" },
      ],
    },
    {
      image: {
        media: null,
        alt: "Relume placeholder image 4",
      },
      name: "Full name",
      jobTitle: "Job title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
      socialLinks: [
        { platform: "linkedin", url: "#" },
        { platform: "twitter", url: "#" },
        { platform: "dribbble", url: "#" },
      ],
    },
    {
      image: {
        media: null,
        alt: "Relume placeholder image 5",
      },
      name: "Full name",
      jobTitle: "Job title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
      socialLinks: [
        { platform: "linkedin", url: "#" },
        { platform: "twitter", url: "#" },
        { platform: "dribbble", url: "#" },
      ],
    },
    {
      image: {
        media: null,
        alt: "Relume placeholder image 6",
      },
      name: "Full name",
      jobTitle: "Job title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
      socialLinks: [
        { platform: "linkedin", url: "#" },
        { platform: "twitter", url: "#" },
        { platform: "dribbble", url: "#" },
      ],
    },
    {
      image: {
        media: null,
        alt: "Relume placeholder image 7",
      },
      name: "Full name",
      jobTitle: "Job title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
      socialLinks: [
        { platform: "linkedin", url: "#" },
        { platform: "twitter", url: "#" },
        { platform: "dribbble", url: "#" },
      ],
    },
    {
      image: {
        media: null,
        alt: "Relume placeholder image 8",
      },
      name: "Full name",
      jobTitle: "Job title",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
      socialLinks: [
        { platform: "linkedin", url: "#" },
        { platform: "twitter", url: "#" },
        { platform: "dribbble", url: "#" },
      ],
    },
  ],
  footerContent: {} as SerializedEditorState,
  button: {
    title: "Open positions",
    variant: "secondary",
    size: "sm",
    link: {
      type: "custom" as const,
      url: "#",
      newTab: false,
    },
  },
};
