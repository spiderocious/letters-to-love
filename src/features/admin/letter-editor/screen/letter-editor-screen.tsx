import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, CheckCircle, AlertCircle } from '@ui/icons'
import { Button, Input, PageSpinner } from '@ui/components'
import { buildContentBlock } from '../helpers/build-content-block'
import type { LetterMood, LetterStatus, RichContentBlock } from '@shared/types'
import { ROUTES } from '@shared/constants'
import { useLetterById } from '../api/use-letter-by-id'
import { useSaveLetter } from '../api/use-save-letter'
import { RichContentEditor } from './parts/rich-content-editor'
import { LetterSettingsPanel } from './parts/letter-settings-panel'

function defaultPublishAt(): string {
  const d = new Date()
  d.setSeconds(0, 0)
  // Format for datetime-local
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export function LetterEditorScreen() {
  const { id } = useParams<{ id?: string }>()
  const navigate = useNavigate()
  const isEditing = !!id

  const letterQuery = useLetterById(id)
  const saveLetter = useSaveLetter()

  const [title, setTitle] = useState('')
  const [blocks, setBlocks] = useState<RichContentBlock[]>([buildContentBlock('text')])
  const [publishAt, setPublishAt] = useState(defaultPublishAt)
  const [status, setStatus] = useState<LetterStatus>('draft')
  const [mood, setMood] = useState<LetterMood | null>(null)
  const [isMilestone, setIsMilestone] = useState(false)
  const [savedId, setSavedId] = useState<string | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)

  // Populate form when editing
  useEffect(() => {
    if (letterQuery.data) {
      const l = letterQuery.data
      setTitle(l.title)
      setBlocks(l.content.length > 0 ? l.content : [buildContentBlock('text')])
      setStatus(l.status)
      setMood(l.mood)
      setIsMilestone(l.is_milestone)
      // Convert ISO to datetime-local format
      const d = new Date(l.publish_at)
      const pad = (n: number) => String(n).padStart(2, '0')
      setPublishAt(`${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`)
    }
  }, [letterQuery.data])

  async function handleSave(saveStatus: LetterStatus) {
    setSaveError(null)
    if (!title.trim()) {
      setSaveError('Title is required')
      return
    }

    try {
      const result = await saveLetter.mutateAsync({
        id: id ?? savedId ?? undefined,
        title: title.trim(),
        content: blocks,
        mood,
        publish_at: new Date(publishAt).toISOString(),
        status: saveStatus,
        is_milestone: isMilestone,
      })
      setSavedId(result.id)
      setStatus(saveStatus)
      if (saveStatus === 'published') {
        navigate(ROUTES.ADMIN.DASHBOARD)
      }
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Failed to save')
    }
  }

  if (isEditing && letterQuery.isLoading) return <PageSpinner />

  return (
    <div className="min-h-screen bg-romantic-cream dark:bg-dark-bg">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-white dark:bg-dark-surface border-b border-romantic-cream-dark dark:border-dark-border px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(ROUTES.ADMIN.DASHBOARD)}
            className="p-2 rounded-xl text-romantic-brown-muted hover:text-romantic-brown hover:bg-romantic-cream-dark dark:text-dark-muted dark:hover:text-dark-text dark:hover:bg-dark-border transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="font-semibold text-romantic-brown dark:text-dark-text">
            {isEditing ? 'Edit letter' : 'New letter'}
          </h1>
          {(savedId || isEditing) && (
            <span className="flex items-center gap-1 text-xs text-green-600">
              <CheckCircle size={13} /> Saved
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {saveError && (
            <span className="flex items-center gap-1 text-xs text-red-600">
              <AlertCircle size={13} /> {saveError}
            </span>
          )}
          <Button
            variant="secondary"
            size="sm"
            loading={saveLetter.isPending && status === 'draft'}
            onClick={() => handleSave('draft')}
          >
            Save draft
          </Button>
          <Button
            variant="primary"
            size="sm"
            loading={saveLetter.isPending && status === 'published'}
            onClick={() => handleSave('published')}
          >
            Publish
          </Button>
        </div>
      </div>

      <div className="flex gap-0 max-w-6xl mx-auto">
        {/* Editor area */}
        <div className="flex-1 p-8 max-h-[100vh] overflow-y-auto">
          <Input
            placeholder="Letter title…"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-2xl font-semibold border-0 border-b border-romantic-cream-dark rounded-none px-0 py-3 mb-6 focus:ring-0 focus:border-brand-yellow text-romantic-brown"
          />
          <RichContentEditor blocks={blocks} onChange={setBlocks} />
        </div>

        {/* Settings sidebar */}
        <aside className="w-72 shrink-0 border-l border-romantic-cream-dark dark:border-dark-border bg-white dark:bg-dark-surface p-6">
          <h2 className="text-sm font-semibold text-romantic-brown dark:text-dark-text mb-4">Settings</h2>
          <LetterSettingsPanel
            publishAt={publishAt}
            status={status}
            mood={mood}
            isMilestone={isMilestone}
            onPublishAtChange={setPublishAt}
            onStatusChange={setStatus}
            onMoodChange={setMood}
            onMilestoneChange={setIsMilestone}
          />
        </aside>
      </div>
    </div>
  )
}
