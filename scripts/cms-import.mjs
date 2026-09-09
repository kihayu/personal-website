import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { gzipSync } from 'node:zlib'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const EXPORT_MAGIC = 'CMSEXPORT1\n'
const EXPORT_FORMAT_VERSION = 2
const BLOCK = 512

const SITE_ID = 'keanuhie'
const FRONTEND_ID = 'personal-website'
const ENVIRONMENT = 'production'

const ASSETS = [
  {
    id: 'profile-photo',
    file: 'public/images/profile-photo-1724.jpg',
    fileName: 'profile-photo.jpg',
    contentType: 'image/jpeg',
    alt: 'Profile Picture of Keanu Hie',
  },
  {
    id: 'share-image',
    file: 'public/images/og-image.png',
    fileName: 'og-image.png',
    contentType: 'image/png',
    alt: 'Keanu Hie, Fullstack Developer',
  },
]

function imageSize(bytes, contentType) {
  if (contentType === 'image/png') {
    return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) }
  }
  let offset = 2
  while (offset < bytes.length) {
    if (bytes[offset] !== 0xff) {
      return undefined
    }
    const marker = bytes[offset + 1]
    const length = bytes.readUInt16BE(offset + 2)
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { height: bytes.readUInt16BE(offset + 5), width: bytes.readUInt16BE(offset + 7) }
    }
    offset += 2 + length
  }
  return undefined
}

function tarEntry(path, body) {
  const header = Buffer.alloc(BLOCK)
  const octal = (value, width) => `${value.toString(8).padStart(width - 1, '0')}\0`
  header.write(path, 0, 100, 'utf8')
  header.write(octal(0o644, 8), 100, 8, 'utf8')
  header.write(octal(0, 8), 108, 8, 'utf8')
  header.write(octal(0, 8), 116, 8, 'utf8')
  header.write(octal(body.length, 12), 124, 12, 'utf8')
  header.write(octal(Math.floor(Date.now() / 1000), 12), 136, 12, 'utf8')
  header.write(' '.repeat(8), 148, 8, 'utf8')
  header.write('0', 156, 1, 'utf8')
  header.write('ustar\0', 257, 6, 'utf8')
  header.write('00', 263, 2, 'utf8')
  let checksum = 0
  for (const byte of header) {
    checksum += byte
  }
  header.write(`${checksum.toString(8).padStart(6, '0')}\0 `, 148, 8, 'utf8')
  const padding = Buffer.alloc((BLOCK - (body.length % BLOCK)) % BLOCK)
  return Buffer.concat([header, body, padding])
}

const encode = (value) => Buffer.from(JSON.stringify(value), 'utf8')

const seed = JSON.parse(readFileSync(resolve(root, 'content/seed.json'), 'utf8'))
const manifestFile = resolve(root, '.nuxt/cms-manifest.json')
let manifest
try {
  manifest = JSON.parse(readFileSync(manifestFile, 'utf8'))
} catch {
  console.error(`No block manifest at ${manifestFile}. Run "bun run postinstall" first.`)
  process.exit(1)
}

const now = new Date().toISOString()
const assets = []
const files = []
for (const asset of ASSETS) {
  const bytes = readFileSync(resolve(root, asset.file))
  const storageKey = `sites/${SITE_ID}/assets/${asset.id}/v1/${asset.fileName}`
  const size = imageSize(bytes, asset.contentType)
  assets.push({
    record: {
      id: asset.id,
      siteId: SITE_ID,
      kind: 'image',
      fileName: asset.fileName,
      folder: '/',
      tags: [],
      alt: asset.alt,
      latestVersion: 1,
      createdAt: now,
      updatedAt: now,
    },
    versions: [
      {
        assetId: asset.id,
        version: 1,
        contentType: asset.contentType,
        byteSize: bytes.length,
        sha256: createHash('sha256').update(bytes).digest('hex'),
        storageKey,
        ...(size === undefined ? {} : size),
        createdAt: now,
      },
    ],
  })
  files.push({ path: `files/${storageKey}`, body: bytes })
}

const content = {
  ...seed,
  manifests: [{ frontendId: FRONTEND_ID, deploymentId: manifest.deploymentId, environment: ENVIRONMENT, manifest }],
}

const archive = Buffer.concat([
  Buffer.from(EXPORT_MAGIC, 'utf8'),
  gzipSync(
    Buffer.concat([
      tarEntry('content.json', encode(content)),
      tarEntry('assets.json', encode({ formatVersion: EXPORT_FORMAT_VERSION, assets })),
      tarEntry('users.json', encode({ formatVersion: EXPORT_FORMAT_VERSION, users: [] })),
      ...files.map((file) => tarEntry(file.path, file.body)),
      Buffer.alloc(BLOCK * 2),
    ]),
  ),
])

const target = resolve(root, 'content/cms-import.cmsexport')
mkdirSync(dirname(target), { recursive: true })
writeFileSync(target, archive)
console.log(`Wrote ${target}: ${content.entries.length} entries, ${assets.length} assets.`)
if (process.argv.includes('--print')) {
  console.log(`\nImport it from the CMS checkout:\n  CMS_DATA_DIR=./data node packages/api/src/cli.ts import ${target}`)
}
