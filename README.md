# 🎨 Personal Website

A modern, interactive personal website built with Nuxt 4, featuring animated showcases of design and development skills.

Every text, image, link and project on the site is content in the CMS. This repository holds the block
library that renders that content — adding or rewording something is done in the CMS, not here.

## 🛠️ Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com/)
- **Content**: the private CMS at `../../projects/cms`, through `@cms/adapter-vue`
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide Icons](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites

- Bun package manager
- A checkout of the CMS next to this one, built once with `pnpm install && pnpm build`.
  It is expected at `../../projects/cms`; `CMS_PACKAGES_DIR` points at another location.
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
export CMS_MANIFEST_TOKEN=$(node -e "console.log(require('../../projects/cms/data/secrets.json').manifestToken)")
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

Build Docker image:

```bash
docker build -t personal-website .
```

## ✍️ Changing the site

| What you want to change                                | Where                         |
| ------------------------------------------------------ | ----------------------------- |
| A text, an image, a link, a project, the SEO of a page | The admin, then Publish       |
| The order of the sections, which blocks a page has     | The admin, on the page itself |
| What an editor may fill in — a new field, a new block  | `blocks/` here, then a deploy |
| The look of a block                                    | Its `.vue` file in `blocks/`  |

A block is two files with the same base name in `blocks/`: `Name.schema.ts` says what an editor may
change, `Name.vue` renders it. `templates/page.schema.json` says which blocks a page may hold and
which properties it carries. The full contract is in the CMS repository under
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
├── assets/            # Static assets
│   ├── css/           # Global styles and utilities
│   ├── fonts/         # Custom fonts
│   └── icons/         # SVG icons
├── blocks/            # The block library: one .schema.ts and one .vue per block
├── components/        # Vue components the blocks render with
│   ├── animations/    # Animation components
│   ├── projects/      # Project filter components
│   └── skills/        # The dialog a skill topic opens
├── composables/       # Vue composables and hooks
├── constants/         # Fallback code samples for the typing animation
├── content/           # The starting content of the site
├── layouts/           # Layout templates
├── public/            # Public static files
├── scripts/           # Build the starting content and its import archive
├── server/            # Server-side code
│   └── plugins/       # Server plugins
├── templates/         # Page templates: properties and the blocks a page may hold
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

There are no `pages/`: the CMS module registers the catch-all route that resolves every path against
the published content.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
