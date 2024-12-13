import logo from "../app/assets/icon.png";
import Image from "next/image";

export default function NavIcon() {
  return <Image src={logo} width={120} height={120} alt="Ousadia" />;
}

export function FooterIcon() {
  return <Image src={logo} width={200} height={200} alt="Ousadia" />;
}
