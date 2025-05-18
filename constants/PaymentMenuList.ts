import CreditCard from "@/assets/svgs/icons/credit-card";
import Education from "@/assets/svgs/icons/education";
import Electric from "@/assets/svgs/icons/electric";
import Games from "@/assets/svgs/icons/games";
import Health from "@/assets/svgs/icons/healthcare";
import { IconType } from "@/assets/svgs/icons/icon";
import Invest from "@/assets/svgs/icons/invest";
import Phone from "@/assets/svgs/icons/phone";
import Streaming from "@/assets/svgs/icons/radio";
import Shopping from "@/assets/svgs/icons/shopping";
import Ticket from "@/assets/svgs/icons/ticket";
import Water from "@/assets/svgs/icons/water";
import Wifi from "@/assets/svgs/icons/wifi";
import { FC } from "react";

type PaymentMenu = {
  title: string;
  icon: FC<IconType>;
  color: string;
  href: {
    path?: string;
    category?: string;
  };
};

export const paymentMenuList: PaymentMenu[] = [
  {
    title: "Pulsa & Data",
    icon: Phone,
    color: "#EAF0F0",
    href: {
      path: "/(private)/product/pulsa-and-data",
    },
  },
  {
    title: "PLN",
    icon: Electric,
    color: "#FFEDE8",
    href: {
      path: "/coming-soon",
    },
  },
  {
    title: "Games",
    icon: Games,
    color: "#EFE3E9",
    href: {
      category: "Games",
    },
  },
  {
    title: "Air",
    icon: Water,
    color: "#E6F0F7",
    href: {
      path: "/coming-soon",
    },
  },
  {
    title: "Insurance",
    icon: Health,
    color: "#E6F0F7",
    href: {
      path: "/coming-soon",
    },
  },
  {
    title: "Internet",
    icon: Wifi,
    color: "#EAF0F0",
    href: {
      path: "/coming-soon",
    },
  },
  {
    title: "E-Money",
    icon: CreditCard,
    color: "#FFEDE8",
    href: {
      category: "E-Money",
    },
  },
  {
    title: "E-Commerce",
    icon: Shopping,
    color: "#EFE3E9",
    href: {
      path: "/coming-soon",
    },
  },
  {
    title: "Streaming",
    icon: Streaming,
    color: "#EFE3E9",
    href: {
      path: "/coming-soon",
    },
  },
  {
    title: "Tiket",
    icon: Ticket,
    color: "#E6F0F7",
    href: {
      path: "/coming-soon",
    },
  },
  {
    title: "Edukasi",
    icon: Education,
    color: "#EAF0F0",
    href: {
      path: "/coming-soon",
    },
  },
  {
    title: "Invest",
    icon: Invest,
    color: "#FFEDE8",
    href: {
      path: "/coming-soon",
    },
  },
];
