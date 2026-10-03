import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { StatePanel } from '../components/StatePanel'

export default function Wishlist({ user, products, wish, onWishlist }) {
  if (!user) return <main className="shopPage"><header className="pageIntro compact"><span className="eyebrow">PRIVATE EDIT</span><h1>Your <em>wishlist.</em></h1></header><StatePanel title="Sign in to save your edit" copy="Your favourites will sync securely across sessions." action={<Link className="primaryButton" to="/account">Sign in</Link>}/></main>
  const saved=products.filter(p=>wish.includes(p.id))
  return <main className="shopPage"><header className="pageIntro compact"><span className="eyebrow">PRIVATE EDIT</span><h1>Your <em>wishlist.</em></h1><p>{saved.length} saved {saved.length===1?'piece':'pieces'}</p></header>{saved.length?<div className="productGrid">{saved.map(p=><ProductCard key={p.id} product={p} wished onWishlist={onWishlist}/>)}</div>:<StatePanel title="Nothing saved yet" copy="Use the heart on a piece to build your private edit." action={<Link className="textLink" to="/shop">Browse collection <ArrowRight/></Link>}/>}</main>
}
