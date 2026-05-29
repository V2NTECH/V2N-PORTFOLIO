import faceImg from '../assets/img/face.png'

export type CeoSocial = {
  label: string
  href: string
}

export type Ceo = {
  id: string
  name: string
  roleLines: [string, string]
  stacks: string[]
  socials: CeoSocial[]
  siteUrl: string
  image: string
}

export const ceos: Ceo[] = [
  {
    id: 'felipy',
    name: 'Felipy',
    roleLines: ['FULL', 'STACK'],
    stacks: ['React', 'Node', 'TypeScript', 'AWS', 'PostgreSQL'],
    socials: [
      { label: 'Instagram', href: '#' },
      { label: 'LinkedIn', href: '#' },
      { label: 'GitHub', href: '#' },
    ],
    siteUrl: '#',
    image: faceImg,
  },
  {
    id: 'vinicius',
    name: 'Vinícius',
    roleLines: ['AUTOMAÇÃO', 'SISTEMAS'],
    stacks: ['Python', 'n8n', 'APIs', 'Docker', 'Redis'],
    socials: [
      { label: 'Instagram', href: '#' },
      { label: 'LinkedIn', href: '#' },
      { label: 'GitHub', href: '#' },
    ],
    siteUrl: '#',
    image: faceImg,
  },
  {
    id: 'lucas',
    name: 'Lucas',
    roleLines: ['PRODUCT', 'DESIGN'],
    stacks: ['Figma', 'React', 'GSAP', 'Three.js', 'Tailwind'],
    socials: [
      { label: 'Instagram', href: '#' },
      { label: 'LinkedIn', href: '#' },
      { label: 'Behance', href: '#' },
    ],
    siteUrl: '#',
    image: faceImg,
  },
]
