import { Search, SlidersHorizontal } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { LoadingGrid, StatePanel } from '../components/StatePanel'

export default function Shop({ products, loading, error, wish, onWishlist }) {
  const [params] = useSearchParams(); const category = params.get('category') || 'all'
  const [query, setQuery] = useState(''); const [sort, setSort] = useState('featured'); const [max, setMax] = useState(1000)
  useEffect(() => { setQuery('') }, [category])
  const list = useMemo(() => products.filter(p => { const categoryMatch = category === 'all' || p.category_slug === category || p.category_id === category; return categoryMatch && p.name.toLowerCase().includes(query.toLowerCase()) && Number(p.price) <= max }).sort((a,b) => sort === 'low' ? a.price-b.price : sort === 'high' ? b.price-a.price : Number(b.featured)-Number(a.featured)), [products, category, query, sort, max])
  return <main className="shopPage"><header className="pageIntro"><span className="eyebrow">THE COLLECTION / {category.toUpperCase()}</span><h1>Objects of <em>intention.</em></h1><p>{list.length} pieces selected · Autumn / Winter 2026</p></header><section className="filters"><label className="searchField"><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search the collection"/></label><label className="rangeField"><span><SlidersHorizontal/> Up to £{max}</span><input type="range" min="200" max="1000" step="25" value={max} onChange={e=>setMax(Number(e.target.value))}/></label><select value={sort} onChange={e=>setSort(e.target.value)} aria-label="Sort products"><option value="featured">Curated</option><option value="low">Price, low to high</option><option value="high">Price, high to low</option></select></section>{error && <div className="inlineNotice error">The live catalog had a problem. {error}</div>}{loading ? <LoadingGrid/> : list.length ? <div className="productGrid">{list.map(p=><ProductCard key={p.id} product={p} wished={wish.includes(p.id)} onWishlist={onWishlist}/>)}</div> : <StatePanel title="No pieces found" copy="Try a broader search, collection or price range."/>}</main>
}
