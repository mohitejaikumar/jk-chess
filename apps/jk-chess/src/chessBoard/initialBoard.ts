import { Board } from "./Board";
import {Pawn, PieceType, Pieces, Position, teamType} from "@repo/models"


export const initialBoard: Board = new Board([


    new Pieces(PieceType.BISHOP, teamType.WHITE, new Position(5, 0),false),

    new Pieces(PieceType.BISHOP, teamType.WHITE, new Position(2, 0),false),

    new Pieces(PieceType.KING, teamType.WHITE, new Position(4, 0),false),

    new Pieces(PieceType.KNIGHT, teamType.WHITE, new Position(6, 0),false),

    new Pieces(PieceType.KNIGHT, teamType.WHITE, new Position(1, 0),false),

    new Pieces(PieceType.QUEEN, teamType.WHITE, new Position(3, 0),false),

    new Pieces(PieceType.ROOK, teamType.WHITE, new Position(7, 0),false),

    new Pieces(PieceType.ROOK, teamType.WHITE, new Position(0, 0),false),

    new Pawn(teamType.WHITE, new Position(0, 1),false),

    new Pawn(teamType.WHITE, new Position(1, 1),false),

    new Pawn(teamType.WHITE, new Position(2, 1),false),

    new Pawn(teamType.WHITE, new Position(3, 1),false),

    new Pawn(teamType.WHITE, new Position(4, 1),false),

    new Pawn(teamType.WHITE, new Position(5, 1),false),

    new Pawn(teamType.WHITE, new Position(6, 1),false),

    new Pawn(teamType.WHITE, new Position(7, 1),false),

    //-----------------------------WHITE-------------------------------------------------------------------------------------

    new Pieces(PieceType.BISHOP, teamType.BLACK, new Position(5, 7),false),

    new Pieces(PieceType.BISHOP, teamType.BLACK, new Position(2, 7),false),

    new Pieces(PieceType.KING, teamType.BLACK, new Position(4, 7),false),

    new Pieces(PieceType.KNIGHT, teamType.BLACK, new Position(6, 7),false),

    new Pieces(PieceType.KNIGHT, teamType.BLACK, new Position(1, 7),false),

    new Pieces(PieceType.QUEEN, teamType.BLACK, new Position(3, 7),false),

    new Pieces(PieceType.ROOK, teamType.BLACK, new Position(7, 7),false),

    new Pieces(PieceType.ROOK, teamType.BLACK, new Position(0, 7),false),

    new Pawn(teamType.BLACK, new Position(0, 6),false),

    new Pawn(teamType.BLACK, new Position(1, 6),false),

    new Pawn(teamType.BLACK, new Position(2, 6),false),

    new Pawn(teamType.BLACK, new Position(3, 6),false),

    new Pawn(teamType.BLACK, new Position(4, 6),false),

    new Pawn(teamType.BLACK, new Position(5, 6),false),

    new Pawn(teamType.BLACK, new Position(6, 6),false),

    new Pawn(teamType.BLACK, new Position(7, 6),false),
],1);

initialBoard.calculateAllPossibleMoves();