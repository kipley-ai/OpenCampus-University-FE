import XIcon from "public/images/X-icon.svg";
import XLightIcon from "public/images/knowledge-source/twitter-light.svg";
import NotionIcon from "public/images/notion.svg";
import NotionLightIcon from "public/images/knowledge-source/notion-light.svg";
import FolderAddIcon from "public/images/knowledge-source/folder-add.svg";
import MirrorIcon from "public/images/knowledge-source/mirror.svg";
import SubstackIcon from "public/images/knowledge-source/substack-icon.svg";
import MediumIcon from "public/images/knowledge-source/medium.svg";
import MediumLightIcon from "public/images/knowledge-source/medium-light.svg";
import ApiIcon from "public/images/knowledge-source/api-icon.svg";

export const buttons = [
  {
    type: "twitter",
    icon: XIcon,
    lightIcon: XLightIcon,
    text: "Twitter",
    comingSoon: false,
  },
  {
    type: "notion",
    icon: NotionIcon,
    lightIcon: NotionLightIcon,
    text: "Notion",
    comingSoon: true,
  },
  {
    type: "substack",
    icon: SubstackIcon,
    text: "Substack",
    comingSoon: true,
  },
  {
    type: "medium",
    icon: MediumIcon,
    lightIcon: MediumLightIcon,
    text: "Medium",
    comingSoon: true,
  },
  {
    type: "mirror",
    icon: MirrorIcon,
    text: "Mirror",
    comingSoon: true,
  },
  {
    type: "files",
    icon: FolderAddIcon,
    text: "Upload Files",
    comingSoon: false,
  },
  {
    type: "api",
    icon: ApiIcon,
    text: "Customized API",
    comingSoon: true,
  },
  // Add more buttons here...
];
