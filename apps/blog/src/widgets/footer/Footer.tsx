export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer>
      <p>© {currentYear} White Flask. All rights reserved.</p>
    </footer>
  )
}
