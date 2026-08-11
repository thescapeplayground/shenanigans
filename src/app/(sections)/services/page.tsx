import { DEFAULT_SERVICES, DEFAULT_SERVICE_FAQS } from "../../../data";
import { ServicesSection } from "@/components/ServicesSection";

export default function ServicesPage() {
  return <ServicesSection services={DEFAULT_SERVICES} faqs={DEFAULT_SERVICE_FAQS} />;
}
