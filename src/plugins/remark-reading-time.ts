import type { RemarkPlugin } from '@astrojs/markdown-remark'
import { toString } from 'mdast-util-to-string'
import getReadingTime from 'reading-time'

const remarkReadingTime: RemarkPlugin = (_options?) => {
	return (tree, { data }) => {
		if (data.astro?.frontmatter) {
			const textOnPage = toString(tree)
			const readingTime = getReadingTime(textOnPage)
			// readingTime.text will give us minutes read as a friendly string,
			// i.e. "3 min read"
			data.astro.frontmatter.minutesRead = readingTime.text
		}
	}
}

export default remarkReadingTime
