module.exports = {
  min: {
    sm: '640px',
    // => @media (min-width: 640px) { ... }

    md: '768px',
    // => @media (min-width: 768px) { ... }

    lg: '1024px',
    // => @media (min-width: 1024px) { ... }

    xl: '1280px',
    // => @media (min-width: 1280px) { ... }

    '2xl': '1536px'
    // => @media (min-width: 1536px) { ... }
  },

  max: {
    '2xl': { max: '1535px' },
    // => @media (max-width: 1535px) { ... }

    xl: { max: '1279px' },
    // => @media (max-width: 1279px) { ... }

    lg: { max: '1023px' },
    // => @media (max-width: 1023px) { ... }

    md: { max: '767px' },
    // => @media (max-width: 767px) { ... }

    sm: { max: '639px' }
    // => @media (max-width: 639px) { ... }
  },

  minMax: {
    sm: { min: '640px', max: '767px' },
    md: { min: '768px', max: '1023px' },
    lg: { min: '1024px', max: '1279px' },
    xl: { min: '1280px', max: '1535px' },
    '2xl': { min: '1536px' }
  },

  multiRange: {
    sm: '500px',
    md: [
      // Sidebar appears at 768px, so revert to `sm:` styles between 768px
      // and 868px, after which the main content area is wide enough again to
      // apply the `md:` styles.
      { min: '668px', max: '767px' },
      { min: '868px' }
    ],
    lg: '1100px',
    xl: '1400px'
  }
}
