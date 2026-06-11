'use client'

import { useState, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FcGoogle } from 'react-icons/fc'
import { useTheme } from 'next-themes'
import {
  User, Mail, Lock, Eye, EyeOff, AlertCircle,
  CheckCircle2, Loader2, ShieldCheck, RefreshCw, ArrowRight,
} from 'lucide-react'
import {
  validatePassword, validateEmail, validateOTP,
  validateName, validatePasswordsMatch,
} from '@/lib/validation'
import AuthLayout from '@/components/auth/auth-layout'

function useStyles() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isDark = mounted ? resolvedTheme === 'dark' : true
  const textColor = isDark ? '#fff' : '#0f172a'
  const subText = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(15,23,42,0.5)'
  const borderColor = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.15)'
  const inputBg = isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc'
  const icoColor = isDark ? 'rgba(255,255,255,0.38)' : 'rgba(15,23,42,0.35)'
  const tabBg = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)'
  const tabInactive = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(15,23,42,0.45)'
  const dividerBg = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
  const dividerText = isDark ? 'rgba(255,255,255,0.35)' : 'rgba(15,23,42,0.35)'
  const googleBorder = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.15)'
  const googleBg = isDark ? 'rgba(255,255,255,0.06)' : '#fff'
  const otpBoxBg = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)'
  const otpBoxBorder = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
  const backBtnBg = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)'
  const backBtnBorder = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'
  const backBtnColor = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(15,23,42,0.6)'
  const rememberColor = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(15,23,42,0.5)'
  const footerColor = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(15,23,42,0.4)'
  const hintColor = isDark ? 'rgba(255,255,255,0.35)' : 'rgba(15,23,42,0.35)'
  const step2Inactive = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'
  const step2InactiveText = isDark ? 'rgba(255,255,255,0.35)' : 'rgba(15,23,42,0.35)'
  const step2InactiveBorder = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'
  const inp: React.CSSProperties = { width: '100%', height: 46, borderRadius: 10, border: `1px solid ${borderColor}`, background: inputBg, color: textColor, fontSize: 14, paddingLeft: 42, paddingRight: 16, outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }
  const inpR: React.CSSProperties = { ...inp, paddingRight: 46 }
  const lbl: React.CSSProperties = { fontSize: 13, fontWeight: 500, color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(15,23,42,0.7)', marginBottom: 6, display: 'block' }
  const ico: React.CSSProperties = { position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: icoColor, pointerEvents: 'none' }
  const btn: React.CSSProperties = { width: '100%', height: 46, borderRadius: 10, background: 'linear-gradient(90deg,#4f8ef7,#6366f1)', border: 'none', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }
  return { isDark, textColor, subText, borderColor, inputBg, icoColor, tabBg, tabInactive, dividerBg, dividerText, googleBorder, googleBg, otpBoxBg, otpBoxBorder, backBtnBg, backBtnBorder, backBtnColor, rememberColor, footerColor, hintColor, step2Inactive, step2InactiveText, step2InactiveBorder, inp, inpR, lbl, ico, btn }
}

function ErrBanner({ msg }: { msg: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 10, background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)', marginBottom: 16, fontSize: 13, color: '#f87171' }}>
      <AlertCircle size={14} /> {msg}
    </div>
  )
}

function GoogleBtn({ loading, disabled, onClick }: { loading: boolean; disabled: boolean; onClick: () => void }) {
  const { textColor, googleBorder, googleBg, dividerBg, dividerText } = useStyles()
  return (
    <>
      <button type="button" onClick={onClick} disabled={disabled} style={{ width: '100%', height: 46, borderRadius: 10, border: `1px solid ${googleBorder}`, background: googleBg, color: textColor, fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer', marginBottom: 20 }}>
        {loading ? <Loader2 size={16} className="animate-spin" /> : <FcGoogle size={18} />}
        Continue with Google
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{ flex: 1, height: 1, background: dividerBg }} />
        <span style={{ fontSize: 12, color: dividerText }}>or continue with email</span>
        <div style={{ flex: 1, height: 1, background: dividerBg }} />
      </div>
    </>
  )
}

function Tabs({ active, onChange }: { active: 'login' | 'signup'; onChange: (t: 'login' | 'signup') => void }) {
  const { tabBg, tabInactive } = useStyles()
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
      <div style={{ display: 'flex', background: tabBg, borderRadius: 50, padding: 4 }}>
        {(['login', 'signup'] as const).map((t) => (
          <button key={t} onClick={() => onChange(t)} style={{
            padding: '8px 36px', borderRadius: 50, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600,
            background: active === t ? 'linear-gradient(90deg,#4f8ef7,#6366f1)' : 'transparent',
            color: active === t ? '#fff' : tabInactive,
            boxShadow: active === t ? '0 4px 14px rgba(79,141,247,0.14)' : 'none',
            transition: 'all 0.25s',
          }}>
            {t === 'login' ? 'Login' : 'Sign Up'}
          </button>
        ))}
      </div>
    </div>
  )
}

