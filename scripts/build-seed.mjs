import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

export const SEED_FORMAT_VERSION = 2
export const FIRST_ENTRY_VERSION = '0.1'

export const SITE_ID = 'keanuhie'
export const FRONTEND_ID = 'personal-website'
export const PROFILE_PHOTO_ASSET = 'profile-photo'
export const SHARE_IMAGE_ASSET = 'share-image'

const doc = (...paragraphs) => ({
  type: 'doc',
  content: paragraphs.map((paragraph) => ({
    type: 'paragraph',
    content: typeof paragraph === 'string' ? [{ type: 'text', text: paragraph }] : paragraph,
  })),
})

const text = (value) => ({ type: 'text', text: value })
const italic = (value) => ({ type: 'text', text: value, marks: [{ type: 'italic' }] })

const node = (id, type, props, slots) => ({
  id,
  type,
  schemaVersion: 1,
  props,
  ...(slots === undefined ? {} : { slots }),
})

const tech = (project, ...names) =>
  names.map((name, index) => node(`${project}-tech-${index + 1}`, 'tech-tag', { label: name }))

const codeSamples = [
  `class Greeter {
  private greeting: string

  constructor(message: string) {
    this.greeting = message
  }

  public greet(): string {
    return this.greeting
  }
}`,
  `const add = (a: number, b: number): number => {
  return a + b
}

const sum = add(5, 3) // 8`,
  `type User = {
  id: number
  name: string
  email: string
}

const user: User = {
  id: 1,
  name: 'John',
  email: 'john@example.com'
}`,
  `async function getData() {
  const response = await fetch('/api/data')
  return response.json()
}

getData().then(console.log)`,
  `const fruits = ['apple', 'banana', 'orange']
const upperFruits = fruits
  .map(fruit => fruit.toUpperCase())

console.log(upperFruits)`,
]

const projects = [
  {
    anchor: 'oeamtc-main',
    title: 'ÖAMTC Website',
    leadText:
      'Working on multiple frontend and backend projects of ÖAMTC requires a consistent interface, fast performance, and an excellent user experience.',
    description:
      'As a frontend developer, I worked in a team on the website of ÖAMTC. Parts of the website are constantly rebuilt using Nuxt with TypeScript, optimized for performance and components from the styleguide. I also worked on the backend of the website, using PHP to extend and maintain the existing Content Management System. Additionally, I contributed a new technology stack for components, which needed work on frontend and backend. The design was built with a mobile-first approach, as most users nowadays use mobile devices to navigate the web.',
    technologies: ['JavaScript', 'TypeScript', 'Vue.js', 'Nuxt', 'Node', 'PHP', 'GraphQL'],
    capacity: 'Collaborator',
  },
  {
    anchor: 'oeamtc-styleguide',
    title: 'ÖAMTC Styleguide',
    leadText:
      'A complete overhaul of the ÖAMTC designs to be more modern, consistent and accessible. Used on all new components, sections and pages.',
    description:
      'One part of being on a team, working for ÖAMTC was keeping the design language consistent throughout the projects. To keep the project and the user experience fresh we got to work on a new styleguide which development started internally. Out of the existing designs we started building a Storybook application, containing all necessary components in different states for testing and showcasing purposes. The application itself uses Vue.js with TypeScript and best practices in building a frontend design with SCSS.',
    technologies: ['TypeScript', 'Vue.js', 'Storybook'],
    capacity: 'Collaborator',
  },
  {
    anchor: 'cinema-reservation',
    title: 'Cinema Reservation System',
    leadText:
      'A complete management system for cinemas for movies, rooms, events and reservations. Made as a school project with Vue.js 2 and .NET Core.',
    description:
      'When I was a student we had a long term project in which we all had to build a fullstack project on our own. My project was a simple but complete management system for cinemas to create movie entries, rooms with a visual editor, movie events and reservations but also a user management system to handle users and permissions.',
    technologies: ['JavaScript', 'Vue.js', 'C#', '.NET'],
    capacity: 'Solo',
  },
  {
    anchor: 'oegb',
    title: 'ÖGB and GPA',
    leadText:
      'A new implementation of the ÖGB and GPA webpages with a fresh and modern design. Involved the implementation of a proxy server between AEM and React.',
    description:
      'Creating a frontend application that gets data from an Adobe Experience Manager (AEM) instance and works with Hot Module Reloading (HMR) was a challenge. I helped create a Webpack proxy server that handled the communication and data flow between AEM and our React frontend. The application itself uses React with TailwindCSS for styling.',
    technologies: ['JavaScript', 'TypeScript', 'Node', 'Webpack', 'React', 'TailwindCSS', 'Storybook'],
    capacity: 'Collaborator',
  },
  {
    anchor: 'scrum-poker',
    title: 'Scrum Poker Game',
    leadText:
      'An online poker game for Scrum teams to help with estimation and planning. Built with Nuxt and a simple Design in mind for a quick and easy use.',
    description:
      'Coming from the problem of having not the right tools for estimation and planning, 2 friends and I decided to build a simple poker game to aid us and our colleagues. Over the course of a weekend, my friends Daniel and Julia joined me, providing the backend for the project, while I focused on the graphical designs and frontend application.',
    technologies: ['TypeScript', 'Nuxt', 'TailwindCSS'],
    capacity: 'Solo',
  },
  {
    anchor: 'internal-data-analysis',
    title: 'Internal data analysis tool',
    leadText:
      'A comprehensive data visualization platform with multiple interactive dashboards. The project included a successful migration from Nuxt 2 to Nuxt 3.',
    description:
      'This internal analytics tool features multiple interactive dashboards powered by d3.js charts to visualize complex datasets. I focused primarily on developing the GraphQL service and Nuxt frontend, ensuring seamless data flow with a professional dashboard UI. The project involved a complete upgrade from Nuxt 2 to Nuxt 3, requiring extensive dependency research and migration work while having Keycloak integration for secure user management across the application.',
    technologies: ['TypeScript', 'Node', 'Nuxt', 'GraphQL', 'd3.js'],
    capacity: 'Collaborator',
  },
  {
    anchor: 'personal-website',
    title: 'Personal Website',
    leadText:
      'A responsive Nuxt website, showcasing my portfolio and professional journey. Designed with performance, SEO and user experience in mind.',
    description:
      'This portfolio website showcases my skills as a frontend developer using modern web technologies. Built with Vue.js and Nuxt, optimized for optimal performance and SEO on all devices. It features responsive design principles and custom designs for mobile and desktop end-users. The design was made to be simple and modern, while also being accessible and easy-to-use.',
    technologies: ['TypeScript', 'Nuxt', 'TailwindCSS'],
    capacity: 'Solo',
  },
]

