import { FileText, MessageCircle, Bookmark, Heart, Sparkles, Eye } from '@ui/icons'
import type { DashboardStats } from '../../api/use-dashboard-stats'

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: number
  sub?: string
}

function StatCard({ icon, label, value, sub }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-dark-surface rounded-3xl border border-romantic-cream-dark dark:border-dark-border p-5 flex items-center gap-4 shadow-card">
      <div className="w-11 h-11 rounded-2xl bg-romantic-blush/30 flex items-center justify-center text-romantic-rose shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-romantic-brown dark:text-dark-text">{value}</p>
        <p className="text-xs text-romantic-brown-muted dark:text-dark-muted">{label}</p>
        {sub && <p className="text-xs text-romantic-brown-muted/70 dark:text-dark-muted">{sub}</p>}
      </div>
    </div>
  )
}

interface StatsOverviewProps {
  stats: DashboardStats
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      <StatCard icon={<FileText size={20} />} label="Total Letters" value={stats.totalLetters} />
      <StatCard icon={<Sparkles size={20} />} label="Published" value={stats.publishedLetters} sub={`${stats.draftLetters} drafts`} />
      <StatCard icon={<Eye size={20} />} label="Comments" value={stats.totalComments} />
      <StatCard icon={<Bookmark size={20} />} label="Bookmarks" value={stats.totalBookmarks} />
      <StatCard icon={<Heart size={20} />} label="Reactions" value={stats.totalReactions} />
      <StatCard icon={<MessageCircle size={20} />} label="Drafts" value={stats.draftLetters} />
    </div>
  )
}
