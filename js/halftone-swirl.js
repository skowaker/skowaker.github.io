import { createShader } from 'https://esm.sh/shaders@3.0.452/js'

const canvas = document.getElementById('hero-shader')

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)')

if (canvas) {
  // The shader library measures the canvas once via getBoundingClientRect
  // and stamps the result as inline pixel width/height — which never tracks
  // the hero. Pre-setting inline dimensions to 100% makes it skip that
  // snapshot; the ResizeObserver below keeps the GPU viewport in sync.
  canvas.style.width = '100%'
  canvas.style.height = '100%'

  const shader = await createShader(canvas, {
    components: [
      {
        type: 'SolidColor',
        id: 'idmi4zfdz3f94s1416e',
        props: {
          color: '#200452',
        },
      },
      {
        type: 'Halftone',
        id: 'idmi4zf1wxdexqh7wiw',
        props: {
          smoothness: 0.1,
        },
        children: [
          {
            type: 'Swirl',
            id: 'idmi4zezzjoq7ndkqsd',
            props: {
              coarseX: 50,
              coarseY: 50,
              colorA: '#1580ed',
              colorB: '#3d0b59',
              fineX: 50,
              fineY: 50,
              mediumX: 50,
              mediumY: 50,
            },
          },
        ],
      },
    ],
  })

  // Track the hero, not the canvas — shader.resize() writes inline pixel
  // dimensions back to the canvas, so observing the canvas would feed the
  // observer with its own writes.
  const hero = canvas.parentElement
  const sync = () => {
    const r = hero.getBoundingClientRect()
    if (r.width > 0 && r.height > 0) shader.resize(r.width, r.height)
  }
  new ResizeObserver(sync).observe(hero)
  sync()

  // Honor prefers-reduced-motion: pause the animation loop but leave the
  // rendered frame in place.
  if (reducedMotion.matches) shader.pause()
  reducedMotion.addEventListener('change', (e) => {
    if (e.matches) shader.pause()
    else shader.resume()
  })

  window.__halftoneSwirlShader = shader
}

// --- Closing panel shader — same Halftone Swirl as the hero ---
const closingCanvas = document.getElementById('closing-shader')

if (closingCanvas) {
  closingCanvas.style.width = '100%'
  closingCanvas.style.height = '100%'

  const closingShader = await createShader(closingCanvas, {
    components: [
      {
        type: 'SolidColor',
        id: 'closing-solid',
        props: {
          color: '#200452',
        },
      },
      {
        type: 'Halftone',
        id: 'closing-halftone',
        props: {
          smoothness: 0.1,
        },
        children: [
          {
            type: 'Swirl',
            id: 'closing-swirl',
            props: {
              coarseX: 50,
              coarseY: 50,
              colorA: '#1580ed',
              colorB: '#3d0b59',
              fineX: 50,
              fineY: 50,
              mediumX: 50,
              mediumY: 50,
            },
          },
        ],
      },
    ],
  })

  const closingPanel = closingCanvas.parentElement
  const closingSync = () => {
    const r = closingPanel.getBoundingClientRect()
    if (r.width > 0 && r.height > 0) closingShader.resize(r.width, r.height)
  }
  new ResizeObserver(closingSync).observe(closingPanel)
  closingSync()

  if (reducedMotion.matches) closingShader.pause()
  reducedMotion.addEventListener('change', (e) => {
    if (e.matches) closingShader.pause()
    else closingShader.resume()
  })

  window.__closingShader = closingShader
}
