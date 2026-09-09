import type { BlockSchema } from '@cms/content-model'

const schema: BlockSchema = {
  type: 'skill-topic',
  label: 'Topic',
  description: 'One topic of the showcase: its name, its animation, and the text behind it.',
  schemaVersion: 1,
  internal: true,
  placeholder: 'Name this topic and write the text a visitor reads when they open it.',
  fields: {
    label: { type: 'text', required: true, inline: true, max: 40, label: 'Name' },
    animation: {
      type: 'enum',
      required: true,
      options: ['design', 'development', 'deployment', 'none'],
      labels: {
        design: 'Design tools',
        development: 'Typing code',
        deployment: 'Deployment pipeline',
        none: 'No animation',
      },
      default: 'none',
      label: 'Animation',
    },
    body: {
      type: 'richtext',
      required: true,
      nodes: ['paragraph', 'bulletList', 'listItem', 'hardBreak'],
      marks: ['bold', 'italic', 'link'],
      label: 'What you do in it',
    },
  },
  slots: {
    codeSamples: {
      label: 'Code samples',
      itemType: 'code-sample',
      addLabel: 'Add code sample',
      max: 12,
    },
  },
}

export default schema
