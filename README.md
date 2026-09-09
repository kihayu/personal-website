# 🎨 Personal Website

A modern, interactive personal website built with Nuxt 4, featuring animated showcases of design and development skills.

Every text, image, link and project on the site is content in the CMS. This repository holds the block
library that renders that content — adding or rewording something is done in the CMS, not here.

## 🛠️ Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com/)
- **Content**: the private CMS, through `@cms/adapter-vue` from `https://npm.keanuhie.com/`
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide Icons](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites

- Bun package manager
- Access to the private registry the CMS packages are published to. Authenticate once, which
  writes the token to `~/.npmrc`:

  ```bash
  npm login --registry=https://npm.keanuhie.com/ --scope=@cms
  ```

  `.npmrc` in this repository names the registry for the `@cms` scope and holds no credential.

- A running CMS API. From the CMS checkout: `CMS_DATA_DIR=./data node packages/api/src/cli.ts serve`

### Installation

1. Clone the repository

```bash
git clone git@github.com:kihayu/personal-website.git
cd personal-website
```

2. Install dependencies

```bash
bun install --frozen-lockfile
```

### Development

Start the CMS API first, then the site with the manifest token, so every block reaches the admin:

```bash
export CMS_MANIFEST_TOKEN=$(node -e "console.log(require('<cms checkout>/data/secrets.json').manifestToken)")
bun run dev
```

The site is at `http://localhost:3000/`, the admin at `http://127.0.0.1:4400/admin/`.
Every save of a block schema pushes the manifest again, so the admin knows a new block within a second.

Two routes help while building blocks:

- `/_cms/harness?block=<type>` renders one block against sample props with the editing loop attached.
- `/_cms/edit?route=/&locale=en` is the surface the admin frames. Open it from the admin, not directly.

### Production

Build for production. The API must be up: the build pushes the block manifest to it and fails when the
CMS refuses the manifest, so a site the admin cannot edit is never deployed.

```bash
CMS_PUSH_MANIFEST=true \
CMS_MANIFEST_TOKEN=$CMS_MANIFEST_TOKEN \
CMS_API_URL=https://cms.example.com \
CMS_ADMIN_ORIGINS=https://cms.example.com \
CMS_ASSET_BASE_URL=https://cms.example.com/assets \
CMS_WEBHOOK_SECRET=<the site's webhook secret> \
CMS_DEPLOYMENT_ID=$(git rev-parse HEAD) \
bun run build
```

Then start it:

```bash
NUXT_CMS_SOURCE=api NUXT_CMS_API_URL=https://cms.example.com PORT=3000 node .output/server/index.mjs
```

Pages are delivered `on-demand`: a publish in the CMS reaches the site through the revalidation
webhook, and at the latest after five minutes, without a rebuild. Subscribe
`https://<site>/_cms/revalidate` to `entry.published`, `entry.unpublished` and `asset.replaced` in
the admin under Settings → Webhooks, with the secret the build was given.

Build Docker image. The install step needs the registry token, mounted as a build secret so it
never lands in a layer:

```bash
docker build --secret id=npmrc,src=$HOME/.npmrc -t personal-website .
```

## ✍️ Changing the site

| What you want to change                                | Where                                 |
| ------------------------------------------------------ | ------------------------------------- |
| A text, an image, a link, a project, the SEO of a page | The admin, then Publish               |
| The order of the sections, which blocks a page has     | The admin, on the page itself         |
| What an editor may fill in — a new field, a new block  | `app/blocks/` here, then a deploy     |
| The look of a block                                    | Its component under `app/components/` |

A block is two files with the same base name, side by side under `app/blocks/<area>/`:
`NameBlock.schema.ts` says what an editor may change, `NameBlock.vue` renders it. The block file
itself stays thin: it reads `node.props`, narrows the values, and hands them to a component under
`app/components/<area>/`, which owns the markup. `app/templates/page.schema.json` says which blocks a
page may hold and which properties it carries. The full contract is in the CMS repository under
`docs/guides/frontend-integration.md`.

### Starting content

`content/seed.json` is the content this site started with, and `scripts/` rebuilds it:

```bash
node scripts/build-seed.mjs   # writes content/seed.json from the text in the script
node scripts/cms-import.mjs   # packs it with the manifest and the images into an import archive
# then, from the CMS checkout:
CMS_DATA_DIR=./data node packages/api/src/cli.ts import <path>/content/cms-import.cmsexport
```

Use it to fill a fresh CMS. It never overwrites an entry that already exists, so it cannot undo
editing work.

## 📁 Project Structure

```
├── app/                     # Nuxt 4 source directory
│   ├── app.vue
│   ├── assets/              # Global styles, fonts and SVG icons
│   ├── blocks/              # The block library, grouped by area
│   │   ├── content/         # About card, text
│   │   ├── layout/          # Page section, intro row
│   │   ├── profile/         # Profile card, profile link
│   │   ├── projects/        # Project gallery, project, technology
│   │   └── skills/          # Skill showcase, topic, code sample
│   ├── components/          # The markup the blocks render with, grouped the same way
│   │   ├── animations/      # The design, development and deployment animations
│   │   ├── content/         # About and text cards
│   │   ├── profile/         # Profile card and its icon links
│   │   ├── projects/        # Project card, detail card, filter, tag
│   │   ├── section/         # Section and card row wrappers
│   │   └── skills/          # Topic row, preview window, dialog, topic text
│   ├── composables/
│   ├── constants/           # Fallback code samples for the typing animation
│   ├── layouts/
│   ├── templates/           # Page templates: properties and the blocks a page may hold
│   ├── types/
│   └── utils/
├── content/                 # The starting content of the site
├── public/                  # Public static files
├── scripts/                 # Build the starting content and its import archive
└── server/                  # Server-side code
    └── plugins/             # Server plugins
```

There is no `app/pages/`: the CMS module registers the catch-all route that resolves every path
against the published content.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
