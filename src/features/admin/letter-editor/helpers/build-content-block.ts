import { generateId } from '@shared/helpers'
import type { RichContentBlock, RichContentBlockType } from '@shared/types'

export function buildContentBlock(type: RichContentBlockType, content = '', url?: string): RichContentBlock {
  return {
    id: generateId(),
    type,
    content,
    url,
  }
}
