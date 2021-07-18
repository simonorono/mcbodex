import { SitemapStream, streamToPromise } from 'sitemap'
import { Readable } from 'stream'
import fs from 'fs'

function readJson(file) {
  return JSON.parse(
    fs.readFileSync(file)
  )
}

const games = readJson('./data/handcrafted/games.json')
const researchTaskGroups = readJson('./data/handcrafted/research_tasks.json')
const types = readJson('./data/raw/types.json')

const now = new Date;

const links = [
  {
    url: '/',
    changefreq: 'weekly',
    priority: 1.0,
    lastmod: now
  },
  {
    url: '/about',
    changefreq: 'weekly',
    priority: 1.0,
    lastmod: now
  },
]

games.forEach(game => {
  links.push({
    url: `/pokedex/${game.code}`,
    changefreq: 'weekly',
    priority: 0.9,
    lastmod: now
  })
})

types.forEach(type => {
  links.push({
    url: `/type/${type.code}`,
    changefreq: 'weekly',
    priority: 0.9,
    lastmod: now
  })
})

researchTaskGroups.forEach(researchTaskGroup => {
  links.push({
    url: `/research-task/${researchTaskGroup.code}`,
    changefreq: 'weekly',
    priority: 0.9,
    lastmod: now
  })
})

const stream = new SitemapStream({
  hostname: 'https://rdex.mcbodev.com'
})

const xml = await streamToPromise(Readable.from(links).pipe(stream)).then(data => data.toString())

fs.writeFileSync('./public/sitemap.xml', xml, { flag: 'w+' })
