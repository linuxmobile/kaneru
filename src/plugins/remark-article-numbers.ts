export interface ArticleNumberContext {
	index: number
	totalCount: number
	pageSize?: number
	currentPage?: number
	globalIndex?: number
}

/**
 * Calculate article number based on context
 * @param context Object containing index, totalCount, and optional pagination info
 * @returns Formatted article number string
 */
export function getArticleNumber(context: ArticleNumberContext): string {
	const { index, totalCount, pageSize, currentPage, globalIndex } = context

	if (globalIndex !== undefined && globalIndex !== -1) {
		const articleNumber = totalCount - globalIndex
		return String(articleNumber).padStart(2, '0')
	}

	let adjustedIndex = index
	if (pageSize && currentPage && currentPage > 1) {
		const postsBeforePage = (currentPage - 1) * pageSize
		adjustedIndex = index + postsBeforePage
	}

	// For pagination, we use reversed order (newest first)
	const articleNumber = totalCount - adjustedIndex
	return String(articleNumber).padStart(2, '0')
}
