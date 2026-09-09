import type { BlockSchema } from '@cms/content-model'

const schema: BlockSchema = {
  type: 'skill-showcase',
  label: 'Skill showcase',
  description: 'The topics a visitor hovers and opens, with the animation of the hovered topic beside them.',
  schemaVersion: 1,
  category: 'layout',
  fields: {
    hint: {
      type: 'text',
      inline: true,
      max: 60,
      label: 'Window hint',
      description: 'The sentence in the preview window while no topic is hovered.',
      default: 'Hover over the Titles (and click)',
    },
  },
  slots: {
    items: { label: 'Topics', itemType: 'skill-topic', addLabel: 'Add topic', min: 1, max: 6 },
  },
}

export default schema
