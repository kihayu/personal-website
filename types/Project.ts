export interface Project {
  id: string
  title: string
  leadText: string
  description: string
  technologies: string[]
  capacity: 'Collaborator' | 'Solo'
}
