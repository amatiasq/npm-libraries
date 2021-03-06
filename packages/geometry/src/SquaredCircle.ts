import { accessor } from '@amatiasq/util';
import { ICircle } from './Circle';
import { IRectangle } from './Rectangle';
import { IVector } from './Vector';
import { ContactOptions, collides, contains, containsPoint } from './util';

export default class SquaredCircle
  implements ISquaredCircle, ICircle, IRectangle, IVector {
  static fromCenter(x: number, y: number, radius: number) {
    const area = new SquaredCircle();
    area.x = x;
    area.y = y;
    area.radius = radius;
    return area;
  }

  private constructor() {}

  is(target: ISquaredCircle) {
    return (
      this.x === target.x &&
      this.y === target.y &&
      this.radius === target.radius
    );
  }

  containsPoint(
    target: IVector,
    options = ContactOptions.INCLUDE_BORDERS,
  ): boolean {
    return containsPoint(this, target, options);
  }

  contains(target: ISquaredCircle, options = ContactOptions.INCLUDE_BORDERS) {
    if (!contains(this, target, options)) return false;

    const distance = Math.hypot(this.x - target.x, this.y - target.y);
    const containmentDistance = Math.abs(this.radius - target.radius);

    return options & ContactOptions.INCLUDE_BORDERS
      ? distance <= containmentDistance
      : distance < containmentDistance;
  }

  collides(target: ISquaredCircle, options = ContactOptions.INCLUDE_BORDERS) {
    if (!collides(this, target, options)) return false;

    const distance = Math.hypot(this.x - target.x, this.y - target.y);
    const collisionDistance = this.radius + target.radius;

    return options & ContactOptions.INCLUDE_BORDERS
      ? distance <= collisionDistance
      : distance < collisionDistance;
  }

  toString() {
    return `[${this.x},${this.y}][${this.radius}]`;
  }
}

export default interface SquaredCircle {
  x: number;
  y: number;
  radius: number;
  diameter: number;
  width: number;
  height: number;
  halfWidth: number;
  halfHeight: number;
  top: number;
  left: number;
  right: number;
  bottom: number;
}

Object.defineProperties(SquaredCircle.prototype, {
  x: accessor('_x', onHorizontalSizeChange),
  y: accessor('_y', onVerticalSizeChange),
  radius: accessor('_radius', onRadiusChange),
  diameter: accessor('_diameter', onDiameterChange),

  width: accessor('diameter'),
  height: accessor('diameter'),
  halfWidth: accessor('radius'),
  halfHeight: accessor('radius'),

  top: accessor('_top', onVerticalPositionChange),
  left: accessor('_left', onHorizontalPositionChange),
  right: accessor('_right', onHorizontalPositionChange),
  bottom: accessor('_bottom', onVerticalPositionChange),
});

export interface ISquaredCircle extends ICircle, IRectangle {}

interface ISquaredCircleInternals {
  _x: number;
  _y: number;
  _radius: number;
  _diameter: number;
  _top: number;
  _left: number;
  _right: number;
  _bottom: number;
}

function onHorizontalSizeChange(area: ISquaredCircleInternals) {
  area._left = area._x - area._radius;
  area._right = area._x + area._radius;
}

function onVerticalSizeChange(area: ISquaredCircleInternals) {
  area._top = area._y - area._radius;
  area._bottom = area._y + area._radius;
}

function onRadiusChange(area: ISquaredCircleInternals) {
  area._diameter = area._radius * 2;
  onHorizontalSizeChange(area);
  onVerticalSizeChange(area);
}

function onDiameterChange(area: ISquaredCircleInternals) {
  area._radius = area._diameter / 2;
  onHorizontalSizeChange(area);
  onVerticalSizeChange(area);
}

function onVerticalPositionChange(
  area: ISquaredCircleInternals,
  prev: number,
  value: number,
) {
  area._y += value - prev;
  onVerticalSizeChange(area);
}

function onHorizontalPositionChange(
  area: ISquaredCircleInternals,
  prev: number,
  value: number,
) {
  area._x += value - prev;
  onHorizontalSizeChange(area);
}
