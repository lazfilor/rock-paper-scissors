import {GameControl} from './game-control';
import {MoveId} from './move-id';

interface GameConfiguration {
  controls: GameControl[]
}

export const gameConfiguration: GameConfiguration = {
  controls: [
    {
      id: MoveId.ROCK,
      name: 'Rock',
      assetPath: '/controls/rock.svg'
    },
    {
      id: MoveId.PAPER,
      name: 'Paper',
      assetPath: '/controls/paper.svg'
    },
    {
      id: MoveId.SCISSORS,
      name: 'Scissors',
      assetPath: '/controls/scissors.svg'
    }
  ]
}
