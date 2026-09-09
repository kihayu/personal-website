import type { BlockSchema } from '@cms/content-model'

const schema: BlockSchema = {
  type: 'code-sample',
  label: 'Code sample',
  description: 'One snippet the typing animation writes out.',
  schemaVersion: 1,
  internal: true,
  fields: {
    language: {
      type: 'enum',
      required: true,
      options: ['typescript', 'javascript', 'vue', 'python', 'bash', 'json'],
      labels: {
        typescript: 'TypeScript',
        javascript: 'JavaScript',
        vue: 'Vue',
        python: 'Python',
        bash: 'Shell',
        json: 'JSON',
      },
      default: 'typescript',
      label: 'Language',
    },
    code: {
      type: 'text',
      required: true,
      multiline: true,
      max: 1200,
      label: 'Code',
      description: 'Written out character by character, so keep it short enough to read while it types.',
    },
  },
}

export default schema
