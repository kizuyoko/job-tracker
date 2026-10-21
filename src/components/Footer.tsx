const links = [
  { href: 'https://github.com/kizuyoko/job-tracker', label: 'GitHub Repository', icon: '/github.svg' },
  { href: 'https://www.linkedin.com/in/kizuyoko/', label: 'LinkedIn Profile', icon: '/linkedin.svg' },
]

export default function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-center gap-3 p-4">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="transition duration-200 hover:scale-110"
        >
          <img src={link.icon} alt="" width={36} height={36} className="dark:invert" />
        </a>
      ))}
    </footer>
  )
}