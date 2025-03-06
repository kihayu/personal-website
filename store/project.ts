import type { Project } from '~/types/project'

interface ProjectState {
  projects: Array<Project>
}

export const useProjectStore = defineStore('project', {
  state: (): ProjectState => ({
    projects: [
      {
        id: 'oeamtc-styleguide',
        title: 'ÖAMTC Styleguide',
        leadText: '',
        description: '',
        technologies: ['TypeScript', 'Vue', 'Storybook'],
        capacity: 'Collaborator',
      },
      {
        id: 'oeamtc-main',
        title: 'ÖAMTC Main Page',
        leadText: '',
        description: '',
        technologies: ['JavaScript', 'TypeScript', 'Vue', 'Nuxt', 'Node', 'PHP', 'GraphQL'],
        capacity: 'Collaborator',
      },
      {
        id: 'cinema-reservation',
        title: 'Cinema Reservation System',
        leadText: '',
        description: '',
        technologies: ['JavaScript', 'Vue', 'C#', '.NET'],
        capacity: 'Solo',
      },
      {
        id: 'oegb',
        title: 'ÖGB and GPA',
        leadText: '',
        description: '',
        technologies: ['JavaScript', 'TypeScript', 'Node', 'React', 'TailwindCSS', 'Storybook'],
        capacity: 'Collaborator',
      },
      {
        id: 'scrum-poker',
        title: 'Scrum Poker Game',
        leadText:
          'An online poker game for Scrum teams to help with estimation and planning. Built with Nuxt and a simple Design in mind for a quick and easy use.',
        description:
          'Coming from the problem of having not the right tools for estimation and planning, 2 friends and I decided to build a simple poker game to aid us and our colleagues. Over the course of a weekend, my friends Daniel and Julia joined me, providing the backend for the project, while I focused on the graphical designs and frontend application.',
        technologies: ['TypeScript', 'Nuxt', 'TailwindCSS'],
        capacity: 'Solo',
      },
      {
        id: 'internal-data-analyse',
        title: 'Internal tool for data analyse',
        leadText: '',
        description: '',
        technologies: ['TypeScript', 'Node', 'Nuxt', 'GraphQL', 'Storybook'],
        capacity: 'Collaborator',
      },
      {
        id: 'nv',
        title: 'Niederösterreichische Versicherungen',
        leadText: '',
        description: '',
        technologies: ['TypeScript', 'Vue', 'Storybook'],
        capacity: 'Collaborator',
      },
      {
        id: 'personal-website',
        title: 'Personal Website',
        leadText:
          'A responsive Vue.js website, built with the Nuxt framework, showcasing my portfolio and professional journey. Designed with performance, SEO and user experience in mind.',
        description:
          'This portfolio website showcases my skills as a frontend developer using modern web technologies. Built with Vue.js and Nuxt, optimized for optimal performance and SEO on all devices. It features responsive design principles and custom designs for mobile and desktop end-users. The design was made to be simple and modern, while also being accessible and easy-to-use.',
        technologies: ['TypeScript', 'Nuxt', 'TailwindCSS'],
        capacity: 'Solo',
      },
    ],
  }),
})
