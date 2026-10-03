import { Check, Heart, Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { StatePanel } from '../components/StatePanel'
import { money } from '../lib/format'

export default function Product({ products, loading, wish, onWishlist, onAddCart }) {
  const { slug } = useParams(); const product = products.find(p => p.slug === slug)
  const [size,setSize] = useState(''); const [color,setColor] = useState(''); const [qty,setQty] = useState(1); const [added,setAdded] = useState(false)
  if (loading) return <main className="detailPage"><StatePanel title="Preparing the piece" copy="Loading product details…"/></main>
  if (!product) return <main className="detailPage"><StatePanel title="Piece not found" copy="This item may have left the current edit." action={<Link className="primaryButton" to="/shop">Return to collection</Link>}/></main>
  const add = async () => { const ok = await onAddCart(product,qty,size || product.sizes?.[0],color || product.colors?.[0]); if(ok){setAdded(true);setTimeout(()=>setAdded(false),2200)} }
  return <main className="detailPage"><section className="detailMedia"><img src={product.image_url} alt={product.name}/><span>ATELIER / {product.slug.toUpperCase()}</span></section><section className="detailInfo"><span className="eyebrow">AUTUMN / WINTER 2026</span><h1>{product.name}</h1><strong className="detailPrice">{money(product.price)}</strong><p className="detailDescription">{product.description}</p><div className="rule"/><div className="option"><b>Colour</b><div className="chips">{product.colors?.map(v=><button key={v} className={color===v?'active':''} onClick={()=>setColor(v)}>{v}</button>)}</div></div><div className="option"><b>Size</b><div className="chips">{product.sizes?.map(v=><button key={v} className={size===v?'active':''} onClick={()=>setSize(v)}>{v}</button>)}</div></div><div className="purchaseRow"><div className="quantity"><button aria-label="Decrease quantity" onClick={()=>setQty(Math.max(1,qty-1))}><Minus/></button><span>{qty}</span><button aria-label="Increase quantity" onClick={()=>setQty(qty+1)}><Plus/></button></div><button className="primaryButton grow" onClick={add}>{added?'Added to bag ✓':`Add to bag — ${money(Number(product.price)*qty)}`}</button></div><button className="secondaryButton full" onClick={()=>onWishlist(product)}><Heart fill={wish.includes(product.id)?'currentColor':'none'}/>{wish.includes(product.id)?'Saved to wishlist':'Save to wishlist'}</button><div className="benefits"><p><Check/> Complimentary insured delivery over £300</p><p><Check/> 30-day considered returns</p><p><Check/> Signature recyclable packaging</p></div></section></main>
}
