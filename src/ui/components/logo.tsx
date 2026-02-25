import { Heart } from '@ui/icons'
import { Link } from 'react-router-dom'
import { ROUTES } from '@shared/constants'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  linkTo?: string
}

const sizeClasses = {
  sm: { text: 'text-base', icon: 14 },
  md: { text: 'text-xl', icon: 18 },
  lg: { text: 'text-3xl', icon: 24 },
}

export function Logo({ size = 'md', linkTo = ROUTES.HOME }: LogoProps) {
  const { text, icon } = sizeClasses[size]

  const content = (
    <span className={`inline-flex items-center gap-2 font-bold ${text} text-romantic-brown dark:text-dark-text`}>
      <Heart size={icon} className="text-romantic-rose fill-romantic-rose" />
      <span>Letters to Love</span>
    </span>
  )

  return <Link to={linkTo}>{content}</Link>
}
