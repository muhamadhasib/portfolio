import * as React from "react"

// Enhanced breakpoint system for ultra-responsive design
const BREAKPOINTS = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1400,
  '3xl': 1600,
  '4xl': 1920,
} as const

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${BREAKPOINTS.md - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.md)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < BREAKPOINTS.md)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = React.useState<keyof typeof BREAKPOINTS | 'ultra'>('md')

  React.useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth
      if (width >= 2560) setBreakpoint('ultra')
      else if (width >= BREAKPOINTS['4xl']) setBreakpoint('4xl')
      else if (width >= BREAKPOINTS['3xl']) setBreakpoint('3xl')
      else if (width >= BREAKPOINTS['2xl']) setBreakpoint('2xl')
      else if (width >= BREAKPOINTS.xl) setBreakpoint('xl')
      else if (width >= BREAKPOINTS.lg) setBreakpoint('lg')
      else if (width >= BREAKPOINTS.md) setBreakpoint('md')
      else if (width >= BREAKPOINTS.sm) setBreakpoint('sm')
      else setBreakpoint('xs')
    }

    updateBreakpoint()
    window.addEventListener('resize', updateBreakpoint)
    return () => window.removeEventListener('resize', updateBreakpoint)
  }, [])

  return breakpoint
}

export function useIsLandscape() {
  const [isLandscape, setIsLandscape] = React.useState(false)

  React.useEffect(() => {
    const updateOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight)
    }

    updateOrientation()
    window.addEventListener('resize', updateOrientation)
    return () => window.removeEventListener('resize', updateOrientation)
  }, [])

  return isLandscape
}
