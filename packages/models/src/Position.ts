export class Position{
      x:number;
      y:number;

      constructor(x:number,y:number){
       this.x=x;
       this.y=y;     
      }
      samePosition(otherPosition:Position){
        return (this.x===otherPosition.x && this.y===otherPosition.y);
      }
      clone(){
        return new Position(this.x,this.y);
      }
}