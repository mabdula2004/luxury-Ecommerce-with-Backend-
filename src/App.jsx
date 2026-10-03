import { useEffect, useMemo, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Account from './pages/Account'
import Checkout from './pages/Checkout'
import { isSupabaseConfigured, supabase } from './lib/supabase'

const fallbackProducts = [
  {id:'demo-1',name:'Noir Sculpted Blazer',slug:'noir-sculpted-blazer',price:385,category_slug:'women',description:'Sculpted tailoring in a soft wool blend. A clean shoulder and elongated line create an architectural silhouette.',image_url:'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=1200&q=88',sizes:['XS','S','M','L'],colors:['Noir','Ivory'],featured:true},
  {id:'demo-2',name:'Arc Leather Bag',slug:'arc-leather-bag',price:520,category_slug:'accessories',description:'Structured full-grain leather with quiet hardware and a hand-finished interior.',image_url:'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=88',sizes:['One Size'],colors:['Espresso','Black'],featured:true},
  {id:'demo-3',name:'Merino Atelier Knit',slug:'merino-atelier-knit',price:245,category_slug:'men',description:'Fine-gauge merino with an architectural relaxed fit and soft hand feel.',image_url:'https://images.unsplash.com/photo-1610652492500-ded49ceeb378?auto=format&fit=crop&w=1200&q=88',sizes:['S','M','L','XL'],colors:['Stone','Ink'],featured:true},
  {id:'demo-4',name:'Column Silk Dress',slug:'column-silk-dress',price:460,category_slug:'women',description:'Fluid silk cut on a restrained column line for movement without excess.',image_url:'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=88',sizes:['XS','S','M','L'],colors:['Ink','Pearl'],featured:true}
]

export default function App(){
  const [products,setProducts]=useState([]); const [loading,setLoading]=useState(true); const [error,setError]=useState(''); const [user,setUser]=useState(null); const [cart,setCart]=useState([]); const [wish,setWish]=useState([]); const navigate=useNavigate()
  useEffect(()=>{loadCatalog();if(!supabase)return;supabase.auth.getUser().then(({data})=>setUser(data.user||null));const {data:listener}=supabase.auth.onAuthStateChange((_event,session)=>setUser(session?.user||null));return()=>listener.subscription.unsubscribe()},[])
  useEffect(()=>{if(user)refreshPrivateData();else{setCart([]);setWish([])}},[user])
  async function loadCatalog(){setLoading(true);setError('');try{if(!supabase){setProducts(fallbackProducts);return}const {data,error:catalogError}=await supabase.from('products').select('*,categories(slug,name)').order('featured',{ascending:false}).order('created_at',{ascending:false});if(catalogError)throw catalogError;setProducts((data||[]).map(p=>({...p,category_slug:p.categories?.slug})))}catch(e){setError(e.message);setProducts(fallbackProducts)}finally{setLoading(false)}}
  async function refreshPrivateData(){if(!supabase||!user)return;const [{data:cartData,error:cartError},{data:wishData,error:wishError}]=await Promise.all([supabase.from('cart_items').select('*,products(*)').eq('user_id',user.id).order('created_at'),supabase.from('wishlist_items').select('product_id').eq('user_id',user.id)]);if(cartError||wishError)setError(cartError?.message||wishError?.message);setCart(cartData||[]);setWish((wishData||[]).map(x=>x.product_id))}
  async function requireUser(){if(user)return true;navigate('/account');return false}
  async function addCart(product,quantity=1,size,color){if(!await requireUser())return false;const existing=cart.find(x=>x.product_id===product.id&&x.size===size&&x.color===color);const payload={user_id:user.id,product_id:product.id,quantity:(existing?.quantity||0)+quantity,size,color};if(existing)payload.id=existing.id;const {error:e}=await supabase.from('cart_items').upsert(payload,{onConflict:'user_id,product_id,size,color'});if(e){setError(e.message);return false}await refreshPrivateData();return true}
  async function toggleWishlist(product){if(!await requireUser())return;const saved=wish.includes(product.id);const query=saved?supabase.from('wishlist_items').delete().eq('user_id',user.id).eq('product_id',product.id):supabase.from('wishlist_items').insert({user_id:user.id,product_id:product.id});const {error:e}=await query;if(e)setError(e.message);else await refreshPrivateData()}
  async function changeQuantity(item,quantity){if(quantity<1)return removeCart(item.id);const {error:e}=await supabase.from('cart_items').update({quantity}).eq('id',item.id);if(e)setError(e.message);else await refreshPrivateData()}
  async function removeCart(id){const {error:e}=await supabase.from('cart_items').delete().eq('id',id);if(e)setError(e.message);else await refreshPrivateData()}
  const cartCount=useMemo(()=>cart.reduce((sum,x)=>sum+x.quantity,0),[cart])
  return <Layout user={user} cartCount={cartCount} wishCount={wish.length}>
    {!isSupabaseConfigured&&<div className="devBanner">Preview mode · add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY for live Auth, Cart, Wishlist and Orders.</div>}
    <Routes><Route path="/" element={<Home products={products} loading={loading}/>}/><Route path="/shop" element={<Shop products={products} loading={loading} error={error} wish={wish} onWishlist={toggleWishlist}/>}/><Route path="/product/:slug" element={<Product products={products} loading={loading} wish={wish} onWishlist={toggleWishlist} onAddCart={addCart}/>}/><Route path="/cart" element={<Cart cart={cart} onQuantity={changeQuantity} onRemove={removeCart}/>}/><Route path="/wishlist" element={<Wishlist user={user} products={products} wish={wish} onWishlist={toggleWishlist}/>}/><Route path="/account" element={<Account user={user}/>}/><Route path="/checkout" element={<Checkout user={user} cart={cart} onRefresh={refreshPrivateData}/>}/><Route path="*" element={<Shop products={products} loading={loading} error={error} wish={wish} onWishlist={toggleWishlist}/>}/></Routes>
  </Layout>
}
