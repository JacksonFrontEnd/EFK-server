import { Router } from 'express';
import { StatusCodes } from '../common';
import {
  createWord,
  deleteWord,
  getWordsArrayByID,
  getWordsArray,
  updateWord,
} from './repository';
import { Word } from './word';
import { getCategoryById } from '../category/repository';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const data = await getWordsArray();
    return res.json(data);
  } catch (e) {
    return res.status(StatusCodes.BadRequest).send(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = await getWordsArrayByID(Number(req.params.id));
    if (!data) return res.sendStatus(StatusCodes.NotFound);
    return res.json(data);
  } catch (e) {
    return res.status(StatusCodes.BadRequest).send(e);
  }
});

router.delete('/:id', async (req, res) => {
  const categoryId = Number(req.params.id);
  try {
    await deleteWord(categoryId);
    return res.sendStatus(StatusCodes.Ok);
  } catch (e) {
    return res.status(StatusCodes.NotFound).send(e);
  }
});

router.post('/', async (req, res) => {
  const data = req.body as Word;
  const category = await getCategoryById(data.categoryId);
  if (!category) {
    return res.status(StatusCodes.BadRequest).send('Invalid category ID');
  }
  try {
    const newData = await createWord(data);
    return res.json(newData);
  } catch (e) {
    return res.status(StatusCodes.BadRequest).send(e);
  }
});

router.put('/', async (req, res) => {
  const data = req.body as Word;
  const category = await getCategoryById(data.categoryId);
  if (!category) {
    return res.status(StatusCodes.BadRequest).send('Invalid category ID');
  }
  try {
    const newData = await updateWord(data);
    return res.json(newData);
  } catch (e) {
    return res.status(StatusCodes.BadRequest).send(e);
  }
});

export default router;
