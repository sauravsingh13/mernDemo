'use client'
import { useEffect, useMemo, useState } from 'react'
import { io } from 'socket.io-client'
const socket = io(process.env.NEXT_PUBLIC_API_ORIGIN || 'http://localhost:4000', { withCredentials:true })

type Task = { _id:string; title:string; status:'todo'|'doing'|'done'; project:string }

export default function ProjectPage({ params }: { params: { id: string } }){
  const projectId = params.id
  const [tasks,setTasks]=useState<Task[]>([])
  const [title,setTitle]=useState('New Task')

  const cols = useMemo(()=>(['todo','doing','done'] as const),[])

  async function load(){
    const r=await fetch(`${process.env.NEXT_PUBLIC_API_ORIGIN}/api/projects/${projectId}/tasks`,{credentials:'include'})
    if(r.ok) setTasks(await r.json())
  }
  async function addTask(){
    const r=await fetch(`${process.env.NEXT_PUBLIC_API_ORIGIN}/api/projects/${projectId}/tasks`,{
      method:'POST',credentials:'include',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({title})
    })
    if(r.ok) await load()
  }
  async function updateStatus(id:string, status:Task['status']){
    const r=await fetch(`${process.env.NEXT_PUBLIC_API_ORIGIN}/api/projects/tasks/${id}`,{
      method:'PATCH',credentials:'include',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({status})
    })
    if(r.ok) await load()
  }

  useEffect(()=>{
    load()
    socket.emit('join', projectId)
    const onCreated = ()=>load()
    const onUpdated = ()=>load()
    socket.on('task.created', onCreated)
    socket.on('task.updated', onUpdated)
    return ()=>{
      socket.off('task.created', onCreated)
      socket.off('task.updated', onUpdated)
    }
  },[projectId])

  // HTML5 DnD
  const onDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id)
  }
  const onDrop = (e: React.DragEvent, status: Task['status']) => {
    e.preventDefault()
    const id = e.dataTransfer.getData('text/plain')
    if (id) updateStatus(id, status)
  }
  const allowDrop = (e: React.DragEvent) => e.preventDefault()

  return <main style={{maxWidth:1100,margin:'40px auto',padding:'0 16px'}}>
    <h1 style={{fontSize:28,fontWeight:800}}>Kanban</h1>
    <div style={{display:'flex',gap:8,marginTop:12}}>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Task title"/>
      <button onClick={addTask}>Add</button>
    </div>

    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:16,marginTop:16}}>
      {cols.map(col=>{
        const list = tasks.filter(t=>t.status===col)
        return (
          <div key={col} onDragOver={allowDrop} onDrop={(e)=>onDrop(e,col)}
            style={{border:'1px solid #e5e7eb',borderRadius:10,padding:10,background:'#fafafa'}}>
            <h3 style={{fontWeight:800,textTransform:'capitalize',marginBottom:8}}>{col}</h3>
            <ul style={{display:'grid',gap:8,minHeight:120}}>
              {list.map(t=> (
                <li key={t._id} draggable onDragStart={(e)=>onDragStart(e,t._id)}
                  style={{padding:'8px 10px',border:'1px solid #e5e7eb',borderRadius:8,background:'white',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <span>{t.title}</span>
                  <div style={{display:'flex',gap:6}}>
                    {col!=='todo' && <button onClick={()=>updateStatus(t._id,'todo')}>ToDo</button>}
                    {col!=='doing' && <button onClick={()=>updateStatus(t._id,'doing')}>Doing</button>}
                    {col!=='done' && <button onClick={()=>updateStatus(t._id,'done')}>Done</button>}
                  </div>
                </li>
              ))}
            </ul>
            <p style={{marginTop:8,fontSize:12,color:'#64748b'}}>Drag tasks here to move to “{col}”.</p>
          </div>
        )
      })}
    </div>
  </main>
}
