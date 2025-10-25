'use client'
import { useEffect, useState } from 'react'
type Project = { _id:string; name:string }

export default function Projects(){
  const [projects,setProjects]=useState<Project[]>([])
  const [name,setName]=useState('Demo Project')
  const [err,setErr]=useState('')

  async function load(){
    const r=await fetch(`${process.env.NEXT_PUBLIC_API_ORIGIN}/api/projects`,{credentials:'include'})
    if(!r.ok){ setErr('Login first (on /)'); return }
    setProjects(await r.json())
  }
  async function create(){
    const r=await fetch(`${process.env.NEXT_PUBLIC_API_ORIGIN}/api/projects`,{
      method:'POST',credentials:'include',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({name})
    })
    if(r.ok) load()
  }

  useEffect(()=>{ load() }, [])

  return <main style={{maxWidth:900,margin:'40px auto',padding:'0 16px'}}>
    <h1 style={{fontSize:28,fontWeight:800}}>Projects</h1>
    {err && <p style={{color:'crimson'}}>{err}</p>}
    <div style={{display:'flex',gap:8,marginTop:12}}>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Project name"/>
      <button onClick={create}>Create</button>
    </div>
    <ul style={{marginTop:16}}>
      {projects.map(p=> <li key={p._id}><a href={`/projects/${p._id}`}>{p.name}</a></li>)}
    </ul>
  </main>
}
