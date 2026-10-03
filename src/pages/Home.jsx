import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { LoadingGrid } from '../components/StatePanel'

export default function Home({ products, loading }) {
  const edit = products.filter(p => p.featured).slice(0, 4)
  return <main>
    <section className="hero"><div className="heroCopy"><span className="eyebrow">AUTUMN / WINTER 2026</span><h1>Quiet forms.<br/><em>Lasting presence.</em></h1><p>An edit of tactile tailoring and considered objects, made for a wardrobe beyond seasons.</p><Link className="textLink" to="/shop">Explore the collection <ArrowRight/></Link></div><div className="heroVisual"><span>01 / 06</span></div></section>
    <section className="manifesto"><span>01 — THE EDIT</span><h2>Luxury, distilled to<br/>what matters.</h2><p>Purposeful silhouettes. Exceptional materials. Pieces selected for how they feel, live and endure.</p></section>
    <section className="collectionSection"><div className="sectionTitle"><div><span className="eyebrow">CURATED NOW</span><h2>The seasonal edit</h2></div><Link className="textLink" to="/shop">View all <ArrowRight/></Link></div>{loading ? <LoadingGrid/> : <div className="productGrid">{edit.map(p => <ProductCard key={p.id} product={p}/>)}</div>}</section>
    <section className="editorial"><div className="editorialImage"/><article><span className="eyebrow">ATELIER NOTES / 04</span><h2>The art of<br/><em>restraint.</em></h2><p>The most compelling pieces do not ask for attention. They earn it through proportion, material and detail.</p><Link className="textLink light" to="/shop">Discover the edit <ArrowRight/></Link></article></section>
    <section className="serviceStrip"><div><b>01</b><h3>Complimentary delivery</h3><p>Insured shipping over £300.</p></div><div><b>02</b><h3>Considered returns</h3><p>30 days to decide at home.</p></div><div><b>03</b><h3>Private client service</h3><p>Personal assistance, thoughtfully delivered.</p></div></section>
  </main>
}
