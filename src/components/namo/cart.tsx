import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import productImages from "@/data/product-images.json";

// Business WhatsApp number (international format, digits only). Change here if it moves.
export const WHATSAPP_NUMBER = "919035651622";
const BUSINESS = "Namoo Enterprises";

export type CartItem = { name: string; slug: string; image: string; qty: number };
type AddInput = Omit<CartItem, "qty">;

const CartContext = createContext({
  items: [] as CartItem[],
  add: (_i: AddInput) => {},
  setQty: (_n: string, _q: number) => {},
  remove: (_n: string) => {},
  open: false,
  setOpen: (_o: boolean) => {},
});
export const useCart = () => useContext(CartContext);

export function imageFor(name: string, fallback: string) {
  return (productImages as Record<string, string>)[name] ?? fallback;
}

function productLink(slug: string) {
  const origin =
    typeof window !== "undefined" ? window.location.origin : "https://namoo-entre.lovable.app";
  return `${origin}/${slug}`;
}

export function whatsappUrl(items: { name: string; slug: string; qty: number }[]) {
  const lines = items.map(
    (i, n) => `${n + 1}. ${i.name}\n   Quantity: ${i.qty}\n   Product Link: ${productLink(i.slug)}`,
  );
  const text = `Hello ${BUSINESS}, I would like to place an order.\n\nProducts:\n${lines.join("\n")}\n\nPlease confirm availability and the final price. Thank you!`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function buyNow(item: AddInput) {
  window.open(whatsappUrl([{ ...item, qty: 1 }]), "_blank", "noopener");
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("namo-cart");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    localStorage.setItem("namo-cart", JSON.stringify(items));
  }, [items]);
  const add = (i: AddInput) =>
    setItems((list) =>
      list.some((x) => x.name === i.name)
        ? list.map((x) => (x.name === i.name ? { ...x, qty: x.qty + 1 } : x))
        : [...list, { ...i, qty: 1 }],
    );
  const setQty = (name: string, qty: number) =>
    setItems((list) =>
      qty < 1
        ? list.filter((x) => x.name !== name)
        : list.map((x) => (x.name === name ? { ...x, qty } : x)),
    );
  const remove = (name: string) => setItems((list) => list.filter((x) => x.name !== name));
  return (
    <CartContext.Provider value={{ items, add, setQty, remove, open, setOpen }}>
      {children}
      <CartPanel />
    </CartContext.Provider>
  );
}

export function CartButton() {
  const { items, setOpen } = useCart();
  const count = items.reduce((s, i) => s + i.qty, 0);
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Open cart"
      title="Cart"
      onClick={() => setOpen(true)}
    >
      <ShoppingCart />
      {count > 0 && <span className="count">{count}</span>}
    </Button>
  );
}

function CartPanel() {
  const { items, setQty, remove, open, setOpen } = useCart();
  if (!open) return null;
  const total = items.reduce((s, i) => s + i.qty, 0);
  return (
    <div className="cart-overlay" onClick={() => setOpen(false)}>
      <aside
        className="cart-panel"
        role="dialog"
        aria-label="Your cart"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cart-head">
          <h2>Your Cart</h2>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Close cart"
            onClick={() => setOpen(false)}
          >
            <X />
          </Button>
        </div>
        {items.length === 0 ? (
          <p className="cart-empty">Your cart is empty.</p>
        ) : (
          <ul className="cart-list">
            {items.map((i) => (
              <li key={i.name}>
                <img src={i.image} alt={i.name} width="64" height="64" />
                <div>
                  <strong>{i.name}</strong>
                  <small>Price on request</small>
                  <div className="cart-qty">
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label={`Decrease ${i.name}`}
                      onClick={() => setQty(i.name, i.qty - 1)}
                    >
                      <Minus />
                    </Button>
                    <span>{i.qty}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label={`Increase ${i.name}`}
                      onClick={() => setQty(i.name, i.qty + 1)}
                    >
                      <Plus />
                    </Button>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={`Remove ${i.name}`}
                  onClick={() => remove(i.name)}
                >
                  <Trash2 />
                </Button>
              </li>
            ))}
          </ul>
        )}
        {items.length > 0 && (
          <div className="cart-foot">
            <p>
              {total} item{total > 1 ? "s" : ""} · final price confirmed on WhatsApp
            </p>
            <Button asChild>
              <a href={whatsappUrl(items)} target="_blank" rel="noopener noreferrer">
                Proceed to WhatsApp
              </a>
            </Button>
          </div>
        )}
      </aside>
    </div>
  );
}
