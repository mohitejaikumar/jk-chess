import { teamType } from "../../models/src/constants";
import { Pieces, Position } from "../../models";
import { isTileEmpty_OR_OccupiedByEnemy, isTileOccupied, isTileOccupiedByEnemy } from "./GeneralRules";


export function queenMove(
    initialPosition: Position,
    desiredPosition: Position,
    team: teamType,
    boardState: Pieces[],
): boolean {

    const multiplierX = (desiredPosition.x > initialPosition.x) ? 1 : (desiredPosition.x < initialPosition.x) ? -1 : 0;
    const multiplierY = (desiredPosition.y > initialPosition.y) ? 1 : (desiredPosition.y < initialPosition.y) ? -1 : 0;
    for (let i = 1; i < 8; i++) {
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
export function getPossibleQueenMove(piece: Pieces, boardState: Pieces[]): Position[] {
    const possibleMove: Position[] = [];

    // topleft
    for (let i = 1; i < 8; i++) {
        const passingTile: Position = new Position(piece.position.x - i, piece.position.y + i);
        if (isTileOccupied(passingTile, boardState)) {
            if (isTileOccupiedByEnemy(passingTile, boardState, piece.team)) {
                possibleMove.push(passingTile);
            }
            break;
        }
        else {
            possibleMove.push(passingTile);
        }

    }
    //topRight
    for (let i = 1; i < 8; i++) {
        const passingTile: Position = new Position(piece.position.x + i, piece.position.y + i);
        if (isTileOccupied(passingTile, boardState)) {
            if (isTileOccupiedByEnemy(passingTile, boardState, piece.team)) {
                possibleMove.push(passingTile);
            }
            break;
        }
        else {
            possibleMove.push(passingTile);
        }

    }
    // bottomLeft
    for (let i = 1; i < 8; i++) {
        const passingTile: Position = new Position(piece.position.x - i, piece.position.y - i);
        if (isTileOccupied(passingTile, boardState)) {
            if (isTileOccupiedByEnemy(passingTile, boardState, piece.team)) {
                possibleMove.push(passingTile);
            }
            break;
        }
        else {
            possibleMove.push(passingTile);
        }

    }
    // bottomRight
    for (let i = 1; i < 8; i++) {
        const passingTile: Position = new Position(piece.position.x + i, piece.position.y - i);
        if (isTileOccupied(passingTile, boardState)) {
            if (isTileOccupiedByEnemy(passingTile, boardState, piece.team)) {
                possibleMove.push(passingTile);
            }
            break;
        }
        else {
            possibleMove.push(passingTile);
        }

    }
    // left
    for (let i = 1; i < 8; i++) {
        const passingTile: Position = new Position(piece.position.x - i, piece.position.y);
        if (isTileOccupied(passingTile, boardState)) {
            if (isTileOccupiedByEnemy(passingTile, boardState, piece.team)) {
                possibleMove.push(passingTile);
            }
            break;
        }
        else {
            possibleMove.push(passingTile);
        }

    }
    // right
    for (let i = 1; i < 8; i++) {
        const passingTile: Position = new Position(piece.position.x + i, piece.position.y);
        if (isTileOccupied(passingTile, boardState)) {
            if (isTileOccupiedByEnemy(passingTile, boardState, piece.team)) {
                possibleMove.push(passingTile);
            }
            break;
        }
        else {
            possibleMove.push(passingTile);
        }

    }
    // top
    for (let i = 1; i < 8; i++) {
        const passingTile: Position = new Position(piece.position.x, piece.position.y + i);
        if (isTileOccupied(passingTile, boardState)) {
            if (isTileOccupiedByEnemy(passingTile, boardState, piece.team)) {
                possibleMove.push(passingTile);
            }
            break;
        }
        else {
            possibleMove.push(passingTile);
        }

    }
    // bottom
    for (let i = 1; i < 8; i++) {
        const passingTile: Position = new Position(piece.position.x, piece.position.y - i);
        if (isTileOccupied(passingTile, boardState)) {
            if (isTileOccupiedByEnemy(passingTile, boardState, piece.team)) {
                possibleMove.push(passingTile);
            }
            break;
        }
        else {
            possibleMove.push(passingTile);
        }

    }

    return possibleMove;
}