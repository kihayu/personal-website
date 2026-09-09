import type { BlockSchema } from '@cms/content-model'

const schema: BlockSchema = {
  type: 'text',
  label: 'Text',
  description: 'A heading with running text, on the same card as the rest of the page.',
  schemaVersion: 1,
  category: 'text',
  fields: {
    heading: { type: 'text', inline: true, max: 120 },
    body: {
      type: 'richtext',
      required: true,
      nodes: ['paragraph', 'bulletList', 'listItem', 'hardBreak'],
      marks: ['bold', 'italic', 'link'],
    },
  },
}

export default schema
