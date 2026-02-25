import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Heart } from '@ui/icons'
import { Spinner, Badge, EmptyState } from '@ui/components'
import { formatShortDate } from '@shared/helpers'
import { letterPath } from '@shared/constants'
import { useSearchLetters } from '../api/use-search-letters'

export function SearchScreen() {
  const [query, setQuery] = useState('')
  const { data: results, isLoading, error } = useSearchLetters(query)

  const hasQuery = query.trim().length > 1

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Search size={20} className="text-romantic-rose" />
          <h1 className="text-2xl font-bold text-romantic-brown dark:text-dark-text">Search</h1>
        </div>
        <p className="text-sm text-romantic-brown-muted dark:text-dark-muted">
          Find a letter by title
        </p>
      </div>

      {/* Search input */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-romantic-brown-muted dark:text-dark-muted" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search letters…"
          autoFocus
          className="w-full pl-10 pr-4 py-3 rounded-2xl border border-romantic-cream-dark dark:border-dark-border bg-white dark:bg-dark-surface text-romantic-brown dark:text-dark-text placeholder:text-romantic-brown-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 focus:border-brand-yellow transition-all"
        />
      </div>

      {/* States */}
      {!hasQuery && (
        <p className="text-sm text-romantic-brown-muted dark:text-dark-muted text-center py-12">
          Type at least 2 characters to search
        </p>
      )}

      {hasQuery && isLoading && (
        <div className="flex justify-center py-12">
          <Spinner />
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error.message}</p>}

      {hasQuery && !isLoading && (results ?? []).length === 0 && (
        <EmptyState
          icon={<Search size={40} />}
          title="No results"
          description={`No letters found for "${query}"`}
        />
      )}

      {/* Results */}
      <div className="flex flex-col gap-3">
        {(results ?? []).map((letter) => (
          <Link
            key={letter.id}
            to={letterPath(letter.id)}
            className="group bg-white dark:bg-dark-surface rounded-2xl border border-romantic-cream-dark dark:border-dark-border px-5 py-4 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {letter.mood && <Badge variant="pink" className="text-xs">{letter.mood}</Badge>}
                </div>
                <h3 className="font-semibold text-romantic-brown dark:text-dark-text text-sm group-hover:text-romantic-rose transition-colors">
                  {letter.title}
                </h3>
                <p className="text-xs text-romantic-brown-muted dark:text-dark-muted mt-0.5">
                  {formatShortDate(letter.publish_at)}
                </p>
              </div>
              <Heart size={16} className="text-romantic-rose/30 group-hover:text-romantic-rose group-hover:fill-romantic-rose/20 transition-all shrink-0" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