function LoginForm({ onSwitch }: { onSwitch: () => void }) {
  const { textColor, subText, rememberColor, footerColor, inp, inpR, lbl, ico, btn } = useStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [gLoading, setGLoading] = useState(false)
  const router = useRouter()
  const disabled = loading || gLoading

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError('')
    if (!/^[a-zA-Z0-9._%+-]+@iiitl\.ac\.in$/i.test(email)) {
      setError('Only IIITL email addresses (@iiitl.ac.in) are allowed'); setLoading(false); return
    }
    try {
      const result = await signIn('credentials', { redirect: false, email, password })
      if (result?.error) {
        if (result.error === 'PASSWORD_NOT_SET') { router.push(`/auth/set-password?email=${encodeURIComponent(email)}`); return }
        setError(result.error === 'Invalid Credentials' ? 'Invalid email or password.' : result.error)
      } else if (result?.ok) { router.push('/'); router.refresh() }
    } catch { setError('Something went wrong.') }
    finally { setLoading(false) }
  }

  const handleGoogle = async () => {
    try { setGLoading(true); await signIn('google', { callbackUrl: '/' }) }
    catch { setError('Failed to sign in with Google.'); setGLoading(false) }
  }

  return (
    <div style={{ width: '100%' }}>
      <h2 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 700, color: textColor, textAlign: 'center' }}>Welcome back!</h2>
      <p style={{ margin: '0 0 24px', fontSize: 13, color: subText, textAlign: 'center' }}>Login to continue to StudentHub</p>

      <GoogleBtn loading={gLoading} disabled={disabled} onClick={handleGoogle} />
      {error && <ErrBanner msg={error} />}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label style={lbl}>Email address</label>
          <div style={{ position: 'relative' }}>
            <Mail size={15} style={ico} />
            <input id="signin-email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@iiitl.ac.in" disabled={disabled} required style={inp} />
          </div>
        </div>

        <div style={{ marginBottom: 10 }}>
          <label style={lbl}>Password</label>
          <div style={{ position: 'relative' }}>
            <Lock size={15} style={ico} />
            <input id="signin-password" type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" disabled={disabled} required style={inpR} />
            <button type="button" onClick={() => setShowPw(v => !v)} style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: rememberColor, padding: 0 }}>
              {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: rememberColor, cursor: 'pointer' }}>
            <input type="checkbox" style={{ accentColor: '#4f8ef7' }} /> Remember me
          </label>
          <Link href="/auth/forgot-password" style={{ fontSize: 13, color: '#4f8ef7', textDecoration: 'none' }}>Forgot password?</Link>
        </div>

        <button id="signin-submit-btn" type="submit" disabled={disabled} style={btn}>
          {loading ? <><Loader2 size={15} className="animate-spin" /> Signing in...</> : 'Login'}
        </button>
      </form>

      <p style={{ textAlign: 'center', fontSize: 13, color: footerColor, margin: '18px 0 0' }}>
        Don&apos;t have an account?{' '}
        <span onClick={onSwitch} style={{ color: '#4f8ef7', fontWeight: 600, cursor: 'pointer' }}>Sign up</span>
      </p>
    </div>
  )
}

