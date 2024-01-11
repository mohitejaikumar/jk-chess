import { teamType } from "../../models/src/constants";
import { Pieces, Position } from "../../models";
import { Pawn } from "../../models/src/Pawn";
import {  isTileOccupied, isTileOccupiedByEnemy } from "./GeneralRules";


export function pawnMove(
    initialPosition: Position,
    desiredPosition: Position,
    team: teamType,
    boardState: Pieces[],
): boolean {
    const specialRow = (team === teamType.WHITE) ? 1 : 6;
    const pawnDirection = (team === teamType.WHITE) ? 1 : -1;
    // movement logic


    if (initialPosition.x === desiredPosition.x && initialPosition.y === specialRow && (desiredPosition.y - initialPosition.y === 2 * pawnDirection)) {
        if (
            !isTileOccupied(
                new Position(desiredPosition.x, desiredPosition.y - pawnDirection),
                boardState)
            &&
            !isTileOccupied(
                desiredPosition,
                boardState)
        ) {

            return true;
        }
    }
    else if (initialPosition.x === desiredPosition.x && desiredPosition.y - initialPosition.y === pawnDirection) {

        if (
            !isTileOccupied(
                desiredPosition,
                boardState)
        ) {
            return true;
        }
    }
    // Attacking logic
    else if (Math.abs(desiredPosition.x - initialPosition.x) === 1 && desiredPosition.y - initialPosition.y === pawnDirection) {
        if (
            isTileOccupiedByEnemy(
                desiredPosition,
                boardState,
                team)
        ) {

            return true;
        }
    }
    return false;
}
export function getPossiblePawnMove(piece: Pieces, boardState: Pieces[]): Position[] {
    const possibleMove: Position[] = [];
    const specialRow = (piece.team === teamType.WHITE) ? 1 : 6;
    const pawnDirection = (piece.team === teamType.WHITE) ? 1 : -1;

    // all possible possitions
    const normalMove: Position = new Position(piece.position.x, piece.position.y + pawnDirection);
    const specialMove: Position = new Position(piece.position.x, piece.position.y + 2 * pawnDirection);
    const leftPosition: Position = new Position(piece.position.x - 1, piece.position.y);
    const rightPosition: Position = new Position(piece.position.x + 1, piece.position.y);
    const upperRightAttack: Position = new Position(piece.position.x + 1, piece.position.y + pawnDirection);
    const upperLeftAttack: Position = new Position(piece.position.x - 1, piece.position.y + pawnDirection);

    const leftPiece = boardState.find(p => p.samePosition(leftPosition));
    const rightPiece = boardState.find(p => p.samePosition(rightPosition));

    if (isTileOccupiedByEnemy(upperLeftAttack, boardState, piece.team)) {
        possibleMove.push(upperLeftAttack);
    }
    if (isTileOccupiedByEnemy(upperRightAttack, boardState, piece.team)) {
        possibleMove.push(upperRightAttack);
    }
    if (leftPiece?.isPawn && (leftPiece as Pawn).isEnpassant) {
        possibleMove.push(new Position(leftPosition.x, leftPosition.y + pawnDirection));
    }
    if (rightPiece?.isPawn && (rightPiece as Pawn).isEnpassant) {
        possibleMove.push(new Position(rightPosition.x, rightPosition.y + pawnDirection));
    }
    if (!isTileOccupied(normalMove, boardState)) {
        possibleMove.push(normalMove);
        if (piece.position.y === specialRow && !isTileOccupied(specialMove, boardState)) {
            possibleMove.push(specialMove);
        }
    }


    return possibleMove;
}
