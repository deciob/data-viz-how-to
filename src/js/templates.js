function urlify (str) {
  return encodeURIComponent(str);
}

export const templates = {
  intro: `
    <div class="wrap">
      <main role="main">
        <h1>Data Viz How To</h1>
      </main>
    </div>
  `,
  luaHeader: `
    <header role="banner">
      <h1>Population of the 30 Largest Urban Agglomerations, 1950-2030</h1>
    </header>
  `,
  luaFooter: `
    <footer role="contentinfo">
        <small>Source:
          <a href="${urlify('https://esa.un.org/unpd/wup/CD-ROM/')}">
            United Nations, Department of Economic and Social Affairs,
            Population Division (2014). World Urbanization Prospects:
            The 2014 Revision.
          </a>
        </small>
    </footer>
  `,
};
