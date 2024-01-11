import { teamType } from "../../models/src/constants";
import { Pieces, Position } from "../../models";
import { isTileEmpty_OR_OccupiedByEnemy, isTileOccupied, isTileOccupiedByEnemy } from "./GeneralRules";

export function kingMove(
    initialPosition: Position,
    desiredPosition: Position,
    team: teamType,
    boardState: Pieces[],
): boolean {

    const multiplierX = (desiredPosition.x > initialPosition.x) ? 1 : (desiredPosition.x < initialPosition.x) ? -1 : 0;
    const multiplierY = (desiredPosition.y > initialPosition.y) ? 1 : (desiredPosition.y < initialPosition.y) ? -1 : 0;
    for (let i = 1; i < 2; i++) {
        const passingTile: Position = new Position(initialPosition.x + multiplierX * i, initialPosition.y + multiplierY * i);
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
export function getPossibleKingMove(piece: Pieces, boardState: Pieces[]): Position[] {
    const possibleMove: Position[] = [];
    const temp_position: Position[] = [];
    const top = new Position(piece.position.x, piece.position.y + 1);
    temp_position.push(top);
    const bottom = new Position(piece.position.x, piece.position.y - 1);
    temp_position.push(bottom);
    const left = new Position(piece.position.x - 1, piece.position.y);
    temp_position.push(left);
    const right = new Position(piece.position.x + 1, piece.position.y);
    temp_position.push(right);
    const topleft = new Position(piece.position.x - 1, piece.position.y + 1);
    temp_position.push(topleft);
    const topright = new Position(piece.position.x + 1, piece.position.y + 1);
    temp_position.push(topright);
    const bottomleft = new Position(piece.position.x - 1, piece.position.y - 1);
    temp_position.push(bottomleft);
    const bottomright = new Position(piece.position.x + 1, piece.position.y - 1);
    temp_position.push(bottomright);


    for (let i = 0; i < temp_position.length; i++) {

        if (isTileOccupied(temp_position[i]!, boardState)) {
            if (isTileOccupiedByEnemy(temp_position[i]!, boardState, piece.team)) {
                possibleMove.push(temp_position[i]!);
            }
        }
        else {
            possibleMove.push(temp_position[i]!);
        }

    }

    return possibleMove;
}
export function getCatlingMove(king: Pieces, boardState: Pieces[]): Position[] {
    const possibleMove: Position[] = [];
    // king and rook hasNot moved yet
    if (king.hasMoved) return possibleMove;
    const rooks = boardState.filter(p => (p.isRook && !p.hasMoved && p.team === king.team));

    for (const rook of rooks) {
        const directionOfMove = (king.position.x > rook.position.x) ? 1 : -1;
        // empty space between rook and king
        // empty space is not under Attacked by enemy
        const desiredPositionOfRook = new Position(king.position.x - directionOfMove, king.position.y);
        if (!rook.possibleMove.some(m => m.samePosition(desiredPositionOfRook))) continue;
        // know we know that rook is ready to do castling
        const concernTile = rook.possibleMove.filter(m => m.y === king.position.y);

        // check if tile is on attack by enemySide
        const enemy = boardState.filter(p => p.team !== king.team);
        if (enemy.some(p => (
            p.possibleMove.some(m => (
                concernTile.some(mm => mm.samePosition(m))
            )
            )
        ))) continue;
        
        possibleMove.push(rook.position.clone());
    }

    return possibleMove;
}