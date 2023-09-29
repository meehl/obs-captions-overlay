import { type Position, type RelativePosition, type Size, type RelativeSize } from './types'

export const absToRelWindowPosition = (
  absPos: Position,
  windowSize: Size,
  elementSize: Size,
): RelativePosition => {
  const relPos: RelativePosition = {}
  if (absPos.x + elementSize.width / 2 <= windowSize.width / 2) {
    relPos.left = absPos.x / windowSize.width
  } else {
    relPos.right = 1 - (absPos.x + elementSize.width) / windowSize.width
  }
  if (absPos.y + elementSize.height / 2 <= windowSize.height / 2) {
    relPos.top = absPos.y / windowSize.height
  } else {
    relPos.bottom = 1 - (absPos.y + elementSize.height) / windowSize.height
  }
  return relPos
}

export const relToAbsWindowPosition = (
  relPos: RelativePosition,
  windowSize: Size,
  elementSize: Size,
): Position => {
  const absPos = { x: 0, y: 0 }
  if (typeof relPos.left !== 'undefined') {
    absPos.x = relPos.left * windowSize.width
  } else if (typeof relPos.right !== 'undefined') {
    absPos.x = (1 - relPos.right) * windowSize.width - elementSize.width
  }

  if (typeof relPos.top !== 'undefined') {
    absPos.y = relPos.top * windowSize.height
  } else if (typeof relPos.bottom !== 'undefined') {
    absPos.y = (1 - relPos.bottom) * windowSize.height - elementSize.height
  }
  return absPos
}

export const absToRelSize = (absSize: Size, windowSize: Size): RelativeSize => {
  return {
    width: absSize.width / windowSize.width,
    height: absSize.height / windowSize.height,
  }
}

export const relToAbsSize = (relSize: RelativeSize, windowSize: Size): Size => {
  return {
    width: relSize.width * windowSize.width,
    height: relSize.height * windowSize.height,
  }
}
