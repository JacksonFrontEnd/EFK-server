import { Category } from './category';

const categoryDB: Category[] = [
  {
    count: 8,
    title: 'Action (set A)',
    image: './img/cry.jpg',
    link: '/Action_A',
  },
  {
    count: 8,
    title: 'Action (set B)',
    image: './img/open.jpg',
    link: '/Action_B',
  },
  {
    count: 8,
    title: 'Animal (set A)',
    image: './img/cat.jpg',
    link: '/Animal_A',
  },
  {
    count: 8,
    title: 'Animal (set B)',
    image: './img/bird.jpg',
    link: '/Animal_B',
  },
  {
    count: 8,
    title: 'Clothes',
    image: './img/skirt.jpg',
    link: '/Clothes',
  },
  {
    count: 8,
    title: 'Emotion',
    image: './img/sad.jpg',
    link: '/Emotions',
  },
  {
    count: 8,
    title: 'Plug',
    image: './img/cry.jpg',
    link: '/#',
  },
  {
    count: 8,
    title: 'Plug',
    image: './img/cry.jpg',
    link: '/#',
  },
];

export function getCategories(): Promise<Category[]> {
  return Promise.resolve<Category[]>(categoryDB);
}

export function getCategoryById(
  categoryId: number
): Promise<Category | undefined> {
  return Promise.resolve(categoryDB[categoryId]);
}

export function createCategory(category: Category): Promise<Category> {
  const isExist =
    typeof categoryDB.find(
      (cat) => cat.title.toLowerCase() === category.title.toLowerCase()
    ) !== 'undefined';
  if (isExist) {
    return Promise.reject(
      new Error(`Category with name ${category.title} is already exists`)
    );
  }

  const id = categoryDB.length + 1;
  const model = { ...category, id };
  categoryDB.push(model);

  return Promise.resolve(model);
}

export function updateCategory(
  category: Category,
  id: number
): Promise<Category> {
  categoryDB.splice(id, 1);
  const newItem: Category = {
    ...category,
  };
  categoryDB.push(newItem);
  return Promise.resolve(newItem);
}

export function deleteCategory(id: number): Promise<void> {
  categoryDB.splice(id, 1);
  return Promise.resolve();
}
