import { useState, useMemo } from "react";
import type { Product } from "@/data/menuData";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowLeft } from "lucide-react";

interface BrandSectionProps {
  products: Product[];
  onSelect: (product: Product) => void;
}

export default function BrandSection({ products, onSelect }: BrandSectionProps) {
  const [expandedBrand, setExpandedBrand] = useState<string | null>(null);

  // Group products by brand
  const productsByBrand = useMemo(() => {
    const grouped: Record<string, Product[]> = {};
    products.forEach((p) => {
      const brand = p.brand || "Sem Marca";
      if (!grouped[brand]) {
        grouped[brand] = [];
      }
      grouped[brand].push(p);
    });
    return grouped;
  }, [products]);

  const brands = Object.keys(productsByBrand).sort();

  if (expandedBrand) {
    const brandProducts = productsByBrand[expandedBrand] || [];
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-center gap-2 mb-4">
          <Button variant="ghost" size="icon" onClick={() => setExpandedBrand(null)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-xl md:text-2xl font-display text-foreground">
            {expandedBrand}
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 lg:gap-6">
          {brandProducts.map((p) => (
            <ProductCard key={p.id} product={p} onSelect={onSelect} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {brands.map((brand) => {
        const brandProducts = productsByBrand[brand];
        return (
          <div key={brand} className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg md:text-xl font-semibold text-foreground/90 pl-1 border-l-4 border-primary">
                {brand}
              </h3>
              {brandProducts.length > 2 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-primary gap-1"
                  onClick={() => setExpandedBrand(brand)}
                >
                  Ver mais <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
            {/* Horizontal scrollable area for mobile/desktop */}
            <div className="flex overflow-x-auto gap-3 pb-2 -mx-3 px-3 sm:mx-0 sm:px-0 snap-x hide-scrollbar">
              {brandProducts.slice(0, 4).map((p) => (
                <div key={p.id} className="min-w-[160px] md:min-w-[200px] snap-start">
                  <ProductCard product={p} onSelect={onSelect} />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
