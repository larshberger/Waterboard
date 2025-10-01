import './PlussMinusKnapp.css'


export default function PlussMinusKnapp({ label, liters, count, onAdd, onRemove }) {
return (
<div className="pm-wrap">
<p>{count} × {label}</p>
<button type="button" className="icon-btn" onClick={onAdd}>+1</button>
<button type="button" className="icon-btn danger" onClick={onRemove} disabled={count === 0}>-1</button>
</div>
)
}