function SignUpForm({ onSwitch }: { onSwitch: () => void }) {
  const { textColor, subText, rememberColor, footerColor, hintColor, otpBoxBg, otpBoxBorder, step2Inactive, step2InactiveText, step2InactiveBorder, backBtnBg, backBtnBorder, backBtnColor, inp, inpR, lbl, ico, btn } = useStyles()
  const [step, setStep] = useState<1 | 2>(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [showCp, setShowCp] = useState(false)
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [gLoading, setGLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [otpLoading, setOtpLoading] = useState(false)
  const router = useRouter()
  const disabled = loading || gLoading

  const handleSendOTP = async () => {
    setOtpLoading(true); setError('')
    const emailError = validateEmail(email)
    if (emailError) { setError(emailError); setOtpLoading(false); return }
    try {
      const res = await fetch('/api/auth/send-otp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to send OTP')
      setOtpSent(true); setError('')
    } catch (err: unknown) { setError(err instanceof Error ? err.message : 'Failed to send OTP.') }
    finally { setOtpLoading(false) }
  }

  const handleVerifyOTP = async () => {
    setOtpLoading(true); setError('')
    const otpError = validateOTP(otp)
    if (otpError) { setError(otpError); setOtpLoading(false); return }
    try {
      const res = await fetch('/api/auth/verify-otp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, otp }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to verify OTP')
      setOtpVerified(true); setError('')
    } catch (err: unknown) { setError(err instanceof Error ? err.message : 'Invalid OTP.') }
    finally { setOtpLoading(false) }
  }

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault(); setError('')
    const nameError = validateName(name); if (nameError) { setError(nameError); return }
    const emailError = validateEmail(email); if (emailError) { setError(emailError); return }
    if (!otpVerified) { setError('Please verify your email with OTP first'); return }
    setStep(2)
  }

  const handleStep2 = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError('')
    const pwError = validatePassword(password); if (pwError) { setError(pwError); setLoading(false); return }
    const matchError = validatePasswordsMatch(password, confirmPassword); if (matchError) { setError(matchError); setLoading(false); return }
    try {
      const res = await fetch('/api/auth/register-with-otp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password, otp }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to register')
      const result = await signIn('credentials', { redirect: false, email, password })
      if (result?.error) throw new Error(result.error)
      router.push('/'); router.refresh()
    } catch (err: unknown) { setError(err instanceof Error ? err.message : 'Something went wrong.') }
    finally { setLoading(false) }
  }

  const handleGoogle = async () => {
    try { setGLoading(true); await signIn('google', { callbackUrl: '/' }) }
    catch { setError('Failed to sign in with Google.'); setGLoading(false) }
  }

  return (
    <div style={{ width: '100%' }}>
      <h2 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 700, color: textColor, textAlign: 'center' }}>
        {step === 1 ? 'Create your account' : 'Set your password'}
      </h2>
      <p style={{ margin: '0 0 24px', fontSize: 13, color: subText, textAlign: 'center' }}>
        {step === 1 ? 'Join thousands of students on StudentHub' : 'Almost done! Set a strong password to secure your account'}
      </p>

      {/* Step indicator */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 24 }}>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#4f8ef7,#6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}>1</div>
        <div style={{ width: 40, height: 2, borderRadius: 2, background: step === 2 ? 'linear-gradient(90deg,#4f8ef7,#6366f1)' : step2Inactive }} />
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: step === 2 ? 'linear-gradient(135deg,#4f8ef7,#6366f1)' : step2Inactive, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: step === 2 ? '#fff' : step2InactiveText, border: step === 2 ? 'none' : `1px solid ${step2InactiveBorder}` }}>2</div>
      </div>

      {step === 1 && <GoogleBtn loading={gLoading} disabled={disabled} onClick={handleGoogle} />}
      {error && <ErrBanner msg={error} />}

      {/* ── STEP 1: Name + Email + OTP ── */}
      {step === 1 && (
        <form onSubmit={handleStep1}>
          <div style={{ marginBottom: 16 }}>
            <label style={lbl}>Full name</label>
            <div style={{ position: 'relative' }}>
              <User size={15} style={ico} />
              <input id="signup-name" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" disabled={disabled} required style={inp} />
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={lbl}>Email address</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <Mail size={15} style={ico} />
                <input id="signup-email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@iiitl.ac.in" disabled={disabled || otpVerified} required style={inp} />
              </div>
              {otpVerified ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 14px', borderRadius: 10, background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.3)', fontSize: 13, color: '#34d399', whiteSpace: 'nowrap' }}>
                  <CheckCircle2 size={14} /> Verified
                </div>
              ) : (
                <button id="send-otp-btn" type="button" onClick={handleSendOTP} disabled={otpLoading || !email || otpSent || disabled} style={{ padding: '0 16px', borderRadius: 10, background: 'rgba(79,142,247,0.15)', border: '1px solid rgba(79,142,247,0.3)', color: '#4f8ef7', fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', height: 46 }}>
                  {otpLoading ? <Loader2 size={14} className="animate-spin" /> : otpSent ? 'Sent ✓' : 'Send OTP'}
                </button>
              )}
            </div>
          </div>

          {otpSent && !otpVerified && (
            <div style={{ marginBottom: 16, padding: 16, borderRadius: 12, background: otpBoxBg, border: `1px solid ${otpBoxBorder}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, fontSize: 13, color: subText }}>
                <ShieldCheck size={14} color="#4f8ef7" /> Check your inbox for a 6-digit code
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <input id="otp" type="text" inputMode="numeric" value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="• • • • • •" maxLength={6}
                  style={{ ...inp, paddingLeft: 16, textAlign: 'center', letterSpacing: 8, fontSize: 20, fontWeight: 700 }} />
                <button id="verify-otp-btn" type="button" onClick={handleVerifyOTP} disabled={otpLoading || otp.length < 6}
                  style={{ padding: '0 18px', borderRadius: 10, background: 'linear-gradient(90deg,#4f8ef7,#6366f1)', border: 'none', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', height: 46 }}>
                  {otpLoading ? <Loader2 size={14} className="animate-spin" /> : 'Verify'}
                </button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 12, color: hintColor }}>
                <button type="button" onClick={handleSendOTP} disabled={otpLoading} style={{ background: 'none', border: 'none', color: '#4f8ef7', cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <RefreshCw size={11} /> Resend code
                </button>
                <span>Valid for 10 minutes</span>
              </div>
            </div>
          )}

          <button id="signup-next-btn" type="submit" disabled={!otpVerified || disabled} style={{ ...btn, opacity: !otpVerified ? 0.55 : 1, marginTop: 4 }}>
            Continue <ArrowRight size={15} />
          </button>
        </form>
      )}

      {/* ── STEP 2: Password + Confirm ── */}
      {step === 2 && (
        <form onSubmit={handleStep2}>
          <div style={{ marginBottom: 16 }}>
            <label style={lbl}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={15} style={ico} />
              <input id="signup-password" type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Create a strong password" disabled={disabled} required style={inpR} />
              <button type="button" onClick={() => setShowPw(v => !v)} style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: rememberColor, padding: 0 }}>
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            <p style={{ marginTop: 6, fontSize: 11, color: hintColor }}>Min 8 characters with uppercase, number &amp; symbol</p>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={lbl}>Confirm password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={15} style={ico} />
              <input id="signup-confirm" type={showCp ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Re-enter your password" disabled={disabled} required style={inpR} />
              <button type="button" onClick={() => setShowCp(v => !v)} style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: rememberColor, padding: 0 }}>
                {showCp ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <p style={{ fontSize: 12, color: hintColor, marginBottom: 20 }}>
            By creating an account you agree to our{' '}
            <Link href="/terms" style={{ color: '#4f8ef7' }}>Terms of Service</Link> and{' '}
            <Link href="/privacy" style={{ color: '#4f8ef7' }}>Privacy Policy</Link>.
          </p>

          <div style={{ display: 'flex', gap: 10 }}>
            <button type="button" onClick={() => setStep(1)} style={{ flex: '0 0 auto', height: 46, padding: '0 20px', borderRadius: 10, background: backBtnBg, border: `1px solid ${backBtnBorder}`, color: backBtnColor, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
              Back
            </button>
            <button id="signup-submit-btn" type="submit" disabled={disabled} style={{ ...btn, flex: 1 }}>
              {loading ? <><Loader2 size={15} className="animate-spin" /> Creating account...</> : 'Create account'}
            </button>
          </div>
        </form>
      )}

      <p style={{ textAlign: 'center', fontSize: 13, color: footerColor, margin: '18px 0 0' }}>
        Already have an account?{' '}
        <span onClick={onSwitch} style={{ color: '#4f8ef7', fontWeight: 600, cursor: 'pointer' }}>Sign in</span>
      </p>
    </div>
  )
}

export default function AuthPageContent({ defaultTab = 'signup' }: { defaultTab?: 'login' | 'signup' }) {
  const [tab, setTab] = useState<'login' | 'signup'>(defaultTab)

  return (
    <AuthLayout>
      <div style={{ width: '100%' }}>
        <Tabs active={tab} onChange={setTab} />
        {tab === 'login'
          ? <LoginForm key="login" onSwitch={() => setTab('signup')} />
          : <SignUpForm key="signup" onSwitch={() => setTab('login')} />}
      </div>
    </AuthLayout>
  )
}
