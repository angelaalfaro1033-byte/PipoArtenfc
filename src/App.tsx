import { useState, useEffect, useRef, type ReactNode } from 'react'
import logoImg from '@/imports/Logo.png'
import materaSolImg from '@/imports/MateraSol.png'
import materaLunaImg from '@/imports/MateraLuna.png'
import materaRubiImg from '@/imports/MateraRubi.png'
import materaHeaderImg from '@/imports/MateraHeader.png'

// ─── Config ───────────────────────────────────────────────────────────────────
const WHATSAPP_URL = 'https://wa.me/message/RKA2XOBFQGHHF1'
const INSTAGRAM_URL = 'https://www.instagram.com/pipo.artenfc' // Actualiza tu usuario
const TIKTOK_URL = 'https://tiktok.com/@pipoarte' // Actualiza tu usuario

function waLink(msg: string) {
  return WHATSAPP_URL
}

// ─── Products Data ────────────────────────────────────────────────────────────
interface Product {
  id: number
  name: string
  description: string
  price: string
  image: string
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Matera Sol',
    description: 'Una pieza hecha a mano, con pequeños detalles por descubrir.',
    price: '$25.000 COP',
    image: materaSolImg,
  },
  {
    id: 2,
    name: 'Matera Luna',
    description: 'Creada artesanalmente para guardar un encanto propio.',
    price: '$25.000 COP',
    image: materaLunaImg,
  },
  {
    id: 3,
    name: 'Matera Rubí',
    description: 'Un pequeño tesoro artesanal, hecho con cuidado y carácter.',
    price: '$25.000 COP',
    image: materaRubiImg,
  },
]

