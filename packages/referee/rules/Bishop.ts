import { teamType } from "../../models/src/constants";
import { Pieces, Position } from "../../models";
import { isTileEmpty_OR_OccupiedByEnemy, isTileOccupied, isTileOccupiedByEnemy } from "./GeneralRules";

export function bishopMove(
    initialPosition: Position,
    desiredPosition: Position,
    team: teamType,
    boardState: Pieces[],
): boolean {
    // Rule --> 
    //  it is passed by same team member  false
    //  it is passed by enemy member      false
    //  it is passed by empty tile        true
    // final tile occupied by enemy --> true , by me ----> false, by empty ->> true;
    if ((desiredPosition.x == initialPosition.x || desiredPosition.y == initialPosition.y)) {
        return false;
    }
    const multiplierX = (desiredPosition.x > initialPosition.x)?1:-1;
    const multiplierY = (desiredPosition.y > initialPosition.y)?1:-1;

    for (let i = 1; i < 8; i++) {
        // move to topright
        const passingTile: Position = new Position(  initialPosition.x + multiplierX * i,  initialPosition.y + multiplierY * i );
        if (passingTile.samePosition(desiredPosition)) {
            if (isTileEmpty_OR_OccupiedByEnemy(passingTile, boardState, team)) {
                return true;
            }
            break;
        }
        else {
            if (isTileOccupied(passingTile, boardState)) {
                break;
            }
        }
    }
    return false;
}
export function getPossibleBishopMove(piece:Pieces,boardState:Pieces[]):Position[]{
    const possibleMove:Position[] = [];
    
    // topLeft
    for(let i=1;i<8;i++){
        const passingTile: Position =new Position(piece.position.x - i, piece.position.y +  i) ;
        if (isTileOccupied(passingTile,boardState)) {
             if(isTileOccupiedByEnemy(passingTile, boardState, piece.team)){
                possibleMove.push(passingTile);
             }
             break;
        }
        else{
            possibleMove.push(passingTile);
        }
    }
    // topRight
    for(let i=1;i<8;i++){
        const passingTile: Position =new Position(piece.position.x + i, piece.position.y +  i) ;
        if (isTileOccupied(passingTile,boardState)) {
             if(isTileOccupiedByEnemy(passingTile, boardState, piece.team)){
                possibleMove.push(passingTile);
             }
             break;
        }
        else{
            possibleMove.push(passingTile);
        }
    }
    // bottomLeft
    for(let i=1;i<8;i++){
        const passingTile: Position =new Position(piece.position.x - i, piece.position.y -  i) ;
        if (isTileOccupied(passingTile,boardState)) {
             if(isTileOccupiedByEnemy(passingTile, boardState, piece.team)){
                possibleMove.push(passingTile);
             }
             break;
        }
        else{
            possibleMove.push(passingTile);
        }
    }
    // bottomRight
    for(let i=1;i<8;i++){
        const passingTile: Position =new Position(piece.position.x + i, piece.position.y -  i) ;
        if (isTileOccupied(passingTile,boardState)) {
             if(isTileOccupiedByEnemy(passingTile, boardState, piece.team)){
                possibleMove.push(passingTile);
             }
             break;
        }
        else{
            possibleMove.push(passingTile);
        }
    }
    return possibleMove;
}