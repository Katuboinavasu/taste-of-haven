import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight, CalendarDays, CheckCircle2, Clock3, MapPin,
  Minus, Phone, Plus, ShoppingBag, Star, Trash2, Utensils, X
} from "lucide-react";
import "./styles.css";

const menu = [
  { id: 1, name: "Haven Special Biryani", category: "Main Course", price: 299, rating: 4.9, emoji: "🍛", desc: "Aromatic basmati rice, tender chicken and our signature spices." },
  { id: 2, name: "Paneer Tikka", category: "Starters", price: 219, rating: 4.8, emoji: "🧀", desc: "Char-grilled paneer with peppers, onions and smoky masala." },
  { id: 3, name: "Butter Chicken", category: "Main Course", price: 329, rating: 4.9, emoji: "🍗", desc: "Creamy tomato gravy with tender chicken and gentle spices." },
  { id: 4, name: "Veggie Delight Bowl", category: "Main Course", price: 249, rating: 4.7, emoji: "🥗", desc: "Seasonal vegetables, grains and a fresh house dressing." },
  { id: 5, name: "Garlic Naan", category: "Breads", price: 89, rating: 4.8, emoji: "🫓", desc: "Soft tandoor-baked naan finished with garlic and butter." },
  { id: 6, name: "Haven Cheesecake", category: "Desserts", price: 179, rating: 4.9, emoji: "🍰", desc: "Silky cheesecake with berry compote and biscuit crumble." },
  { id: 7, name: "Mango Lassi", category: "Drinks", price: 119, rating: 4.8, emoji: "🥭", desc: "Creamy chilled yogurt drink blended with ripe mango." },
  { id: 8, name: "Classic Lemonade", category: "Drinks", price: 99, rating: 4.7, emoji: "🍋", desc: "Freshly squeezed lemon, mint and a touch of sweetness." }
];

const categories = ["All", "Starters", "Main Course", "Breads", "Desserts", "Drinks"];