// ─── Isotipo SVG component ────────────────────────────────────────────────────
function Isotipo({
  size = 32,
  color = '#FF7BA7',
  className = '',
  style = {},
}: {
  size?: number
  color?: string
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <svg
      width={size}
      height={size * 0.72}
      viewBox="0 0 50 36"
      fill="none"
      className={className}
      style={style}
    >
      <circle cx="12" cy="9" r="4.5" fill={color} />
      <rect x="24" y="6" width="15" height="6" rx="3" fill={color} />
      <path d="M5 22 Q25 40 45 22" stroke={color} strokeWidth="4.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}

// ─── useInView hook ───────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return { ref, inView }
}

function FadeIn({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// ─── Header ──────────────────────────────────────────────────────────────────
function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Detalles', href: '#detalles' },
    { label: 'Contacto', href: '#contacto' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? 'bg-[#FFF8F5]/96 backdrop-blur-md shadow-[0_1px_24px_rgba(255,123,167,0.08)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-[78px] flex items-center justify-between">
        <button onClick={() => scrollTo('#inicio')} className="flex items-center" aria-label="PipoArte inicio">
          <img src={logoImg} alt="PipoArte" className="h-33 w-auto" />
        </button>

        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map(link => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-[#2E1A1A]/60 hover:text-[#FF7BA7] font-700 text-sm tracking-wide transition-colors duration-200 font-semibold"
            >
              {link.label}
            </button>
          ))}
          <a
            href={waLink('Hola PipoArte ♡ Me gustaría crear un detalle personalizado.')}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#FF7BA7] text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-[#e8608f] transition-all duration-200 hover:shadow-[0_4px_16px_rgba(255,123,167,0.4)]"
          >
            Crear detalle
          </a>
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-[5px] p-2 ml-2"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          <span
            className="block w-6 h-[2px] bg-[#FF7BA7] rounded-full transition-all duration-300 origin-center"
            style={{ transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }}
          />
          <span
            className="block w-6 h-[2px] bg-[#FF7BA7] rounded-full transition-all duration-300"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-6 h-[2px] bg-[#FF7BA7] rounded-full transition-all duration-300 origin-center"
            style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }}
          />
        </button>
      </div>

      <div
        className="md:hidden overflow-hidden transition-all duration-300 bg-[#FFF8F5]"
        style={{ maxHeight: menuOpen ? '320px' : '0px' }}
      >
        <div className="px-6 pt-2 pb-6 flex flex-col gap-4 border-t border-[#FF7BA7]/10">
          {navLinks.map(link => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-left text-[#2E1A1A] font-bold text-lg hover:text-[#FF7BA7] transition-colors py-1"
            >
              {link.label}
            </button>
          ))}
          <a
            href={waLink('Hola PipoArte ♡ Me gustaría crear un detalle personalizado.')}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#FF7BA7] text-white text-center font-bold px-5 py-3.5 rounded-full mt-2 text-base"
          >
            Crear detalle
          </a>
        </div>
      </div>
    </header>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="inicio" className="min-h-screen flex items-center relative overflow-hidden bg-[#FFF8F5] pt-[78px]">
      {/* Subtle isotipo background pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="absolute opacity-[0.045]"
            style={{
              top: `${[10, 25, 55, 75, 15, 45, 80, 35, 65][i]}%`,
              left: `${[5, 85, 10, 90, 50, 25, 70, 60, 40][i]}%`,
              transform: `rotate(${[-8, 12, -5, 18, 0, -12, 8, -3, 15][i]}deg)`,
            }}
          >
            <Isotipo size={48 + i * 4} color="#FF7BA7" />
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 w-full">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#FF7BA7]/10 text-[#FF7BA7] text-[11px] font-bold uppercase tracking-[0.15em] px-4 py-2 rounded-full mb-8">
              <Isotipo size={13} color="#FF7BA7" />
              <span>Detalles hechos a mano</span>
            </div>

            <h1 className="text-[2.8rem] leading-[1.1] lg:text-[3.5rem] font-black text-[#2E1A1A] mb-6">
              Un detalle que<br />
              <span className="text-[#FF7BA7]">guarda algo más.</span>
            </h1>

            <p className="text-[#2E1A1A]/60 text-[1.05rem] leading-relaxed mb-10 max-w-[420px] font-medium">
              Flores y materas hechas a mano, con un pequeño misterio esperando ser descubierto.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <button
                onClick={() => document.querySelector('#detalles')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#FF7BA7] text-white font-bold px-8 py-4 rounded-full text-base hover:bg-[#e8608f] transition-all duration-200 hover:shadow-[0_6px_20px_rgba(255,123,167,0.38)]"
              >
                Ver detalles
              </button>
              <a
                href={waLink('Hola PipoArte ♡ Me gustaría crear un detalle personalizado.')}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-[#FF7BA7] text-[#FF7BA7] font-bold px-8 py-4 rounded-full text-base hover:bg-[#FF7BA7]/8 transition-all duration-200"
              >
                Crear mi detalle
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs text-[#2E1A1A]/45 font-bold tracking-wide uppercase">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFC39E] inline-block" />
                Detalle físico
              </span>
              <span className="text-[#FF7BA7] font-black text-base leading-none">›</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF7BA7] inline-block" />
                Un secreto por descubrir
              </span>
              <span className="text-[#FF7BA7] font-black text-base leading-none">›</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF7BA7] inline-block animate-heartbeat" />
                Experiencia
              </span>
            </div>
          </div>

          {/* Visual */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative">
              {/* Main photo */}
              <div
                className="w-[300px] h-[340px] lg:w-[360px] lg:h-[420px] rounded-[32px] overflow-hidden"
                style={{ boxShadow: '0 24px 60px rgba(255,123,167,0.18)' }}
              >
                <img
                  src={materaHeaderImg}
                  alt="Matera artesanal PipoArte"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FF7BA7]/10 to-transparent" />
              </div>

              {/* A small invitation to discover */}
              <div className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.10)] px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#FF7BA7]/12 flex items-center justify-center flex-shrink-0">
                  <Isotipo size={18} color="#FF7BA7" />
                </div>
                <div>
                  <div className="text-[11px] text-[#2E1A1A]/50 font-semibold leading-tight">Lo especial</div>
                  <div className="text-sm font-black text-[#2E1A1A] leading-tight">está por descubrir</div>
                </div>
              </div>

              {/* Floating curiosity note */}
              <div className="absolute -top-5 -right-6 bg-[#FFC39E] text-white rounded-2xl px-3.5 py-2.5 text-xs font-bold shadow-md animate-float">
                Hay algo más aquí
              </div>

              {/* Decorative large isotipo */}
              <div className="absolute -bottom-12 -right-10 opacity-10 pointer-events-none">
                <Isotipo size={90} color="#FF7BA7" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-35">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF7BA7]">Descubrir</span>
        <div className="w-px h-8 bg-[#FF7BA7] animate-float" />
      </div>
    </section>
  )
}

