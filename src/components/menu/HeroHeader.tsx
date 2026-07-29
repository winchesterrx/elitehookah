import { Clock, Bike, ShoppingBag, ShoppingCart } from "lucide-react";
import backgroundDesktop from "@/assets/background_hookah_v5_horizontal.png";
import backgroundMobile from "@/assets/background_hookah_v5_vertical.png";
import { useCart } from "@/contexts/CartContext";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchStoreSettings } from "@/data/menuData";

interface Props {
  onCartOpen?: () => void;
}

export default function HeroHeader({ onCartOpen }: Props) {
  const { data: storeSettings } = useQuery({ queryKey: ["storeSettings"], queryFn: fetchStoreSettings });
  const isOpen = storeSettings ? storeSettings.is_open === 1 || storeSettings.is_open === true : false;
  const { itemCount } = useCart();
  return (
    <header className="relative w-full h-[600px] sm:h-[650px] md:h-[700px] lg:h-[750px]">
      <div className="relative w-full h-full flex flex-col justify-end pb-8 px-4 overflow-hidden">
        {/* Imagem de fundo responsiva */}
        <picture>
          <source media="(min-width: 768px)" srcSet={backgroundDesktop} />
          <img
            src={backgroundMobile}
            alt="Fundo Tabacaria"
            className="absolute inset-0 w-full h-full object-cover object-[center_top] md:object-[center_10%]"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.4)_100%)]" />

        {/* Desktop Navigation */}
        <div className="hidden lg:flex absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-card/90 backdrop-blur-md px-6 py-3 rounded-full shadow-elevated items-center gap-8">
          <NavLink to="/" className={({isActive}) => `font-semibold text-sm transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-foreground'}`}>Início</NavLink>
          <NavLink to="/pedidos" className={({isActive}) => `font-semibold text-sm transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-foreground'}`}>Pedidos</NavLink>
          <NavLink to="/fidelidade" className={({isActive}) => `font-semibold text-sm transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-foreground'}`}>Fidelidade</NavLink>
          <NavLink to="/admin" className={({isActive}) => `font-semibold text-sm transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-foreground'}`}>Admin</NavLink>
        </div>

        {/* Cart icon - top right */}
        {onCartOpen && (
          <button
            onClick={onCartOpen}
            className="absolute top-4 right-4 lg:right-8 lg:top-6 z-30 bg-card/95 backdrop-blur-md rounded-full p-3 shadow-elevated active:scale-95 transition-all hover:bg-card flex items-center gap-2 border border-orange-500/20"
          >
            <ShoppingCart size={22} className="text-orange-500" />
            <span className="hidden lg:inline font-bold text-sm text-foreground pr-1">Meu Carrinho</span>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 lg:-top-1.5 lg:-right-1.5 bg-orange-500 text-white text-[10px] font-bold min-w-[20px] h-[20px] rounded-full flex items-center justify-center px-1 shadow-sm">
                {itemCount}
              </span>
            )}
          </button>
        )}

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-[50px]" preserveAspectRatio="none">
            <path
              d="M0,60 C360,120 1080,0 1440,60 L1440,120 L0,120 Z"
              fill="hsl(var(--background))"
            />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col items-center mb-0 mt-auto">
          <div className="flex items-center gap-2 mb-3 flex-wrap justify-center">
            <span className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-extrabold shadow-md border ${
              isOpen
                ? "bg-orange-500 text-white border-orange-400 shadow-orange-500/30"
                : "bg-muted text-muted-foreground border-transparent"
            }`}>
              <span className={`w-2.5 h-2.5 rounded-full ${isOpen ? "bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" : "bg-destructive"}`} />
              {isOpen ? "Aberto Agora" : "Fechado"}
            </span>

            <span className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-extrabold bg-white text-orange-600 shadow-md border border-orange-200 hover:scale-105 transition-transform">
              <Bike size={16} className="text-orange-500" />
              Entrega
            </span>

            <span className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-extrabold bg-white text-orange-600 shadow-md border border-orange-200 hover:scale-105 transition-transform">
              <ShoppingBag size={16} className="text-orange-500" />
              Retirada
            </span>
          </div>

          <div className="flex flex-col items-center gap-2 text-white font-medium bg-black/60 px-5 py-3 rounded-2xl backdrop-blur-md text-center border border-orange-500/40 shadow-[0_4px_16px_rgba(249,115,22,0.2)]">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-orange-400" />
              <span className="text-base font-bold text-orange-50">Seg a Dom • {storeSettings?.opening_time || "10:00"} – {storeSettings?.closing_time || "22:00"}</span>
            </div>
            {storeSettings?.delivery_info_text && (
              <span className="text-xs font-semibold text-orange-200 border-t border-orange-500/30 pt-2 w-full">
                * {storeSettings.delivery_info_text}
              </span>
            )}
          </div>
        </div>

        <div className="relative z-10 flex justify-center mt-6 mb-4 px-4 w-full">
          <p className="text-lg lg:text-xl font-extrabold text-white tracking-wide bg-primary/95 px-6 py-3 rounded-full shadow-[0_8px_20px_rgba(249,115,22,0.3)] text-center border border-orange-500/30 transform transition-transform hover:scale-105">
            Os melhores produtos para sua sessão! <span className="text-orange-500">💨</span>
          </p>
        </div>
      </div>
    </header>
  );
}
