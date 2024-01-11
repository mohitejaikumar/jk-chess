
import { PieceType, teamType } from "./constants";
import {Pieces} from "./Pieces";
import {Position} from "./Position";


export  class Pawn extends Pieces{
    isEnpassant?: boolean;

    constructor(team:teamType,position:Position,hasMoved:boolean,isEnpassant?:boolean,possibleMove:Position[]=[]){
        super(PieceType.PAWN,team,position,hasMoved,possibleMove);
        this.isEnpassant=isEnpassant;
        this.hasMoved=hasMoved;
    }
    clone(){
        return new Pawn(this.team,this.position.clone(),this.hasMoved,this.isEnpassant,this.possibleMove.map(p=>p.clone()));
    }
}