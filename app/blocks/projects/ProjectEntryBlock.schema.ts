import type { BlockSchema } from '@cms/content-model'

const schema: BlockSchema = {
  type: 'project-entry',
  label: 'Project',
  description: 'One project: the card a visitor sees and the description they open.',
  schemaVersion: 1,
  internal: true,
  placeholder: 'Name this project and write the lead text of its card.',
  fields: {
    title: { type: 'text', required: true, inline: true, max: 120 },
    leadText: {
      type: 'text',
      required: true,
      inline: true,
      multiline: true,
      max: 400,
      label: 'Lead text',
      description: 'The sentence on the card, before a visitor opens the project.',
    },
    description: {
      type: 'richtext',
      required: true,
      nodes: ['paragraph', 'bulletList', 'listItem', 'hardBreak'],
      marks: ['bold', 'italic', 'link'],
      label: 'Description',
    },
    capacity: {
      type: 'enum',
      options: ['Solo', 'Collaborator'],
      labels: { Solo: 'Solo', Collaborator: 'Collaborator' },
      label: 'Worked on it as',
    },
    anchor: {
      type: 'text',
      max: 60,
      pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$',
      patternMessage: 'Use lowercase letters and digits, with single dashes between them.',
      label: 'Link anchor',
      description: 'What comes after the # in a link that opens this project, such as oeamtc-main.',
    },
  },
  slots: {
    technologies: { label: 'Technologies', itemType: 'tech-tag', addLabel: 'Add technology', max: 20 },
  },
}

export default schema