// ─── HowItWorks ──────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Lo creamos',
      desc: 'Tejemos tu detalle a mano con limpiapipas, con toda la atención que esa persona merece.',
    },
    {
      num: '02',
      title: 'Lo personalizamos',
      desc: 'Cada pieza guarda un detalle especial que espera su momento para ser descubierto.',
    },
    {
      num: '03',
      title: 'Lo descubren',
      desc: 'Quien la recibe descubre una sorpresa hecha con cariño, a su propio ritmo.',
    },
  ]

  return (
    <section className="py-28 bg-white relative overflow-hidden">
      {/* Thin accent line top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[3px] bg-[#FF7BA7] rounded-full" />

      <div className="max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-20">
          <p className="text-[#FF7BA7] text-xs font-bold uppercase tracking-[0.18em] mb-3">Hecho con intención</p>
          <h2 className="text-3xl lg:text-5xl font-black text-[#2E1A1A] mb-5">No es solo un detalle.</h2>
          <p className="text-[#2E1A1A]/55 text-lg max-w-lg mx-auto font-medium leading-relaxed">
            Es una forma de guardar una canción, una foto, unas palabras o un recuerdo
            en algo que puedes entregar con tus propias manos.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-8 left-[16.66%] right-[16.66%] h-px bg-[#FF7BA7]/15" />

          {steps.map((step, i) => (
            <FadeIn key={step.num} delay={i * 120}>
              <div className="relative group">
                <div className="flex items-start gap-5 md:flex-col md:gap-4">
                  {/* Number + dot */}
                  <div className="flex-shrink-0 relative">
                    <span className="text-[4rem] leading-none font-black text-[#FF7BA7]/12 select-none">
                      {step.num}
                    </span>
                    <div className="absolute top-4 left-0 w-3 h-3 rounded-full bg-[#FF7BA7] shadow-[0_0_0_4px_rgba(255,123,167,0.2)]" />
                  </div>
                  <div className="pt-2 md:pt-0">
                    <h3 className="text-xl font-black text-[#2E1A1A] mb-2">{step.title}</h3>
                    <p className="text-[#2E1A1A]/55 font-medium leading-relaxed text-[0.95rem]">{step.desc}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Bottom isotipo divider */}
        <FadeIn delay={400} className="flex justify-center mt-20">
          <div className="flex items-center gap-6 opacity-20">
            <div className="h-px w-16 bg-[#FF7BA7]" />
            <Isotipo size={28} color="#FF7BA7" />
            <div className="h-px w-16 bg-[#FF7BA7]" />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ─── Products ─────────────────────────────────────────────────────────────────
