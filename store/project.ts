import type { Project } from '~/types/project'

interface ProjectState {
  projects: Array<Project>
}

export const useProjectStore = defineStore('project', {
  state: (): ProjectState => ({
    projects: [
      {
        id: 'personal-website',
        title: 'Personal Website',
        leadText:
          'A responsive Vue.js website showcasing my portfolio and professional journey. Designed with performance and user experience in mind, it features smooth animations and thoughtful interaction design.',
        description:
          'This portfolio website showcases my skills and projects using modern web technologies. Built with Vue.js and Nuxt.js for optimal performance and SEO, it features responsive design principles ensuring perfect display across all devices. The site incorporates smooth animations, dynamic content loading, and accessibility features. TailwindCSS provides utility-first styling with a consistent design language throughout. The architecture follows component-based design patterns with TypeScript for type safety and code maintainability.',
        technologies: ['Vue', 'Nuxt', 'TailwindCSS', 'TypeScript', 'ESLint'],
      },
      {
        id: 'e-commerce-platform',
        title: 'E-commerce Platform',
        leadText:
          'A robust e-commerce platform with seamless checkout flow and inventory management. The solution provides merchants with analytics dashboards and customers with personalized shopping experiences.',
        description:
          'A comprehensive e-commerce solution built for scalability and performance. This platform features a product catalog with advanced filtering, user authentication and profiles, shopping cart functionality, secure payment processing, and order management. The Vue.js frontend delivers a smooth shopping experience with server-side rendering via Nuxt.js. Node.js powers the backend API with Express, while MongoDB provides flexible document storage for products, orders, and user data. Additional features include inventory management, customer reviews, wishlist functionality, and an admin dashboard for store management.',
        technologies: ['Vue', 'Vuex', 'Node.js', 'Express', 'MongoDB', 'Stripe API', 'Docker'],
      },
      {
        id: 'portfolio-app',
        title: 'Portfolio App',
        leadText:
          'Cross-platform mobile application enabling creatives to build stunning digital portfolios. The intuitive interface allows for easy content organization and sharing across multiple social platforms.',
        description:
          'A cross-platform mobile application designed for creative professionals to showcase their portfolios. Built with React Native, this app enables artists, designers, and photographers to create beautiful digital portfolios that can be easily shared. The app features customizable templates, image optimization, and offline viewing capabilities. Firebase powers the backend, providing authentication, real-time database synchronization, and cloud storage for media assets. Users can organize works by projects, add detailed descriptions, and track portfolio views and engagement metrics.',
        technologies: ['React Native', 'Firebase', 'Redux', 'Expo', 'Cloud Functions'],
      },
      {
        id: 'task-management-app',
        title: 'Task Management App',
        leadText:
          'Team-oriented task management system with real-time collaboration features. The flexible workflow design adapts to different project methodologies while maintaining simplicity for end users.',
        description:
          'A powerful task management application designed for team collaboration. This app combines kanban-style boards with calendar views and list management to accommodate various workflow preferences. Features include task assignment, priority levels, due dates, file attachments, and nested subtasks. The real-time synchronization allows for seamless collaboration as team members can see updates instantly. The backend uses GraphQL for efficient data fetching, while the frontend is built with React and Apollo Client. PostgreSQL provides a reliable relational database for complex task relationships and user permissions.',
        technologies: ['React', 'GraphQL', 'Apollo', 'PostgreSQL', 'WebSockets', 'Material-UI'],
      },
      {
        id: 'fitness-tracker',
        title: 'Fitness Tracker',
        leadText:
          'Comprehensive health and fitness tracking application with customizable workout plans and nutrition logging. Data visualizations help users understand their progress and identify opportunities for improvement.',
        description:
          'A comprehensive fitness tracking application that helps users monitor their health and exercise routines. The app allows users to create custom workout plans, track exercise progress with detailed metrics, and monitor nutritional intake. Built with Flutter for a consistent cross-platform experience, it features beautiful visualizations of health data, workout history, and progress trends. The app integrates with health devices via Bluetooth, supports social sharing of achievements, and provides personalized recommendations based on user goals and performance data. A Python backend with Django REST framework handles data processing and machine learning for personalized recommendations.',
        technologies: ['Flutter', 'Dart', 'Python', 'Django', 'SQLite', 'Bluetooth API', 'TensorFlow Lite'],
      },
      {
        id: 'weather-dashboard',
        title: 'Weather Dashboard',
        leadText:
          'Interactive weather monitoring dashboard with location-based forecasting and severe weather alerts. Historical data analysis helps users identify weather patterns and plan accordingly for changing conditions.',
        description:
          'An advanced weather monitoring dashboard that provides real-time meteorological data and forecasts. The application features interactive maps, detailed weather conditions, and historical weather patterns. Users can customize their dashboard to display relevant information for multiple locations simultaneously. Built with Svelte for a reactive UI and D3.js for data visualization, the dashboard offers responsive charts and graphs showing temperature trends, precipitation forecasts, and atmospheric conditions. The backend integrates with multiple weather APIs to ensure accurate and comprehensive data. Progressive Web App features enable offline functionality and push notifications for weather alerts.',
        technologies: ['Svelte', 'D3.js', 'Node.js', 'Express', 'Redis', 'PWA', 'Weather APIs'],
      },
    ],
  }),
})
