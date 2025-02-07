import React from "react";
import { PromoBar } from "@/components/PromoBar";
import { getFirstPromo } from "@/actions/products";

export default async function PromoSection() {
  const promoData = await getFirstPromo();
  if (!promoData) return null;
  return (
    <PromoBar
      id={promoData?.id}
      name={promoData?.name}
      discountAmount={promoData?.discountAmount}
    />
  );
}
