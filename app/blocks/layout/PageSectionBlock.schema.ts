import type { BlockSchema } from '@cms/content-model'

const schema: BlockSchema = {
  type: 'page-section',
  label: 'Section',
  description: 'One band of the page. Holds the cards that belong together and can fill the first screen.',
  schemaVersion: 1,
  category: 'layout',
  fields: {
    fillScreen: {
      type: 'boolean',
      default: false,
      label: 'Fill the screen',
      description: 'Makes the section at least as tall as the window on wide screens.',
    },
  },
  slots: {
    body: {
      label: 'Content',
      allow: ['intro-row', 'skill-showcase', 'project-gallery', 'profile-card', 'about-card', 'text'],
      addLabel: 'Add to the section',
      min: 1,
      max: 8,
    },
  },
}

export default schema
