"use client";
import React from 'react'
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Jenkins local v1 Pipeline Deployemnt Successfull!!!</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '20%', margin: '3rem' }}>
        <Link href='/pages/jenkins-pipeline'>Jenkins</Link>
        <Link href='/pages/vercel'>Vercel</Link>
      </div>
    
    </div>
    
  );
}
