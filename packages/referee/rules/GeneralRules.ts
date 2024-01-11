import { teamType } from "../../models/src/constants"
import { Pieces, Position } from "../../models";

export function isTileEmpty_OR_OccupiedByEnemy(
    desiredPosition: Position,
    boardState: Pieces[],
    team_playing: teamType,
): boolean {
    if (desiredPosition.x < 0 || desiredPosition.x > 7 || desiredPosition.y < 0 || desiredPosition.y > 7) return false;
    return (!isTileOccupied(desiredPosition, boardState) || isTileOccupiedByEnemy(desiredPosition, boardState, team_playing));
}

export function isTileOccupied(
    desiredPosition: Position,
    boardState: Pieces[],
): boolean {
    if (desiredPosition.x < 0 || desiredPosition.x > 7 || desiredPosition.y < 0 || desiredPosition.y > 7) return true;

    const piece = boardState.find(p => { if (p.samePosition(desiredPosition)) return p });

    if (piece) {
        return true;
    }
    return false;
}

export function isTileOccupiedByEnemy(
    desiredPosition: Position,
    boardState: Pieces[],
    team_playing: teamType,
): boolean {
    if (desiredPosition.x < 0 || desiredPosition.x > 7 || desiredPosition.y < 0 || desiredPosition.y > 7) return false;
    const piece = boardState.find((p) => (p.samePosition(desiredPosition) && team_playing !== p.team));

    if (piece) {
        return true;
    }
    return false;
}