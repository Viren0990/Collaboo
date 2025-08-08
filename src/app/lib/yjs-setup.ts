// lib/yjs-setup.ts
import * as Y from 'yjs'
import { Awareness } from 'y-protocols/awareness'

export function createYjs(docId: string) {
  const ydoc = new Y.Doc()
  const awareness = new Awareness(ydoc)

  return { ydoc, awareness }
}
