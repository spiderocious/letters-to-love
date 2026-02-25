import { motion } from 'framer-motion'
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
      <motion.span
        whileHover={{
          scale: [1, 1.2, 1, 1.15, 1],
          transition: { duration: 0.5, times: [0, 0.15, 0.3, 0.45, 1] },
        }}
        className="inline-flex"
      >
        <Heart size={icon} className="text-romantic-rose fill-romantic-rose" />
      </motion.span>
      <span>Letters to Love</span>
    </span>
  )

  return <Link to={linkTo}>{content}</Link>
}
