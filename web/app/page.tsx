'use client'
import { useState } from 'react'

export default function Home(){
  const [email,setEmail]=useState('demo@sav.dev')
  const [password,setPassword]=useState('password')
  const [status,setStatus]=useState('')

  async function register(){
    const r=await fetch(`${process.env.NEXT_PUBLIC_API_ORIGIN}/api/auth/register`,{
      method:'POST',headers:{'Content-Type':'application/json'},credentials:'include',
      body:JSON.stringify({email,name:'Demo',password})
    })
    setStatus(r.ok?'Registered':'Register failed')
  }
  async function login(){
    const r=await fetch(`${process.env.NEXT_PUBLIC_API_ORIGIN}/api/auth/login`,{
      method:'POST',headers:{'Content-Type':'application/json'},credentials:'include',
      body:JSON.stringify({email,password})
    })
    setStatus(r.ok?'Logged in':'Login failed')
  }

  return <main style={{maxWidth:720,margin:'40px auto',padding:'0 16px'}}>
    <h1 style={{fontSize:32,fontWeight:800}}>SAV MERN Demo</h1>
    <p>Register/Login then create a project and manage tasks on a realtime Kanban board.</p>
    <div style={{display:'grid',gap:8,marginTop:12}}>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email"/>
      <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="password"/>
      <div style={{display:'flex',gap:8}}>
        <button onClick={register}>Register</button>
        <button onClick={login}>Login</button>
      </div>
      <div>{status}</div>
      <a href="/projects" style={{marginTop:8,display:'inline-block'}}>Go to Projects →</a>
    </div>
  </main>
}
