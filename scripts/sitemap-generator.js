async function generateSitemap() {
    // excludes Nextjs files and API routes.
    const pages = await globby([
      'pages/**/*{.js,.tsx}',
      '!pages/_*.js',
      '!pages/api',
    ])
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(addPage).join('\n')}
  </urlset>`
    fs.writeFileSync('public/sitemap.xml', sitemap)
  }
  generateSitemap()