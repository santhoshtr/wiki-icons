const { optimize, extendDefaultPlugins } = require('svgo')
const fs = require('fs')
const xml2js = require('xml2js')

const ICONS_PATH = 'icons'

function optimizedSvg (svgString) {
  const result = optimize(svgString, {
    multipass: true,
    plugins: extendDefaultPlugins([
      {
        name: 'mergePaths',
        params: {
          force: true
        }
      },
      {
        name: 'convertShapeToPath',
        params: {
          convertArcs: true
        }
      }])
  })

  return result.data
}

const parser = new xml2js.Parser({ attrkey: 'attributes' })

fs.readdir(ICONS_PATH, async (err, filenames) => {
  const iconsData = {}
  await filenames.forEach(async (filename) => {
    const iconContent = fs.readFileSync(`${ICONS_PATH}/${filename}`, 'utf-8')
    if (filename.includes('invert')) {
      return true
    }
    if (filename.includes('progressive')) {
      return true
    }
    if (filename.includes('destructive')) {
      return true
    }

    const iconName = filename.replace('.svg', '').replace('-ltr', '').replace('-invert', '').replace('-rtl', '')

    iconsData[iconName] = iconsData[iconName] || {}

    if (err) {
      throw err
    }

    if (filename.includes('rtl')) {
      iconsData[iconName].flippable = true
      return true
    }

    const optimizedSVGContent = optimizedSvg(iconContent)
    const parsedSVG = await parser.parseStringPromise(optimizedSVGContent)
    if (parsedSVG.svg.path) {
      const path = parsedSVG.svg.path[0]
      iconsData[iconName].path = path.attributes.d
    } else {
      console.error(`Could not parse ${filename}`)
      console.error(optimizedSVGContent)
    }
    if (parsedSVG.svg.rect) {
      console.error(`Could not generate single path SVG for ${filename}`)
      console.error(optimizedSVGContent)
    }
  })

  fs.writeFile('./icons.json', JSON.stringify(iconsData, null, 4), 'utf8', (err) => {
    if (err) {
      console.log(`Error writing file: ${err}`)
    } else {
      console.log('File is written successfully!')
    }
  })
})
