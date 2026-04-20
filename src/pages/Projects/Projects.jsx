import ProjectCard from '../../components/ProjectCard/ProjectCard'
import todolyImg from '../../assets/todoly.png'
import reactCakeryImg from '../../assets/reactCakery.jpg'
import './Projects.css'

/* Base URL for assets in the public folder (respects Vite base config) */
const baseUrl = import.meta.env.BASE_URL
const demoUrl = import.meta.env.DEV ? `http://localhost:5173/Portfolio/presentation.mp4` : `${baseUrl}presentation.mp4`;

/* Data for each project card */
const projectData = [
  {
    id: 1,
    title: 'Todoly task management app',
    image: todolyImg,
    description:
      'A structured and layered csharp-application that manages tasks in the console with JSON data persistence.',
    tech: ['C#', '.NET', 'Visual Studio'],
    demo: {
      type: 'video',
      url: demoUrl,
    },
    github: 'https://github.com/johan-fullstack-ai/ToDoLy',
  },
  {
    id: 2,
    title: 'React Cakery',
    image: reactCakeryImg,
    description:
      'An e-commerce website for a cakery company selling cupcakes and wedding cakes.',
    tech: ['React', 'CSS', 'Vite', 'pnpm', 'Github Pages', 'VS code'],
    demo: {
      type: 'external',
      url: 'https://johan-fullstack-ai.github.io/react-cakery/',
    },
    github: 'https://github.com/johan-fullstack-ai/react-cakery',
  },
]

function Projects() {
  return (
    <section className="projectsPage">
      <h1>Projects</h1>
      <div className="projectsGrid">
        {projectData.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </section>
  )
}

export default Projects
