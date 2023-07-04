import {GameControl} from './game-control';

interface GameConfiguration {
  controls: GameControl[]
}

export const gameConfiguration: GameConfiguration = {
  controls: [
    {
      id: 'rock',
      name: 'Rock',
      assetPath: '/controls/rock.svg'
    },
    {
      id: 'paper',
      name: 'Paper',
      assetPath: '/controls/paper.svg'
    },
    {
      id: 'scissors',
      name: 'Scissors',
      assetPath: '/controls/scissors.svg'
    }
  ]
}
