import { IRectangle, Rectangle } from '@amatiasq/geometry';
import IQuadEntity from './IQuadEntity';
import Quadnode from './quadnode';

const DEFAULT_MAX_ENTITIES = 5;
const DEFAULT_MAX_DEPTH = 5;
const DEFAULT_OFFSET_X = 0;
const DEFAULT_OFFSET_Y = 0;
const DEFAULT_CONTAINMENT = ContactType.ANY_CONTACT;

export default class Quadtree {
  private readonly root: Quadnode;
  private readonly offsetX: number;
  private readonly offsetY: number;
  private readonly containment: ContactType;
  // private readonly entityMapper: QuadEntityMapper<T> | null;

  get bounds() {
    return this.root.bounds;
  }

  get isDivided() {
    return this.root.isDivided;
  }

  get entitiesCount() {
    return this.entitiesCount;
  }

  get maxEntities() {
    return this.root.maxEntities;
  }

  get maxDepth() {
    return this.root.maxDepth;
  }

  constructor(
    width: number,
    height: number,
    {
      offsetX = DEFAULT_OFFSET_X,
      offsetY = DEFAULT_OFFSET_Y,
      maxEntities = DEFAULT_MAX_ENTITIES,
      maxDepth = DEFAULT_MAX_DEPTH,
      containment = DEFAULT_CONTAINMENT,
    }: Partial<IQuadtreeOptions>,
  ) {
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.containment = containment;

    const bounds = Rectangle.fromXY(offsetX, offsetY, width, height);
    this.root = new Quadnode(bounds, maxEntities, maxDepth);
  }

  resize(width, height) {
    const { offsetX, offsetY } = this;
    const bounds = Rectangle.fromXY(offsetX, offsetY, width, height);
    this.root.resize(bounds);
  }

  add(entity: IQuadEntity) {
    this.root.add(entity);
  }

  includes(entity: IQuadEntity) {
    return this.root.includes(entity);
  }

  contains(entity: IQuadEntity) {
    return this.root.contains(entity, this.containment);
  }

  getAt(range: IRectangle, containment = ContactType.ANY_CONTACT) {
    return this.root.getAt(range, containment);
  }

  recalculate() {}
}

export interface IQuadtreeOptions {
  offsetX: number;
  offsetY: number;
  /** Any node with more entities than `maxEntities` shoud split */
  maxEntities: number;
  /** Max level of nesting quad nodes */
  maxDepth: number;
  /** Defines when a entity is considered inside the quadtree */
  containment: ContactType;
}
