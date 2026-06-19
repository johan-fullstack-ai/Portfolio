import ProjectCard from '../../components/ProjectCard/ProjectCard'
import todolyImg from '../../assets/todoly.png'
import reactCakeryImg from '../../assets/reactCakery.jpg'
import CineScopeImg from '../../assets/CineScope.jpg'
import perfumeImg from '../../assets/perfume.jpg'
import './Projects.css'

/* Base URL for assets in the public folder (respects Vite base config) */
const baseUrl = import.meta.env.BASE_URL
const demoUrl = import.meta.env.DEV ? `http://localhost:5173/Portfolio/presentation.mp4` : `${baseUrl}presentation.mp4`;
const demo2Url = import.meta.env.DEV ? `http://localhost:5173/Portfolio/CineScope.mp4` : `${baseUrl}CineScope.mp4`;

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
  {
    id: 3,
    title: 'CineScope',
    image: CineScopeImg,
    description:
      'A movie database application that allows users to search for movies and view details.',
    tech: ['.Net 10 MVC', 'SQL Server', 'EF Core', 'Razor', 'Bootstrap 5', 'TMDB API', 'Azure App Service'],
    demo: {
      type: 'video',
      url: demo2Url,
    },
    github: 'https://github.com/johan-fullstack-ai/CineScope',
  },
  {
    id: 4,
    title: 'Perfume',
    image: perfumeImg,
    description:
      'An e-commerce site for exclusive parfumes in two parts, backend and frontend, where Stripe payment service is used as test-payment.',
    tech: ['C#/.NET Web API', 'SQL Server + EF Core 10', 'React + Vite', 'Stripe', 'Azure', 'GitHub Pages', 'CORS'],
    demo: {
      type: 'external',
      url: 'https://johan-fullstack-ai.github.io/perfume',
    },
    github: 'https://github.com/johan-fullstack-ai/PerfumeAPI',
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