const profileCard = node(
  'profile',
  'profile-card',
  {
    name: 'Keanu Hie',
    role: 'Fullstack Developer',
    location: 'Located in Vienna, Austria',
    photo: { assetId: PROFILE_PHOTO_ASSET, alt: 'Profile Picture of Keanu Hie' },
  },
  {
    links: [
      node('profile-github', 'social-link', {
        label: "Visit Keanu's GitHub Profile",
        icon: 'github',
        href: { kind: 'external', href: 'https://github.com/kihayu' },
      }),
      node('profile-linkedin', 'social-link', {
        label: "Visit Keanu's LinkedIn Profile",
        icon: 'linkedin',
        href: { kind: 'external', href: 'https://linkedin.com/in/keanu-hie/' },
      }),
      node('profile-mail', 'social-link', {
        label: 'Send an Email to Keanu Hie',
        icon: 'mail',
        href: { kind: 'external', href: 'mailto:hie.keanu@gmail.com' },
      }),
    ],
  },
)

const aboutCard = node('about', 'about-card', {
  heading: 'About me',
  body: doc(
    "Hi, I'm a Fullstack Developer with a focus on Frontend and Web-Development, specifically UI/UX, functionality and clean code. With over 12 years in the business and 7 years of professional experience, I have a good understanding of diverse frontend topics such as Styleguides, Accessibility, Responsive Design, and Component-Driven Development. Most of this experience was done in Vue.js with SCSS or Tailwind, as well as Storybook on larger projects, including React and Next.js on a smaller scale. Also working on backend technologies is nothing new for me as I've already built diverse API's and Microservices, as well as helped with the architecture of complex systems.",
  ),
})

const skillShowcase = node(
  'skills',
  'skill-showcase',
  { hint: 'Hover over the Titles (and click)' },
  {
    items: [
      node('skill-design', 'skill-topic', {
        label: 'Design',
        animation: 'design',
        body: doc(
          'In my work as frontend developer on customer projects I learned a lot about user experience, user interfaces and web design. I started learning about color theory and design principles to optimize the user experience for different platforms like Admin Interfaces, News, Blogs or Social Media Platforms.',
          'A fitting design is very important for a good user experience and for myself as a bad interface can make or break a product or service very easily. As well as having no accessibility in mind. Accessibility is, in my opinion, best done in a way that the core functionality is usable with the least effort, without restricting any functionality.',
          "Most of my work is done in Figma, as it's a great tool for beginner and intermediate users. Many of my larger projects are first, at least conceptually, done in Figma.",
        ),
      }),
      node(
        'skill-development',
        'skill-topic',
        {
          label: 'Development',
          animation: 'development',
          body: doc(
            'Development is a skill that is with me since 2012, when I got into a course, started with Scratch and continued learning Python and later Java. At school I learned the basics of C# and .NET and basic HTML with CSS and very little JavaScript.',
            'Shortly after I got my first job as a Backend Developer, where I worked with PHP. After a short period I found myself interested in Frontend Development with Vue.js and started building my way to become a Fullstack Developer. Since 2018 I have been working and improving my skills in JavaScript/TypeScript, together with Vue.js and Node.js (incl. Bun) as my Frontend arm, with mainly Node.js and Python as my backend arm.',
            'Today I enjoy working on different projects and trying new technologies like Flutter for mobile development, Godot for game development and Large Language Model APIs from providers like OpenAI, Anthropic or Google.',
          ),
        },
        {
          codeSamples: codeSamples.map((code, index) =>
            node(`skill-development-sample-${index + 1}`, 'code-sample', { language: 'typescript', code }),
          ),
        },
      ),
      node('skill-deployment', 'skill-topic', {
        label: 'Deployment',
        animation: 'deployment',
        body: doc(
          [
            text('One thing that my younger self asked himself was: '),
            italic(
              'Working and developing on projects is fine but how can I make the finished result accessible to others?',
            ),
          ],
          'After some time I started looking into servers and hosting, proper Git and Version Controlling and what tools are available for making websites available to others. Learning tools like Jenkins and how to deploy projects was one part, the other one was learning how to set up a linux server and installing the necessary software.',
          'Nowadays I also look into distribution platforms like Vercel, Netlify or Coolify, as they make publishing projects on a smaller scale very easy and more manageable for a single person.',
        ),
      }),
    ],
  },
)

