import type { BlockSchema } from '@cms/content-model'

const schema: BlockSchema = {
  type: 'tech-tag',
  label: 'Technology',
  description: 'The name of one technology, shown as a tag and offered in the filter.',
  schemaVersion: 1,
  internal: true,
  fields: {
    label: { type: 'text', required: true, inline: true, max: 40, label: 'Name' },
  },
}

export default schema
