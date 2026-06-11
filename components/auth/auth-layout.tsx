'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import {
  Sun, Moon, BookOpen, FileText, MessageSquare, ShoppingBag,
  Newspaper, Shield, Layers, ShieldCheck, Lock, Users, Star
} from 'lucide-react'

const features = [
  { icon: BookOpen, iconColor: '#4f8ef7', darkBg: 'rgba(37,99,235,0.25)', lightBg: 'rgba(37,99,235,0.12)', border: 'rgba(59,130,246,0.35)', title: 'Study Materials', desc: 'Notes, books, guides and more' },
  { icon: FileText, iconColor: '#a78bfa', darkBg: 'rgba(109,40,217,0.25)', lightBg: 'rgba(109,40,217,0.12)', border: 'rgba(139,92,246,0.35)', title: 'Question Papers', desc: 'Previous year papers and sample papers' },
  { icon: MessageSquare, iconColor: '#2ecc71', darkBg: 'rgba(5,150,105,0.22)', lightBg: 'rgba(5,150,105,0.12)', border: 'rgba(16,185,129,0.3)', title: 'Community', desc: 'Chat, discuss and grow together' },
  { icon: ShoppingBag, iconColor: '#f59e0b', darkBg: 'rgba(180,83,9,0.25)', lightBg: 'rgba(180,83,9,0.12)', border: 'rgba(245,158,11,0.3)', title: 'Marketplace', desc: 'Buy and sell anything within your campus' },
  { icon: Newspaper, iconColor: '#f472b6', darkBg: 'rgba(157,23,77,0.25)', lightBg: 'rgba(157,23,77,0.12)', border: 'rgba(244,114,182,0.3)', title: 'Quick Reads', desc: 'Curated articles and resources' },
]

const bottomFeatures = [
  { icon: ShieldCheck, iconColor: '#4f8ef7', bg: 'rgba(37,99,235,0.15)', title: 'Secure & Verified', desc: 'College email verification\nfor your security' },
  { icon: Lock, iconColor: '#a78bfa', bg: 'rgba(109,40,217,0.15)', title: 'Private & Safe', desc: 'Your data is encrypted\nand never shared' },
  { icon: Users, iconColor: '#0ea5e9', bg: 'rgba(14,165,233,0.15)', title: 'Student Community', desc: 'Join thousands of\nstudents' },
  { icon: Star, iconColor: '#f59e0b', bg: 'rgba(245,158,11,0.15)', title: 'Easy to Use', desc: 'Designed specifically\nfor students' },
]

interface AuthLayoutProps {
  children: React.ReactNode
}

function ThemeToggleButton() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  const isDark = resolvedTheme === 'dark'
  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      title="Toggle theme"
      style={{
        position: 'absolute', top: 16, right: 16, zIndex: 20,
        width: 36, height: 36, borderRadius: 10,
        background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
        border: isDark ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(0,0,0,0.12)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: isDark ? '#fff' : '#111',
        transition: 'all 0.2s',
      }}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const isDark = mounted ? resolvedTheme === 'dark' : true

  // Theme-aware colors 
  const pageBg = isDark ? '#060814' : '#f8fafc' // Slightly darker solid background to match image
  const heroBg = isDark ? 'linear-gradient(150deg,#0d1333 0%,#0b1028 45%,#110d35 100%)' : 'linear-gradient(150deg,#dbeafe 0%,#e0e7ff 45%,#ede9fe 100%)'
  const rightBg = isDark ? '#0b0d1e' : '#ffffff'
  const cardBorder = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.1)'
  const dividerColor = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.08)'
  const headlineColor = isDark ? '#fff' : '#0f172a'
  const subColor = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(15,23,42,0.6)'
  const titleColor = isDark ? '#fff' : '#0f172a'
  const descColor = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(15,23,42,0.5)'
  const trustColor = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(15,23,42,0.6)'
  const glow1 = isDark ? 'radial-gradient(circle,rgba(67, 120, 205, 0.12) 0%,transparent 65%)' : 'radial-gradient(circle,rgba(59,130,246,0.08) 0%,transparent 65%)'
  const glow2 = isDark ? 'radial-gradient(circle,rgba(139, 92, 246, 0.12) 0%,transparent 60%)' : 'radial-gradient(circle,rgba(109,40,217,0.12) 0%,transparent 60%)'

  return (
    <div style={{ minHeight: '100vh', background: pageBg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', transition: 'background 0.3s' }}>
      <ThemeToggleButton />

      <div style={{
        width: '100%', maxWidth: 1160,
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        borderRadius: 24, overflow: 'hidden',
        border: `1px solid ${cardBorder}`,
        boxShadow: isDark ? '0 24px 80px rgba(0,0,0,0.5)' : '0 20px 60px rgba(0,0,0,0.12)',
        minHeight: 640,
        transition: 'all 0.3s',
        zIndex: 10,
        position: 'relative'
      }}>

        {/* left panel */}
        <section style={{ background: heroBg, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '48px', minHeight: 600, transition: 'background 0.3s' }}>

          <div style={{ position: 'absolute', top: '28%', left: '40%', width: '75%', aspectRatio: '1/1', pointerEvents: 'none', zIndex: 0 }}>
            <Image
              src="/login-elements.png"
              alt="3D academic elements illustration"
              fill
              style={{ objectFit: 'contain', objectPosition: 'center', opacity: isDark ? 1 : 0.85 }}
              priority
            />
          </div>

          <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', flex: 1 }}>
            {/* Headline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 440, marginBottom: 36 }}>
              <h1 style={{ fontSize: 36, fontWeight: 800, color: headlineColor, lineHeight: 1.25, margin: 0, letterSpacing: '-0.5px' }}>
                Everything Students Need,{' '}
                <span style={{ background: 'linear-gradient(90deg,#4f8ef7,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  All in One Place
                </span>
              </h1>
              <p style={{ fontSize: 14, color: subColor, lineHeight: 1.6, margin: 0 }}>
                Access notes, question papers, study materials, 
                community discussions, and the marketplace — all in one powerful platform.
              </p>
            </div>

            {/* Features */}
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 20, listStyle: 'none', margin: 0, padding: 0, flex: 1 }}>
              {features.map(({ icon: Icon, iconColor, darkBg, lightBg, border, title, desc }) => (
                <li key={title} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: isDark ? darkBg : lightBg, border: `1px solid ${border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={18} color={iconColor} />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: titleColor }}>{title}</p>
                    <p style={{ margin: 0, fontSize: 12, color: descColor, marginTop: 2 }}>{desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Trust badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 40 }}>
              <Shield size={16} color="#a78bfa" />
              <p
                style={{
                  fontSize: 13,
                  color: trustColor,
                }}>
                  StudentHub is a platform for students to connect and learn together.
                </p>
            </div>

          </div>
        </section>

        {/* auth form panel */}
        <div style={{ background: rightBg, borderLeft: `1px solid ${dividerColor}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 52px', overflowY: 'auto', transition: 'background 0.3s' }}>
          {children}
        </div>
      </div>
    </div>
  )
}