function ProductCard({ product }: { product: Product }) {
  return (
    <div
      className="bg-white rounded-3xl overflow-hidden group hover:-translate-y-1.5 transition-all duration-300"
      style={{ boxShadow: '0 4px 20px rgba(255,123,167,0.08)' }}
    >
      <div className="relative overflow-hidden h-[260px] sm:h-[290px] bg-[#FFF0EB]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-3 group-hover:scale-[1.03] transition-transform duration-500"
        />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-black text-[#2E1A1A] text-base leading-tight">{product.name}</h3>
          <span className="text-[#FF7BA7] font-black text-sm whitespace-nowrap">{product.price}</span>
        </div>
        <p className="text-[#2E1A1A]/50 text-sm leading-relaxed font-medium mb-4">{product.description}</p>

        <a
          href={waLink(`Hola, quiero pedir la ${product.name}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-[#FF7BA7] text-white font-bold py-3 rounded-full text-sm hover:bg-[#e8608f] transition-all duration-200 hover:shadow-[0_4px_14px_rgba(255,123,167,0.35)]"
        >
          Descubrir esta matera
        </a>
      </div>
    </div>
  )
}

function ProductsSection() {
  return (
    <section id="detalles" className="py-28 bg-[#FFF8F5] relative">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <p className="text-[#FF7BA7] text-xs font-bold uppercase tracking-[0.18em] mb-3">Catálogo</p>
          <h2 className="text-3xl lg:text-5xl font-black text-[#2E1A1A] mb-4">
            Un pequeño misterio hecho a mano.
          </h2>
          <p className="text-[#2E1A1A]/55 text-lg font-medium max-w-md mx-auto">
            Tres materas artesanales. Cada una guarda su propio encanto.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product, i) => (
            <FadeIn key={product.id} delay={i * 80}>
              <ProductCard product={product} />
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  )
}

// ─── Personalization ──────────────────────────────────────────────────────────
function PersonalizationSection() {
  const options = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M14 4 Q22 8 22 14 Q22 20 14 24 Q6 20 6 14 Q6 8 14 4Z" stroke="#FF7BA7" strokeWidth="1.8" fill="none" />
          <path d="M14 8 Q19 10.5 19 14 Q19 17.5 14 20 Q9 17.5 9 14 Q9 10.5 14 8Z" stroke="#FF7BA7" strokeWidth="1.5" fill="none" opacity="0.5" />
          <circle cx="14" cy="14" r="2.5" fill="#FF7BA7" />
          <path d="M7 5 Q3 8 3 14 Q3 20 7 23" stroke="#FFC39E" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
      ),
      title: 'Tu canción',
      desc: 'Una canción que tenga significado para ustedes. La que sonó ese día, la que escuchan juntos, la que dice lo que sientes.',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="3" y="5" width="22" height="18" rx="3" stroke="#FF7BA7" strokeWidth="1.8" fill="none" />
          <circle cx="10" cy="11" r="2.5" stroke="#FF7BA7" strokeWidth="1.5" fill="none" />
          <path d="M3 20 L9 14 L14 18 L19 12 L25 18" stroke="#FFC39E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      ),
      title: 'Tu foto',
      desc: 'Un recuerdo que quieras guardar. Ese momento que los dos recuerdan. La imagen que captura algo que no se puede explicar.',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M5 6 Q5 4 7 4 L21 4 Q23 4 23 6 L23 18 Q23 20 21 20 L14 20 L9 24 L9 20 L7 20 Q5 20 5 18 Z" stroke="#FF7BA7" strokeWidth="1.8" fill="none" />
          <line x1="9" y1="10" x2="19" y2="10" stroke="#FFC39E" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="9" y1="14" x2="16" y2="14" stroke="#FFC39E" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      title: 'Tu mensaje',
      desc: 'Unas palabras que solo esa persona debería leer. Lo que siempre quisiste decirle pero no encontraste el momento.',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M14 3 L16.5 9.5 L23.5 10 L18.5 14.5 L20 21.5 L14 17.5 L8 21.5 L9.5 14.5 L4.5 10 L11.5 9.5 Z" stroke="#FF7BA7" strokeWidth="1.8" fill="none" strokeLinejoin="round" />
          <circle cx="14" cy="14" r="3" fill="#FFC39E" opacity="0.5" />
        </svg>
      ),
      title: 'Tu experiencia',
      desc: 'Una pequeña animación o experiencia digital hecha a medida. Algo que solo existe para esa persona, en ese momento.',
    },
  ]

  return (
    <section className="py-28 bg-[#FFF0EB] relative overflow-hidden">
      {/* Subtle top divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-[#FF7BA7]/10" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-center">
          <FadeIn>
            <p className="text-[#FF7BA7] text-xs font-bold uppercase tracking-[0.18em] mb-4">Personalización</p>
            <h2 className="text-3xl lg:text-5xl font-black text-[#2E1A1A] mb-6 leading-tight">
              Hazlo completamente tuyo.
            </h2>
            <p className="text-[#2E1A1A]/55 text-lg font-medium leading-relaxed mb-8 max-w-sm">
              Tú nos cuentas la historia.<br />
              Nosotros creamos el detalle.
            </p>
            <a
              href={waLink('Hola PipoArte ♡ Quiero crear un detalle completamente personalizado.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#FF7BA7] text-white font-black px-8 py-4 rounded-full text-base hover:bg-[#e8608f] transition-all duration-200 hover:shadow-[0_6px_20px_rgba(255,123,167,0.38)]"
            >
              Quiero crear uno
            </a>

            {/* Isotipo decoration */}
            <div className="mt-14 opacity-15">
              <Isotipo size={56} color="#FF7BA7" />
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-5">
            {options.map((opt, i) => (
              <FadeIn key={opt.title} delay={i * 100}>
                <div className="bg-white rounded-3xl p-6 hover:-translate-y-1 transition-transform duration-300"
                  style={{ boxShadow: '0 4px 20px rgba(255,123,167,0.07)' }}>
                  <div className="mb-4">{opt.icon}</div>
                  <h3 className="font-black text-[#2E1A1A] text-base mb-2">{opt.title}</h3>
                  <p className="text-[#2E1A1A]/50 text-sm leading-relaxed font-medium">{opt.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Mission & Vision ────────────────────────────────────────────────────────
function MissionVisionSection() {
  return (
    <section className="py-24 lg:py-28 bg-[#FFF8F5] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-14 lg:mb-16">
          <p className="text-[#FF7BA7] text-xs font-bold uppercase tracking-[0.18em] mb-3">
            Nuestra esencia
          </p>
          <h2 className="text-3xl lg:text-5xl font-black text-[#2E1A1A]">
            Lo que hay detrás de cada flor
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
          <FadeIn>
            <article>
              <p className="text-[#FF7BA7] text-xs font-bold uppercase tracking-[0.18em] mb-3">
                Misión
              </p>
              <p className="text-[#2E1A1A]/65 text-base lg:text-lg leading-relaxed font-medium">
                Crear flores artesanales que conviertan un detalle en una experiencia memorable, combinando el trabajo hecho a mano con soluciones que permiten personalizar y conservar aquello que hace especial cada regalo. Buscamos ofrecer productos accesibles, originales y significativos, donde cada flor tenga algo más que contar.
              </p>
            </article>
          </FadeIn>

          <FadeIn delay={100}>
            <article className="md:border-l md:border-[#FF7BA7]/20 md:pl-10">
              <p className="text-[#FF7BA7] text-xs font-bold uppercase tracking-[0.18em] mb-3">
                Visión
              </p>
              <p className="text-[#2E1A1A]/65 text-base lg:text-lg leading-relaxed font-medium">
                Para el año 2030, ser una marca colombiana reconocida a nivel nacional por transformar las flores artesanales en experiencias personalizadas y significativas, llegando a clientes de todo el país mediante envíos nacionales y consolidando una propuesta innovadora que combine creatividad, artesanía y tecnología.
              </p>
            </article>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

// ─── Social Section ───────────────────────────────────────────────────────────
function SocialSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn className="flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-[#FF7BA7] text-xs font-bold uppercase tracking-[0.18em] mb-2">Redes sociales</p>
            <h2 className="text-2xl lg:text-3xl font-black text-[#2E1A1A]">
              También nos encuentras por aquí.
            </h2>
          </div>

          <div className="flex gap-4">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-[#FFF0EB] text-[#2E1A1A] font-bold px-6 py-3.5 rounded-full text-sm hover:bg-[#FF7BA7] hover:text-white transition-all duration-200"
            >
              <InstagramIcon />
              Instagram
            </a>
            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-[#FFF0EB] text-[#2E1A1A] font-bold px-6 py-3.5 rounded-full text-sm hover:bg-[#2E1A1A] hover:text-white transition-all duration-200"
            >
              <TikTokIcon />
              TikTok
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg width="16" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.26 8.26 0 0 0 4.83 1.55V6.78a4.85 4.85 0 0 1-1.06-.09z" />
    </svg>
  )
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function ContactSection() {
  return (
    <section id="contacto" className="py-28 bg-[#FF7BA7] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 right-0 opacity-10 translate-x-8 translate-y-8">
          <Isotipo size={200} color="white" />
        </div>
        <div className="absolute top-0 left-0 opacity-5 -translate-x-8 -translate-y-8">
          <Isotipo size={150} color="white" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
        <FadeIn>
          <p className="text-white/60 text-xs font-bold uppercase tracking-[0.18em] mb-4">Contacto</p>
          <h2 className="text-3xl lg:text-5xl font-black text-white mb-6 leading-tight">
            Cuéntanos para quién es.
          </h2>
          <p className="text-white/75 text-lg font-medium leading-relaxed mb-10">
            Cuéntanos qué quieres regalar, para quién es y qué quieres que guarde.
            Nosotros nos encargamos del resto.
          </p>

          <a
            href={waLink('Hola PipoArte ♡ Me gustaría crear un detalle personalizado. Te cuento para quién es...')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-[#FF7BA7] font-black px-9 py-4.5 rounded-full text-base hover:bg-[#FFF8F5] transition-all duration-200 hover:shadow-[0_8px_28px_rgba(0,0,0,0.15)] mb-8"
          >
            <WhatsAppIcon size={20} color="#FF7BA7" />
            Hablar por WhatsApp
          </a>

          <div className="flex justify-center gap-6 mt-4">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors font-semibold text-sm flex items-center gap-1.5"
            >
              <InstagramIcon /> Instagram
            </a>
            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors font-semibold text-sm flex items-center gap-1.5"
            >
              <TikTokIcon /> TikTok
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function WhatsAppIcon({ size = 22, color = 'white' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#2E1A1A] text-white/60 relative overflow-hidden">
      {/* Isotipo pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(74px,1fr))] auto-rows-[60px] place-items-center min-w-[105%] min-h-[110%] -translate-x-3 -translate-y-3 opacity-[0.055]">
          {Array.from({ length: 120 }).map((_, i) => (
            <Isotipo key={i} size={28} color="white" />
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        <div className="flex flex-col items-center text-center gap-3">
          {/* Brand */}
          <div className="relative w-[170px] h-[60px] overflow-hidden">
            <img
              src={logoImg}
              alt="PipoArte"
              className="absolute top-[-121px] left-1/2 w-[300px] max-w-none -translate-x-1/2"
            />
          </div>

          {/* Social */}
          <div>
            <div className="flex items-center justify-center gap-5">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/55 hover:text-white transition-colors"
              >
                <InstagramIcon />
              </a>
              <a
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-white/55 hover:text-white transition-colors"
              >
                <TikTokIcon />
              </a>
              <a
                href={waLink('Hola PipoArte ♡')}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-white/55 hover:text-white transition-colors"
              >
                <WhatsAppIcon size={17} color="currentColor" />
              </a>
            </div>
          </div>
        </div>

        <div className=" pt-6 flex flex-col items-center gap-3 w-full">
          <p className="text-white/40 text-xs font-medium">
            © 2026 PipoArte · Detalles con creatividad
          </p>
        </div>
      </div>
    </footer>
  )
}

// ─── WhatsApp FAB ─────────────────────────────────────────────────────────────
function WhatsAppFAB() {
  return (
    <a
      href={waLink('Hola PipoArte ♡ Quiero descubrir más sobre sus materas.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.45)] hover:scale-110 hover:shadow-[0_6px_26px_rgba(37,211,102,0.5)] transition-all duration-200"
    >
      <WhatsAppIcon size={26} color="white" />
    </a>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <HowItWorks />
      <ProductsSection />
      <PersonalizationSection />
      <MissionVisionSection />
      <SocialSection />
      <ContactSection />
      <Footer />
      <WhatsAppFAB />
    </div>
  )
}
