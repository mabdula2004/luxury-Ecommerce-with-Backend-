export function LoadingGrid() { return <div className="productGrid">{[1,2,3,4].map(x => <div className="skeletonCard" key={x}><div/><i/><i/></div>)}</div> }
export function StatePanel({ title, copy, action }) { return <div className="statePanel"><span>ATELIER 01</span><h2>{title}</h2>{copy && <p>{copy}</p>}{action}</div> }
