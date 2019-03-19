import { Vector } from '@amatiasq/geometry';
import { Rectangle, random } from '@amatiasq/geometry';
import { getParam } from '@amatiasq/util';
import IQuadEntity from '../src/IQuadEntity';
import QuadtreeCanvasRenderer from '../src/QuadtreeCanvasRenderer';
import Quadtree from '../src/quadtree';
import Canvas from './Canvas';

const maxEntities = getParam('maxEntities', 3);
const maxDepth = getParam('maxDepth', 5);
const entitiesCount = getParam('entitiesCount', 100);
const entitySize = getParam('entitySize', 3);

class Entity extends Rectangle implements IQuadEntity {
  velocity = Vector.fromRandom(-10, 10);

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

const canvas = new Canvas('canvas', { fillScreen: true });
const quadtree = new Quadtree(
  Rectangle.fromXY(0, 0, canvas.width, canvas.height),
  maxEntities,
  maxDepth,
);
const renderer = new QuadtreeCanvasRenderer(quadtree, canvas.element);
const entities: Entity[] = [];

canvas.onResize = () => {
  quadtree.resize(Rectangle.fromXY(0, 0, canvas.width, canvas.height));

  const excluded = quadtree.recalculate() as Entity[];

  for (const entry of excluded) {
    entry.x = canvas.width / 2;
    entry.y = canvas.height / 2;
    quadtree.add(entry);
  }
};

for (let i = 0; i < entitiesCount; i++) {
  const entity = Entity.fromXY(
    random(entitySize, canvas.width - entitySize),
    random(entitySize, canvas.height - entitySize),
    entitySize,
    entitySize,
  ) as Entity;

  quadtree.add(entity);
  entities.push(entity);
}

render();
requestAnimationFrame(update);

Object.assign(window, {
  quadtree,
  renderer,
  entities,
});

function update() {
  for (const entity of entities) {
    entity.update();
  }

  recalculate();
  render();
  requestAnimationFrame(update);
}

function render() {
  renderer.render();

  for (const entity of entities) {
    renderer.renderEntity(entity);
  }
}

function recalculate() {
  const excluded = quadtree.recalculate() as Entity[];

  for (const entry of excluded) {
    let i = 0;
    while (!quadtree.contains(entry)) {
      if (entry.left < 0 || entry.right > canvas.width) {
        entry.velocity = Vector.of(-entry.velocity.x, entry.velocity.y);
      }

      if (entry.top < 0 || entry.bottom > canvas.height) {
        entry.velocity = Vector.of(entry.velocity.x, -entry.velocity.y);
      }

      entry.update();
      i++;

      if (i > 100) debugger;
    }

    quadtree.add(entry);
  }
}
