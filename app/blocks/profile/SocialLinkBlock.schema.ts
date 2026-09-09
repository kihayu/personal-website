import type { BlockSchema } from '@cms/content-model'

const schema: BlockSchema = {
  type: 'social-link',
  label: 'Profile link',
  description: 'One icon that links to a profile or an address.',
  schemaVersion: 1,
  internal: true,
  fields: {
    label: {
      type: 'text',
      required: true,
      max: 80,
      label: 'Accessible label',
      description: 'What a screen reader announces, such as "Visit the GitHub profile of Keanu Hie".',
    },
    icon: {
      type: 'enum',
      required: true,
      options: ['github', 'linkedin', 'mail', 'link'],
      labels: { github: 'GitHub', linkedin: 'LinkedIn', mail: 'Mail', link: 'Generic link' },
      default: 'link',
      label: 'Icon',
    },
    href: {
      type: 'link',
      required: true,
      kinds: ['internal', 'external'],
      label: 'Target',
      description: 'An address such as https://github.com/kihayu or mailto:name@example.com.',
    },
  },
}

export default schema
