import { div } from "framer-motion/client";
import Image from "next/image";
import SymptomPage from "../../_Components/SymptomPage";
import GenericName from "../../_Components/GenericMedicine";

export default function Home() {
  return (
    <div>
      {/* <SymptomPage/> */}
      <GenericName/>
    </div>
  );
}
