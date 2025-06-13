export type StreamingToken = {
  tag: string,
  type: string,
  level: number,
  children?: StreamingToken[]
  content: string
}

export type SplitSeperator = 'word' | 'character'