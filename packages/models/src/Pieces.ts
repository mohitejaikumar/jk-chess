import  {Position}  from "./Position";
import { PieceType, teamType } from "./constants";



export  class Pieces{
    position: Position;
    image: string;
    type: PieceType;
    team: teamType;
    possibleMove:Position[];
    hasMoved:boolean;

    constructor(type:PieceType,team:teamType,position:Position,hasMoved:boolean,possibleMove:Position[]=[]){
        this.image = `/assets/${type}_${team}.png`;
        this.team = team;
        this.type = type;
        this.position = position;
        this.possibleMove = possibleMove;
        this.hasMoved = hasMoved;
    }
    samePiecePosition(otherPiece:Pieces){
        return (this.position.samePosition(otherPiece.position));
    }
    samePosition(otherPosition:Position){
        return this.position.samePosition(otherPosition);
    }
    
    get isPawn(){
        return this.type === PieceType.PAWN;
    }
    get isKing(){
        return this.type === PieceType.KING;
    }
    get isQueen(){
        return this.type === PieceType.QUEEN;
    }
    get isKnight(){
        return this.type === PieceType.KNIGHT;
    }
    get isBishop(){
        return this.type === PieceType.BISHOP;
    }
    get isRook(){
        return this.type === PieceType.ROOK;
    }

    clone(){
        
        return new Pieces(this.type,this.team,this.position.clone(),this.hasMoved,this.possibleMove.map(p=>p.clone()));
    }
}