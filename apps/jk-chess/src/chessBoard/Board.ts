
import { getCatlingMove, getPossibleBishopMove, getPossibleKingMove, getPossibleKnightMove, getPossiblePawnMove, getPossibleQueenMove, getPossibleRookMove } from "@repo/referee";
import {Position , Pieces ,Pawn,PieceType, teamType} from "@repo/models";


export  class Board {

    pieces: Pieces[];
    totalTurns: number;
    constructor(pieces: Pieces[], totalTurns: number) {
        this.pieces = pieces;
        this.totalTurns = totalTurns;
    }
    get currentTeam() {
        return this.totalTurns % 2 === 1 ? teamType.WHITE : teamType.BLACK;
    }

    calculateAllPossibleMoves() {
        for (const piece of this.pieces) {
            piece.possibleMove = this.getAllPossibleMove(piece, this.pieces);
        }
        for (const king of this.pieces.filter(p => p.isKing && p.team === this.currentTeam)) {
            king.possibleMove = [...king.possibleMove, ...getCatlingMove(king, this.pieces)];
        }

        this.checkCurrentTeamMoves();

        for (const piece of this.pieces.filter(p => p.team !== this.currentTeam)) {
            piece.possibleMove = [];
        }

    }
    checkCurrentTeamMoves() {

        // move through all current team pices
        const simulateBoard = this.clone();
        for (const piece of this.pieces.filter(p => p.team === this.currentTeam)) {
            if (piece.possibleMove === undefined) return;
            // want 2 things clonedPiece and clonedKing
            const clonedPiece = simulateBoard.pieces.find(p => p.samePiecePosition(piece))!;
            const originalPosition = clonedPiece.position.clone();
            const clonedKing = simulateBoard.pieces.find(p => (p.isKing && p.team === simulateBoard.currentTeam))!;

            // now for each piece simulate its all possible moves
            for (const move of piece.possibleMove) {

                // if piece is attacked remove that one 
                const attackedPiece = simulateBoard.pieces.find(p => p.samePosition(move));
                if (attackedPiece) {
                    simulateBoard.pieces = simulateBoard.pieces.filter(p => !p.samePiecePosition(attackedPiece));
                }
                // move the clonedPiece
                clonedPiece.position = move.clone();

                for (const enemy of simulateBoard.pieces.filter(p => p.team !== simulateBoard.currentTeam)) {
                    // update position of all enemy 
                    enemy.possibleMove = simulateBoard.getAllPossibleMove(enemy, simulateBoard.pieces);

                    // now check if any enemy is attacking on kingPosition (if yes then that move from my possible moves)

                    if (enemy.isPawn) {
                        if (enemy.possibleMove.some(m => (m.samePosition(clonedKing.position) && enemy.position.x !== m.x))) {
                            piece.possibleMove = piece.possibleMove.filter(m => !m.samePosition(move));
                        }
                    }
                    else {
                        if (enemy.possibleMove.some(m => m.samePosition(clonedKing.position))) {
                            piece.possibleMove = piece.possibleMove.filter(m => !m.samePosition(move));
                        }
                    }

                }

                if (attackedPiece) {
                    simulateBoard.pieces.push(attackedPiece);
                }
            }

            clonedPiece.position = originalPosition;

        }
    }
    getAllPossibleMove(piece: Pieces, boardState: Pieces[]): Position[] {

        switch (piece.type) {
            case PieceType.PAWN:
                // console.log("PAWN_all_possibleMove!");
                return getPossiblePawnMove(piece, boardState);
                break;
            case PieceType.KNIGHT:
                // console.log("KNIGHT_all_possibleMove!");
                return getPossibleKnightMove(piece, boardState);
                break;
            case PieceType.QUEEN:
                // console.log("QUEEN_all_possibleMove!");
                return getPossibleQueenMove(piece, boardState);
                break;
            case PieceType.ROOK:
                // console.log("ROOK_all_possibleMove");
                return getPossibleRookMove(piece, boardState);
                break;
            case PieceType.KING:
                // console.log("KING_all_possibleMove");
                return getPossibleKingMove(piece, boardState);
                break;
            case PieceType.BISHOP:
                return getPossibleBishopMove(piece, boardState);
                break;
            // return getPossibleBishopMove(piece, boardState);
            default:
                return [];


        }

    }
    playMove(piece: Pieces, enpassantMove: boolean, ValidMove: boolean, initialPosition: Position, destination: Position,) {
        const pawnDirection = (piece.team === teamType.WHITE) ? 1 : -1;
        const destinationPiece = this.pieces.find(p => p.samePosition(destination))?.clone();

        // Castling of the king

        if (piece.isKing && destinationPiece?.isRook && destinationPiece.team === piece.team) {

            const directionOfMove = (destination.x < piece.position.x) ? 1 : -1;
            const newkingXPosition = piece.position.x - 2 * directionOfMove;
            this.pieces = this.pieces.map(p => {
                if (p.samePiecePosition(piece)) {
                    p.position.x = newkingXPosition;

                }
                else if (p.samePiecePosition(destinationPiece)) {
                    p.position.x = newkingXPosition + directionOfMove;

                }
                return p;
            })

            this.calculateAllPossibleMoves();
            return true;
        }

        // priority given to enpassant move 
        if (enpassantMove) {
            // SPECIAL MOVE TO MOVE FOR ENPASSANT MOVE 
            this.pieces = this.pieces.reduce((result, p) => {

                if (p.samePosition(initialPosition)) {

                    if (p.isPawn) {
                        (p as Pawn).isEnpassant = false;
                    }
                    p.position.x = destination.x;
                    p.position.y = destination.y;
                    p.hasMoved = true;
                    result.push(p);
                }
                else if (!p.samePosition(new Position(destination.x, destination.y - pawnDirection))) {

                    if (p.isPawn)
                        (p as Pawn).isEnpassant = false;

                    result.push(p);
                }

                return result;
            }, [] as Pieces[]);


            this.calculateAllPossibleMoves();

        }
        else if (ValidMove) {
            // update board 
            // remove attacked piece;

            this.pieces = this.pieces.reduce((result, p) => {

                if (p.samePosition(initialPosition)) {
                    // special moves FOR PAWN
                    if (p.isPawn) {

                        (p as Pawn).isEnpassant = (destination.y - initialPosition.y === 2 * pawnDirection);
                    }
                    p.position.x = destination.x;
                    p.position.y = destination.y;
                    p.hasMoved = true;


                    result.push(p);
                }
                else if (!p.samePosition(new Position(destination.x, destination.y))) {
                    if (p.isPawn)
                        (p as Pawn).isEnpassant = false;
                    result.push(p);
                }

                return result;
            }, [] as Pieces[]);


            this.calculateAllPossibleMoves();
        }
        else {
            return false;

        }
        return true;
    }
    clone() {
        return new Board(this.pieces.map(p => p.clone()), this.totalTurns);
    }


}