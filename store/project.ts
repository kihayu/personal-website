import type { Project } from '~/types/Project'

interface ProjectState {
  projects: Array<Project>
}

export const useProjectStore = defineStore('project', {
  state: (): ProjectState => ({
    projects: [
      {
        id: 'oeamtc-main',
        title: 'ÖAMTC Website',
        leadText:
          'Working on multiple frontend and backend projects of ÖAMTC requires a consistent interface, fast performance, and an excellent user experience.',
        description:
          'As a frontend developer, I worked in a team on the website of ÖAMTC. Parts of the website are constantly rebuilt using Nuxt with TypeScript, optimized for performance and components from the styleguide. I also worked on the backend of the website, using PHP to extend and maintain the existing Content Management System. Additionally, I contributed a new technology stack for components, which needed work on frontend and backend. The design was built with a mobile-first approach, as most users nowadays use mobile devices to navigate the web.',
        technologies: ['JavaScript', 'TypeScript', 'Vue.js', 'Nuxt', 'Node', 'PHP', 'GraphQL'],
        capacity: 'Collaborator',
      },
      {
        id: 'oeamtc-styleguide',
        title: 'ÖAMTC Styleguide',
        leadText:
          'A complete overhaul of the ÖAMTC designs to be more modern, consistent and accessible. Used on all new components, sections and pages.',
        description:
          'One part of being on a team, working for ÖAMTC was keeping the design language consistent throughout the projects. To keep the project and the user experience fresh we got to work on a new styleguide which development started internally. Out of the existing designs we started building a Storybook application, containing all necessary components in different states for testing and showcasing purposes. The application itself uses Vue.js with TypeScript and best practices in building a frontend design with SCSS.',
        technologies: ['TypeScript', 'Vue.js', 'Storybook'],
        capacity: 'Collaborator',
      },
      {
        id: 'cinema-reservation',
        title: 'Cinema Reservation System',
        leadText:
          'A complete management system for cinemas for movies, rooms, events and reservations. Made as a school project with Vue.js.js 2 and .NET Core.',
        description:
          'When I was a student we had a long term project in which we all had to build a fullstack project on our own. My project was a simple but complete management system for cinemas to create movie entries, rooms with a visual editor, movie events and reservations but also a user management system to handle users and permissions.',
        technologies: ['JavaScript', 'Vue.js', 'C#', '.NET'],
        capacity: 'Solo',
      },
      {
        id: 'oegb',
        title: 'ÖGB and GPA',
        leadText:
          'A new implementation of the ÖGB and GPA webpages with a fresh and modern design. Involved the implementation of a proxy server between AEM and React.',
        description:
          'Creating a frontend application that gets data from an Adobe Experience Manager (AEM) instance and works with Hot Module Reloading (HMR) was a challenge. I helped creating a Webpack proxy server that handled the communication and data flow between AEM and our React frontend. The application itself uses React with TailwindCSS for styling.',
        technologies: ['JavaScript', 'TypeScript', 'Node', 'Webpack', 'React', 'TailwindCSS', 'Storybook'],
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
        leadText:
          'A comprehensive data visualization platform with multiple interactive dashboards. The project included a successful migration from Nuxt 2 to Nuxt 3.',
        description:
          'This internal analytics tool features multiple interactive dashboards powered by d3.js charts to visualize complex datasets. I focused primarily on developing the GraphQL service and Nuxt frontend, ensuring seamless data flow with a professional dashboard UI. The project involved a complete upgrade from Nuxt 2 to Nuxt 3, requiring extensive dependency research and migration work while having Keycloak integration for secure user management across the application.',
        technologies: ['TypeScript', 'Node', 'Nuxt', 'GraphQL', 'd3.js'],
        capacity: 'Collaborator',
      },
      {
        id: 'personal-website',
        title: 'Personal Website',
        leadText:
          'A responsive Nuxt website, showcasing my portfolio and professional journey. Designed with performance, SEO and user experience in mind.',
        description:
          'This portfolio website showcases my skills as a frontend developer using modern web technologies. Built with Vue.js.js and Nuxt, optimized for optimal performance and SEO on all devices. It features responsive design principles and custom designs for mobile and desktop end-users. The design was made to be simple and modern, while also being accessible and easy-to-use.',
        technologies: ['TypeScript', 'Nuxt', 'TailwindCSS'],
        capacity: 'Solo',
      },
    ],
  }),
})
