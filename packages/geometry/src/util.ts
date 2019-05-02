import IRectangleLike from './IRectangleLike';
import { IRectangle } from './Rectangle';
import { IVector } from './Vector';

export enum ContactOptions {
  NONE = 0,
  INCLUDE_BORDERS = 0x1,
}

export function containsPoint(
  self: IRectangle,
  { x, y }: IVector,
  includeBorders: number,
): boolean {
  if (includeBorders & ContactOptions.INCLUDE_BORDERS) {
    return (
      y >= self.top && x >= self.left && x <= self.right && y <= self.bottom
    );
  }

  return y > self.top && x > self.left && x < self.right && y < self.bottom;
}

export function contains(
  self: IRectangle,
  { top, left, right, bottom }: IRectangleLike,
  includeBorders: number,
): boolean {
  if (includeBorders & ContactOptions.INCLUDE_BORDERS) {
    return (
      top >= self.top &&
      left >= self.left &&
      right <= self.right &&
      bottom <= self.bottom
    );
  }

  return (
    top > self.top &&
    left > self.left &&
    right < self.right &&
    bottom < self.bottom
  );
}

export function collides(
  self: IRectangle,
  { top, left, right, bottom }: IRectangleLike,
  includeBorders: number,
): boolean {
  if (includeBorders & ContactOptions.INCLUDE_BORDERS) {
    return (
      self.top <= bottom &&
      self.left <= right &&
      self.right >= left &&
      self.bottom >= top
    );
  }

  return (
    self.top < bottom &&
    self.left < right &&
    self.right > left &&
    self.bottom > top
  );
}

export function random(): number;
export function random(max: number): number;
export function random(min: number, max: number): number;
export function random(minOrMax?: number, max?: number): number {
  let min;

  if (minOrMax == null) {
    min = 0;
    max = 1;
  } else if (max == null) {
    min = 0;
    max = minOrMax;
  } else {
    min = minOrMax;
  }

  return Math.random() * (max - min) + min;
}
