/*
 * Builds versions/1.0.0/css/tailwind.css from the classes this module's views use.
 * Regenerate from this directory after changing a view or a variation:
 *
 *   npx tailwindcss@3.4.17 -c tailwind.config.js -i tailwind.input.css \
 *     -o src/content/jcr_root/etc/vendor-libraries/tailwind-css/versions/1.0.0/css/tailwind.css --minify
 *
 * Variation classes are node names in .content.xml (e.g. <gap-4 .../>), so the XML is scanned too.
 */
module.exports = {
  content: {
    relative: true,
    files: [
      './src/content/jcr_root/apps/**/*.html',
      // Named explicitly: a glob does not match dotfiles.
      './src/content/jcr_root/apps/**/.content.xml',
    ],
    // The default extractor skips a class that follows '<' directly, which is every variation node name.
    extract: {
      xml: (content) => content.split(/[<>"'\s=/]+/).filter(Boolean),
    },
  },
  corePlugins: {
    // preflight.css ships alongside tailwind.css in the same library.
    preflight: false,
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
