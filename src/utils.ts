import type { Token } from "markdown-it/index.js"
import type { SplitSeperator, StreamingToken } from "./shared.types"

export function processTokens(tokens: Token[], splitSeperator: SplitSeperator): StreamingToken[] {
  const processedTokens = []
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    if (token.type === 'inline') {
      // 處理行內元素，進一步拆分為更小的單位
      const inlineTokens = processInlineTokens(token.children || [], splitSeperator)
      processedTokens.push(...inlineTokens)
    } else if (token.type.endsWith('_open')) {
      // 處理開始標籤
      const closeIndex = findClosingToken(tokens, i)

      if (closeIndex !== -1) {
        const slice = tokens.slice(i + 1, closeIndex)
        processedTokens.push({
          tag: token.tag,
          type: token.type,
          level: token.level,
          children: processInlineTokens(slice, splitSeperator),
          content: ''
        })
        i = closeIndex // 跳過已處理的 tokens
      }
    } else if (!token.type.endsWith('_close')) {
      // 處理其他類型的 token
      processedTokens.push({
        type: token.type,
        tag: token.tag || 'div',
        content: token.content || '',
        level: token.level
      })
    }
  }
  return processedTokens
}

function processInlineTokens(children: Token[], seperator: SplitSeperator) {
  const inlineTokens = []
  const regexp = seperator === 'word' ? /(\s+)/ : /(.)/

  for (const child of children) {
    if (child.type === 'inline') {
      // 將文字按詞拆分
      const words = child.content.split(regexp).filter(Boolean)
      words.forEach(word => {
        inlineTokens.push({
          type: 'text',
          tag: 'span',
          content: word,
          level: 0
        })
      })
    } else {
      // 處理其他行內元素（如加粗、斜體等）
      inlineTokens.push({
        type: child.type,
        tag: child.tag || 'span',
        content: child.content || '',
        level: 0
      })
    }
  }

  return inlineTokens
}

function findClosingToken(tokens: Token[], startIndex: number) {
  const openToken = tokens[startIndex]
  const targetType = openToken.type.replace('_open', '_close')
  let level = openToken.level

  for (let i = startIndex + 1; i < tokens.length; i++) {
    const token = tokens[i]
    if (token.type === targetType && token.level === level) {
      return i
    }
  }
  return -1
}