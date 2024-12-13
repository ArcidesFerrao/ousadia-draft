// import logo from "./src/app/assets/icon.png";
import Image from "next/image";

const iconPath = "/assets/icon.png";

export default function NavIcon() {
  return <Image src={iconPath} width={120} height={120} alt="Ousadia" />;
}

export function FooterIcon() {
  return <Image src={iconPath} width={200} height={200} alt="Ousadia" />;
}