const projectGallery = node(
  'projects',
  'project-gallery',
  {
    heading: 'Projects',
    filterLabel: 'Technologies',
    filterPlaceholder: 'Select or search...',
    scrollHint: 'Project list',
  },
  {
    items: projects.map((project) =>
      node(
        project.anchor,
        'project-entry',
        {
          title: project.title,
          leadText: project.leadText,
          description: doc(project.description),
          capacity: project.capacity,
          anchor: project.anchor,
        },
        { technologies: tech(project.anchor, ...project.technologies) },
      ),
    ),
  },
)

const home = {
  id: `${SITE_ID}-home`,
  siteId: SITE_ID,
  kind: 'page',
  locale: 'en',
  translationKey: `${SITE_ID}-home`,
  path: '/',
  template: 'page',
  properties: {
    title: 'Keanu Hie · Developer Portfolio',
    description:
      'Fullstack developer creating modern web apps with Vue.js, TypeScript & Python. Specializing in accessible, attractive UIs and scalable solutions.',
    robots: 'index,follow',
    ogTitle: 'Keanu Hie · Developer Portfolio',
    ogImage: { assetId: SHARE_IMAGE_ASSET, alt: 'Keanu Hie, Fullstack Developer' },
    structuredData: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Keanu Hie',
      jobTitle: 'Fullstack Developer',
      url: 'https://www.keanuhie.com/',
      email: 'mailto:hie.keanu@gmail.com',
      address: { '@type': 'PostalAddress', addressLocality: 'Vienna', addressCountry: 'AT' },
      sameAs: ['https://github.com/kihayu', 'https://linkedin.com/in/keanu-hie/'],
    }),
  },
  root: [
    node(
      'intro-section',
      'page-section',
      { fillScreen: true },
      {
        body: [node('intro', 'intro-row', { variant: 'sidebar' }, { body: [profileCard, aboutCard] }), skillShowcase],
      },
    ),
    node('projects-section', 'page-section', { fillScreen: false }, { body: [projectGallery] }),
  ],
  status: 'draft',
  version: FIRST_ENTRY_VERSION,
}

const notFound = {
  id: `${SITE_ID}-not-found`,
  siteId: SITE_ID,
  kind: 'page',
  locale: 'en',
  translationKey: `${SITE_ID}-not-found`,
  path: '/404',
  template: 'page',
  properties: {
    title: 'Page not found',
    description: 'This page does not exist.',
    robots: 'noindex,follow',
  },
  root: [
    node(
      'not-found-section',
      'page-section',
      { fillScreen: false },
      {
        body: [
          node('not-found-text', 'text', {
            heading: 'Page not found',
            body: doc('This page does not exist. The way back is the start page.', [
              { type: 'text', text: 'Go to the start page', marks: [{ type: 'link', attrs: { href: '/' } }] },
            ]),
          }),
        ],
      },
    ),
  ],
  status: 'draft',
  version: FIRST_ENTRY_VERSION,
}

const seed = {
  formatVersion: SEED_FORMAT_VERSION,
  sites: [
    {
      id: SITE_ID,
      name: 'Keanu Hie',
      locales: ['en'],
      defaultLocale: 'en',
      localePrefix: 'never',
      notFoundPath: '/404',
      settings: {
        frontendId: FRONTEND_ID,
        environment: 'production',
        delivery: { defaultMode: 'on-demand', revalidateSeconds: 300 },
        preview: { url: 'http://127.0.0.1:3000' },
      },
    },
  ],
  manifests: [],
  entries: [home, notFound],
  published: [home.id, notFound.id],
}

const target = resolve(root, 'content/seed.json')
mkdirSync(dirname(target), { recursive: true })
writeFileSync(target, `${JSON.stringify(seed, undefined, 2)}\n`)
console.log(`Wrote ${target}: ${seed.entries.length} entries.`)
