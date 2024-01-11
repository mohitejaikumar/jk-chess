import { useRef, useState } from 'react'
import Tiles from "./Tiles"
import { HORIZONTAL_AXIS, VERTICAL_AXIS, GRID_SIZE, Pieces, Position } from '@repo/models'
import { myTeam } from '../../store/atoms/myTeam';
import { useRecoilValue } from 'recoil';



interface Props {
  playMove: (piece: Pieces, initialPosition: Position, destination: Position) => boolean;
  pieces: Pieces[];

}

export default function ChessBoard({ playMove, pieces }: Props) {

  const [activepiece, setactivepiece] = useState<HTMLElement | null>(null);
  const [grabPosition, setgrabPosition] = useState<Position | null>(null);
  const myteam = useRecoilValue(myTeam);
  const chessBoardRef = useRef<HTMLInputElement>(null);
  const board = [];

  function grabbing(e: React.MouseEvent) {

    const element = e.target as HTMLElement;
    const chessboard = chessBoardRef.current;

    if (element.classList.contains("chess-piece") && chessboard) {

      // position relative to board in rows and column wise 
      const grabX = (Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE));
      const grabY = (Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 8 * GRID_SIZE) / GRID_SIZE)));
      // this is for reactivation when movePIece ke badh droppiece nahi
      if (activepiece) {
        activepiece.style.position = "relative";
        activepiece.style.removeProperty("top");
        activepiece.style.removeProperty("left");
        return;
      }
      // Add logic to move myTeam piece only 
      const currentPiece = pieces.find(p => (p.samePosition(new Position(grabX, grabY)) && p.team === myteam));
      if (currentPiece) {
        setgrabPosition(new Position(grabX, grabY));

        // position relative to board in px 
        const x: number = e.clientX - chessboard.offsetLeft - (GRID_SIZE / 2);
        const y: number = e.clientY - chessboard.offsetTop - (GRID_SIZE / 2);
       
        element.style.position = "absolute";
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;


        setactivepiece(element);
      }
    }

  }

  function movePiece(e: React.MouseEvent) {

    const chessBoard: HTMLInputElement | null = chessBoardRef.current;

    if (activepiece && chessBoard) {

      const minY = 0;
      const minX = 0;
      const maxX = chessBoard.clientWidth - GRID_SIZE;
      const maxY = chessBoard.clientHeight - GRID_SIZE;
      // mouse coordinate relative to board and ceter at left bottom of the board
      const x: number = e.clientX - chessBoard.offsetLeft - (GRID_SIZE / 2);
      const y: number = e.clientY - chessBoard.offsetTop - (GRID_SIZE / 2);

      // absolute to board position
      activepiece.style.position = "absolute";

      if (x < minX) {
        activepiece.style.left = `${minX}px`;

      }
      else if (x > maxX) {
        activepiece.style.left = `${maxX}px`;
      }
      else {
        activepiece.style.left = `${x}px`;

      }
      if (y < minX) {
        activepiece.style.top = `${minY}px`;
      }
      else if (y > maxX) {
        activepiece.style.top = `${maxY}px`;
      }
      else {
        activepiece.style.top = `${y}px`;
      }
    }

  }
  function dropPiece(e: React.MouseEvent) {
    const chessboard = chessBoardRef.current;
    if (activepiece && chessboard && grabPosition) {

      // mouse coordinates
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
      const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 8 * GRID_SIZE) / GRID_SIZE));

      const currentPiece = pieces.find(p => (p.samePosition(grabPosition)))?.clone();

      // I have grabed piece and moving it
      if (currentPiece) {

        const success = playMove(currentPiece, grabPosition, new Position(x, y));
        if (!success) {
          activepiece.style.position = "relative";
          activepiece.style.removeProperty("top");
          activepiece.style.removeProperty("left");
        }

      }
    }
    setactivepiece(null);
    setgrabPosition(null);

  }




  for (let i = VERTICAL_AXIS.length - 1; i >= 0; i--) {
    for (let j = 0; j < HORIZONTAL_AXIS.length; j++) {
      const number = i + j + 2;

      let image = undefined;
      pieces.forEach(p => {
        if (p.position.x === j && p.position.y === i) {
          image = p.image;
        }
      })

      let currentPiece = null;
      if (grabPosition) {
        currentPiece = pieces.find(p => p.samePosition(grabPosition));
      }
      const highlight = currentPiece?.possibleMove?.some(p => p.samePosition(new Position(j, i))) ? true : false;

      board.push(<Tiles key={`${j}${i}`} number={number} image={image} highlight={highlight} />);
    }
  }


  return (




    <div
      onMouseUp={e => dropPiece(e)}
      onMouseDown={e => grabbing(e)}
      onMouseMove={e => movePiece(e)}
      ref={chessBoardRef}
      id='chess-board'>

      {board}
    </div>


  )
}

