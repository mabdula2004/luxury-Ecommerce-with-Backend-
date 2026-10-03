import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { money } from '../lib/format'

export default function ProductCard({ product, wished = false, onWishlist }) {
  return <article className="productCard">
    <div className="productMedia">
      <Link to={`/product/${product.slug}`}><img src={product.image_url} alt={product.name} loading="lazy"/></Link>
      {onWishlist && <button className="floatingHeart" aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'} onClick={() => onWishlist(product)}><Heart fill={wished ? 'currentColor' : 'none'}/></button>}
      <span>{product.featured ? 'ATELIER EDIT' : 'NEW'}</span>
    </div>
    <Link className="productMeta" to={`/product/${product.slug}`}><div><h3>{product.name}</h3><p>{product.description?.split('.')[0]}</p></div><strong>{money(product.price)}</strong></Link>
  </article>
}
