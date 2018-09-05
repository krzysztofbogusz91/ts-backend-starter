import * as Express from 'express';

const router = Express.Router();

router.get('/', (req, res) => {
  res.send('games works');
});

export const gamesRouter = router;
