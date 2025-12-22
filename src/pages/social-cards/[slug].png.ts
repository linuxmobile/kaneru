import fs from 'node:fs'
import path from 'node:path'
import { Resvg } from '@resvg/resvg-js'
import type { APIContext, InferGetStaticPropsType } from 'astro'
import type { ReactNode } from 'react'
import satori, { type SatoriOptions } from 'satori'
import { html } from 'satori-html'
import siteConfig from '~/site.config'
import { dateString, getSortedPosts, resolveThemeColorStyles } from '~/utils'

const geistMonoPath = path.resolve(
	'./node_modules/@expo-google-fonts/geist-mono/600SemiBold/GeistMono_600SemiBold.ttf',
)
const geistMonoData = fs.readFileSync(geistMonoPath)

const delaGothicPath = path.resolve(
	'./node_modules/@expo-google-fonts/dela-gothic-one/400Regular/DelaGothicOne_400Regular.ttf',
)
const delaGothicData = fs.readFileSync(delaGothicPath)

const schaboPath = path.resolve('./public/fonts/schabo.otf')
const schaboData = fs.readFileSync(schaboPath)

const defaultTheme =
	siteConfig.themes.default === 'auto'
		? siteConfig.themes.include[0]
		: siteConfig.themes.default
const themeStyles = await resolveThemeColorStyles(
	[defaultTheme],
	siteConfig.themes.overrides,
)
const bg = themeStyles[defaultTheme]?.background
const fg = themeStyles[defaultTheme]?.foreground
const accent = themeStyles[defaultTheme]?.accent
if (!bg || !fg || !accent) {
	throw new Error(`Theme ${defaultTheme} does not have required colors`)
}

const ogOptions: SatoriOptions = {
	fonts: [
		{
			data: geistMonoData,
			name: 'Geist Mono',
			style: 'normal',
			weight: 600,
		},
		{
			data: delaGothicData,
			name: 'Dela Gothic One',
			style: 'normal',
			weight: 400,
		},
		{
			data: schaboData,
			name: 'Schabo',
			style: 'normal',
			weight: 400,
		},
	],
	height: 630,
	width: 1200,
}

const markup = (title: string, pubDate: string | undefined, author: string) =>
	html(`
	<div tw="flex bg-[${bg}] w-[1200px] h-[630px] p-8">
		<div tw="w-full flex items-start justify-center flex-col border border-[${accent}] px-12">
			${
				author !== title
					? `<div tw="flex items-center text-[${accent}] text-4xl font-black pt-28">${title}</div>`
					: ''
			}
			${pubDate ? `<div tw="pt-6 flex text-white/40 text-xl pb-20">${pubDate} / Blog #20</div>` : ''}
			<div tw="w-full flex flex-col items-end relative">
				<div tw="text-5xl top-9 text-white">カーネル</div>
				<div tw="text-[10.5rem] text-[${accent}]" style="font-family: 'Schabo';">Kaneru</div>
			</div>
		</div>
	</div>
	`)

type Props = InferGetStaticPropsType<typeof getStaticPaths>

export async function GET(context: APIContext) {
	const { pubDate, title, author } = context.props as Props
	const svg = await satori(
		markup(title, pubDate, author) as ReactNode,
		ogOptions,
	)
	const png = new Resvg(svg).render().asPng()
	return new Response(png, {
		headers: {
			'Cache-Control': 'public, max-age=31536000, immutable',
			'Content-Type': 'image/png',
		},
	})
}

export async function getStaticPaths() {
	const posts = await getSortedPosts()
	return posts
		.map((post) => ({
			params: { slug: post.id },
			props: {
				pubDate: post.data.published
					? dateString(post.data.published)
					: undefined,
				title: post.data.title,
				author: post.data.author || siteConfig.author,
			},
		}))
		.concat([
			{
				params: { slug: '__default' },
				props: {
					pubDate: undefined,
					title: siteConfig.title,
					author: siteConfig.author,
				},
			},
		])
}
