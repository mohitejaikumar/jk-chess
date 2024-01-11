import { useRef, useState } from "react";
import { PieceType, teamType ,Pieces, Position, Pawn} from "@repo/models"
import { Board, initialBoard } from "@/chessBoard";
import ChessBoard from "./ChessBoard"
import { useRecoilValue } from "recoil";
import { myTeam } from "../../store/atoms/myTeam";




export default function Referee() {

    const [board, setBoard] = useState<Board>(initialBoard.clone());
    const [promotionPawn, setpromotionPawn] = useState<Pieces | null>(null);
    const  myteam = useRecoilValue(myTeam);
    const promotionModelRef = useRef<HTMLInputElement>(null);
     
    



    function playMove(piece: Pieces, initialPosition: Position, destination: Position): boolean {
        
        if (piece.possibleMove.length===0) {
            return false;
        }
        // invalid move by non active player
        if (piece.team === myteam && board.totalTurns % 2 === 0) return false;
        if (piece.team !== myteam) return false;
        
        // modified version All possible Moves are inside 
        const ValidMove: boolean = piece.possibleMove.some(p => p.samePosition(destination));
        if (!ValidMove) return false;
        
        const enpassantMove: boolean = isEnpassantMove(
            initialPosition,
            destination,
            piece.type,
            piece.team,
            );
            
            // palyMove()--> board
            let playedMoveIsValid = false;
            
            setBoard((previousBoard) => {
                
                
                const clonedBoard = board.clone();
                clonedBoard.totalTurns += 1;
                playedMoveIsValid = clonedBoard.playMove(piece, enpassantMove, ValidMove, initialPosition, destination);
                previousBoard = clonedBoard;
                return previousBoard;
            });
            // PAWN PROMOTION LOGIC !!
            
            if (piece.isPawn) {
                const promotionRow = (piece.team === teamType.WHITE) ? 7 : 0;
                piece.position = destination.clone();
                if (piece.position.y === promotionRow) {
                    
                    promotionModelRef.current?.classList.remove("hidden");
                    setpromotionPawn((previousPiece)=>{
                        const clonedPiece = piece.clone();
                        previousPiece=clonedPiece;
                        return previousPiece;
                    });
                }
            }
            console.log("player Turn "+board.totalTurns);


        return playedMoveIsValid;

    }
    function isEnpassantMove(
        initialPosition: Position,
        desiredPosition: Position,
        type: PieceType,
        team: teamType,

    ): boolean {
        if (type == PieceType.PAWN) {
            const pawnDirection = (team === teamType.WHITE) ? 1 : -1;
            if (Math.abs(desiredPosition.x - initialPosition.x) === 1 && desiredPosition.y - initialPosition.y === pawnDirection) {
                const piece = board.pieces.find(p => (p.position.x === desiredPosition.x && p.position.y === desiredPosition.y - pawnDirection && (p as Pawn).isEnpassant));
                if (piece) {
                    return true;
                }
            }
        }
        return false;

    }

     // modified Version is available in possibleMoves

    // function isValidMove(
    //     initialPosition: Position,
    //     desiredPosition: Position,
    //     type: PieceType,
    //     team: teamType,
    // ): boolean {

    //     let validMove: boolean = false;
    //     switch (type) {
    //         case PieceType.PAWN:
    //             // console.log("PAWN!");
    //             validMove = pawnMove(initialPosition, desiredPosition, team, board.pieces);
    //             break;
    //         case PieceType.KNIGHT:
    //             // console.log("KNIGHT!");
    //             validMove = knightMove(initialPosition, desiredPosition, team, board.pieces);
    //             break;
    //         case PieceType.ROOK:
    //             // console.log("ROOK!");
    //             validMove = rookMove(initialPosition, desiredPosition, team, board.pieces);
    //             break;
    //         case PieceType.BISHOP:
    //             // console.log("BISHOP!");
    //             validMove = bishopMove(initialPosition, desiredPosition, team, board.pieces);
    //             break;
    //         case PieceType.QUEEN:
    //             // console.log("QUEEN!");
    //             validMove = queenMove(initialPosition, desiredPosition, team, board.pieces);
    //             break;
    //         case PieceType.KING:
    //             // console.log("KING!");
    //             validMove = kingMove(initialPosition, desiredPosition, team, board.pieces);
    //             break;
    //     }
    //     return validMove;

    // }


    function promotePawn(selectedPieceType: PieceType) {
    
        if (promotionPawn == undefined) {
            return;
        }

        setBoard((previousBoard) => {
            const clonedBoard = board.clone();
            clonedBoard.pieces = clonedBoard.pieces.reduce((results, piece) => {
                if (piece.samePosition(promotionPawn.position)) {
                    piece = new Pieces(selectedPieceType, piece.team, piece.position.clone(),true);
                }
                results.push(piece);
                return results;
            }, [] as Pieces[]);

            clonedBoard.calculateAllPossibleMoves();
            previousBoard = clonedBoard;
            return previousBoard;
        })

        if (promotionModelRef.current) {
            promotionModelRef.current.classList.add("hidden");
        }

    }

    function promotionPawnType() {
        return (promotionPawn?.team === teamType.WHITE) ? "w" : "b";
    }



    return (
        <>
            <div id="pawn-promotion-model" className="hidden" ref={promotionModelRef}>
                <div className="model">
                    <img onClick={() => { promotePawn(PieceType.ROOK); }} src={`/assets/rook_${promotionPawnType()}.png`} />
                    <img onClick={() => { promotePawn(PieceType.BISHOP); }} src={`/assets/bishop_${promotionPawnType()}.png`} />
                    <img onClick={() => { promotePawn(PieceType.QUEEN); }} src={`/assets/queen_${promotionPawnType()}.png`} />
                    <img onClick={() => { promotePawn(PieceType.KNIGHT); }} src={`/assets/knight_${promotionPawnType()}.png`} />
                </div>
            </div>
            <ChessBoard playMove={playMove} pieces={board.pieces}></ChessBoard>
        </>
    )

}