function App() {
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingDone, setBookingDone] = useState(false);
  const [orderDone, setOrderDone] = useState(false);

  const filtered = useMemo(
    () => category === "All" ? menu : menu.filter(i => i.category === category),
    [category]
  );

  const addToCart = item => {
    setCart(prev => {
      const found = prev.find(x => x.id === item.id);
      if (found) return prev.map(x => x.id === item.id ? { ...x, qty: x.qty + 1 } : x);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev
      .map(x => x.id === id ? { ...x, qty: x.qty + delta } : x)
      .filter(x => x.qty > 0)
    );
  };

  const removeItem = id => setCart(prev => prev.filter(x => x.id !== id));
  const subtotal = cart.reduce((s, x) => s + x.price * x.qty, 0);
  const cartCount = cart.reduce((s, x) => s + x.qty, 0);

  const submitBooking = e => {
    e.preventDefault();
    setBookingDone(true);
  };

  const submitOrder = () => {
    if (!cart.length) return;
    setOrderDone(true);
    setCart([]);
  };

  return (
    <div className="app">
      <header className="navbar">
        <a className="brand" href="#home" aria-label="Taste of Haven home">
          <span className="brand-mark"><Utensils size={21}/></span>
          <span>Taste of <b>Haven</b></span>
        </a>
        <nav>
          <a href="#home">Home</a>
          <a href="#menu">Menu</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <button className="cart-button" onClick={() => setCartOpen(true)}>
          <ShoppingBag size={19}/> Cart
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </button>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span/> WELCOME TO TASTE OF HAVEN</div>
            <h1>Good food.<br/><em>Great moments.</em></h1>
            <p>Fresh ingredients, comforting flavors and warm hospitality — made for the moments you want to remember.</p>
            <div className="hero-actions">
              <a className="primary-btn" href="#menu">Explore Menu <ArrowRight size={18}/></a>
              <button className="secondary-btn" onClick={() => setBookingOpen(true)}>Reserve a Table</button>
            </div>
            <div className="hero-meta">
              <span><Star size={17} fill="currentColor"/> 4.9/5 guest rating</span>
              <span><Clock3 size={17}/> Open daily · 11 AM – 11 PM</span>
            </div>
          </div>
          <div className="hero-art">
            <div className="plate">
              <div className="food">🍛</div>
              <span className="steam s1">〰</span><span className="steam s2">〰</span>
            </div>
            <div className="float-card"><span>Chef's pick</span><b>Haven Special Biryani</b><small>★★★★★</small></div>
          </div>
        </section>

        <section id="menu" className="section menu-section">
          <div className="section-head">
            <div>
              <div className="eyebrow"><span/> OUR MENU</div>
              <h2>Made with love,<br/><em>served with joy.</em></h2>
            </div>
            <p>From comforting classics to chef's specials, every plate is prepared fresh to order.</p>
          </div>
          <div className="filters">
            {categories.map(c => <button key={c} className={category === c ? "active" : ""} onClick={() => setCategory(c)}>{c}</button>)}
          </div>
          <div className="menu-grid">
            {filtered.map(item => (
              <article className="food-card" key={item.id}>
                <div className="food-image"><span>{item.emoji}</span><div className="rating"><Star size={13} fill="currentColor"/> {item.rating}</div></div>
                <div className="food-content">
                  <small>{item.category}</small>
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                  <div className="food-bottom"><strong>₹{item.price}</strong><button onClick={() => addToCart(item)}><Plus size={16}/> Add</button></div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="about">
          <div className="about-image"><div className="about-badge">Since<br/><b>2024</b></div><span>👨‍🍳</span></div>
          <div className="about-copy">
            <div className="eyebrow"><span/> OUR STORY</div>
            <h2>A little haven<br/><em>on your plate.</em></h2>
            <p>Taste of Haven was created around one simple idea: a restaurant should feel like your favorite place. We bring together honest ingredients, thoughtful cooking and a relaxed atmosphere.</p>
            <div className="stats"><div><b>20+</b><span>Signature dishes</span></div><div><b>4.9★</b><span>Guest rating</span></div><div><b>100%</b><span>Fresh daily</span></div></div>
          </div>
        </section>

        <section className="cta">
          <div><div className="eyebrow light"><span/> YOUR TABLE AWAITS</div><h2>Make tonight<br/><em>delicious.</em></h2></div>
          <button className="light-btn" onClick={() => setBookingOpen(true)}>Reserve a Table <ArrowRight size={18}/></button>
        </section>
      </main>

      <footer id="contact">
        <div className="footer-brand"><a className="brand" href="#home"><span className="brand-mark"><Utensils size={21}/></span><span>Taste of <b>Haven</b></span></a><p>Good food. Great moments.</p></div>
        <div><h4>Visit us</h4><p><MapPin size={15}/> 12 Haven Street, Bengaluru</p><p><Phone size={15}/> +91 98765 43210</p></div>
        <div><h4>Hours</h4><p>Mon – Sun</p><p>11:00 AM – 11:00 PM</p></div>
        <div><h4>Follow</h4><p>Instagram · Facebook</p></div>
      </footer>

      {cartOpen && <div className="overlay" onMouseDown={() => setCartOpen(false)}>
        <aside className="drawer" onMouseDown={e => e.stopPropagation()}>
          <div className="drawer-head"><h2>Your order</h2><button onClick={() => setCartOpen(false)}><X/></button></div>
          {!cart.length ? <div className="empty"><ShoppingBag size={42}/><h3>Your cart is empty</h3><p>Add something delicious from our menu.</p></div> :
          <><div className="cart-items">{cart.map(x => <div className="cart-item" key={x.id}><span className="cart-emoji">{x.emoji}</span><div className="cart-info"><b>{x.name}</b><small>₹{x.price} each</small><div className="qty"><button onClick={() => updateQty(x.id,-1)}><Minus size={13}/></button><span>{x.qty}</span><button onClick={() => updateQty(x.id,1)}><Plus size={13}/></button></div></div><strong>₹{x.price*x.qty}</strong><button className="remove" onClick={() => removeItem(x.id)}><Trash2 size={16}/></button></div>)}</div>
          <div className="checkout"><div><span>Subtotal</span><b>₹{subtotal}</b></div><small>Taxes and delivery charges calculated at checkout.</small><button className="primary-btn full" onClick={submitOrder}>Place order</button></div></>}
        </aside>
      </div>}

      {bookingOpen && <div className="modal-backdrop">
        <div className="modal">
          <button className="modal-close" onClick={() => {setBookingOpen(false);setBookingDone(false)}}><X/></button>
          {!bookingDone ? <><div className="eyebrow"><span/> RESERVATION</div><h2>Reserve your table</h2><p>Tell us when you'd like to visit. We'll keep your table ready.</p>
          <form onSubmit={submitBooking}><label>Name<input required placeholder="Your name"/></label><label>Phone<input required type="tel" placeholder="+91"/></label><div className="two"><label>Date<input required type="date"/></label><label>Time<input required type="time"/></label></div><label>Guests<select defaultValue="2"><option>2 guests</option><option>3 guests</option><option>4 guests</option><option>5 guests</option><option>6+ guests</option></select></label><button className="primary-btn full" type="submit">Confirm reservation <CalendarDays size={17}/></button></form></> :
          <div className="success"><CheckCircle2 size={54}/><h2>Reservation received!</h2><p>Thank you. Your table request has been recorded.</p><button className="primary-btn" onClick={() => setBookingOpen(false)}>Done</button></div>}
        </div>
      </div>}

      {orderDone && <div className="toast"><CheckCircle2 size={20}/><span><b>Order placed!</b><br/>Your delicious meal is being prepared.</span><button onClick={() => setOrderDone(false)}><X size={16}/></button></div>}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
