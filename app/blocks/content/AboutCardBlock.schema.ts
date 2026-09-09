import type { BlockSchema } from '@cms/content-model'

const schema: BlockSchema = {
  type: 'about-card',
  label: 'About card',
  description: 'A heading with the running text that introduces the person.',
  schemaVersion: 1,
  category: 'text',
  fields: {
    heading: { type: 'text', inline: true, max: 60 },
    body: {
      type: 'richtext',
      required: true,
      nodes: ['paragraph', 'bulletList', 'listItem', 'hardBreak'],
      marks: ['bold', 'italic', 'link'],
      label: 'Introduction',
    },
  },
}

export default schema
