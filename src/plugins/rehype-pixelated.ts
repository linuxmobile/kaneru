import type { Root } from 'hast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

const plugin: Plugin<[], Root> = () => {
	return function transformer(tree) {
		visit(tree, 'element', (el) => {
			if (el.tagName === 'img') {
				const alt = el.properties?.alt
				if (alt && typeof alt === 'string' && alt.endsWith('#pixelated')) {
					el.properties['data-pixelated'] = true
					el.properties.alt = alt
						.substring(0, alt.length - '#pixelated'.length)
						.trim()
				}
			}
		})
	}
}

export default plugin
