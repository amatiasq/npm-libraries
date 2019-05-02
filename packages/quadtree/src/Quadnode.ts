import { IRectangle, Rectangle } from '@amatiasq/geometry';
import IQuadEntity from './IQuadEntity';

export default class Quadnode {
  isDivided = false;
  private entities: IQuadEntity[] = [];

  get entitiesCount() {
    if (!this.isDivided) return this.entities.length;

    return (
      this.entities.length +
      this.nw.entitiesCount +
      this.ne.entitiesCount +
      this.sw.entitiesCount +
      this.se.entitiesCount
    );
  }

  private get hasNodes() {
    return this.nw && this.ne && this.sw && this.se;
  }

  protected nw: Quadnode;
  protected ne: Quadnode;
  protected sw: Quadnode;
  protected se: Quadnode;

  constructor(
    public bounds: Rectangle,
    public readonly maxEntities: number,
    public readonly maxDepth: number,
    public readonly level: number = 0,
  ) {}

  add(entity: IQuadEntity) {
    if (!this.isDivided) {
      this.entities.push(entity);

      if (this.entities.length > this.maxEntities) {
        this.split();
      }

      return;
    }

    if (!this.addToQuadrant(entity)) this.entities.push(entity);
  }

  includes(entity: IQuadEntity): boolean {
    if (!this.isDivided) return this.entities.includes(entity);

    return (
      this.entities.includes(entity) ||
      this.nw.includes(entity) ||
      this.ne.includes(entity) ||
      this.sw.includes(entity) ||
      this.se.includes(entity)
    );
  }

  resize(bounds: Rectangle) {
    this.bounds = bounds;
    if (!this.hasNodes) return;

    const b = bounds;
    this.nw.resize(Rectangle.fromXY(b.left, b.top, b.halfWidth, b.halfHeight));
    this.ne.resize(Rectangle.fromXY(b.x, b.top, b.halfWidth, b.halfHeight));
    this.sw.resize(Rectangle.fromXY(b.left, b.y, b.halfWidth, b.halfHeight));
    this.se.resize(Rectangle.fromXY(b.x, b.y, b.halfWidth, b.halfHeight));
  }

  private createChild(x: number, y: number, width: number, height: number) {
    return new Quadnode(
      Rectangle.fromXY(x, y, width, height),
      this.maxEntities,
      this.maxDepth,
      this.level + 1,
    );
  }

  protected split() {
    if (this.level >= this.maxDepth) return;
    if (this.isDivided) throw new Error('Already splitted');

    this.isDivided = true;
    if (!this.hasNodes) this.splitArea();
    this.distribute();
  }

  protected unsplit() {
    if (!this.isDivided) throw new Error('Quadtree not splitted');

    this.entities = [
      ...this.entities,
      ...this.nw.empty(),
      ...this.ne.empty(),
      ...this.sw.empty(),
      ...this.se.empty(),
    ];
    this.isDivided = false;
  }

  private splitArea() {
    const b = this.bounds;
    this.nw = this.createChild(b.left, b.top, b.halfWidth, b.halfHeight);
    this.ne = this.createChild(b.x, b.top, b.halfWidth, b.halfHeight);
    this.sw = this.createChild(b.left, b.y, b.halfWidth, b.halfHeight);
    this.se = this.createChild(b.x, b.y, b.halfWidth, b.halfHeight);
  }

  private distribute() {
    const entities = this.entities;
    this.entities = [];

    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];

      if (!this.addToQuadrant(entity)) this.entities.push(entity);
    }
  }

  protected addToQuadrant(entity: IQuadEntity): boolean {
    if (!this.contains(entity)) {
      debugger;
      throw new Error(
        `Can't get index. The entity ${entity} is not contained in ${
          this.bounds
        }`,
      );
    }

    if (this.nw.contains(entity)) {
      this.nw.add(entity);
      return true;
    }

    if (this.ne.contains(entity)) {
      this.ne.add(entity);
      return true;
    }

    if (this.sw.contains(entity)) {
      this.sw.add(entity);
      return true;
    }

    if (this.se.contains(entity)) {
      this.se.add(entity);
      return true;
    }

    return false;
  }

  contains(entity: IQuadEntity) {
    return this.bounds.contains(entity);
  }

  getAt(range: IRectangle): IQuadEntity[] {
    if (!this.bounds.collides(range)) {
      return [];
    }

    const ownEntitites = this.entities.filter(entity => range.collides(entity));
    if (!this.isDivided) return ownEntitites;

    return [
      ...ownEntitites,
      ...this.nw.getAt(range),
      ...this.ne.getAt(range),
      ...this.sw.getAt(range),
      ...this.se.getAt(range),
    ];
  }

  recalculate(): IQuadEntity[] {
    const toRecalculate = [];
    const excluded = [];

    if (this.isDivided) {
      toRecalculate.push(...this.nw.recalculate());
      toRecalculate.push(...this.ne.recalculate());
      toRecalculate.push(...this.sw.recalculate());
      toRecalculate.push(...this.se.recalculate());
    }

    toRecalculate.push(...this.entities);
    this.entities = [];

    for (let i = 0; i < toRecalculate.length; i++) {
      const entity = toRecalculate[i];
      if (this.bounds.contains(entity)) {
        this.add(entity);
      } else {
        excluded.push(entity);
      }
    }

    if (this.isDivided && this.entitiesCount <= this.maxEntities) {
      this.unsplit();
    }

    return excluded;
  }

  private empty() {
    const { entities } = this;

    if (this.entities.length) {
      this.entities = [];
    }

    if (!this.isDivided) return entities;

    return [
      ...this.entities,
      ...this.nw.empty(),
      ...this.ne.empty(),
      ...this.sw.empty(),
      ...this.se.empty(),
    ];
  }

  private getName(quadrant: Quadnode) {
    if (quadrant === this.nw) return 'nw';
    if (quadrant === this.ne) return 'ne';
    if (quadrant === this.sw) return 'sw';
    if (quadrant === this.se) return 'se';
    return 'NOT A CHILDREN';
  }
}

export type QuadrantName = 'nw' | 'ne' | 'sw' | 'se';
