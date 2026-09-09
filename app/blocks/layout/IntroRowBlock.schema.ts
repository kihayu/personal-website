import type { BlockSchema } from '@cms/content-model'

const schema: BlockSchema = {
  type: 'intro-row',
  label: 'Intro row',
  description: 'Puts the cards of the page opening next to each other on wide screens.',
  schemaVersion: 1,
  category: 'layout',
  fields: {
    variant: {
      type: 'enum',
      options: ['sidebar', 'equal', 'stacked'],
      labels: {
        sidebar: 'Narrow card, then wide card',
        equal: 'Two cards of the same width',
        stacked: 'One card under the other',
      },
      default: 'sidebar',
      label: 'Arrangement',
    },
  },
  slots: {
    body: {
      label: 'Cards',
      allow: ['profile-card', 'about-card', 'text'],
      addLabel: 'Add card',
      min: 1,
      max: 2,
    },
  },
}

export default schema
