import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Heart, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react'

export default function Layout({ children, user, cartCount, wishCount }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  useEffect(() => { setOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }, [location.pathname])
  return <>
    <div className="announcement">Complimentary delivery over £300 <span>•</span> Private client service</div>
    <header className="siteHeader">
      <button className="iconButton mobileMenu" aria-label="Open menu" onClick={() => setOpen(v => !v)}>{open ? <X/> : <Menu/>}</button>
      <Link className="wordmark" to="/">ATELIER<span>01</span></Link>
      <nav className={open ? 'mainNav open' : 'mainNav'}>
        <NavLink to="/shop">New arrivals</NavLink><NavLink to="/shop?category=women">Women</NavLink><NavLink to="/shop?category=men">Men</NavLink><NavLink to="/shop?category=accessories">Objects</NavLink>
      </nav>
      <div className="headerActions">
        <Link aria-label="Search" to="/shop"><Search/></Link>
        <Link aria-label="Wishlist" className="countIcon" to="/wishlist"><Heart/><b>{wishCount}</b></Link>
        <Link aria-label={user ? 'Account' : 'Sign in'} to="/account"><UserRound/></Link>
        <Link aria-label="Shopping bag" className="countIcon" to="/cart"><ShoppingBag/><b>{cartCount}</b></Link>
      </div>
    </header>
    {children}
    <footer className="siteFooter">
      <section><Link className="wordmark inverse" to="/">ATELIER<span>01</span></Link><p>Modern luxury, considered slowly.</p></section>
      <section><b>Client services</b><a>Delivery & returns</a><a>Care guide</a><a>Contact</a></section>
      <section><b>Atelier</b><a>Our story</a><a>Materials</a><a>Journal</a></section>
      <section className="newsletter"><b>Private notes</b><p>Seasonal edits, atelier stories and private releases.</p><div><input aria-label="Newsletter email" placeholder="Email address"/><button>Join</button></div></section>
      <small>© 2026 Atelier 01 · Portfolio commerce experience</small>
    </footer>
  </>
}
