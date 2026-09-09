import type { BlockSchema } from '@cms/content-model'

const schema: BlockSchema = {
  type: 'project-gallery',
  label: 'Project gallery',
  description: 'The projects, filtered by the technologies the visitor picks.',
  schemaVersion: 1,
  category: 'listing',
  fields: {
    heading: { type: 'text', inline: true, max: 60 },
    filterLabel: {
      type: 'text',
      max: 40,
      label: 'Filter label',
      description: 'The label above the technology filter.',
      default: 'Technologies',
    },
    filterPlaceholder: {
      type: 'text',
      max: 40,
      label: 'Filter placeholder',
      default: 'Select or search...',
    },
    scrollHint: {
      type: 'text',
      max: 40,
      label: 'Scroll hint',
      description: 'The label of the arrow that takes a visitor from the top of the page down here. Empty hides it.',
      default: 'Project list',
    },
  },
  slots: {
    items: { label: 'Projects', itemType: 'project-entry', addLabel: 'Add project', min: 1, max: 60 },
  },
}

export default schema
