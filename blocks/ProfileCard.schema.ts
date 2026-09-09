import type { BlockSchema } from '@cms/content-model'

const schema: BlockSchema = {
  type: 'profile-card',
  label: 'Profile card',
  description: 'The photo, the name, the role, and the places to reach the person.',
  schemaVersion: 1,
  category: 'layout',
  fields: {
    name: { type: 'text', required: true, inline: true, max: 80 },
    role: { type: 'text', inline: true, max: 60, label: 'Role' },
    location: { type: 'text', inline: true, max: 60, label: 'Location' },
    photo: { type: 'asset', accept: ['image'], label: 'Photo' },
  },
  slots: {
    links: { label: 'Links', itemType: 'social-link', addLabel: 'Add link', max: 8 },
  },
  breakpoints: [128, 256, 384, 512],
}

export default schema
