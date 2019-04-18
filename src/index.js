import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ButtonToolbar, MenuItem, DropdownButton } from 'react-bootstrap';


const PlayButton = (props) => {
  return (
    <div className='center'>
        <div className='flex'>
          <p className='playText'>Play a new game:</p>
          <button className='btn btn-default' onClick={props.playButton}>
            Generate!
          </button>
        </div>
    </div>
  )
}

const ColorButtons = (props) => {
  return (
    <div>
      <div className='center'>
        <ButtonToolbar>
          <button className='btn btn-info' onClick={() => console.log('blue')}>
            Blue
          </button>
          <button className='btn btn-danger' onClick={() => console.log('red')}>
            Red
          </button>
          <button className='btn btn-success' onClick={() => console.log('yellow')}>
            Yellow
          </button>
        </ButtonToolbar>
      </div>
    </div>
  )
}

const Grid = (props) => {
  const { fullfilledGrid, selectBox } = props;
  const cols = 6;
  const rows = 6;

  const width = cols * 16;
  let rowsArr = [];

  let boxClass = '';
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let boxId = i + '_' + j;

      boxClass = fullfilledGrid[i][j] === 1
        ? 'box red'
        : fullfilledGrid[i][j] === 2
        ? 'box blue'
        : 'box yellow';

      rowsArr.push(
        <Box
          boxClass={boxClass}
          key={boxId}
          boxId={boxId}
          row={i}
          col={j}
          selectBox={selectBox}
        />
      );
    }
  }

  return (
    <div className='grid' style={{ width: width }}>
      {rowsArr}
    </div>
  );
}

const Box = (props) => {
  const { boxClass, id, row, col } = props;

  return (
    <div
      className={boxClass}
      id={id}
      onClick={() => props.selectBox(row, col)}/>
  );
}

class Main extends React.Component {
  constructor() {
    super();
    this.rows = 6;
    this.cols = 6;

    this.state = {
      steps: 0,
      grid: [],
      fullfilledGrid: []
    };
  }

  componentWillMount () {
    this.fillUpGrid();
  }

  fillUpGrid = () => {
    const grid = Array(this.rows).fill().map(() => Array(this.cols).fill(0));
    let fullfilledGrid = arrayClone(grid);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        fullfilledGrid[i][j] = Math.floor(Math.random() * 3) + 1;
      }
    }
    this.setState({
      grid,
      fullfilledGrid
    });
  }

  playButton = () => {
    this.fillUpGrid();
  }

  render() {
    const { fullfilledGrid, steps } = this.state;
    return (
      <div>
        <h1>A Very Popular Game</h1>

        <PlayButton
          playButton={this.playButton}
        />
        <Grid
          fullfilledGrid={fullfilledGrid}
          selectBox={this.selectBox}
        />

        <h2>Steps: {steps}</h2>
        <ColorButtons />
      </div>
    );
  }
}

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

ReactDOM.render(<Main/>, document.getElementById('root'));
