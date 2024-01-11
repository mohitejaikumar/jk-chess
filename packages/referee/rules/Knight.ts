import {  teamType } from "../../models/src/constants";
import { Pieces, Position } from "../../models";
import { isTileEmpty_OR_OccupiedByEnemy } from "./GeneralRules";

export function knightMove(
    initialPosition: Position,
    desiredPosition: Position,
    team: teamType,
    boardState: Pieces[],
): boolean {

    //Top and Bottom Movement
    if (Math.abs(desiredPosition.y - initialPosition.y) === 2) {
        if (Math.abs(desiredPosition.x - initialPosition.x) === 1) {
            
            if (
                isTileEmpty_OR_OccupiedByEnemy(
                    desiredPosition,
                    boardState,
                    team
                )
            ) {
                return true;
            }
        }
    }
    // Right and Left Movement 
    if (Math.abs(desiredPosition.x - initialPosition.x) === 2) {
        if (Math.abs(desiredPosition.y - initialPosition.y) === 1) {
            
            if (
                isTileEmpty_OR_OccupiedByEnemy(
                    desiredPosition,
                    boardState,
                    team
                )
            ) {
                return true;
            }
        }
    }
    return false;
}
export function getPossibleKnightMove(piece: Pieces, boardState: Pieces[]): Position[] {
    const possibleMove: Position[] = [];
   
    const topLeft = new Position ( piece.position.x - 1,  piece.position.y + 2 );
    const topRight = new Position ( piece.position.x + 1,  piece.position.y + 2 );
    const leftTop = new Position ( piece.position.x - 2,  piece.position.y + 1 );
    const leftBottom = new Position ( piece.position.x - 2,  piece.position.y -1 );
    const rightBottom = new Position ( piece.position.x +2,  piece.position.y - 1 );
    const rightTop = new Position ( piece.position.x +2,  piece.position.y + 1 );
    const bottomLeft = new Position ( piece.position.x - 1,  piece.position.y - 2 );
    const bottomRight = new Position ( piece.position.x + 1,  piece.position.y - 2 );

    if(isTileEmpty_OR_OccupiedByEnemy(topLeft,boardState,piece.team))possibleMove.push(topLeft);
    if(isTileEmpty_OR_OccupiedByEnemy(topRight,boardState,piece.team))possibleMove.push(topRight);
    if(isTileEmpty_OR_OccupiedByEnemy(leftTop,boardState,piece.team))possibleMove.push(leftTop);
    if(isTileEmpty_OR_OccupiedByEnemy(leftBottom,boardState,piece.team))possibleMove.push(leftBottom);
    if(isTileEmpty_OR_OccupiedByEnemy(rightBottom,boardState,piece.team))possibleMove.push(rightBottom);
    if(isTileEmpty_OR_OccupiedByEnemy(rightTop,boardState,piece.team))possibleMove.push(rightTop);
    if(isTileEmpty_OR_OccupiedByEnemy(bottomLeft,boardState,piece.team))possibleMove.push(bottomLeft);
    if(isTileEmpty_OR_OccupiedByEnemy(bottomRight,boardState,piece.team))possibleMove.push(bottomRight);


    return possibleMove;
}