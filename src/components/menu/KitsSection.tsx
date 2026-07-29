import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "../../data/menuData";
import { Gift } from "lucide-react";

interface KitsSectionProps {
  products: Product[];
  onSelect: (product: Product) => void;
}

const KitsSection = ({ products, onSelect }: KitsSectionProps) => {
  if (products.length === 0) return null;

  return (
    <div className="mb-8 bg-gradient-to-br from-orange-600 to-amber-500 rounded-2xl p-4 shadow-lg text-white">
      <div className="flex items-center gap-2 mb-4">
        <Gift className="text-white" size={24} />
        <h2 className="text-xl font-display font-bold">Kits & Combos</h2>
      </div>
      
      <p className="text-orange-50 text-sm mb-4">
        As melhores combinações prontas para a sua sessão!
      </p>

      {/* Grid or Horizontal Scroll */}
      <div className="flex overflow-x-auto gap-4 pb-4 snap-x hide-scrollbar">
        {products.map((product) => (
          <div key={product.id} className="min-w-[280px] max-w-[300px] snap-center shrink-0">
            {/* O ProductCard precisa de um wrapper para contrastar com o fundo escuro do Kit */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm h-full">
              <ProductCard
                product={product}
                onSelect={onSelect}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KitsSection;
