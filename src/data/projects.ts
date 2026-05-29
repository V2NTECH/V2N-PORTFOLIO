import flashcardImg from '../assets/img/flashcardProject.png'
import pomodoroImg from '../assets/img/pomodoroProject.png'

export type Project = {
  id: string
  name: string
  category: string
  description: string
  tags: string[]
  image: string
  url: string
}

export const projects: Project[] = [
  {
    id: 'flashcard',
    name: 'Flashcard V2N',
    category: 'EdTech · Web App',
    description:
      'Plataforma de estudos inteligente com repetição espaçada, interface limpa e foco total na experiência do usuário.',
    tags: ['React', 'TypeScript', 'Node.js'],
    image: flashcardImg,
    url: '#',
  },
  {
    id: 'pomodoro',
    name: 'Pomodoro Focus',
    category: 'Produtividade · App',
    description:
      'Timer premium com modos de foco, métricas visuais e experiência imersiva pensada para deep work.',
    tags: ['React', 'GSAP', 'PWA'],
    image: pomodoroImg,
    url: '#',
  },
]
