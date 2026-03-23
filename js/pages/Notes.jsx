const { React, useState } = window;
const { LoadingDots } = window.components;
const { callAI } = window.utils.ai;

export function Notes() {
  const { initNotes } = window.utils.data;
  const [notes, setNotes] = useState(initNotes);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [aiSummary, setAiSummary] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [newNote, setNewNote] = useState({title:'',subject:'',content:'',tags:''});

  const filtered = notes.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.subject.toLowerCase().includes(search.toLowerCase()) ||
    n.tags.some(t => t.includes(search.toLowerCase()))
  );

  const summarize = async (note) => {
    setSelected(note);
    setAiSummary("");
    setAiLoading(true);
    const r = await callAI(
      `Summarize these notes and list 3–5 key points:\n\n${note.content}`,
      "You are a study assistant. Summarize concisely with bullet points."
    );
    setAiSummary(r);
    setAiLoading(false);
  };

  const addNote = () => {
    if (!newNote.title || !newNote.content) return;
    setNotes([{id:Date.now(), ...newNote, tags:newNote.tags.split(',').map(t=>t.trim()).filter(Boolean), date:'Today'}, ...notes]);
    setNewNote({title:'',subject:'',content:'',tags:''});
    setShowModal(false);
  };

  return (
    <div className="fade-in">
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
        <h2 style={{fontFamily:'var(--font-display)',fontSize:20,fontWeight:700}}>📚 Smart Notes</h2>
        <button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ New Note</button>
      </div>
      <div style={{marginBottom:16}}>
        <input className="input" placeholder="🔍 Search notes by title, subject, or tag…" value={search} onChange={e=>setSearch(e.target.value)}/>
      </div>

      {selected && (
        <div className="card" style={{marginBottom:20}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
            <div style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:16}}>{selected.title}</div>
            <button className="btn btn-ghost btn-sm" onClick={()=>{setSelected(null);setAiSummary('');}}>✕ Close</button>
          </div>
          <div style={{fontSize:13,color:'var(--text2)',lineHeight:1.7,marginBottom:16,whiteSpace:'pre-wrap'}}>{selected.content}</div>
          <div className="ai-box">
            <div className="ai-label">AI Summary</div>
            {aiLoading ? <LoadingDots/> : <div className="ai-text">{aiSummary}</div>}
          </div>
        </div>
      )}

      <div className="grid-3">
        {filtered.map(note => (
          <div key={note.id} className="note-card" onClick={()=>summarize(note)}>
            <div className="note-title">{note.title}</div>
            <div style={{marginBottom:8}}><span className="badge badge-purple">{note.subject}</span></div>
            <div className="note-preview">{note.content}</div>
            <div className="note-footer">
              <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
                {note.tags.map(t => <span key={t} className="badge badge-blue">{t}</span>)}
              </div>
              <span style={{fontSize:11,color:'var(--text3)'}}>{note.date}</span>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setShowModal(false)}}>
          <div className="modal">
            <div className="modal-title">📝 New Note</div>
            {[{label:'Title',key:'title',placeholder:'Note title…'},{label:'Subject',key:'subject',placeholder:'CS101, ECO201…'},{label:'Tags (comma-separated)',key:'tags',placeholder:'exam, formulas, important'}].map(f => (
              <div key={f.key} className="form-group">
                <label className="label">{f.label}</label>
                <input className="input" placeholder={f.placeholder} value={newNote[f.key]} onChange={e=>setNewNote({...newNote,[f.key]:e.target.value})}/>
              </div>
            ))}
            <div className="form-group">
              <label className="label">Content</label>
              <textarea className="input" rows={6} placeholder="Write your notes here…" value={newNote.content} onChange={e=>setNewNote({...newNote,content:e.target.value})} style={{resize:'vertical'}}/>
            </div>
            <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
              <button className="btn btn-ghost" onClick={()=>setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={addNote}>Save Note</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
